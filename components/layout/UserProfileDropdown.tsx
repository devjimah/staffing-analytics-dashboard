"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserCircleIcon,
  LockPasswordIcon,
  PaintBoardIcon,
  Logout01Icon,
} from "@hugeicons/core-free-icons"

const USER = {
  name: "Jane Doe",
  role: "HR Manager",
  email: "jane.doe@staffhub.io",
  initials: "JD",
  department: "Human Resources",
  joined: "March 2024",
}

const MENU_ITEMS = [
  { icon: UserCircleIcon,  label: "My Profile",  desc: "View & edit your details",    href: "/dashboard/profile" },
  { icon: LockPasswordIcon,label: "Security",    desc: "Password & access settings",  href: "/dashboard/settings?tab=security" },
  { icon: PaintBoardIcon,  label: "Appearance",  desc: "Theme & display options",     href: "/dashboard/settings?tab=appearance" },
]

function avatarGradient() {
  return "linear-gradient(135deg, #2d60ff 0%, #845ef7 100%)"
}

export function UserProfileDropdown() {
  const [open, setOpen] = useState(false)
  const ref    = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  function navigate(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <div className="relative" ref={ref}>
      {/* Trigger avatar */}
      <button
        onClick={() => setOpen(v => !v)}
        className={cn(
          "flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold text-white",
          "cursor-pointer select-none transition-all duration-200",
          "ring-2 ring-transparent hover:ring-brand/40",
          open && "ring-brand/60 scale-95",
        )}
        style={{ background: avatarGradient() }}
        aria-label="Open user menu"
      >
        {USER.initials}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className={cn(
          "absolute right-0 top-[calc(100%+10px)] z-[100] w-[300px]",
          "rounded-3xl border border-border bg-card shadow-[0_24px_60px_-8px_rgba(0,0,0,0.35)]",
          "overflow-hidden",
          "animate-in fade-in slide-in-from-top-2 duration-200",
        )}>
          {/* Profile hero — click to go to profile */}
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="w-full text-left"
          >
            <div className="relative px-5 pt-5 pb-4 hover:brightness-95 transition-all"
              style={{
                background: "linear-gradient(135deg, color-mix(in srgb, var(--brand) 12%, var(--card)) 0%, var(--card) 100%)",
              }}
            >
              <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-brand/10 blur-2xl" />

              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold text-white shadow-lg"
                  style={{ background: avatarGradient() }}
                >
                  {USER.initials}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-[15px] font-extrabold text-foreground leading-tight">{USER.name}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{USER.role}</p>
                  <p className="text-[11px] text-muted-foreground/70 mt-0.5 truncate">{USER.email}</p>
                </div>
                <span className="text-muted-foreground/40 text-sm self-center">›</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { label: "Department", value: USER.department },
                  { label: "Member since", value: USER.joined },
                ].map(s => (
                  <div key={s.label} className="rounded-xl bg-muted/40 px-3 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{s.label}</p>
                    <p className="text-[11px] font-semibold text-foreground mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </button>

          <div className="h-px bg-border" />

          {/* Menu items */}
          <div className="p-2">
            {MENU_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => navigate(item.href)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-muted/60 transition-colors group"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                  <HugeiconsIcon icon={item.icon} size={16} strokeWidth={1.5} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-foreground group-hover:text-brand transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
                <span className="text-muted-foreground/40 text-xs opacity-0 group-hover:opacity-100 transition-opacity">›</span>
              </button>
            ))}
          </div>

          <div className="h-px bg-border" />

          {/* Sign out */}
          <div className="p-2">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-destructive/10 transition-colors group">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-destructive/10 group-hover:text-destructive transition-colors">
                <HugeiconsIcon icon={Logout01Icon} size={16} strokeWidth={1.5} />
              </span>
              <span className="text-[13px] font-semibold text-destructive">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
