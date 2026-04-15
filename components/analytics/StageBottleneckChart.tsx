"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell,
} from "recharts"

// Average hours tickets spend in each active stage
const data = [
  { stage: "New",                avgHrs: 18 },
  { stage: "More Details",       avgHrs: 52 },
  { stage: "In Review",          avgHrs: 34 },
  { stage: "Awaiting Feedback",  avgHrs: 68 },
  { stage: "Candidate Sent",     avgHrs: 24 },
]

const COLORS = ["#2d60ff", "#ffbb38", "#a855f7", "#ff4b4a", "#16dbcc"]

export function StageBottleneckChart() {
  return (
    <div className="rounded-md bg-card p-6 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] dark:border dark:border-border">
      <h3 className="text-[16px] font-semibold text-foreground mb-1">Stage Bottleneck</h3>
      <p className="text-[12px] text-muted-foreground mb-5">Average hours tickets spend in each stage</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical"
            margin={{ top: 0, right: 10, left: 5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="" stroke="#f3f3f5" horizontal={false} />
            <XAxis type="number" axisLine={false} tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 11 }} tickFormatter={v => `${v}h`} />
            <YAxis type="category" dataKey="stage" axisLine={false} tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 11 }} width={105} />
            <Tooltip
              formatter={(v) => [`${v} hours`, "Avg time in stage"]}
              contentStyle={{ borderRadius:"12px", border:"none", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", fontSize:12 }}
            />
            <Bar dataKey="avgHrs" radius={[0,6,6,0]} maxBarSize={16}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
