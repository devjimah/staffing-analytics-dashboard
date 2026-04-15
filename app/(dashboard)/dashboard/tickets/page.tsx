import { KanbanBoard } from "@/components/tickets/KanbanBoard"

export default function TicketsPage() {
  return (
    <div className="flex flex-col h-full">
      {/* ── Page header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h2 className="text-[22px] font-semibold text-foreground">Staffing Requests</h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            Track client requests from submission to close
          </p>
        </div>
      </div>

      {/* ── Kanban board ─────────────────────────────────────────── */}
      <div className="flex-1 min-h-0">
        <KanbanBoard />
      </div>
    </div>
  )
}
