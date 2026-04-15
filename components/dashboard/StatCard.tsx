import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  trend: number
  icon: React.ReactNode
  color?: "brand" | "success" | "warning" | "destructive"
}

const colorMap = {
  brand:       { icon: "bg-brand/10 text-brand",       pill: "bg-brand/10 text-brand" },
  success:     { icon: "bg-success/10 text-success",   pill: "bg-success/10 text-success" },
  warning:     { icon: "bg-warning/10 text-warning",   pill: "bg-warning/10 text-warning" },
  destructive: { icon: "bg-destructive/10 text-destructive", pill: "bg-destructive/10 text-destructive" },
}

export function StatCard({
  label,
  value,
  trend,
  icon,
  color = "brand",
}: StatCardProps) {
  const isPositive = trend >= 0
  const colors = colorMap[color]

  return (
    <div className="rounded-2xl bg-card px-6 py-5 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] dark:shadow-none dark:border dark:border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[13px] font-medium text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                isPositive
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive",
              )}
            >
              {isPositive ? "▲" : "▼"} {Math.abs(trend)}%
            </span>
            <span className="text-[11px] text-muted-foreground">vs last month</span>
          </div>
        </div>

        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
            colors.icon,
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
