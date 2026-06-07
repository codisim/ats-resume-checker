import prisma from "@/lib/prisma"

type ClerkUserInput = {
  email: string
  firstName?: string | null
  lastName?: string | null
  imageUrl?: string | null
  country?: string | null
}

export async function upsertClerkUser({
  email,
  firstName,
  lastName,
  imageUrl,
  country,
}: ClerkUserInput) {
  const name = [firstName, lastName].filter(Boolean).join(" ")

  return prisma.user.upsert({
    where: { email },
    create: {
      email,
      name: name || null,
      image: imageUrl || null,
      country: country || null,
    },
    update: {
      name: name || null,
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
}

export async function deleteClerkUserByEmail(email: string) {
  return prisma.user.deleteMany({
    where: { email },
  })
}