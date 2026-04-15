"use client"

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
} from "recharts"

const data = [
  { month: "Oct", days: 18 },
  { month: "Nov", days: 21 },
  { month: "Dec", days: 16 },
  { month: "Jan", days: 14 },
  { month: "Feb", days: 13 },
  { month: "Mar", days: 11 },
  { month: "Apr", days: 12 },
]

export function TimeToStaffChart() {
  return (
    <div className="rounded-md bg-card p-6 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] dark:border dark:border-border">
      <h3 className="text-[16px] font-semibold text-foreground mb-1">Avg Time to Staff</h3>
      <p className="text-[12px] text-muted-foreground mb-5">Days from creation to successful close</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="ttsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2d60ff" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#2d60ff" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="" stroke="#f3f3f5" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 12 }} />
            <YAxis domain={[0, 30]} axisLine={false} tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 11 }}
              tickFormatter={v => `${v}d`} />
            <Tooltip
              formatter={(v) => [`${v} days`, "Avg Time to Staff"]}
              contentStyle={{ borderRadius:"12px", border:"none", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", fontSize:12 }}
            />
            <Area type="monotone" dataKey="days" stroke="#2d60ff" strokeWidth={2.5}
              fill="url(#ttsGrad)" dot={{ fill: "#2d60ff", r: 4, stroke: "white", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#2d60ff", stroke: "white", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
