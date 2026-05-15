"use client"

import { useRef, useState } from "react"
import type { ChangeEvent } from "react"
import { CircleCheckBig, FileText, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"

import { SectionShell } from "./section-shell"

type ExtractResponse = {
  resumeId: string | null
  fileName: string
  mimeType: string
  text: string
  characterCount: number
}

export type ExtractedResume = {
  resumeId: string | null
  fileName: string
  sizeLabel: string
  text: string
  characterCount: number
}

type UploadResumePanelProps = {
  onResumeReady?: (resume: ExtractedResume) => void
}

export function UploadResumePanel({ onResumeReady }: UploadResumePanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileInfo, setFileInfo] = useState<{
    name: string
    sizeLabel: string
  } | null>(null)
  const [extracted, setExtracted] = useState<ExtractResponse | null>(null)

  const openPicker = () => inputRef.current?.click()

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    if (!file) {
      return
    }

    setError(null)
    setIsUploading(true)
    setExtracted(null)
    setFileInfo({
      name: file.name,
      sizeLabel: `${Math.max(1, Math.round(file.size / 1024))} KB`,
    })

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/ai/extract", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null
        throw new Error(payload?.error ?? "Failed to extract text.")
      }

      const payload = (await response.json()) as ExtractResponse
      onResumeReady?.({
        resumeId: payload.resumeId,
        fileName: payload.fileName,
        sizeLabel: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        text: payload.text,
        characterCount: payload.characterCount,
      })
      setExtracted(payload)
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Something went wrong while reading the file."
      setError(message)
    } finally {
      setIsUploading(false)
      input.value = ""
    }
  }

  return (
    <SectionShell
      badge="1"
      title="Upload Your Resume"
      action={<span className="text-sm text-slate-400">PDF / DOCX</span>}
    >
      <div className="grid gap-4">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/40 px-5 py-8">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25">
              <Upload className="size-8" />
            </div>
            <p className="mt-5 text-lg font-semibold text-slate-900">
              Drag & drop your resume here
            </p>
            <p className="mt-1 text-sm text-slate-500">or</p>
            <Button
              type="button"
              onClick={openPicker}
              disabled={isUploading}
              className="mt-4 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-6 text-white hover:from-violet-400 hover:to-indigo-500"
            >
              {isUploading ? "Extracting..." : "Choose File"}
            </Button>
            <p className="mt-4 text-sm text-slate-500">
              Supports: PDF, DOCX (Max 10MB)
            </p>
          </div>
        </div>

        {(fileInfo || extracted || error) && (
          <div className="grid gap-3">
            {fileInfo && (
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-red-50 text-red-500">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{fileInfo.name}</p>
                    <p className="text-sm text-slate-500">{fileInfo.sizeLabel}</p>
                  </div>
                </div>
                <CircleCheckBig className="size-5 text-emerald-500" />
              </div>
            )}

            {extracted && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Extracted Text
                    </p>
                    <p className="text-xs text-slate-500">
                      {extracted.fileName} • {extracted.characterCount} chars
                    </p>
                  </div>
                  <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                    {extracted.mimeType}
                  </span>
                </div>

                <textarea
                  readOnly
                  value={extracted.text}
                  className="mt-3 min-h-[220px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-700 outline-none"
                />
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </SectionShell>
  )
}
