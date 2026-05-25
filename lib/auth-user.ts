import { currentUser } from "@clerk/nextjs/server"

import { getClerkUserEmail } from "@/lib/admin"
import { upsertClerkUser } from "@/lib/clerk-user"

export async function getOrCreateDbUser() {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return null
  }

  const email = getClerkUserEmail(clerkUser)

  if (!email) {
    throw new Error("No email address available for the signed-in user.")
  }

  try {
    return await upsertClerkUser({
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    })
  } catch (error) {
    console.warn("Could not sync Clerk user to Prisma; continuing without DB user.", error)
    return null
  }
}

export function getWeekStart(date = new Date()) {
  const start = new Date(date)
  const day = start.getDay()
  const diff = (day + 6) % 7
  start.setDate(start.getDate() - diff)
  start.setHours(0, 0, 0, 0)
  return start
}
