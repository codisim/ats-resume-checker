import { CircleCheckBig, FileText, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"

import { SectionShell } from "./section-shell"

export function UploadResumePanel() {
  return (
    <SectionShell badge="1" title="Upload Your Resume" action={<span className="text-sm text-slate-400">PDF / DOCX</span>}>
      <div className="grid gap-4">
        <div className="rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/40 px-5 py-8">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25">
              <Upload className="size-8" />
            </div>
            <p className="mt-5 text-lg font-semibold text-slate-900">
              Drag & drop your resume here
            </p>
            <p className="mt-1 text-sm text-slate-500">or</p>
            <Button className="mt-4 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-6 text-white hover:from-violet-400 hover:to-indigo-500">
              Choose File
            </Button>
            <p className="mt-4 text-sm text-slate-500">
              Supports: PDF, DOCX (Max 10MB)
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-red-50 text-red-500">
              <FileText className="size-5" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Waliullah_Resume.pdf</p>
              <p className="text-sm text-slate-500">245 KB</p>
            </div>
          </div>
          <CircleCheckBig className="size-5 text-emerald-500" />
        </div>
      </div>
    </SectionShell>
  )
}
