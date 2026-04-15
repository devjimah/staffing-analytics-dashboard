"use client"

import { cn } from "@/lib/utils"
import { TEAM_MEMBERS, ALL_TAGS, TAG_META } from "@/lib/tickets"
import type { TicketStatus, TicketTag, TicketPriority } from "@/types"

export type DateRange = "this-week" | "this-month" | "last-30d" | "last-90d"

export interface FilterState {
  dateRange: DateRange
  status:    TicketStatus | "all"
  tag:       TicketTag | "all"
  assignee:  string
  priority:  TicketPriority | "all"
}

export const DEFAULT_FILTERS: FilterState = {
  dateRange: "this-month",
  status:    "all",
  tag:       "all",
  assignee:  "all",
  priority:  "all",
}

interface FilterBarProps {
  filters:  FilterState
  onChange: (f: FilterState) => void
  /** Show date range pills. Default true. */
  showDateRange?: boolean
}

const DATE_PILLS: { id: DateRange; label: string }[] = [
  { id: "this-week",  label: "This Week"  },
  { id: "this-month", label: "This Month" },
  { id: "last-30d",   label: "Last 30d"   },
  { id: "last-90d",   label: "Last 90d"   },
]

const BOARDS: { value: TicketStatus | "all"; label: string }[] = [
  { value: "all",              label: "All Boards"           },
  { value: "open",             label: "Open"                 },
  { value: "in-review",        label: "In Review"            },
  { value: "awaiting-feedback",label: "Awaiting Feedback"    },
  { value: "outcome",          label: "Outcome"              },
]

const selectCls =
  "h-9 rounded-md border border-[#dfeaf2] dark:border-border bg-card px-3 text-[12px] text-foreground outline-none focus:ring-2 focus:ring-brand/30 cursor-pointer"

export function FilterBar({ filters, onChange, showDateRange = true }: FilterBarProps) {
  const set = <K extends keyof FilterState>(key: K, val: FilterState[K]) =>
    onChange({ ...filters, [key]: val })

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Date range pills */}
      {showDateRange && (
        <div className="flex items-center gap-1 rounded-md border border-[#dfeaf2] dark:border-border bg-card p-1">
          {DATE_PILLS.map(p => (
            <button
              key={p.id}
              onClick={() => set("dateRange", p.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-[11px] font-semibold transition-colors",
                filters.dateRange === p.id
                  ? "bg-brand text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Board */}
      <select
        className={selectCls}
        value={filters.status}
        onChange={e => set("status", e.target.value as FilterState["status"])}
      >
        {BOARDS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
      </select>

      {/* Tag */}
      <select
        className={selectCls}
        value={filters.tag}
        onChange={e => set("tag", e.target.value as FilterState["tag"])}
      >
        <option value="all">All Tags</option>
        {ALL_TAGS.map(tag => (
          <option key={tag} value={tag}>{TAG_META[tag].label}</option>
        ))}
      </select>

      {/* Assignee */}
      <select
        className={selectCls}
        value={filters.assignee}
        onChange={e => set("assignee", e.target.value)}
      >
        <option value="all">All Assignees</option>
        {TEAM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      {/* Priority */}
      <select
        className={selectCls}
        value={filters.priority}
        onChange={e => set("priority", e.target.value as FilterState["priority"])}
      >
        <option value="all">All Priorities</option>
        <option value="urgent">Urgent</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* Clear */}
      {(filters.status !== "all" || filters.tag !== "all" || filters.assignee !== "all" || filters.priority !== "all") && (
        <button
          onClick={() => onChange({ ...DEFAULT_FILTERS, dateRange: filters.dateRange })}
          className="text-[11px] font-semibold text-muted-foreground hover:text-destructive transition-colors"
        >
          Clear filters ×
        </button>
      )}
    </div>
  )
}

// ── Ticket filter helper ───────────────────────────────────────────
import type { StaffingTicket } from "@/types"

export function applyFilters(tickets: StaffingTicket[], filters: FilterState): StaffingTicket[] {
  const now   = new Date()
  const start = new Date()

  if (filters.dateRange === "this-week")  start.setDate(now.getDate() - 7)
  if (filters.dateRange === "this-month") start.setDate(1)
  if (filters.dateRange === "last-30d")   start.setDate(now.getDate() - 30)
  if (filters.dateRange === "last-90d")   start.setDate(now.getDate() - 90)
  start.setHours(0, 0, 0, 0)

  return tickets.filter(t => {
    const created = new Date(t.createdAt)
    if (created < start) return false
    if (filters.status !== "all"   && t.status !== filters.status)         return false
    if (filters.tag    !== "all"   && !t.tags.includes(filters.tag))       return false
    if (filters.assignee !== "all" && t.assignedTo !== filters.assignee)   return false
    if (filters.priority !== "all" && t.priority !== filters.priority)     return false
    return true
  })
}
