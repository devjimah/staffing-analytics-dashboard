"use client"

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip,
} from "recharts"

const data = [
  { subject: "Urgent",  A: 8,  fullMark: 20 },
  { subject: "High",    A: 14, fullMark: 20 },
  { subject: "Medium",  A: 18, fullMark: 20 },
  { subject: "Low",     A: 10, fullMark: 20 },
  { subject: "On Track",A: 16, fullMark: 20 },
  { subject: "Breached",A: 4,  fullMark: 20 },
]

export function WorkloadRadarChart() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)] dark:border dark:border-border">
      <h3 className="text-[16px] font-semibold text-foreground mb-1">Workload Spread</h3>
      <p className="text-[12px] text-muted-foreground mb-4">
        Priority &amp; compliance distribution across active tickets
      </p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#718ebf", fontSize: 11, fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                fontSize: 12,
              }}
            />
            <Radar
              name="Tickets"
              dataKey="A"
              stroke="#2d60ff"
              fill="#2d60ff"
              fillOpacity={0.18}
              strokeWidth={2}
              dot={{ fill: "#2d60ff", r: 3, strokeWidth: 0 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
