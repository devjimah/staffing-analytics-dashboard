"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Successful",  value: 3, color: "#16dbcc" },
  { name: "Unsuccessful",value: 1, color: "#ff4b4a" },
  { name: "Withdrawn",   value: 1, color: "#718ebf" },
  { name: "Active",      value: 15, color: "#2d60ff" },
]

interface LabelProps {
  cx?: number; cy?: number; midAngle?: number
  innerRadius?: number; outerRadius?: number; value?: number
  [k: string]: unknown
}

function CustomLabel({ cx=0, cy=0, midAngle=0, innerRadius=0, outerRadius=0, value=0 }: LabelProps) {
  const R = Math.PI / 180
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * R)
  const y = cy + r * Math.sin(-midAngle * R)
  if (value < 2) return null
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={13} fontWeight="bold">{value}</text>
  )
}

export function FulfillmentChart() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] dark:border dark:border-border">
      <h3 className="text-[16px] font-semibold text-foreground mb-1">Fulfillment Rate</h3>
      <p className="text-[12px] text-muted-foreground mb-2">Ticket outcome distribution</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={90}
              dataKey="value" label={(p) => <CustomLabel {...p} />}
              labelLine={false} stroke="white" strokeWidth={2}>
              {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius:"12px", border:"none", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", fontSize:12 }}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "#718ebf" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
