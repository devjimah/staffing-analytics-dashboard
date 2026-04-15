import Link from "next/link"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  Call02Icon,
  Location01Icon,
  Calendar01Icon,
  UserCircleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Task01Icon,
  CheckmarkBadge01Icon,
  FileEditIcon,
  Bookmark01Icon,
  WorkHistoryIcon,
} from "@hugeicons/core-free-icons"

// ── Data ─────────────────────────────────────────────────────────

const STAFF_MAP: Record<string, {
  name: string; role: string; department: string; email: string; phone: string
  status: "active" | "on-leave" | "remote"; joined: string; location: string
  bio: string; manager: string
  attendance: number; performance: number; overtimeHrs: number; ticketsHandled: number
  skills: string[]
  activity: { date: string; type: "ticket" | "review" | "leave" | "note"; text: string }[]
}> = {
  "1": {
    name: "Sarah Chen", role: "Software Engineer", department: "Engineering",
    email: "sarah.chen@staffhub.io", phone: "+44 7700 901001",
    status: "active", joined: "January 2022", location: "London, UK",
    bio: "Senior engineer focused on scalable systems and full-stack development. Champion of internal tooling and DX improvements.",
    manager: "James Kwarteng",
    attendance: 97, performance: 92, overtimeHrs: 14, ticketsHandled: 8,
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    activity: [
      { date: "15 Apr 2026", type: "ticket", text: "Resolved TKT-006: Backend Engineer request for Netflix" },
      { date: "12 Apr 2026", type: "review", text: "Q1 performance review completed — score: 92/100" },
      { date: "08 Apr 2026", type: "ticket", text: "Assigned TKT-009: Data Scientist for Tesla" },
      { date: "01 Apr 2026", type: "note",   text: "Promoted to Senior Software Engineer" },
    ],
  },
  "2": {
    name: "Marcus Webb", role: "Product Manager", department: "Product",
    email: "marcus.webb@staffhub.io", phone: "+44 7700 901002",
    status: "remote", joined: "March 2021", location: "Manchester, UK",
    bio: "Product strategist with a track record of shipping SaaS products 0→1. Focuses on user-centric roadmaps and cross-functional delivery.",
    manager: "Linda Osei",
    attendance: 91, performance: 88, overtimeHrs: 8, ticketsHandled: 5,
    skills: ["Roadmapping", "Figma", "SQL", "Agile", "OKRs"],
    activity: [
      { date: "14 Apr 2026", type: "ticket", text: "Submitted TKT-007: Product Manager for Spotify" },
      { date: "10 Apr 2026", type: "review", text: "Mid-year check-in completed" },
      { date: "05 Apr 2026", type: "note",   text: "Started remote working arrangement" },
    ],
  },
  "3": {
    name: "Priya Nair", role: "HR Coordinator", department: "HR",
    email: "priya.nair@staffhub.io", phone: "+44 7700 901003",
    status: "on-leave", joined: "July 2023", location: "Birmingham, UK",
    bio: "HR professional specialising in recruitment operations and employee relations. Currently on approved annual leave.",
    manager: "Jane Doe",
    attendance: 83, performance: 79, overtimeHrs: 2, ticketsHandled: 3,
    skills: ["Recruitment", "HRIS", "Employment Law", "Onboarding"],
    activity: [
      { date: "07 Apr 2026", type: "leave",  text: "Annual leave started — returns 22 Apr 2026" },
      { date: "04 Apr 2026", type: "ticket", text: "Handled TKT-012: Business Analyst for Deloitte" },
    ],
  },
  "4": {
    name: "Tom Okafor", role: "Sales Executive", department: "Sales",
    email: "tom.okafor@staffhub.io", phone: "+44 7700 901004",
    status: "active", joined: "November 2020", location: "London, UK",
    bio: "B2B sales specialist with a consistent record of exceeding quarterly targets. Manages key enterprise accounts across financial services.",
    manager: "Ben Asante",
    attendance: 94, performance: 85, overtimeHrs: 22, ticketsHandled: 6,
    skills: ["CRM", "Negotiation", "Enterprise Sales", "Salesforce", "Cold Outreach"],
    activity: [
      { date: "15 Apr 2026", type: "ticket", text: "Raised TKT-003: Project Manager for Microsoft" },
      { date: "11 Apr 2026", type: "review", text: "Exceeded Q1 quota by 18%" },
      { date: "06 Apr 2026", type: "note",   text: "Closed new enterprise deal with KPMG" },
    ],
  },
  "5": {
    name: "Elena Vasquez", role: "UX Designer", department: "Design",
    email: "elena.vasquez@staffhub.io", phone: "+44 7700 901005",
    status: "active", joined: "February 2024", location: "London, UK",
    bio: "Product designer passionate about design systems and accessibility. Leads UX research and prototyping for new platform features.",
    manager: "Tina Luo",
    attendance: 99, performance: 95, overtimeHrs: 5, ticketsHandled: 4,
    skills: ["Figma", "User Research", "Design Systems", "Prototyping", "Accessibility"],
    activity: [
      { date: "15 Apr 2026", type: "ticket", text: "Assigned TKT-004: UX Designer for Meta Platforms" },
      { date: "13 Apr 2026", type: "review", text: "Q1 review — 95/100 score, top performer" },
      { date: "09 Apr 2026", type: "note",   text: "Completed accessibility audit for dashboard v2" },
    ],
  },
}

const STATUS_CONFIG = {
  active:     { label: "Active",   dot: "bg-success",  pill: "bg-success/10 text-success" },
  remote:     { label: "Remote",   dot: "bg-brand",    pill: "bg-brand/10 text-brand" },
  "on-leave": { label: "On Leave", dot: "bg-warning",  pill: "bg-warning/10 text-warning" },
}

const ACTIVITY_ICON = {
  ticket: { icon: Task01Icon,           bg: "bg-brand/10",    color: "text-brand",       label: "Ticket" },
  review: { icon: CheckmarkBadge01Icon, bg: "bg-success/10",  color: "text-success",     label: "Review" },
  leave:  { icon: WorkHistoryIcon,      bg: "bg-warning/10",  color: "text-warning",     label: "Leave" },
  note:   { icon: Bookmark01Icon,       bg: "bg-muted",       color: "text-muted-foreground", label: "Note" },
}

function avatarGradient(name: string) {
  const g = [
    "linear-gradient(135deg,#2d60ff 0%,#845ef7 100%)",
    "linear-gradient(135deg,#16dbcc 0%,#2d60ff 100%)",
    "linear-gradient(135deg,#ffbb38 0%,#ff4b4a 100%)",
    "linear-gradient(135deg,#845ef7 0%,#ff4b4a 100%)",
    "linear-gradient(135deg,#16dbcc 0%,#845ef7 100%)",
  ]
  return g[name.charCodeAt(0) % g.length]
}

function StatBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all duration-700", color)}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  )
}

function InfoChip({ icon, text }: { icon: typeof Mail01Icon; text: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
      <HugeiconsIcon icon={icon} size={13} strokeWidth={1.5} className="shrink-0 opacity-70" />
      {text}
    </span>
  )
}

// ── Page ─────────────────────────────────────────────────────────

// Next.js 15: params is a Promise — must be awaited
export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user   = STAFF_MAP[id]

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
          <HugeiconsIcon icon={UserCircleIcon} size={28} strokeWidth={1.5} className="text-muted-foreground" />
        </div>
        <p className="text-[15px] font-semibold text-foreground">Team member not found</p>
        <p className="text-[13px] text-muted-foreground">ID &quot;{id}&quot; doesn&apos;t match any team member.</p>
        <Link href="/dashboard/users"
          className="flex items-center gap-1.5 mt-2 text-[13px] font-semibold text-brand hover:underline">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} />
          Back to team
        </Link>
      </div>
    )
  }

  const initials = user.name.split(" ").map(n => n[0]).join("")
  const status   = STATUS_CONFIG[user.status]

  return (
    <div className="space-y-6">

      {/* Back */}
      <Link
        href="/dashboard/users"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} />
        Back to team
      </Link>

      {/* ── Hero card ───────────────────────────────────────────── */}
      <div className="relative rounded-md bg-card border border-border overflow-hidden shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
        {/* Banner */}
        <div className="h-32 w-full" style={{
          background: `linear-gradient(135deg, color-mix(in srgb, var(--brand) 16%, var(--card)) 0%, var(--card) 100%)`,
        }}>
          <div className="pointer-events-none absolute -top-6 right-12 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />
        </div>

        <div className="px-7 pb-6 -mt-10">
          {/* Avatar + name + actions */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md text-2xl font-extrabold text-white shadow-xl ring-4 ring-card"
                style={{ background: avatarGradient(user.name) }}
              >
                {initials}
              </div>
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[21px] font-extrabold text-foreground leading-tight">{user.name}</h2>
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold", status.pill)}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                    {status.label}
                  </span>
                </div>
                <p className="text-[13px] text-muted-foreground mt-0.5">{user.role} · {user.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`mailto:${user.email}`}
                className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-[12px] font-semibold hover:bg-muted transition-colors"
              >
                <HugeiconsIcon icon={Mail01Icon} size={13} strokeWidth={1.5} />
                Email
              </a>
              <button className="flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-[12px] font-bold text-white hover:bg-brand/90 transition-colors">
                <HugeiconsIcon icon={FileEditIcon} size={13} strokeWidth={1.5} />
                Edit
              </button>
            </div>
          </div>

          {/* Info chips */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <InfoChip icon={Mail01Icon}     text={user.email} />
            <InfoChip icon={Call02Icon}     text={user.phone} />
            <InfoChip icon={Location01Icon} text={user.location} />
            <InfoChip icon={Calendar01Icon} text={`Joined ${user.joined}`} />
            <InfoChip icon={UserCircleIcon} text={`Reports to ${user.manager}`} />
          </div>

          {/* Bio */}
          <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed max-w-2xl">{user.bio}</p>

          {/* Skills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {user.skills.map(s => (
              <span key={s} className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── Left (2/3): KPIs + timeline ───────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* KPI row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Attendance",  value: `${user.attendance}%`,     sub: "This quarter",  barVal: user.attendance,           max: 100, color: "bg-success" },
              { label: "Performance", value: `${user.performance}/100`, sub: "Current score",  barVal: user.performance,          max: 100, color: "bg-brand" },
              { label: "Overtime",    value: `${user.overtimeHrs} hrs`, sub: "This month",    barVal: user.overtimeHrs,  max: 40,         color: "bg-warning" },
              { label: "Tickets",     value: `${user.ticketsHandled}`,  sub: "Total handled", barVal: user.ticketsHandled, max: 20,        color: "bg-purple-500" },
            ].map(k => (
              <div key={k.label}
                className="rounded-md bg-card border border-border p-4 shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
                <p className="text-[22px] font-extrabold text-foreground leading-tight">{k.value}</p>
                <p className="text-[11px] font-semibold text-muted-foreground mt-0.5">{k.label}</p>
                <StatBar value={k.barVal} max={k.max} color={k.color} />
                <p className="text-[10px] text-muted-foreground/70 mt-1.5">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Activity timeline */}
          <div className="rounded-md bg-card border border-border overflow-hidden shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
            <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Activity Timeline</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Recent tickets, reviews and notes</p>
              </div>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
                {user.activity.length} events
              </span>
            </div>
            <div className="p-5 space-y-1">
              {user.activity.map((a, i) => {
                const cfg = ACTIVITY_ICON[a.type]
                return (
                  <div key={i} className="flex items-start gap-4 rounded-md px-2 py-3 hover:bg-muted/30 transition-colors">
                    <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-md", cfg.bg)}>
                      <HugeiconsIcon icon={cfg.icon} size={16} strokeWidth={1.5} className={cfg.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-foreground leading-snug">{a.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide", cfg.bg, cfg.color)}>
                          {cfg.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{a.date}</span>
                      </div>
                    </div>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={1.5} className="text-muted-foreground/30 shrink-0 mt-0.5" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Right (1/3): Contact + Skills + Manager ────────────── */}
        <div className="space-y-5">


          {/* Department & Status */}
          <div className="rounded-md bg-card border border-border overflow-hidden shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
            <div className="px-5 py-4 border-b border-border bg-muted/20">
              <h3 className="text-[14px] font-bold text-foreground">Position</h3>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Department</p>
                <p className="text-[13px] font-semibold text-foreground mt-1">{user.department}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</p>
                <span className={cn("inline-flex items-center gap-1.5 mt-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold", STATUS_CONFIG[user.status].pill)}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_CONFIG[user.status].dot)} />
                  {STATUS_CONFIG[user.status].label}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Bio</p>
                <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{user.bio}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-md bg-card border border-border overflow-hidden shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]">
            <div className="px-5 py-4 border-b border-border bg-muted/20">
              <h3 className="text-[14px] font-bold text-foreground">Skills</h3>
            </div>
            <div className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                {user.skills.map(s => (
                  <span key={s} className="rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold text-brand">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
