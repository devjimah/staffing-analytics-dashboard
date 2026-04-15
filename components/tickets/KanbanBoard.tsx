"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  MOCK_TICKETS, KANBAN_COLUMNS, STATUS_META,
  TAG_META, PRIORITY_META, TEAM_MEMBERS, ALL_TAGS,
} from "@/lib/tickets"
import { TicketCard } from "@/components/tickets/TicketCard"
import { CreateTicketModal } from "@/components/tickets/CreateTicketModal"
import { TicketDetailModal } from "@/components/tickets/TicketDetailModal"
import type { StaffingTicket, TicketStatus, TicketPriority, TicketTag } from "@/types"

// ── Outcome tag picker shown after dropping to Outcome ────────────
function OutcomeTagPicker({
  onSelect,
  onCancel,
}: { onSelect: (tag: TicketTag) => void; onCancel: () => void }) {
  const outcomeTags: TicketTag[] = ["candidate-submitted", "successful", "unsuccessful", "withdrawn"]
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onCancel}>
      <div className="rounded-md bg-card border border-border shadow-xl p-5 w-72" onClick={e => e.stopPropagation()}>
        <p className="text-[13px] font-bold text-foreground mb-1">Set Outcome Tag</p>
        <p className="text-[11px] text-muted-foreground mb-4">Choose what happened with this ticket</p>
        <div className="flex flex-col gap-2">
          {outcomeTags.map(tag => {
            const m = TAG_META[tag]
            return (
              <button
                key={tag}
                onClick={() => onSelect(tag)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-[12px] font-semibold text-left transition-colors hover:opacity-80",
                  m.bg, m.color,
                )}
              >
                {m.label}
              </button>
            )
          })}
        </div>
        <button onClick={onCancel} className="mt-3 w-full rounded-md border border-border py-2 text-[12px] text-muted-foreground hover:bg-muted transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}

function ColumnHeader({
  label, count, status, isOver,
}: { label: string; count: number; status: TicketStatus; isOver: boolean }) {
  const meta = STATUS_META[status]
  return (
    <div className={cn("flex items-center justify-between mb-3 px-1 transition-opacity", isOver && "opacity-70")}>
      <div className="flex items-center gap-2">
        <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", meta.dot)} />
        <span className="text-[12px] font-semibold text-foreground leading-tight">{label}</span>
      </div>
      <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold shrink-0", meta.bg, meta.color)}>
        {count}
      </span>
    </div>
  )
}

export function KanbanBoard() {
  const [tickets, setTickets]           = useState<StaffingTicket[]>(MOCK_TICKETS)
  const [modalOpen, setModalOpen]       = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<StaffingTicket | null>(null)
  const [filterPriority, setFilterPriority] = useState<TicketPriority | "all">("all")
  const [filterAssignee, setFilterAssignee] = useState<string>("all")
  const [filterTag, setFilterTag]       = useState<TicketTag | "all">("all")
  const [search, setSearch]             = useState("")

  // Outcome tag picker state
  const [pendingOutcomeId, setPendingOutcomeId] = useState<string | null>(null)

  // DnD refs
  const draggingId  = useRef<string | null>(null)
  const [dragOverCol, setDragOverCol]   = useState<TicketStatus | null>(null)

  function handleDragStart(id: string) { draggingId.current = id }
  function handleDragEnd()             { draggingId.current = null; setDragOverCol(null) }

  function handleDragOver(e: React.DragEvent, status: TicketStatus) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverCol(status)
  }

  function handleDrop(e: React.DragEvent, targetStatus: TicketStatus) {
    e.preventDefault()
    const id = draggingId.current
    if (!id) return
    draggingId.current = null
    setDragOverCol(null)

    if (targetStatus === "outcome") {
      // Show tag picker before committing
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "outcome" } : t))
      setPendingOutcomeId(id)
    } else {
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status: targetStatus } : t))
    }
  }

  function handleOutcomeTag(tag: TicketTag) {
    if (!pendingOutcomeId) return
    setTickets(prev => prev.map(t =>
      t.id === pendingOutcomeId
        ? { ...t, tags: [...t.tags.filter(tg => !["candidate-submitted","successful","unsuccessful","withdrawn"].includes(tg)), tag] }
        : t,
    ))
    setPendingOutcomeId(null)
  }

  const filtered = tickets.filter(t => {
    if (filterPriority !== "all" && t.priority !== filterPriority) return false
    if (filterAssignee !== "all" && t.assignedTo !== filterAssignee) return false
    if (filterTag !== "all" && !t.tags.includes(filterTag)) return false
    if (search && !`${t.title} ${t.client} ${t.id}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const selectCls =
    "h-9 rounded-md border border-[#dfeaf2] bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-brand/30"

  return (
    <div className="flex flex-col h-full">
      {/* ── Toolbar ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 h-9 rounded-md bg-muted px-3 flex-1 min-w-[180px]">
          <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            placeholder="Search tickets…"
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

        <select className={selectCls} value={filterTag}
          onChange={e => setFilterTag(e.target.value as TicketTag | "all")}>
          <option value="all">All tags</option>
          {ALL_TAGS.map(tag => (
            <option key={tag} value={tag}>{TAG_META[tag].label}</option>
          ))}
        </select>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 h-9 rounded-md bg-brand px-4 text-sm font-semibold text-white hover:bg-brand/90 transition-colors shrink-0"
        >
          <span className="text-base leading-none">+</span>
          New Request
        </button>
      </div>

      {/* ── Board ───────────────────────────────────────────────── */}
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 min-h-0">
        {KANBAN_COLUMNS.map(col => {
          const colTickets = filtered.filter(t => t.status === col.status)
          const isOver = dragOverCol === col.status

          return (
            <div
              key={col.status}
              className={cn(
                "w-[280px] shrink-0 flex flex-col rounded-md p-2 transition-all duration-150",
                "border border-[#dfeaf2] dark:border-border bg-[#f9fafb] dark:bg-[#1a1f36]/40",
                isOver && "bg-brand/5 dark:bg-brand/10 border-brand/40 ring-2 ring-brand/20",
              )}
              onDragOver={e => handleDragOver(e, col.status)}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={e => handleDrop(e, col.status)}
            >
              <div className="px-1 pt-1">
                <ColumnHeader label={col.label} count={colTickets.length} status={col.status} isOver={isOver} />
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto flex-1 px-1 pt-0.5 pb-2">
                {colTickets.length === 0 ? (
                  <div className={cn(
                    "flex h-20 items-center justify-center rounded-md border-2 border-dashed transition-colors",
                    isOver ? "border-brand/40 bg-brand/5" : "border-[#dfeaf2]",
                  )}>
                    <span className="text-[12px] text-muted-foreground">{isOver ? "Drop here" : "No tickets"}</span>
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

      {pendingOutcomeId && (
        <OutcomeTagPicker
          onSelect={handleOutcomeTag}
          onCancel={() => {
            // Revert to awaiting-feedback if cancelled
            setTickets(prev => prev.map(t =>
              t.id === pendingOutcomeId ? { ...t, status: "awaiting-feedback" } : t,
            ))
            setPendingOutcomeId(null)
          }}
        />
      )}

      <CreateTicketModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  )
}
