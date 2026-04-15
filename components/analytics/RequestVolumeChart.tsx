"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend,
} from "recharts"

const data = [
  { week: "Mar W1", new: 4, closed: 2 },
  { week: "Mar W2", new: 3, closed: 3 },
  { week: "Mar W3", new: 6, closed: 4 },
  { week: "Mar W4", new: 5, closed: 3 },
  { week: "Apr W1", new: 3, closed: 2 },
  { week: "Apr W2", new: 5, closed: 2 },
]

export function RequestVolumeChart() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] dark:border dark:border-border">
      <h3 className="text-[16px] font-semibold text-foreground mb-1">Request Volume</h3>
      <p className="text-[12px] text-muted-foreground mb-5">New vs closed tickets per week</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4} barCategoryGap="35%"
            margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="" stroke="#f3f3f5" vertical={false} />
            <XAxis dataKey="week" axisLine={false} tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#718ebf", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }}
              cursor={{ fill: "rgba(45,96,255,0.04)" }}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "#718ebf" }} />
            <Bar dataKey="new"    name="New"    fill="#2d60ff" radius={[6,6,6,6]} maxBarSize={16} />
            <Bar dataKey="closed" name="Closed" fill="#16dbcc" radius={[6,6,6,6]} maxBarSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
