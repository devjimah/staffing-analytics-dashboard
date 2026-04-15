"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Cell, LabelList,
} from "recharts"
import { MOCK_TICKETS } from "@/lib/tickets"

const PRIORITIES = ["urgent", "high", "medium", "low"] as const

const COLORS: Record<string, string> = {
  urgent: "#ff4b4a",
  high:   "#f97316",
  medium: "#ffbb38",
  low:    "#16dbcc",
}

const data = PRIORITIES.map(p => ({
  priority: p.charAt(0).toUpperCase() + p.slice(1),
  count: MOCK_TICKETS.filter(t => t.priority === p).length,
  color: COLORS[p],
}))

const total = data.reduce((s, d) => s + d.count, 0)

export function PriorityDistributionChart() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:border dark:border-border dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-[16px] font-semibold text-foreground mb-1">Priority Distribution</h3>
          <p className="text-[12px] text-muted-foreground">Tickets by urgency level</p>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-[12px] font-semibold text-muted-foreground">
          {total} total
        </span>
      </div>

      {/* Chart */}
      <div className="h-44 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="" stroke="#f3f3f5" vertical={false} />
            <XAxis
              dataKey="priority"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 11 }}
              allowDecimals={false}
            />
            <Tooltip
              formatter={(v) => [`${v} tickets`, "Count"]}
              contentStyle={{
                borderRadius: "12px", border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12,
              }}
              cursor={{ fill: "rgba(45,96,255,0.05)" }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
              <LabelList
                dataKey="count"
                position="top"
                style={{ fill: "#718ebf", fontSize: 11, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend row */}
      <div className="flex justify-between gap-2">
        {data.map(d => {
          const pct = total > 0 ? Math.round((d.count / total) * 100) : 0
          return (
            <div key={d.priority} className="flex flex-col items-center gap-1 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-[11px] text-muted-foreground">{d.priority}</span>
              </div>
              <span className="text-[13px] font-bold" style={{ color: d.color }}>
                {pct}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
