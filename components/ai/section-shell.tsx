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
    <Card className="border-border/80 bg-card/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {badge}
          </span>
          <CardTitle className="text-base font-semibold text-foreground">
            {title}
          </CardTitle>
        </div>
        {action}
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  )
}
