"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Home01Icon,
  Analytics01Icon,
  UserGroupIcon,
  Settings01Icon,
  Logout01Icon,
  Task01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/uiStore"
import { siteConfig } from "@/config/site"
import { NAV_ITEMS } from "@/constants/navigation"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const iconMap: Record<string, typeof Home01Icon> = {
  Home01Icon,
  Analytics01Icon,
  UserGroupIcon,
  Settings01Icon,
  Task01Icon,
}

export function Sidebar() {
  const { isOpen, close } = useSidebar()
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "z-50 flex h-full flex-col bg-card border-r border-[#e6eff5] transition-[width] duration-200 ease-in-out overflow-hidden",
          isMobile ? "fixed inset-y-0 left-0" : "relative",
          isOpen ? "w-64" : isMobile ? "w-0" : "w-16",
        )}
      >
        {/* Logo */}
        <div className="flex h-[100px] items-center gap-3 border-b border-[#e6eff5] px-5 shrink-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand">
            <span className="text-base font-extrabold text-brand-foreground">S</span>
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="truncate text-lg font-extrabold text-foreground tracking-tight leading-tight">
                {siteConfig.name}
              </p>
              <p className="truncate text-[11px] text-muted-foreground leading-tight mt-0.5">
                {siteConfig.tagline}
              </p>
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 overflow-y-auto py-4">
          {NAV_ITEMS.map((item) => {
            const icon = iconMap[item.icon]
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={isMobile ? close : undefined}
                className={cn(
                  "relative flex items-center gap-4 py-3 text-[15px] font-medium transition-colors",
                  isOpen ? "px-6" : "justify-center px-0",
                  isActive
                    ? "text-brand"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-[6px] bg-brand rounded-r-md" />
                )}

                {icon && (
                  <HugeiconsIcon
                    icon={icon}
                    size={20}
                    className={cn("shrink-0", isActive ? "text-brand" : "text-muted-foreground")}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                )}
                {isOpen && <span className="truncate">{item.label}</span>}
                {isOpen && item.badge !== undefined && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User chip */}
        <div className="border-t border-[#e6eff5] p-4">
          <div
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 bg-muted/60",
              isOpen ? "" : "justify-center px-0 bg-transparent",
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
              JD
            </div>
            {isOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold text-foreground">
                  Jane Doe
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  HR Manager
                </p>
              </div>
            )}
            {isOpen && (
              <button
                className="shrink-0 text-muted-foreground hover:text-brand transition-colors"
                aria-label="Sign out"
              >
                <HugeiconsIcon icon={Logout01Icon} size={16} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
