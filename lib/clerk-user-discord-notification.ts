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
  const fallbackName = email.split("@")[0] || "User"
  const displayName = [firstName?.trim() || fallbackName, lastName?.trim()]
    .filter(Boolean)
    .join(" ")

  // The webhook always fires before the user's browser ever reaches our
  // app, and the webhook has no real country data. So "first creation"
  // and "first time we have a country to report" are two different
  // moments. We check the country stored in the DB BEFORE this write —
  // if it was empty and we now have one, this is the right time to notify.
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
  // - skip entirely from the webhook path (no trustworthy country there)
  // - skip if we still don't have a country (nothing useful to report yet —
  //   wait for the next call, from getOrCreateDbUser, which will have one)
  // - skip if we already had a country before this write (already notified)
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

