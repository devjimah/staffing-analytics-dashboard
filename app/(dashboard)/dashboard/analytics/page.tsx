import { SLAComplianceChart } from "@/components/analytics/SLAComplianceChart"
import { RequestVolumeChart } from "@/components/analytics/RequestVolumeChart"
import { StageBottleneckChart } from "@/components/analytics/StageBottleneckChart"
import { FulfillmentChart } from "@/components/analytics/FulfillmentChart"
import { TimeToStaffChart } from "@/components/analytics/TimeToStaffChart"
import { PriorityTrendChart } from "@/components/analytics/PriorityTrendChart"
import { MOCK_TICKETS, getKPIs, KANBAN_COLUMNS, STATUS_META } from "@/lib/tickets"

const kpis = getKPIs(MOCK_TICKETS)

const statusBreakdown = KANBAN_COLUMNS.map(col => ({
  ...col,
  count: MOCK_TICKETS.filter(t => t.status === col.status).length,
  meta: STATUS_META[col.status],
}))

const DATE_RANGES = ["Last 7 days", "Last 30 days", "Last 90 days"]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold text-foreground">Analytics</h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            Staffing request performance and SLA insights
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-[#dfeaf2] bg-card p-1">
          {DATE_RANGES.map((range, i) => (
            <button key={range}
              className={`rounded-lg px-4 py-1.5 text-[12px] font-semibold transition-colors ${
                i === 1
                  ? "bg-brand text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}>
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* ── Pipeline Snapshot ────────────────────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Pipeline Snapshot
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {statusBreakdown.map(col => (
            <div key={col.status}
              className={`rounded-2xl px-3 py-3 text-center ${col.meta.bg}`}>
              <p className={`text-2xl font-bold ${col.meta.color}`}>{col.count}</p>
              <p className="text-[10px] font-semibold text-muted-foreground mt-1 leading-tight">
                {col.meta.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trends & Distribution ─────────────────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Trends &amp; Distribution
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RequestVolumeChart />
          <PriorityTrendChart />
        </div>
      </div>

      {/* ── SLA & Compliance ─────────────────────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          SLA &amp; Compliance
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SLAComplianceChart />
          <StageBottleneckChart />
        </div>
      </div>

      {/* ── Efficiency ───────────────────────────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Efficiency
        </h3>
        <TimeToStaffChart />
      </div>

      {/* ── Fulfillment + Summary ────────────────────────────────── */}
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Outcomes
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <FulfillmentChart />
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-start">
            {[
              { label: "Avg Time to Staff",  value: `${kpis.avgTimeToStaff} days`, desc: "Days from creation to close",            c: "text-brand" },
              { label: "SLA Compliance",     value: `${kpis.slaCompliance}%`,      desc: "Meeting 24hr + 2-day movement targets",  c: "text-success" },
              { label: "Fulfillment Rate",   value: `${kpis.fulfillmentRate}%`,    desc: "Tickets closed as Successful",           c: "text-success" },
              { label: "Rework Rate",        value: `${kpis.reworkRate}%`,         desc: "Tickets returned for more details",       c: "text-warning" },
              { label: "Feedback Response",  value: `${kpis.feedbackResponseTime} hrs`, desc: "Avg time in Awaiting Feedback",     c: "text-purple-600" },
              { label: "Active Requests",    value: String(kpis.activeRequests),   desc: "Open tickets across all stages",         c: "text-foreground" },
            ].map(s => (
              <div key={s.label}
                className="rounded-2xl bg-card p-5 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.45)] dark:border dark:border-border">
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
