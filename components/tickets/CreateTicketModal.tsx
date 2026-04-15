"use client"

import { useState } from "react"
import { TEAM_MEMBERS } from "@/lib/tickets"
import type { TicketPriority } from "@/types"

interface CreateTicketModalProps {
  open: boolean
  onClose: () => void
}

const inputCls =
  "w-full rounded-md bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand/30 transition"

const labelCls = "block text-[12px] font-semibold text-foreground mb-1"

export function CreateTicketModal({ open, onClose }: CreateTicketModalProps) {
  const [form, setForm] = useState({
    title: "", client: "", requestedBy: "", assignedTo: TEAM_MEMBERS[0],
    priority: "medium" as TicketPriority, headcount: 1, department: "",
    dueDate: "", notes: "",
  })

  if (!open) return null

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app: POST to API
    alert(`Ticket created for "${form.title}" — ${form.client}`)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-md bg-card shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e6eff5] px-6 py-4">
          <h2 className="text-[18px] font-semibold text-foreground">New Staffing Request</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors text-lg"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Role / Title *</label>
              <input required className={inputCls} placeholder="e.g. Senior React Developer"
                value={form.title} onChange={e => set("title", e.target.value)} />
            </div>

            <div>
              <label className={labelCls}>Client *</label>
              <input required className={inputCls} placeholder="Client company"
                value={form.client} onChange={e => set("client", e.target.value)} />
            </div>

            <div>
              <label className={labelCls}>Department</label>
              <input className={inputCls} placeholder="e.g. Engineering"
                value={form.department} onChange={e => set("department", e.target.value)} />
            </div>

            <div>
              <label className={labelCls}>Requested By *</label>
              <input required className={inputCls} placeholder="PM / AM / BDM name"
                value={form.requestedBy} onChange={e => set("requestedBy", e.target.value)} />
            </div>

            <div>
              <label className={labelCls}>Assign To</label>
              <select className={inputCls} value={form.assignedTo}
                onChange={e => set("assignedTo", e.target.value)}>
                {TEAM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className={labelCls}>Priority</label>
              <select className={inputCls} value={form.priority}
                onChange={e => set("priority", e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className={labelCls}>Headcount</label>
              <input type="number" min={1} max={50} className={inputCls}
                value={form.headcount} onChange={e => set("headcount", Number(e.target.value))} />
            </div>

            <div className="col-span-2">
              <label className={labelCls}>Due Date</label>
              <input type="date" className={inputCls}
                value={form.dueDate} onChange={e => set("dueDate", e.target.value)} />
            </div>

            <div className="col-span-2">
              <label className={labelCls}>Notes</label>
              <textarea rows={3} className={inputCls} placeholder="Additional requirements, skills, certifications…"
                value={form.notes} onChange={e => set("notes", e.target.value)} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 rounded-md border border-[#dfeaf2] bg-card py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 rounded-md bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand/90 transition-colors">
              Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
