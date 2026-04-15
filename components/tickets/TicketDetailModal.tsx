"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { STATUS_META, PRIORITY_META, KANBAN_COLUMNS } from "@/lib/tickets"
import type { StaffingTicket } from "@/types"

interface Props {
  ticket: StaffingTicket | null
  onClose: () => void
}

const MOCK_THREAD = [
  { author: "Maria Santos",  initials: "MS", role: "Staffing Consultant", time: "2 days ago",  body: "Reached out to 3 candidates from our bench. Two are available and interested — forwarding CVs shortly.", type: "comment" as const },
  { author: "David Park",    initials: "DP", role: "Senior Recruiter",    time: "1 day ago",   body: "Client confirmed they need someone who can start within 2 weeks. Rate band is £450–£500/day.", type: "update" as const },
  { author: "Maria Santos",  initials: "MS", role: "Staffing Consultant", time: "4 hours ago", body: "CV sent to client for review. Awaiting feedback by EOD tomorrow.", type: "comment" as const },
]

const STATUS_ORDER = [
  "open", "in-review", "awaiting-feedback", "outcome",
] as const

type ActiveStatus = typeof STATUS_ORDER[number]

function avatarColor(initials: string) {
  const colors = [
    "from-brand to-blue-400",
    "from-emerald-400 to-teal-500",
    "from-violet-500 to-purple-400",
    "from-orange-400 to-amber-400",
  ]
  return colors[initials.charCodeAt(0) % colors.length]
}

function Field({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <span className={cn("text-[13px] font-semibold text-foreground", accent)}>{value}</span>
    </div>
  )
}

export function TicketDetailModal({ ticket, onClose }: Props) {
  const [tab, setTab]       = useState<"details" | "activity">("details")
  const [comment, setComment] = useState("")
  const [thread, setThread] = useState(MOCK_THREAD)

  if (!ticket) return null

  const status   = STATUS_META[ticket.status]
  const priority = PRIORITY_META[ticket.priority]
  const initials = ticket.assignedTo.split(" ").map(n => n[0]).join("")
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })

  const currentStep = STATUS_ORDER.indexOf(ticket.status as ActiveStatus)

  const submitComment = () => {
    if (!comment.trim()) return
    setThread(prev => [...prev, {
      author: "Jane Doe", initials: "JD", role: "HR Manager",
      time: "Just now", body: comment.trim(), type: "comment" as const,
    }])
    setComment("")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className={cn(
          "relative flex flex-col w-full max-w-2xl max-h-[90vh]",
          "rounded-md overflow-hidden",
          "bg-card border border-border",
          "shadow-[0_32px_80px_-8px_rgba(0,0,0,0.6)]",
          "animate-in fade-in zoom-in-95 duration-200",
        )}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Gradient header ──────────────────────────────────────── */}
        <div className="relative overflow-hidden px-6 pt-5 pb-4 shrink-0"
          style={{
            background: "linear-gradient(135deg, var(--card) 0%, color-mix(in srgb, var(--brand) 8%, var(--card)) 100%)",
          }}
        >
          {/* Decorative blur blob */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand/10 blur-3xl" />

          {/* Top row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-muted-foreground bg-muted rounded-md px-2.5 py-0.5 tracking-wide">
                {ticket.id}
              </span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold", priority.bg, priority.color)}>
                ● {priority.label}
              </span>
              {ticket.slaBreached && (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-destructive/15 text-destructive">
                  ⚠ SLA Breached
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all text-lg leading-none"
            >
              ×
            </button>
          </div>

          <h2 className="text-[20px] font-extrabold text-foreground leading-tight mb-0.5">
            {ticket.title}
          </h2>
          <p className="text-[13px] text-muted-foreground mb-3">{ticket.client}</p>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold",
              status.bg, status.color,
            )}>
              <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
              {status.label}
            </span>
            <span className="text-[11px] text-muted-foreground">· Due {fmt(ticket.dueDate)}</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b border-border/50">
            {(["details", "activity"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "pb-2 px-1 mr-4 text-[13px] font-semibold capitalize border-b-2 -mb-px transition-all",
                  tab === t
                    ? "border-brand text-brand"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {t === "activity" ? `Activity (${thread.length})` : "Details"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Scrollable body ───────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">

          {tab === "details" && (
            <div className="p-6 space-y-6">

              {/* Pipeline stepper */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-3">
                  Pipeline Progress
                </p>
                <div className="flex items-center">
                  {STATUS_ORDER.map((s, i) => {
                    const meta = STATUS_META[s]
                    const done   = i < currentStep
                    const active = i === currentStep
                    const future = i > currentStep
                    return (
                      <div key={s} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300",
                            done   && "bg-success text-white",
                            active && `${meta.dot} text-white ring-4 ring-brand/20 scale-110`,
                            future && "bg-muted text-muted-foreground",
                          )}>
                            {done ? "✓" : i + 1}
                          </div>
                          <span className={cn(
                            "text-[8px] font-semibold text-center leading-tight max-w-[50px]",
                            active ? "text-foreground" : "text-muted-foreground",
                          )}>
                            {meta.label.split(" ")[0]}
                          </span>
                        </div>
                        {i < STATUS_ORDER.length - 1 && (
                          <div className={cn(
                            "flex-1 h-0.5 mb-4 mx-0.5 rounded transition-colors duration-300",
                            done ? "bg-success" : "bg-border",
                          )} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* SLA alert */}
              {ticket.slaBreached && (
                <div className="flex items-start gap-3 rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3">
                  <span className="text-destructive text-base mt-0.5">⚠</span>
                  <div>
                    <p className="text-[12px] font-bold text-destructive">SLA Target Breached</p>
                    <p className="text-[11px] text-destructive/80 mt-0.5">
                      This ticket has exceeded the 2-day movement target. Escalation may be required.
                    </p>
                  </div>
                </div>
              )}

              {/* Key fields grid */}
              <div className="grid grid-cols-2 gap-4 rounded-md bg-muted/30 border border-border/60 p-4">
                <Field label="Department"   value={ticket.department} />
                <Field label="Headcount"    value={`${ticket.headcount} position${ticket.headcount > 1 ? "s" : ""}`} />
                <Field label="Requested by" value={ticket.requestedBy} />
                <Field label="Created"      value={fmt(ticket.createdAt)} />
                <Field label="Due date"     value={fmt(ticket.dueDate)} accent="text-brand" />
                <Field label="Last moved"   value={fmt(ticket.lastMovedAt)} />
              </div>

              {/* Assignee */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-2">
                  Assigned To
                </p>
                <div className="flex items-center gap-3 rounded-md border border-border/60 bg-muted/30 px-4 py-3">
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-extrabold text-white",
                    avatarColor(initials),
                  )}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground">{ticket.assignedTo}</p>
                    <p className="text-[11px] text-muted-foreground">Staffing Consultant</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-2">
                  Notes & Requirements
                </p>
                <p className={cn(
                  "text-[13px] leading-relaxed rounded-md border border-border/60 bg-muted/30 px-4 py-3",
                  ticket.notes ? "text-foreground" : "text-muted-foreground italic",
                )}>
                  {ticket.notes || "No additional notes provided."}
                </p>
              </div>
            </div>
          )}

          {tab === "activity" && (
            <div className="p-6 space-y-4">
              {thread.length === 0 && (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  No activity yet.
                </div>
              )}
              {thread.map((c, i) => (
                <div key={i} className="flex gap-3 group">
                  {/* Avatar */}
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-extrabold text-white mt-0.5",
                    avatarColor(c.initials),
                  )}>
                    {c.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-[12px] font-bold text-foreground">{c.author}</span>
                      <span className="text-[10px] text-muted-foreground">{c.role}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto">{c.time}</span>
                    </div>
                    <div className={cn(
                      "rounded-md rounded-tl-sm px-4 py-2.5 text-[13px] leading-relaxed",
                      c.type === "update"
                        ? "bg-brand/8 border border-brand/20 text-foreground"
                        : "bg-muted/50 border border-border/60 text-foreground",
                    )}>
                      {c.type === "update" && (
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-brand mb-1">
                          Status Update
                        </span>
                      )}
                      {c.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Comment bar ──────────────────────────────────────────── */}
        <div className="shrink-0 border-t border-border bg-muted/20 px-6 py-4">
          <div className="flex items-end gap-3">
            <div className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-extrabold text-white",
              avatarColor("JD"),
            )}>
              JD
            </div>
            <div className="flex-1 relative">
              <textarea
                rows={1}
                placeholder="Add a comment…"
                className="w-full resize-none rounded-md border border-border bg-card px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand/30 transition"
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), submitComment())}
              />
            </div>
            <button
              onClick={submitComment}
              disabled={!comment.trim()}
              className="h-9 rounded-md bg-brand px-5 text-[12px] font-bold text-white hover:bg-brand/90 disabled:opacity-35 disabled:cursor-not-allowed transition-all shrink-0"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
