import { NextResponse } from "next/server"
import { z } from "zod"

import { getOrCreateDbUser } from "@/lib/auth-user"
import { fetchJobDescriptionFromUrl } from "@/lib/jd-url"

export const runtime = "nodejs"

const schema = z.object({
  url: z.string().trim().min(8),
})

export async function POST(request: Request) {
  try {
    const dbUser = await getOrCreateDbUser()
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => null)
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Enter a valid job URL." },
        { status: 400 }
      )
    }

    const result = await fetchJobDescriptionFromUrl(parsed.data.url)
    return NextResponse.json(result)
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Could not load that job URL. Paste the description text instead."
    return NextResponse.json({ error: message }, { status: 422 })
  }
}
