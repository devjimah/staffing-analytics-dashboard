"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Entertainment", value: 30, color: "#343c6a" },
  { name: "Bill Expense", value: 15, color: "#fc7900" },
  { name: "Investment", value: 20, color: "#e91e8c" },
  { name: "Others", value: 35, color: "#232d4b" },
]

interface LabelProps {
  cx?: number
  cy?: number
  midAngle?: number
  innerRadius?: number
  outerRadius?: number
  percent?: number
  index?: number
  name?: string
  value?: number
  [key: string]: unknown
}

function CustomLabel({ cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, value = 0, name = "" }: LabelProps) {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="select-none"
    >
      <tspan x={x} dy="-0.5em" fontSize={16} fontWeight="bold">
        {value}%
      </tspan>
      <tspan x={x} dy="1.3em" fontSize={12} fontWeight="bold">
        {name}
      </tspan>
    </text>
  )
}

export function ExpenseStatistics() {
  return (
    <section>
      <h2 className="text-[#343c6a] text-[22px] font-semibold mb-5">Expense Statistics</h2>
      <div className="bg-white rounded-[25px] h-[322px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={140}
              dataKey="value"
              labelLine={false}
              label={(props) => <CustomLabel {...props} />}
              strokeWidth={3}
              stroke="white"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
