import prisma from "@/lib/prisma"
import { notifyNewUserSignup } from "@/lib/discord"

type ClerkUserInput = {
  email: string
  firstName?: string | null
  lastName?: string | null
  imageUrl?: string | null
  country?: string | null
  // When true, never sends the Discord signup notification from this call
  // — used by the Clerk webhook, which can't supply a real country.
  skipDiscordNotification?: boolean
}

export async function upsertClerkUser({
  email,
  firstName,
  lastName,
  imageUrl,
  country,
  skipDiscordNotification = false,
}: ClerkUserInput) {
  const displayName =
    [firstName?.trim(), lastName?.trim()].filter(Boolean).join(" ") ||
    email.split("@")[0]

  // Detect first-time signup: check if user exists AND whether we already
  // had a country before this write. The webhook fires first (no country),
  // then getOrCreateDbUser fires with the real country from Vercel's header.
  // We only want to notify once, when we have the real country.
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { country: true },
  })
  const hadNoCountryBefore = !existingUser?.country

  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name: displayName,
      image: imageUrl || null,
      country: country || null,
    },
    update: {
      name: displayName,
      image: imageUrl || null,
      ...(country ? { country } : {}),
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      country: true,
      role: true,
      createdAt: true,
    },
  })

  // Notify exactly once per real human signup:
  // - skip from the webhook path (no trustworthy country there)
  // - skip if we still don't have a country (nothing useful to report yet)
  // - skip if we already had a country before this upsert (already notified)
  const shouldNotify =
    !skipDiscordNotification && Boolean(country) && hadNoCountryBefore

  if (shouldNotify) {
    void notifyNewUserSignup({
      name: displayName,
      email: user.email,
      imageUrl: user.image,
      countryCode: country,
    })
  }

  return user
}

export async function deleteClerkUserByEmail(email: string) {
  return prisma.user.deleteMany({
    where: { email },
  })
}