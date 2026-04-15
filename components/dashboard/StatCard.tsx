"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { PastMonthModal } from "@/components/overview/PastMonthModal"

interface PrevMonthData {
  total:            number
  successful:       number
  pending:          number
  rejected:         number
  inReview:         number
  awaitingFeedback: number
  slaCompliance10:  string
  fulfillmentRate10: string
  avgTimeToStaff:   number
}

interface StatCardProps {
  label:    string
  value:    string
  trend:    number
  icon:     React.ReactNode
  color?:   "brand" | "success" | "warning" | "destructive"
  current?: PrevMonthData
  prevMonth?: PrevMonthData
}

const colorMap = {
  brand:       { icon: "bg-brand/10 text-brand" },
  success:     { icon: "bg-success/10 text-success" },
  warning:     { icon: "bg-warning/10 text-warning" },
  destructive: { icon: "bg-destructive/10 text-destructive" },
}

const MODAL_W = 480

export function StatCard({
  label, value, trend, icon, color = "brand", current, prevMonth,
}: StatCardProps) {
  const isPositive = trend >= 0
  const colors     = colorMap[color]

  const [hovered, setHovered]   = useState(false)
  const [pos,     setPos]       = useState({ top: 0, left: 0 })
  const [mounted, setMounted]   = useState(false)
  const timer      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  function show() {
    if (timer.current) clearTimeout(timer.current)
    if (!current || !prevMonth) return
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      // keep 16px inset from either edge
      let left = rect.left
      if (left + MODAL_W > window.innerWidth - 16) {
        left = window.innerWidth - MODAL_W - 16
      }
      left = Math.max(16, left)
      setPos({ top: rect.bottom + 8, left })
    }
    setHovered(true)
  }

  function hide() {
    timer.current = setTimeout(() => setHovered(false), 180)
  }

  return (
    <div className="rounded-md bg-card px-6 py-5 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-none dark:border dark:border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>

          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
              )}
            >
              {isPositive ? "▲" : "▼"} {Math.abs(trend)}%
            </span>

            <div ref={triggerRef} onMouseEnter={show} onMouseLeave={hide}>
              <span className={cn(
                "text-[11px] text-muted-foreground transition-colors",
                current && prevMonth
                  ? "cursor-default underline underline-offset-2 decoration-dashed hover:text-brand"
                  : "",
              )}>
                vs last month
              </span>
            </div>
          </div>
        </div>

        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-md", colors.icon)}>
          {icon}
        </div>
      </div>

      {/* Portal-rendered modal — avoids overflow clipping from parent stacking contexts */}
      {mounted && hovered && current && prevMonth && createPortal(
        <div
          style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 }}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <PastMonthModal visible current={current} previous={prevMonth} />
        </div>,
        document.body,
      )}
    </div>
  )
}
