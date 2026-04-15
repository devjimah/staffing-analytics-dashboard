"use client"

import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Menu01Icon,
  Search01Icon,
  Sun01Icon,
  Moon01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/uiStore"
import { NAV_ITEMS } from "@/constants/navigation"
import { UserProfileDropdown } from "@/components/layout/UserProfileDropdown"

function getPageTitle(pathname: string): string {
  const match = [...NAV_ITEMS]
    .reverse()
    .find((item) => pathname.startsWith(item.href))
  if (!match) return "Dashboard"
  if (pathname.match(/\/users\/[^/]+$/)) return "User Details"
  return match.label
}

export function Navbar() {
  const { toggle } = useSidebar()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const title = getPageTitle(pathname)

  return (
    <header className="flex h-[100px] shrink-0 items-center gap-4 border-b border-[#e6eff5] dark:border-border bg-card px-6">
      {/* Hamburger */}
      <button
        onClick={toggle}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-brand/10 hover:text-brand transition-colors"
        aria-label="Toggle sidebar"
      >
        <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={1.5} />
      </button>

      {/* Page title */}
      <h1 className="text-[28px] font-semibold text-foreground">{title}</h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="relative hidden sm:flex items-center">
        <div className="flex items-center gap-3 h-[50px] w-[255px] rounded-full bg-muted px-5">
          <HugeiconsIcon
            icon={Search01Icon}
            size={18}
            strokeWidth={1.5}
            className="shrink-0 text-muted-foreground"
          />
          <input
            type="search"
            placeholder="Search for something"
            className={cn(
              "flex-1 bg-transparent text-sm text-foreground",
              "placeholder:text-muted-foreground outline-none",
            )}
          />
        </div>
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-brand/10 hover:text-brand transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <HugeiconsIcon icon={Sun01Icon} size={20} strokeWidth={1.5} />
        ) : (
          <HugeiconsIcon icon={Moon01Icon} size={20} strokeWidth={1.5} />
        )}
      </button>

      {/* User profile */}
      <UserProfileDropdown />
    </header>
  )
}
