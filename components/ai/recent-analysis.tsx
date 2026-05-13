import { CircleGauge, FileText } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentAnalysis() {
  return (
    <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <CardHeader className="flex-row items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid size-7 place-items-center rounded-full bg-violet-50 text-violet-600">
            <CircleGauge className="size-4" />
          </div>
          <CardTitle className="text-base">Recent Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="grid size-28 place-items-center rounded-3xl bg-violet-50 text-violet-500 shadow-inner">
              <div className="relative">
                <FileText className="size-12" />
                <span className="absolute -right-2 -bottom-2 rounded-full bg-violet-600 p-2 text-white shadow-lg shadow-violet-500/25">
                  <CircleGauge className="size-4" />
                </span>
              </div>
            </div>
          </div>
          <h3 className="mt-6 text-xl font-semibold text-slate-900">
            No analysis yet
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Upload your resume and paste a job description to get started.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
