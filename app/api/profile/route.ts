import { currentUser, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"

import { getClerkUserEmail } from "@/lib/admin"
import { getOrCreateDbUser } from "@/lib/auth-user"
import prisma from "@/lib/prisma"

export const runtime = "nodejs"

const profileSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  country: z.string().trim().max(80).optional().or(z.literal("")),
})

function splitFullName(fullName: string) {
  const parts = fullName.split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return { firstName: "", lastName: "" }
  }

  const [firstName, ...rest] = parts
  return {
    firstName,
    lastName: rest.join(" "),
  }
}

export async function PATCH(request: Request) {
  const clerkUser = await currentUser()
  const dbUser = await getOrCreateDbUser()

  if (!clerkUser || !dbUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!getClerkUserEmail(clerkUser)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = profileSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid profile payload." },
      { status: 400 }
    )
  }

  const fullName = parsed.data.fullName.trim().replace(/\s+/g, " ")
  const { firstName, lastName } = splitFullName(fullName)
  const country = parsed.data.country?.trim() || null
  const client = await clerkClient()

  await client.users.updateUser(clerkUser.id, {
    firstName,
    lastName,
  })

  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      name: fullName,
      country,
    },
  })

  return NextResponse.json({ success: true })
}
