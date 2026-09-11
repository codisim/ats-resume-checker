import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const { email, interest } = await req.json()

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Valid email is required." },
                { status: 400 }
            )
        }

        await prisma.waitlist.upsert({
            where: { email },
            create: {
                email,
                interest: interest ?? null,
            },
            update: {
                interest: interest ?? null,
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Waitlist error:", error)
        return NextResponse.json(
            { error: "Could not join waitlist." },
            { status: 500 }
        )
    }
}
