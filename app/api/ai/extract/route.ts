// import { NextResponse } from "next/server"
// import mammoth from "mammoth"
// import { PDFParse } from "pdf-parse"
// import { getData as getPdfWorkerData } from "pdf-parse/worker"

// import prisma from "@/lib/prisma"
// import { getOrCreateDbUser } from "@/lib/auth-user"

// export const runtime = "nodejs"

// const MAX_BYTES = 10 * 1024 * 1024

// function getExtension(fileName: string) {
//   const segments = fileName.toLowerCase().split(".")
//   return segments.length > 1 ? segments.pop() : ""
// }

// function normalizeText(text: string) {
//   return text.replace(/\r\n/g, "\n").trim()
// }

// function ensurePdfJsGlobals() {
//   const globals = globalThis as typeof globalThis & Record<string, unknown>

//   // pdf-parse pulls in pdfjs-dist, which expects these DOM globals to exist.
//   // Vercel's Node runtime does not provide them, so we supply lightweight shims
//   // before the parser module is loaded.
//   if (typeof globals.DOMMatrix === "undefined") {
//     globals.DOMMatrix = class {}
//   }

//   if (typeof globals.ImageData === "undefined") {
//     globals.ImageData = class {}
//   }

//   if (typeof globals.Path2D === "undefined") {
//     globals.Path2D = class {}
//   }
// }

// function ensurePdfWorkerConfigured() {
//   PDFParse.setWorker(getPdfWorkerData())
// }

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData()
//     const file = formData.get("file")

//     if (!(file instanceof File)) {
//       return NextResponse.json({ error: "Please upload a PDF or DOCX file." }, { status: 400 })
//     }

//     if (file.size > MAX_BYTES) {
//       return NextResponse.json({ error: "File is too large. Max 10MB." }, { status: 400 })
//     }

//     const buffer = Buffer.from(await file.arrayBuffer())
//     const mimeType = file.type || "application/octet-stream"
//     const extension = getExtension(file.name)

//     if (
//       mimeType === "application/pdf" ||
//       extension === "pdf"
//     ) {
//       ensurePdfJsGlobals()
//       ensurePdfWorkerConfigured()

//       const parser = new PDFParse({ data: buffer })
//       let result

//       try {
//         result = await parser.getText()
//       } finally {
//         await parser.destroy().catch(() => {})
//       }

//       const text = normalizeText(result?.text || "")
//       const resumeId = await saveResume({
//         fileName: file.name,
//         extractedText: text,
//       })

//       return NextResponse.json({
//         resumeId,
//         fileName: file.name,
//         mimeType: "application/pdf",
//         text,
//         characterCount: text.length,
//       })
//     }

//     if (
//       mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
//       extension === "docx"
//     ) {
//       const result = await mammoth.extractRawText({ buffer })
//       const text = normalizeText(result.value || "")
//       const resumeId = await saveResume({
//         fileName: file.name,
//         extractedText: text,
//       })

//       return NextResponse.json({
//         resumeId,
//         fileName: file.name,
//         mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         text,
//         characterCount: text.length,
//       })
//     }

//     return NextResponse.json(
//       { error: "Unsupported file type. Please upload a PDF or DOCX file." },
//       { status: 415 }
//     )
//   } catch (error) {
//     console.error("Failed to extract resume text:", {
//       error,
//     })

//     return NextResponse.json(
//       { error: "Could not extract text from the uploaded file." },
//       { status: 500 }
//     )
//   }
// }

// async function saveResume({
//   fileName,
//   extractedText,
// }: {
//   fileName: string
//   extractedText: string
// }): Promise<string | null> {
//   try {
//     let dbUser = null

//     try {
//       dbUser = await getOrCreateDbUser()
//     } catch (error) {
//       console.warn("Resume save skipped: unable to resolve authenticated user.", error)
//       return null
//     }

//     if (!dbUser) {
//       return null
//     }

//     const resume = await prisma.resume.create({
//       data: {
//         userId: dbUser.id,
//         fileUrl: `local://${fileName}`,
//         fileName,
//         rawText: extractedText,
//       },
//     })

//     return resume.id
//   } catch (error) {
//     console.error("Resume save skipped:", error)
//     return null
//   }
// }

import { NextResponse } from "next/server"
import pdfParse from "pdf-parse-new"
import mammoth from "mammoth"

import prisma from "@/lib/prisma"
import { getOrCreateDbUser } from "@/lib/auth-user"

export const runtime = "nodejs"

const MAX_BYTES = 10 * 1024 * 1024

function getExtension(fileName: string) {
  const parts = fileName.toLowerCase().split(".")
  return parts.length > 1 ? parts.pop() : ""
}

function normalizeText(text: string) {
  return text.replace(/\r\n/g, "\n").trim()
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please upload a PDF or DOCX file." },
        { status: 400 }
      )
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File too large. Max 10MB." },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const extension = getExtension(file.name)
    const mimeType = file.type || "application/octet-stream"

    let text = ""

    if (mimeType === "application/pdf" || extension === "pdf") {
      const parsed = await pdfParse(buffer)
      text = normalizeText(parsed.text || "")
    } else if (
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      extension === "docx"
    ) {
      const result = await mammoth.extractRawText({ buffer })
      text = normalizeText(result.value || "")
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. PDF or DOCX only." },
        { status: 415 }
      )
    }

    if (!text || text.length < 50) {
      return NextResponse.json(
        { error: "Could not extract text. Try a different file." },
        { status: 422 }
      )
    }

    const resumeId = await saveResume({
      fileName: file.name,
      extractedText: text,
    })

    return NextResponse.json({
      resumeId,
      fileName: file.name,
      text,
      characterCount: text.length,
    })
  } catch (error) {
    console.error("Extract failed:", error)
    return NextResponse.json(
      { error: "Could not extract text from file." },
      { status: 500 }
    )
  }
}

async function saveResume({
  fileName,
  extractedText,
}: {
  fileName: string
  extractedText: string
}): Promise<string | null> {
  try {
    const dbUser = await getOrCreateDbUser()
    if (!dbUser) return null

    const resume = await prisma.resume.create({
      data: {
        userId: dbUser.id,
        fileUrl: `local://${fileName}`,
        fileName,
        rawText: extractedText,
      },
    })

    return resume.id
  } catch (error) {
    console.error("Resume save failed:", error)
    return null
  }
}