"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

const data = [
  { month: "Jul", balance: 320 },
  { month: "Aug", balance: 490 },
  { month: "Sep", balance: 700 },
  { month: "Oct", balance: 450 },
  { month: "Nov", balance: 580 },
  { month: "Dec", balance: 330 },
  { month: "Jan", balance: 620 },
]

export function BalanceHistory() {
  return (
    <section>
      <h2 className="text-[#343c6a] text-[22px] font-semibold mb-5">Balance History</h2>
      <div className="bg-white rounded-[25px] h-[276px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2d60ff" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2d60ff" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="" stroke="#f3f3f5" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 14 }}
            />
            <YAxis
              domain={[0, 800]}
              ticks={[0, 200, 400, 600, 800]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#1814f3"
              strokeWidth={3}
              fill="url(#balanceGradient)"
              dot={false}
              activeDot={{ r: 5, fill: "#1814f3", stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
