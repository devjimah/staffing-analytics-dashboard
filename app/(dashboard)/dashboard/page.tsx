import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserGroup02Icon, Analytics01Icon, Clock01Icon, Money01Icon,
  Task01Icon, CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons"
import { StatCard } from "@/components/dashboard/StatCard"
import { RequestVolumeChart } from "@/components/analytics/RequestVolumeChart"
import { FulfillmentChart } from "@/components/analytics/FulfillmentChart"
import { WorkloadRadarChart } from "@/components/analytics/WorkloadRadarChart"
import { TimeToStaffChart } from "@/components/analytics/TimeToStaffChart"
import { MOCK_TICKETS, getKPIs, STATUS_META, PRIORITY_META } from "@/lib/tickets"

const kpis = getKPIs(MOCK_TICKETS)

const STAT_CARDS = [
  {
    label: "Active Requests",
    value: String(kpis.activeRequests),
    trend: 8.3,
    icon: <HugeiconsIcon icon={Task01Icon} size={22} strokeWidth={1.5} />,
    color: "brand" as const,
  },
  {
    label: "SLA Compliance",
    value: `${kpis.slaCompliance}%`,
    trend: 4.1,
    icon: <HugeiconsIcon icon={Clock01Icon} size={22} strokeWidth={1.5} />,
    color: "success" as const,
  },
  {
    label: "Avg Time to Staff",
    value: `${kpis.avgTimeToStaff}d`,
    trend: -12.5,
    icon: <HugeiconsIcon icon={Analytics01Icon} size={22} strokeWidth={1.5} />,
    color: "warning" as const,
  },
  {
    label: "Fulfillment Rate",
    value: `${kpis.fulfillmentRate}%`,
    trend: 3.7,
    icon: <HugeiconsIcon icon={CheckmarkCircle01Icon} size={22} strokeWidth={1.5} />,
    color: "success" as const,
  },
]

const recentTickets = MOCK_TICKETS.slice(0, 6)

export default function OverviewPage() {
  return (
    <div className="space-y-8">

      {/* ── KPI Banner ────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
            Key Performance Indicators
          </h2>
          <span className="text-[12px] text-muted-foreground">As of 15 Apr 2026</span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map(card => <StatCard key={card.label} {...card} />)}
        </div>
      </div>

      {/* ── Secondary KPIs ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {[
          { label: "Rework Rate",           value: `${kpis.reworkRate}%`,           sub: "Tickets returned for more info",  color: "text-warning" },
          { label: "Feedback Response",     value: `${kpis.feedbackResponseTime}h`, sub: "Avg time awaiting internal reply", color: "text-purple-600" },
          { label: "New This Week",         value: String(kpis.newThisWeek),         sub: "Staffing requests submitted",      color: "text-brand" },
          { label: "SLA Breaches",          value: String(kpis.slaBreachedCount),    sub: "Active tickets breaching SLA",     color: "text-destructive" },
        ].map(s => (
          <div key={s.label}
            className="rounded-2xl bg-card px-5 py-4 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] dark:border dark:border-border">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[12px] font-medium text-foreground mt-0.5">{s.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Charts ────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Trends & Distribution
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-2"><RequestVolumeChart /></div>
          <div><WorkloadRadarChart /></div>
          <div><FulfillmentChart /></div>
        </div>
      </div>

      <TimeToStaffChart />

      {/* ── Recent Tickets ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
            Recent Requests
          </h2>
          <Link href="/dashboard/tickets" className="text-[12px] text-brand hover:underline font-medium">
            View all →
          </Link>
        </div>
        <div className="rounded-2xl bg-card shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] dark:border dark:border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f3f3f5]">
                {["ID", "Role", "Client", "Assignee", "Status", "Priority"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide first:rounded-tl-2xl last:rounded-tr-2xl">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f7fa]">
              {recentTickets.map(t => {
                const s = STATUS_META[t.status]
                const p = PRIORITY_META[t.priority]
                return (
                  <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5 text-[12px] font-semibold text-muted-foreground">{t.id}</td>
                    <td className="px-5 py-3.5 font-medium text-foreground">{t.title}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{t.client}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{t.assignedTo}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.bg} ${s.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${p.bg} ${p.color}`}>
                        {p.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
