"use client"

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ReferenceLine,
} from "recharts"

const data = [
  { month: "Oct", compliance: 72 },
  { month: "Nov", compliance: 68 },
  { month: "Dec", compliance: 75 },
  { month: "Jan", compliance: 80 },
  { month: "Feb", compliance: 85 },
  { month: "Mar", compliance: 83 },
  { month: "Apr", compliance: 87 },
]

export function SLAComplianceChart() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] dark:border dark:border-border">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-[16px] font-semibold text-foreground mb-1">SLA Compliance Trend</h3>
          <p className="text-[12px] text-muted-foreground">24hr response + 2-day movement target</p>
        </div>
        <span className="rounded-full bg-success/10 px-3 py-1 text-[12px] font-semibold text-success">
          87% this month
        </span>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="slaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16dbcc" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#16dbcc" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="" stroke="#f3f3f5" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 12 }} />
            <YAxis domain={[50, 100]} axisLine={false} tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 11 }} tickFormatter={v => `${v}%`} />
            <ReferenceLine y={90} stroke="#16dbcc" strokeDasharray="4 4"
              label={{ value: "Target 90%", position: "right", fill: "#16dbcc", fontSize: 10 }} />
            <Tooltip
              formatter={(v) => [`${v}%`, "SLA Compliance"]}
              contentStyle={{ borderRadius:"12px", border:"none", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", fontSize:12 }}
            />
            <Area type="monotone" dataKey="compliance" stroke="#16dbcc" strokeWidth={2.5}
              fill="url(#slaGrad)" dot={{ fill: "#16dbcc", r: 4, stroke: "white", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#16dbcc", stroke: "white", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
