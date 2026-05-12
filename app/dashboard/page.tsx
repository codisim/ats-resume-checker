

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { headers } from "next/headers"

import data from "./data.json"

export default async function Page() {
  const headersList = await headers();
  const userRolesHeader = headersList.get("x-user-roles");
  const userRoles = userRolesHeader ? JSON.parse(userRolesHeader) : [];
  const isAdmin = userRoles.includes("ADMIN");
  const isTeacher = userRoles.includes("TEACHER");
  const isStudent = userRoles.includes("STUDENT");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold tracking-tight">
                  Welcome back!
                </h1>
                <p className="text-muted-foreground">
                  You are logged in as {userRoles.join(", ")}.
                </p>
              </div>
              
              <SectionCards />
              
              {(isAdmin || isTeacher) && (
                <div className="px-4 lg:px-6">
                  <h2 className="mb-4 text-lg font-semibold">Analytics Overview</h2>
                  <ChartAreaInteractive />
                </div>
              )}

              {isStudent && (
                 <div className="px-4 lg:px-6">
                  <h2 className="mb-4 text-lg font-semibold">My Performance</h2>
                   {/* Student specific charts can go here */}
                   <ChartAreaInteractive />
                </div>
              )}

              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
