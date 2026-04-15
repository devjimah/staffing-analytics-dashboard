import { cn } from "@/lib/utils"
import { STATUS_META, PRIORITY_META, TAG_META } from "@/lib/tickets"
import type { StaffingTicket } from "@/types"

interface TicketCardProps {
  ticket: StaffingTicket
  onClick?: () => void
}

export function TicketCard({ ticket, onClick }: TicketCardProps) {
  const status   = STATUS_META[ticket.status]
  const priority = PRIORITY_META[ticket.priority]
  const initials = ticket.assignedTo.split(" ").map(n => n[0]).join("")

  const createdDate = new Date(ticket.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  })

  return (
    <div
      onClick={onClick}
      className={cn(
        "group rounded-md bg-card p-4 cursor-pointer",
        "shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]",
        "dark:border dark:border-border",
        "hover:shadow-[0_6px_24px_-4px_rgba(45,96,255,0.3)] dark:hover:shadow-[0_6px_24px_-4px_rgba(77,123,255,0.35)] transition-shadow duration-200",
      )}
    >
      {/* Top row: ticket id + priority */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-muted-foreground">{ticket.id}</span>
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", priority.bg, priority.color)}>
          {priority.label}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-[14px] font-semibold text-foreground leading-tight mb-1 line-clamp-2">
        {ticket.title}
      </h4>
      <p className="text-[12px] text-muted-foreground mb-2">{ticket.client}</p>

      {/* Tags */}
      {ticket.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {ticket.tags.map(tag => {
            const m = TAG_META[tag]
            return (
              <span key={tag} className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold", m.bg, m.color)}>
                {m.label}
              </span>
            )
          })}
        </div>
      )}

      {/* SLA breach banner */}
      {ticket.slaBreached && (
        <div className="mb-3 flex items-center gap-1.5 rounded-md bg-destructive/10 px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
          <span className="text-[10px] font-semibold text-destructive">SLA Breached</span>
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {/* Headcount */}
          <span className="text-[11px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">
            ×{ticket.headcount}
          </span>
          {/* Department */}
          <span className="text-[11px] text-muted-foreground truncate max-w-[80px]">
            {ticket.department}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-muted-foreground">{createdDate}</span>
          {/* Assignee avatar */}
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-[9px] font-bold text-brand shrink-0">
            {initials}
          </div>
        </div>
      </div>
    </div>
  )
}
