"use client"

import { useState } from "react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  Call02Icon,
  Location01Icon,
  Calendar01Icon,
  Edit01Icon,
  CheckmarkCircle01Icon,
  Task01Icon,
  CheckmarkBadge01Icon,
  Alert01Icon,
  Clock01Icon,
  LockPasswordIcon,
  PaintBoardIcon,
  Notification01Icon,
  Settings01Icon,
  ArrowRight01Icon,
  UserCircleIcon,
  MessageAdd01Icon,
} from "@hugeicons/core-free-icons"

const USER = {
  name: "Jane Doe",
  role: "HR Manager",
  email: "jane.doe@staffhub.io",
  phone: "+44 7700 900000",
  department: "Human Resources",
  location: "London, UK",
  joined: "March 2024",
  bio: "Overseeing staffing operations and team wellbeing across all departments. Passionate about building great workplace cultures.",
  initials: "JD",
}

const inputCls =
  "w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand/30 transition"

const labelCls = "block text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-1.5"

const ACTIVITY = [
  { icon: Task01Icon,            text: "Assigned TKT-003 to Maria Santos",      time: "2 hours ago",  bg: "bg-brand/10",      color: "text-brand"       },
  { icon: CheckmarkBadge01Icon,  text: "Closed TKT-016: Angular Developer",      time: "Yesterday",    bg: "bg-success/10",    color: "text-success"     },
  { icon: MessageAdd01Icon,      text: "Commented on TKT-009: Data Scientist",   time: "2 days ago",   bg: "bg-purple-500/10", color: "text-purple-500"  },
  { icon: Task01Icon,            text: "Created TKT-020: IT Support Specialist", time: "3 days ago",   bg: "bg-muted",         color: "text-muted-foreground" },
]

const SETTINGS_LINKS = [
  { icon: LockPasswordIcon,   label: "Security & Password",  href: "/dashboard/settings?tab=security" },
  { icon: PaintBoardIcon,     label: "Appearance",            href: "/dashboard/settings?tab=appearance" },
  { icon: Notification01Icon, label: "Notifications",         href: "/dashboard/settings?tab=notifications" },
  { icon: Settings01Icon,     label: "System",                href: "/dashboard/settings?tab=system" },
]

function InfoChip({ icon, text }: { icon: typeof Mail01Icon; text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
      <HugeiconsIcon icon={icon} size={13} strokeWidth={1.5} className="shrink-0 text-muted-foreground/70" />
      <span>{text}</span>
    </div>
  )
}

export default function ProfilePage() {
  const [editing, setEditing]         = useState(false)
  const [notifSLA, setNotifSLA]       = useState(true)
  const [notifAssigned, setNotifAssigned] = useState(true)
  const [notifWeekly, setNotifWeekly] = useState(false)

  return (
    <div className="space-y-6">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl bg-card border border-border overflow-hidden shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
        {/* Banner */}
        <div className="h-32 w-full" style={{
          background: "linear-gradient(135deg, color-mix(in srgb,var(--brand) 22%,var(--card)) 0%, color-mix(in srgb,#845ef7 16%,var(--card)) 100%)",
        }}>
          <div className="pointer-events-none absolute -top-8 right-12 h-52 w-52 rounded-full bg-brand/10 blur-3xl" />
        </div>

        <div className="px-7 pb-6 -mt-10">
          {/* Avatar + actions row */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-extrabold text-white shadow-xl ring-4 ring-card"
                style={{ background: "linear-gradient(135deg,#2d60ff 0%,#845ef7 100%)" }}
              >
                {USER.initials}
              </div>
              <div className="pb-1">
                <h2 className="text-[21px] font-extrabold text-foreground leading-tight">{USER.name}</h2>
                <p className="text-[13px] text-muted-foreground">{USER.role} · {USER.department}</p>
              </div>
            </div>

            <button
              onClick={() => setEditing(e => !e)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold transition-all shrink-0",
                editing
                  ? "bg-success/10 text-success border border-success/30"
                  : "bg-brand text-white hover:bg-brand/90 shadow-sm",
              )}
            >
              <HugeiconsIcon
                icon={editing ? CheckmarkCircle01Icon : Edit01Icon}
                size={15}
                strokeWidth={2}
              />
              {editing ? "Save changes" : "Edit profile"}
            </button>
          </div>

          {/* Info chips */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <InfoChip icon={Mail01Icon}     text={USER.email} />
            <InfoChip icon={Call02Icon}     text={USER.phone} />
            <InfoChip icon={Location01Icon} text={USER.location} />
            <InfoChip icon={Calendar01Icon} text={`Joined ${USER.joined}`} />
          </div>

          {editing && (
            <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-brand">
              <HugeiconsIcon icon={Edit01Icon} size={12} strokeWidth={2} />
              Editing mode — update your details and click Save changes
            </div>
          )}
        </div>
      </div>

      {/* ── BODY GRID ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── LEFT (2/3) ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Personal Information */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
            <div className="px-5 py-4 border-b border-border bg-muted/20 flex items-center gap-2">
              <HugeiconsIcon icon={UserCircleIcon} size={15} strokeWidth={1.5} className="text-muted-foreground" />
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Personal Information</h3>
                <p className="text-[11px] text-muted-foreground">Your name, contact and work details</p>
              </div>
            </div>

            <div className="px-5 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "p-first", label: "First name", val: "Jane" },
                  { id: "p-last",  label: "Last name",  val: "Doe" },
                  { id: "p-email", label: "Email",      val: USER.email, type: "email" },
                  { id: "p-phone", label: "Phone",      val: USER.phone },
                  { id: "p-role",  label: "Job title",  val: USER.role },
                  { id: "p-dept",  label: "Department", val: USER.department },
                ].map(f => (
                  <div key={f.id}>
                    <label className={labelCls} htmlFor={f.id}>{f.label}</label>
                    <input
                      id={f.id}
                      type={(f as { type?: string }).type ?? "text"}
                      readOnly={!editing}
                      defaultValue={f.val}
                      className={cn(inputCls, !editing && "opacity-60 cursor-default bg-muted/20")}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className={labelCls} htmlFor="p-bio">Bio</label>
                <textarea
                  id="p-bio"
                  readOnly={!editing}
                  rows={3}
                  defaultValue={USER.bio}
                  className={cn(inputCls, "resize-none", !editing && "opacity-60 cursor-default bg-muted/20")}
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
            <div className="px-5 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Notification01Icon} size={15} strokeWidth={1.5} className="text-muted-foreground" />
                <div>
                  <h3 className="text-[14px] font-bold text-foreground">Notifications</h3>
                  <p className="text-[11px] text-muted-foreground">Quick alert preferences</p>
                </div>
              </div>
              <Link href="/dashboard/settings?tab=notifications"
                className="flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline">
                All settings
                <HugeiconsIcon icon={ArrowRight01Icon} size={11} strokeWidth={2} />
              </Link>
            </div>

            <div className="px-5 py-4 divide-y divide-border">
              {[
                { label: "SLA breach alerts",  desc: "Notify when a ticket exceeds the 2-day target",      val: notifSLA,      set: setNotifSLA },
                { label: "Ticket assigned",     desc: "Alert when a ticket is assigned to you",              val: notifAssigned, set: setNotifAssigned },
                { label: "Weekly digest",       desc: "Summary of tickets and performance each week",        val: notifWeekly,   set: setNotifWeekly },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{n.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{n.desc}</p>
                  </div>
                  <Switch checked={n.val} onCheckedChange={n.set} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT (1/3) ────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Activity Stats */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
            <div className="px-5 py-4 border-b border-border bg-muted/20">
              <h3 className="text-[14px] font-bold text-foreground">Activity Stats</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2.5">
              {[
                { icon: Task01Icon,           label: "Tickets open",   value: "12",   color: "text-brand",       bg: "bg-brand/10" },
                { icon: CheckmarkBadge01Icon, label: "Closed (month)", value: "8",    color: "text-success",     bg: "bg-success/10" },
                { icon: Alert01Icon,          label: "SLA breaches",   value: "2",    color: "text-destructive", bg: "bg-destructive/10" },
                { icon: Clock01Icon,          label: "Avg response",   value: "1.4d", color: "text-warning",     bg: "bg-warning/10" },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-muted/30 px-3 py-3">
                  <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg mb-2", s.bg)}>
                    <HugeiconsIcon icon={s.icon} size={14} strokeWidth={1.5} className={s.color} />
                  </div>
                  <p className={cn("text-[20px] font-extrabold leading-none", s.color)}>{s.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings Links */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
            <div className="px-5 py-4 border-b border-border bg-muted/20">
              <h3 className="text-[14px] font-bold text-foreground">Account Settings</h3>
            </div>
            <div className="p-2">
              {SETTINGS_LINKS.map(l => (
                <Link key={l.label} href={l.href}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted/60 transition-colors group">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                    <HugeiconsIcon icon={l.icon} size={15} strokeWidth={1.5} />
                  </span>
                  <span className="flex-1 text-[13px] font-semibold text-foreground group-hover:text-brand transition-colors">{l.label}</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={1.5} className="text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
            <div className="px-5 py-4 border-b border-border bg-muted/20">
              <h3 className="text-[14px] font-bold text-foreground">Recent Activity</h3>
            </div>
            <div className="px-4 py-3 space-y-0.5">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl px-1 py-2.5">
                  <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl", a.bg)}>
                    <HugeiconsIcon icon={a.icon} size={15} strokeWidth={1.5} className={a.color} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-foreground leading-snug">{a.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
