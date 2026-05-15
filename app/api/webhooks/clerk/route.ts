import { NextRequest, NextResponse } from "next/server"
import { verifyWebhook } from "@clerk/nextjs/webhooks"

import { deleteClerkUserByEmail, upsertClerkUser } from "@/lib/clerk-user"

export const runtime = "nodejs"

type ClerkUserEvent = {
  id: string
  email_addresses?: Array<{ email_address: string }>
  first_name?: string | null
  last_name?: string | null
  image_url?: string | null
}

export async function POST(request: NextRequest) {
  const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET

  if (!signingSecret) {
    return NextResponse.json(
      { error: "CLERK_WEBHOOK_SIGNING_SECRET is not configured." },
      { status: 500 }
    )
  }

  try {
    const event = await verifyWebhook(request, { signingSecret })

    if (event.type === "user.created" || event.type === "user.updated") {
      const user = event.data as ClerkUserEvent
      const email = user.email_addresses?.[0]?.email_address

      if (!email) {
        return NextResponse.json(
          { error: "Webhook payload missing email address." },
          { status: 400 }
        )
      }

      await upsertClerkUser({
        email,
        firstName: user.first_name,
        lastName: user.last_name,
        imageUrl: user.image_url,
      })
    }

    if (event.type === "user.deleted") {
      const user = event.data as ClerkUserEvent
      const email = user.email_addresses?.[0]?.email_address

      if (email) {
        await deleteClerkUserByEmail(email)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Clerk webhook verification failed:", error)
    return NextResponse.json(
      { error: "Webhook verification failed." },
      { status: 400 }
    )
  }
}
