import prisma from "@/lib/prisma"
import { notifyNewUserSignup } from "@/lib/discord"

type ClerkUserInput = {
  email: string
  firstName?: string | null
  lastName?: string | null
  imageUrl?: string | null
  country?: string | null
  source?: string | null
  skipDiscordNotification?: boolean
}

export async function upsertClerkUser({
  email,
  firstName,
  lastName,
  imageUrl,
  country,
  source,
  skipDiscordNotification = false,
}: ClerkUserInput) {
  const displayName =
    [firstName?.trim(), lastName?.trim()].filter(Boolean).join(" ") ||
    email.split("@")[0]

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { country: true },
  })

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

  // Notify exactly once when the user row is first created.
  const isNewUser = !existingUser
  const shouldNotify = !skipDiscordNotification && isNewUser

  if (shouldNotify) {
    void notifyNewUserSignup({
      name: displayName,
      email: user.email,
      imageUrl: user.image,
      countryCode: country,
      source,
    })
  }

  return user
}

export async function deleteClerkUserByEmail(email: string) {
  return prisma.user.deleteMany({
    where: { email },
  })
}