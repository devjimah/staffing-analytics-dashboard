"use client"

import { useState } from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Analytics01Icon, Clock01Icon, Task01Icon, CheckmarkCircle01Icon,
  Notebook01Icon, Cancel01Icon, HourglassIcon, MessageMultiple02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { StatCard } from "@/components/dashboard/StatCard"
import { RequestVolumeChart } from "@/components/analytics/RequestVolumeChart"
import { FulfillmentChart } from "@/components/analytics/FulfillmentChart"
import { WorkloadRadarChart } from "@/components/analytics/WorkloadRadarChart"
import { PriorityDistributionChart } from "@/components/analytics/PriorityDistributionChart"
import { TimeToStaffChart } from "@/components/analytics/TimeToStaffChart"
import { FilterBar, DEFAULT_FILTERS, applyFilters } from "@/components/shared/FilterBar"
import { MOCK_TICKETS, getKPIs, STATUS_META, PRIORITY_META, TAG_META } from "@/lib/tickets"
import type { FilterState } from "@/components/shared/FilterBar"

const fullKpis = getKPIs(MOCK_TICKETS)

// Shared prev-month data passed into every StatCard
const PREV = fullKpis.prevMonth
const CURR = {
  total:            fullKpis.total,
  successful:       fullKpis.successful,
  pending:          fullKpis.pending,
  rejected:         fullKpis.rejected,
  inReview:         fullKpis.inReview,
  awaitingFeedback: fullKpis.awaitingFeedback,
  slaCompliance10:  fullKpis.slaCompliance10,
  fulfillmentRate10: fullKpis.fulfillmentRate10,
  avgTimeToStaff:   fullKpis.avgTimeToStaff,
}

export default function OverviewPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const filtered = applyFilters(MOCK_TICKETS, filters)
  const kpis     = getKPIs(filtered)

  const SUMMARY_TILES = [
    { label: "Total Tickets",     value: kpis.total,            color: "text-foreground",     iconColor: "bg-muted text-foreground",           icon: Notebook01Icon        },
    { label: "Successful",        value: kpis.successful,       color: "text-success",        iconColor: "bg-success/10 text-success",         icon: CheckmarkCircle01Icon },
    { label: "Pending",           value: kpis.pending,          color: "text-warning",        iconColor: "bg-warning/10 text-warning",         icon: HourglassIcon         },
    { label: "Rejected",          value: kpis.rejected,         color: "text-destructive",    iconColor: "bg-destructive/10 text-destructive", icon: Cancel01Icon          },
    { label: "In Review",         value: kpis.inReview,         color: "text-purple-600",     iconColor: "bg-purple-50 text-purple-600",       icon: Search01Icon          },
    { label: "Awaiting Feedback", value: kpis.awaitingFeedback, color: "text-yellow-600",     iconColor: "bg-yellow-50 text-yellow-600",       icon: MessageMultiple02Icon  },
  ]

  const STAT_CARDS = [
    { label: "Active Requests",   value: String(kpis.activeRequests),  trend: 8,  icon: <HugeiconsIcon icon={Task01Icon} size={22} strokeWidth={1.5} />,            color: "brand"   as const },
    { label: "SLA Compliance",    value: kpis.slaCompliance10,         trend: 4,  icon: <HugeiconsIcon icon={Clock01Icon} size={22} strokeWidth={1.5} />,           color: "success" as const },
    { label: "Avg Time to Staff", value: `${kpis.avgTimeToStaff}d`,    trend: -13,icon: <HugeiconsIcon icon={Analytics01Icon} size={22} strokeWidth={1.5} />,       color: "warning" as const },
    { label: "Fulfillment Rate",  value: kpis.fulfillmentRate10,       trend: 4,  icon: <HugeiconsIcon icon={CheckmarkCircle01Icon} size={22} strokeWidth={1.5} />, color: "success" as const },
  ]

  return (
    <div className="space-y-8">

      {/* ── Page header + filter bar ───────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-[22px] font-semibold text-foreground">Overview</h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">Staffing request pipeline at a glance</p>
        </div>
        <FilterBar filters={filters} onChange={setFilters} showDateRange={false} />
      </div>

      {/* ── Ticket Metrics Row ──────────────────────────────────── */}
      <div>
        <h2 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Ticket Summary
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SUMMARY_TILES.map(s => (
            <div
              key={s.label}
              className="rounded-md bg-card px-4 py-4 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:border dark:border-border"
            >
              <div className={`inline-flex h-8 w-8 items-center justify-center rounded-md mb-2.5 ${s.iconColor}`}>
                <HugeiconsIcon icon={s.icon} size={16} strokeWidth={1.5} />
              </div>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] font-semibold text-muted-foreground mt-0.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── KPI Banner ─────────────────────────────────────────── */}
      <div>
        <h2 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Key Performance Indicators
        </h2>
        {/* Each StatCard has "vs last month" hover that shows the modal */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map(card => (
            <StatCard
              key={card.label}
              {...card}
              current={CURR}
              prevMonth={PREV}
            />
          ))}
        </div>
      </div>

      {/* ── Secondary KPIs ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {[
          { label: "Rework Rate",       value: kpis.reworkRate10,               sub: "Tickets returned for more info",   color: "text-warning"     },
          { label: "Feedback Response", value: `${kpis.feedbackResponseTime}h`, sub: "Avg time awaiting internal reply", color: "text-purple-600"  },
          { label: "New This Week",     value: String(kpis.newThisWeek),         sub: "Staffing requests submitted",      color: "text-brand"       },
          { label: "SLA Breaches",      value: String(kpis.slaBreachedCount),    sub: "Active tickets breaching SLA",     color: "text-destructive" },
        ].map(s => (
          <div key={s.label}
            className="rounded-md bg-card px-5 py-4 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:border dark:border-border">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[12px] font-medium text-foreground mt-0.5">{s.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Charts ─────────────────────────────────────────────── */}
      <div>
        <h2 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Trends &amp; Distribution
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-2"><RequestVolumeChart /></div>
          <div><WorkloadRadarChart /></div>
          <div><FulfillmentChart /></div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
          <PriorityDistributionChart />
          <TimeToStaffChart />
        </div>
      </div>

      {/* ── Recent Tickets ─────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
            Recent Requests
          </h2>
          <Link href="/dashboard/tickets" className="text-[12px] text-brand hover:underline font-medium">
            View all →
          </Link>
        </div>
        <div className="rounded-md bg-card shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:border dark:border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f3f3f5] dark:border-border">
                {["ID", "Role", "Client", "Assignee", "Board", "Tags", "Priority"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f7fa] dark:divide-border">
              {filtered.slice(0, 8).map(t => {
                const s = STATUS_META[t.status]
                const p = PRIORITY_META[t.priority]
                return (
                  <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-[11px] font-semibold text-muted-foreground">{t.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground max-w-[150px] truncate">{t.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.client}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.assignedTo}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${s.bg} ${s.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {t.tags.slice(0, 2).map(tag => {
                          const m = TAG_META[tag]
                          return (
                            <span key={tag} className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${m.bg} ${m.color}`}>
                              {m.label}
                            </span>
                          )
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.bg} ${p.color}`}>
                        {p.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[13px] text-muted-foreground">
                    No tickets match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
