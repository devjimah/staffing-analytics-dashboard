"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

const data = [
  { day: "Sat", deposit: 460, withdraw: 220 },
  { day: "Sun", deposit: 330, withdraw: 130 },
  { day: "Mon", deposit: 310, withdraw: 260 },
  { day: "Tue", deposit: 460, withdraw: 370 },
  { day: "Wed", deposit: 130, withdraw: 240 },
  { day: "Thu", deposit: 370, withdraw: 240 },
  { day: "Fri", deposit: 380, withdraw: 330 },
]

export function WeeklyActivity() {
  return (
    <section>
      <h2 className="text-[#343c6a] text-[22px] font-semibold mb-5">Weekly Activity</h2>
      <div className="bg-white rounded-[25px] p-6 h-[322px] flex flex-col">
        {/* Legend */}
        <div className="flex gap-6 justify-end mb-4">
          <div className="flex items-center gap-2">
            <span className="w-[15px] h-[15px] rounded-full bg-[#16dbcc] shrink-0" />
            <span className="text-[#718ebf] text-[15px]">Deposit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[15px] h-[15px] rounded-full bg-[#1814f3] shrink-0" />
            <span className="text-[#718ebf] text-[15px]">Withdraw</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barGap={6}
            barCategoryGap="30%"
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="" stroke="#f3f3f5" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 13 }}
            />
            <YAxis
              domain={[0, 500]}
              ticks={[0, 100, 200, 300, 400, 500]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#718ebf", fontSize: 13 }}
            />
            <Bar dataKey="deposit" fill="#16dbcc" radius={[30, 30, 30, 30]} maxBarSize={15} />
            <Bar dataKey="withdraw" fill="#1814f3" radius={[30, 30, 30, 30]} maxBarSize={15} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
