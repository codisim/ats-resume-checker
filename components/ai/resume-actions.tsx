"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { PencilLine, Upload, Download, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

function fileSizeLabel(size: number) {
  return `${Math.max(1, Math.round(size / 1024))} KB`
}

async function readApiError(response: Response) {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | null
  return payload?.error ?? "Something went wrong."
}

export function ResumeUploadAction() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const submit = async () => {
    if (!selectedFile) {
      setError("Choose a PDF or DOCX file first.")
      return
    }

    setError(null)
    setSuccess(null)
    setIsPending(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/ai/extract", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(await readApiError(response))
      }

      setSuccess("Resume uploaded successfully.")
      setSelectedFile(null)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
      setOpen(false)
      router.refresh()
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Could not upload the resume."
      )
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-fit">
        <Upload className="size-4" />
        Upload resume
      </Button>

      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          if (!nextOpen) {
            setSelectedFile(null)
            setError(null)
            setSuccess(null)
            if (inputRef.current) {
              inputRef.current.value = ""
            }
          }
        }}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader className="px-0 pt-4">
            <SheetTitle className="text-2xl font-semibold text-foreground">
              Upload Resume
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Upload a PDF or DOCX file to create a new resume record.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0] ?? null
                setSelectedFile(file)
                setError(null)
                setSuccess(null)
              }}
            />

            <div className="rounded-2xl border border-dashed border-border/70 bg-card/60 p-5">
              <p className="text-sm font-medium text-foreground">
                {selectedFile ? selectedFile.name : "No file selected"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedFile
                  ? fileSizeLabel(selectedFile.size)
                  : "PDF or DOCX only, up to 10MB."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
                className="w-fit"
              >
                Choose file
              </Button>
              <Button
                type="button"
                onClick={submit}
                disabled={isPending || !selectedFile}
                className="w-fit"
              >
                {isPending ? "Uploading..." : "Upload and save"}
              </Button>
            </div>

            {error && (
              <p className="rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-success">
                {success}
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export function ResumeEditAction({
  resumeId,
  currentFileName,
}: {
  resumeId: string
  currentFileName: string
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [fileName, setFileName] = useState(currentFileName)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    const trimmed = fileName.trim()
    if (!trimmed) {
      setError("File name is required.")
      return
    }

    setError(null)
    setIsPending(true)
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: trimmed }),
      })

      if (!response.ok) {
        throw new Error(await readApiError(response))
      }

      setOpen(false)
      setFileName(currentFileName)
      router.refresh()
    } catch (renameError) {
      setError(
        renameError instanceof Error
          ? renameError.message
          : "Could not update the resume."
      )
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          setFileName(currentFileName)
          setOpen(true)
        }}
        className="w-fit"
      >
        <PencilLine className="size-4" />
        Edit
      </Button>

      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          if (!nextOpen) {
            setFileName(currentFileName)
            setError(null)
          }
        }}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader className="px-0 pt-4">
            <SheetTitle className="text-2xl font-semibold text-foreground">
              Rename Resume
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Update the file name shown in the resume library.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">File name</label>
              <Input
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                placeholder="My Resume.pdf"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-fit"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={submit}
                disabled={isPending}
                className="w-fit"
              >
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </div>

            {error && (
              <p className="rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
                {error}
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export function ResumeLibraryActions({
  resumeId,
  currentFileName,
}: {
  resumeId: string
  currentFileName: string
}) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const downloadPdf = async (inline = false) => {
    setError(null)
    setIsDownloading(true)
    try {
      const url = `/api/resumes/${resumeId}/download${inline ? "?disposition=inline" : ""}`
      if (inline) {
        window.open(url, "_blank", "noopener,noreferrer")
        return
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(await readApiError(response))
      }

      const blob = await response.blob()
      const objectUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = objectUrl
      const downloadName = currentFileName.toLowerCase().endsWith(".pdf")
        ? currentFileName
        : `${currentFileName.replace(/\.[^/.]+$/, "") || "resume"}.pdf`
      link.download = downloadName
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(objectUrl)
    } catch (downloadError) {
      setError(
        downloadError instanceof Error
          ? downloadError.message
          : "Could not download the resume."
      )
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => downloadPdf(true)}
        className="w-fit"
      >
        <Eye className="size-4" />
        View
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => downloadPdf(false)}
        disabled={isDownloading}
        className="w-fit"
      >
        <Download className="size-4" />
        {isDownloading ? "Downloading..." : "Download"}
      </Button>
      <ResumeEditAction resumeId={resumeId} currentFileName={currentFileName} />
      {error && (
        <p className="w-full text-right text-xs text-danger">{error}</p>
      )}
    </div>
  )
}
