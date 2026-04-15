"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { StaffMember } from "@/types"

const STAFF: (StaffMember & { email: string; location: string; ticketsHandled: number; performance: number })[] = [
  { id: "1", name: "Sarah Chen",    role: "Software Engineer", department: "Engineering", status: "active",    email: "sarah.chen@staffhub.io",    location: "London, UK",      ticketsHandled: 8,  performance: 92 },
  { id: "2", name: "Marcus Webb",   role: "Product Manager",   department: "Product",     status: "remote",    email: "marcus.webb@staffhub.io",   location: "Manchester, UK",  ticketsHandled: 5,  performance: 88 },
  { id: "3", name: "Priya Nair",    role: "HR Coordinator",    department: "HR",          status: "on-leave",  email: "priya.nair@staffhub.io",    location: "Birmingham, UK",  ticketsHandled: 3,  performance: 79 },
  { id: "4", name: "Tom Okafor",    role: "Sales Executive",   department: "Sales",       status: "active",    email: "tom.okafor@staffhub.io",    location: "London, UK",      ticketsHandled: 6,  performance: 85 },
  { id: "5", name: "Elena Vasquez", role: "UX Designer",       department: "Design",      status: "active",    email: "elena.vasquez@staffhub.io", location: "London, UK",      ticketsHandled: 4,  performance: 95 },
]

const STATUS_CONFIG = {
  active:     { label: "Active",   dot: "bg-success",  pill: "bg-success/10 text-success" },
  remote:     { label: "Remote",   dot: "bg-brand",    pill: "bg-brand/10 text-brand" },
  "on-leave": { label: "On Leave", dot: "bg-warning",  pill: "bg-warning/10 text-warning" },
}

function avatarGradient(name: string) {
  const gradients = [
    "linear-gradient(135deg, #2d60ff 0%, #845ef7 100%)",
    "linear-gradient(135deg, #16dbcc 0%, #2d60ff 100%)",
    "linear-gradient(135deg, #ffbb38 0%, #ff4b4a 100%)",
    "linear-gradient(135deg, #845ef7 0%, #ff4b4a 100%)",
    "linear-gradient(135deg, #16dbcc 0%, #845ef7 100%)",
  ]
  return gradients[name.charCodeAt(0) % gradients.length]
}

export default function UsersPage() {
  const [search, setSearch]   = useState("")
  const [filter, setFilter]   = useState<"all" | StaffMember["status"]>("all")
  const [view, setView]       = useState<"grid" | "list">("grid")

  const filtered = STAFF.filter(m => {
    if (filter !== "all" && m.status !== filter) return false
    const q = search.toLowerCase()
    return `${m.name} ${m.role} ${m.department}`.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-6">

      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-foreground">Team Members</h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            {filtered.length} of {STAFF.length} members
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-[13px] font-bold text-white hover:bg-brand/90 transition-colors">
          <span className="text-base leading-none">+</span>
          Add member
        </button>
      </div>

      {/* ── Toolbar ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 h-10 rounded-xl bg-muted px-4 flex-1 min-w-[200px]">
          <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            placeholder="Search by name, role or department…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Status filter */}
        {(["all", "active", "remote", "on-leave"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-xl px-3 py-2 text-[12px] font-semibold capitalize transition-colors",
              filter === f ? "bg-brand text-white" : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {f === "all" ? "All" : STATUS_CONFIG[f].label}
          </button>
        ))}

        {/* View toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1 ml-auto">
          {(["grid", "list"] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors",
                view === v ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {v === "grid" ? "⊞ Grid" : "≡ List"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid view ─────────────────────────────────────────────── */}
      {view === "grid" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map(member => {
            const initials = member.name.split(" ").map(n => n[0]).join("")
            const status   = STATUS_CONFIG[member.status]
            return (
              <Link
                key={member.id}
                href={`/dashboard/users/${member.id}`}
                className={cn(
                  "group rounded-2xl bg-card border border-border p-4 flex flex-col gap-3",
                  "shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)]",
                  "hover:shadow-[0_6px_24px_-4px_rgba(45,96,255,0.25)] dark:hover:shadow-[0_6px_24px_-4px_rgba(77,123,255,0.3)]",
                  "hover:border-brand/30 transition-all duration-200",
                )}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-[12px] font-extrabold text-white shadow"
                    style={{ background: avatarGradient(member.name) }}
                  >
                    {initials}
                  </div>
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold", status.pill)}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                    {status.label}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <p className="text-[13px] font-bold text-foreground group-hover:text-brand transition-colors leading-tight">{member.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{member.role}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-0.5 truncate">{member.department}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 pt-1 border-t border-border/50">
                  <div className="flex-1 min-w-0">
                    <div className="h-1 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${member.performance}%` }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{member.performance}/100</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[16px] font-extrabold text-foreground leading-none">{member.ticketsHandled}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">tickets</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* ── List view ─────────────────────────────────────────────── */}
      {view === "list" && (
        <div className="rounded-2xl bg-card border border-border shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Member", "Role", "Department", "Status", "Performance", ""].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(member => {
                const initials = member.name.split(" ").map(n => n[0]).join("")
                const status   = STATUS_CONFIG[member.status]
                return (
                  <tr key={member.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                          style={{ background: avatarGradient(member.name) }}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-foreground">{member.name}</p>
                          <p className="text-[11px] text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-muted-foreground">{member.role}</td>
                    <td className="px-5 py-3.5 text-[13px] text-muted-foreground">{member.department}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold", status.pill)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 w-32">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-brand" style={{ width: `${member.performance}%` }} />
                        </div>
                        <span className="text-[11px] font-semibold text-muted-foreground shrink-0">{member.performance}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/dashboard/users/${member.id}`}
                        className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-semibold text-foreground hover:bg-muted hover:text-brand transition-colors"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-[15px] font-semibold text-foreground">No members found</p>
          <p className="text-[13px] text-muted-foreground mt-1">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  )
}
