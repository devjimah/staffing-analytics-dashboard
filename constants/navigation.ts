import type { NavItem } from "@/types"

export const NAV_ITEMS: NavItem[] = [
  { label: "Overview",   href: "/dashboard",          icon: "Home01Icon" },
  { label: "Tickets",    href: "/dashboard/tickets",  icon: "Task01Icon", badge: 15 },
  { label: "Analytics",  href: "/dashboard/analytics", icon: "Analytics01Icon" },
  { label: "Team",       href: "/dashboard/users",    icon: "UserGroupIcon" },
  { label: "Settings",   href: "/dashboard/settings", icon: "Settings01Icon" },
]
