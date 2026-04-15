"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Legend,
} from "recharts"

// Priority distribution per month — how many of each priority were opened
const data = [
  { month: "Oct", urgent: 1, high: 3, medium: 4, low: 2 },
  { month: "Nov", urgent: 2, high: 4, medium: 3, low: 3 },
  { month: "Dec", urgent: 1, high: 2, medium: 5, low: 2 },
  { month: "Jan", urgent: 3, high: 5, medium: 3, low: 1 },
  { month: "Feb", urgent: 2, high: 4, medium: 4, low: 2 },
  { month: "Mar", urgent: 1, high: 3, medium: 6, low: 3 },
  { month: "Apr", urgent: 2, high: 3, medium: 4, low: 2 },
]

export function PriorityTrendChart() {
  return (
    <div className="rounded-md bg-card p-6 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] dark:border dark:border-border">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-[16px] font-semibold text-foreground mb-1">
            Priority Distribution Over Time
          </h3>
          <p className="text-[12px] text-muted-foreground">
            Monthly breakdown of ticket priority levels
          </p>
        </div>
        <span className="rounded-full bg-brand/10 px-3 py-1 text-[12px] font-semibold text-brand">
          Last 7 months
        </span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barGap={2}
            barCategoryGap="30%"
            margin={{ top: 0, right: 5, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="" stroke="#f3f3f5" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                fontSize: 12,
              }}
              cursor={{ fill: "rgba(45,96,255,0.04)" }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, color: "#718ebf" }}
            />
            <Bar dataKey="urgent" name="Urgent" stackId="a" fill="#ff4b4a" radius={[0,0,0,0]} maxBarSize={18} />
            <Bar dataKey="high"   name="High"   stackId="a" fill="#fb923c" radius={[0,0,0,0]} maxBarSize={18} />
            <Bar dataKey="medium" name="Medium" stackId="a" fill="#ffbb38" radius={[0,0,0,0]} maxBarSize={18} />
            <Bar dataKey="low"    name="Low"    stackId="a" fill="#718ebf" radius={[4,4,0,0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
