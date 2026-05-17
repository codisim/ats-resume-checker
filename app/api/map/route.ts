import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
    const users = await prisma.user.findMany({
        select: { country: true },
        where: { country: { not: null } },
    })

    const countMap: Record<string, number> = {}
    for (const u of users) {
        if (u.country) {
            countMap[u.country] = (countMap[u.country] ?? 0) + 1
        }
    }

    return NextResponse.json(countMap)
}