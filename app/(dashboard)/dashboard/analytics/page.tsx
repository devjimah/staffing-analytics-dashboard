"use client"

import { useState } from "react"
import { SLAComplianceChart } from "@/components/analytics/SLAComplianceChart"
import { RequestVolumeChart } from "@/components/analytics/RequestVolumeChart"
import { StageBottleneckChart } from "@/components/analytics/StageBottleneckChart"
import { FulfillmentChart } from "@/components/analytics/FulfillmentChart"
import { TimeToStaffChart } from "@/components/analytics/TimeToStaffChart"
import { PriorityTrendChart } from "@/components/analytics/PriorityTrendChart"
import { FilterBar, DEFAULT_FILTERS, applyFilters } from "@/components/shared/FilterBar"
import { MOCK_TICKETS, getKPIs, KANBAN_COLUMNS, STATUS_META, TAG_META, toBase10 } from "@/lib/tickets"
import type { FilterState } from "@/components/shared/FilterBar"
import type { TicketStatus } from "@/types"
import { cn } from "@/lib/utils"

export default function AnalyticsPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const filtered = applyFilters(MOCK_TICKETS, filters)
  const kpis     = getKPIs(filtered)

  // Per-board tag breakdown for the pipeline snapshot
  function boardTagSummary(status: TicketStatus) {
    const boardTickets = filtered.filter(t => t.status === status)
    const tagCounts: Record<string, number> = {}
    boardTickets.forEach(t => t.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1
    }))
    return Object.entries(tagCounts)
      .filter(([, c]) => c > 0)
      .map(([tag, count]) => `${count} ${TAG_META[tag as keyof typeof TAG_META]?.label ?? tag}`)
      .join(" · ")
  }

  return (
    <div className="space-y-8">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div>
        <h2 className="text-[22px] font-semibold text-foreground">Analytics</h2>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Staffing request performance and SLA insights
        </p>
      </div>

      {/* ── Filter Bar ─────────────────────────────────────────── */}
      <FilterBar filters={filters} onChange={setFilters} />

      {/* ── Pipeline Snapshot (4 boards) ───────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Pipeline Snapshot
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {KANBAN_COLUMNS.map(col => {
            const meta       = STATUS_META[col.status]
            const count      = filtered.filter(t => t.status === col.status).length
            const tagSummary = boardTagSummary(col.status)
            return (
              <div
                key={col.status}
                className={cn("rounded-md px-4 py-4", meta.bg)}
              >
                <p className={cn("text-3xl font-extrabold", meta.color)}>{count}</p>
                <p className={cn("text-[12px] font-bold mt-1", meta.color)}>{meta.label}</p>
                {tagSummary && (
                  <p className="text-[10px] text-muted-foreground mt-1.5 leading-tight">{tagSummary}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Ticket summary tiles ────────────────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Ticket Summary
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Total",             value: kpis.total,            color: "text-foreground"  },
            { label: "Successful",        value: kpis.successful,       color: "text-success"     },
            { label: "Pending",           value: kpis.pending,          color: "text-warning"     },
            { label: "Rejected",          value: kpis.rejected,         color: "text-destructive" },
            { label: "In Review",         value: kpis.inReview,         color: "text-purple-600"  },
            { label: "Awaiting Feedback", value: kpis.awaitingFeedback, color: "text-yellow-600"  },
          ].map(s => (
            <div key={s.label}
              className="rounded-md bg-card px-4 py-3.5 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:border dark:border-border text-center">
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] font-semibold text-muted-foreground mt-0.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trends & Distribution ───────────────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Trends &amp; Distribution
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RequestVolumeChart />
          <PriorityTrendChart />
        </div>
      </div>

      {/* ── SLA & Compliance ────────────────────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          SLA &amp; Compliance
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SLAComplianceChart />
          <StageBottleneckChart />
        </div>
      </div>

      {/* ── Efficiency ──────────────────────────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Efficiency
        </h3>
        <TimeToStaffChart />
      </div>

      {/* ── Outcomes ────────────────────────────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Outcomes
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <FulfillmentChart />
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-start">
            {[
              { label: "Avg Time to Staff",  value: `${kpis.avgTimeToStaff} days`, desc: "Days from creation to close",             c: "text-brand"       },
              { label: "SLA Compliance",     value: kpis.slaCompliance10,           desc: "Meeting 24hr + 2-day movement targets",   c: "text-success"     },
              { label: "Fulfillment Rate",   value: kpis.fulfillmentRate10,         desc: "Tickets closed as Successful",            c: "text-success"     },
              { label: "Rework Rate",        value: kpis.reworkRate10,              desc: "Tickets returned for more details",        c: "text-warning"     },
              { label: "Feedback Response",  value: `${kpis.feedbackResponseTime} hrs`, desc: "Avg time in Awaiting Feedback",       c: "text-purple-600"  },
              { label: "Active Requests",    value: String(kpis.activeRequests),    desc: "Open tickets across all stages",          c: "text-foreground"  },
            ].map(s => (
              <div key={s.label}
                className="rounded-md bg-card p-5 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:border dark:border-border">
                <p className={`text-2xl font-bold ${s.c}`}>{s.value}</p>
                <p className="text-[13px] font-semibold text-foreground mt-1">{s.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
