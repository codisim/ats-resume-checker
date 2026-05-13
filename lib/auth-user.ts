import { currentUser } from "@clerk/nextjs/server"

import prisma from "@/lib/prisma"

export async function getOrCreateDbUser() {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return null
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress

  if (!email) {
    throw new Error("No email address available for the signed-in user.")
  }

  const name = [clerkUser.firstName, clerkUser.lastName]
    .filter(Boolean)
    .join(" ")

  return prisma.user.upsert({
    where: { email },
    create: {
      email,
      name: name || null,
      image: clerkUser.imageUrl || null,
    },
    update: {
      name: name || null,
      image: clerkUser.imageUrl || null,
    },
  })
}

export function getWeekStart(date = new Date()) {
  const start = new Date(date)
  const day = start.getDay()
  const diff = (day + 6) % 7
  start.setDate(start.getDate() - diff)
  start.setHours(0, 0, 0, 0)
  return start
}
