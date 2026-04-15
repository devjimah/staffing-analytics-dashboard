"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  MOCK_TICKETS, KANBAN_COLUMNS, STATUS_META,
  PRIORITY_META, TEAM_MEMBERS,
} from "@/lib/tickets"
import { TicketCard } from "@/components/tickets/TicketCard"
import { CreateTicketModal } from "@/components/tickets/CreateTicketModal"
import { TicketDetailModal } from "@/components/tickets/TicketDetailModal"
import type { StaffingTicket, TicketStatus, TicketPriority } from "@/types"

function ColumnHeader({
  label, count, status, isOver,
}: { label: string; count: number; status: TicketStatus; isOver: boolean }) {
  const meta = STATUS_META[status]
  return (
    <div className={cn(
      "flex items-center justify-between mb-3 px-1 transition-opacity",
      isOver && "opacity-70",
    )}>
      <div className="flex items-center gap-2">
        <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", meta.dot)} />
        <span className="text-[13px] font-semibold text-foreground">{label}</span>
      </div>
      <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", meta.bg, meta.color)}>
        {count}
      </span>
    </div>
  )
}

export function KanbanBoard() {
  const [tickets, setTickets] = useState<StaffingTicket[]>(MOCK_TICKETS)
  const [modalOpen, setModalOpen]           = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<StaffingTicket | null>(null)
  const [filterPriority, setFilterPriority] = useState<TicketPriority | "all">("all")
  const [filterAssignee, setFilterAssignee] = useState<string>("all")
  const [search, setSearch]                 = useState("")

  // ── Drag-and-drop state ───────────────────────────────────────────
  const draggingId  = useRef<string | null>(null)
  const [dragOverCol, setDragOverCol] = useState<TicketStatus | null>(null)

  function handleDragStart(ticketId: string) {
    draggingId.current = ticketId
  }

  function handleDragEnd() {
    draggingId.current = null
    setDragOverCol(null)
  }

  function handleDragOver(e: React.DragEvent, status: TicketStatus) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverCol(status)
  }

  function handleDrop(e: React.DragEvent, targetStatus: TicketStatus) {
    e.preventDefault()
    const id = draggingId.current
    if (!id) return
    setTickets(prev =>
      prev.map(t => t.id === id ? { ...t, status: targetStatus } : t),
    )
    draggingId.current = null
    setDragOverCol(null)
  }

  // ── Filtering ─────────────────────────────────────────────────────
  const filtered = tickets.filter(t => {
    if (filterPriority !== "all" && t.priority !== filterPriority) return false
    if (filterAssignee !== "all" && t.assignedTo !== filterAssignee) return false
    if (search && !`${t.title} ${t.client} ${t.id}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const selectCls =
    "h-9 rounded-xl border border-[#dfeaf2] bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-brand/30"

  return (
    <div className="flex flex-col h-full">
      {/* ── Toolbar ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 h-9 rounded-xl bg-muted px-3 flex-1 min-w-[200px]">
          <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            placeholder="Search tickets, clients…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select className={selectCls} value={filterPriority}
          onChange={e => setFilterPriority(e.target.value as TicketPriority | "all")}>
          <option value="all">All priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select className={selectCls} value={filterAssignee}
          onChange={e => setFilterAssignee(e.target.value)}>
          <option value="all">All assignees</option>
          {TEAM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 h-9 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand/90 transition-colors shrink-0"
        >
          <span className="text-base leading-none">+</span>
          New Request
        </button>
      </div>

      {/* ── Board ─────────────────────────────────────────────────── */}
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 min-h-0">
        {KANBAN_COLUMNS.map(col => {
          const colTickets = filtered.filter(t => t.status === col.status)
          const isOver = dragOverCol === col.status

          return (
            <div
              key={col.status}
              className={cn(
                "w-[270px] shrink-0 flex flex-col rounded-2xl p-2 transition-all duration-150",
                "border border-[#dfeaf2] dark:border-border bg-[#f9fafb] dark:bg-[#0d0d10]",
                isOver && "bg-brand/5 dark:bg-brand/10 border-brand/40 ring-2 ring-brand/20",
              )}
              onDragOver={e => handleDragOver(e, col.status)}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={e => handleDrop(e, col.status)}
            >
              <div className="px-1">
                <ColumnHeader
                  label={col.label}
                  count={colTickets.length}
                  status={col.status}
                  isOver={isOver}
                />
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto flex-1 px-1 pt-0.5 pb-2">
                {colTickets.length === 0 ? (
                  <div className={cn(
                    "flex h-20 items-center justify-center rounded-2xl border-2 border-dashed transition-colors",
                    isOver ? "border-brand/40 bg-brand/5" : "border-[#dfeaf2]",
                  )}>
                    <span className="text-[12px] text-muted-foreground">
                      {isOver ? "Drop here" : "No tickets"}
                    </span>
                  </div>
                ) : (
                  colTickets.map(t => (
                    <div
                      key={t.id}
                      draggable
                      onDragStart={() => handleDragStart(t.id)}
                      onDragEnd={handleDragEnd}
                      className="cursor-grab active:cursor-grabbing active:opacity-50 active:scale-[0.98] transition-[opacity,transform] duration-150"
                    >
                      <TicketCard ticket={t} onClick={() => setSelectedTicket(t)} />
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      <CreateTicketModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  )
}
