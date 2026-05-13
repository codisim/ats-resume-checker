import type { ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type SectionShellProps = {
  title: string
  badge: string
  action?: ReactNode
  children: ReactNode
}

export function SectionShell({
  title,
  badge,
  action,
  children,
}: SectionShellProps) {
  return (
    <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-violet-600 text-sm font-semibold text-white">
            {badge}
          </span>
          <CardTitle className="text-base font-semibold text-slate-900">
            {title}
          </CardTitle>
        </div>
        {action}
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  )
}
