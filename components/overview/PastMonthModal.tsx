"use client"

import { cn } from "@/lib/utils"

interface PastMonthData {
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

interface CurrentData extends PastMonthData {}

interface Props {
  current:  CurrentData
  previous: PastMonthData
  visible:  boolean
}

function delta(curr: number, prev: number) {
  if (prev === 0) return null
  const d = curr - prev
  return { val: Math.abs(d), up: d >= 0 }
}

function Tile({
  label, curr, prev, color,
}: { label: string; curr: string | number; prev: string | number; color?: string }) {
  return (
    <div className="rounded-md bg-muted/50 px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className={cn("text-[18px] font-extrabold", color ?? "text-foreground")}>{prev}</p>
        <span className="text-[10px] text-muted-foreground">prev month</span>
      </div>
      <div className="flex items-center gap-1 mt-0.5">
        <span className="text-[10px] text-muted-foreground">Now:</span>
        <span className="text-[11px] font-semibold text-foreground">{curr}</span>
      </div>
    </div>
  )
}

export function PastMonthModal({ current, previous, visible }: Props) {
  if (!visible) return null

  return (
    <div className={cn(
      "w-[480px]",
      "rounded-md bg-card border border-border",
      "shadow-[0_16px_48px_-8px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6)]",
      "p-5 animate-in fade-in slide-in-from-top-2 duration-150",
    )}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[14px] font-bold text-foreground">Previous Month</p>
          <p className="text-[11px] text-muted-foreground">March 2026 metrics</p>
        </div>
        <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold text-muted-foreground">
          vs Current Month
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <Tile label="Total"      curr={current.total}       prev={previous.total}       color="text-brand" />
        <Tile label="Successful" curr={current.successful}  prev={previous.successful}  color="text-success" />
        <Tile label="Pending"    curr={current.pending}     prev={previous.pending}     color="text-warning" />
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <Tile label="Rejected"         curr={current.rejected}          prev={previous.rejected}          color="text-destructive" />
        <Tile label="In Review"        curr={current.inReview}          prev={previous.inReview}          color="text-purple-500" />
        <Tile label="Awaiting Feedback" curr={current.awaitingFeedback} prev={previous.awaitingFeedback}  color="text-yellow-600" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Tile label="SLA Compliance"  curr={current.slaCompliance10}   prev={previous.slaCompliance10}   color="text-success" />
        <Tile label="Fulfillment"     curr={current.fulfillmentRate10}  prev={previous.fulfillmentRate10} color="text-success" />
        <Tile label="Avg Time (days)" curr={`${current.avgTimeToStaff}d`} prev={`${previous.avgTimeToStaff}d`} color="text-brand" />
      </div>

      <p className="text-[10px] text-muted-foreground mt-3 text-center">Move cursor away to dismiss</p>
    </div>
  )
}
