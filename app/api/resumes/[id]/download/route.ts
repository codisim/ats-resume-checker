import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getOrCreateDbUser } from "@/lib/auth-user"
import { savePdf } from "@/lib/pdf-generator"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const dbUser = await getOrCreateDbUser()
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: dbUser.id,
      },
      select: {
        fileName: true,
        rawText: true,
        id: true,
      },
    })

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    if (!resume.rawText || resume.rawText.trim() === "") {
      return NextResponse.json(
        { error: "No content available to generate PDF" },
        { status: 400 }
      )
    }

    // Generate PDF with download prompt
    const pdfBuffer = await savePdf({
      content: resume.rawText,
      fileName: resume.fileName,
    })

    // Return file for download
    return new NextResponse(Buffer.from(pdfBuffer as ArrayBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          resume.fileName.replace(/\.[^/.]+$/, '')
        )}-updated.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("PDF download failed:", error)
    return NextResponse.json(
      { error: "Could not generate downloadable file" },
      { status: 500 }
    )
  }
}