import type { DashboardNavigationItem } from "./dashboard-data"

export const adminNavigation: DashboardNavigationItem[] = [
  { label: "Home", href: "/", iconKey: "home" },
  { label: "Dashboard", href: "/ai", iconKey: "dashboard" },
  { label: "Content", href: "/ai/content", iconKey: "content" },
  { label: "History", href: "/ai/analyses", iconKey: "analyses" },
]
