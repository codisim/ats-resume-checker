import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { getOrCreateDbUser } from "@/lib/auth-user"

export const runtime = "nodejs"

export async function GET() {
  try {
    const dbUser = await getOrCreateDbUser()
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fileName: true,
        fileUrl: true,
        rawText: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(resumes)
  } catch (error) {
    console.error("Failed to list resumes:", error)
    return NextResponse.json({ error: "Could not load resumes." }, { status: 500 })
  }
}
