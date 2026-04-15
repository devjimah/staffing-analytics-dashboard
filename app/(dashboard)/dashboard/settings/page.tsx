"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

// ── Shared UI helpers ────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand/30 transition"

const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

function Field({
  id, label, defaultValue, type = "text", placeholder,
}: {
  id: string; label: string; defaultValue?: string; type?: string; placeholder?: string
}) {
  return (
    <div>
      <label className={labelCls} htmlFor={id}>{label}</label>
      <input id={id} type={type} defaultValue={defaultValue} placeholder={placeholder} className={inputCls} />
    </div>
  )
}

function SectionCard({ title, description, children }: {
  title: string; description: string; children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl bg-card border border-border shadow-[0_4px_18px_-2px_rgba(231,228,232,0.9)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.85)] overflow-hidden">
      <div className="px-6 py-5 border-b border-border bg-muted/20">
        <h2 className="text-[15px] font-bold text-foreground">{title}</h2>
        <p className="text-[12px] text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="px-6 py-5 space-y-5">{children}</div>
    </section>
  )
}

function ToggleRow({ label, desc, defaultChecked = false }: {
  label: string; desc: string; defaultChecked?: boolean
}) {
  const [on, setOn] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between gap-6">
      <div>
        <p className="text-[13px] font-semibold text-foreground">{label}</p>
        <p className="text-[12px] text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <Switch checked={on} onCheckedChange={setOn} aria-label={label} />
    </div>
  )
}

const TABS = [
  { id: "notifications", label: "Notifications" },
  { id: "appearance",   label: "Appearance" },
  { id: "security",     label: "Security" },
  { id: "system",       label: "System" },
]

function SettingsContent() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(() => {
    const t = searchParams.get("tab")
    return TABS.find(x => x.id === t) ? t! : "notifications"
  })

  useEffect(() => {
    const t = searchParams.get("tab")
    if (t && TABS.find(x => x.id === t)) setTab(t)
  }, [searchParams])

  return (
    <div className="flex gap-8 max-w-5xl">

      {/* ── Sidebar nav ───────────────────────────────────────────── */}
      <aside className="w-48 shrink-0">
        <nav className="space-y-1 sticky top-0">
          {/* Profile links back to the dedicated profile page */}
          <Link
            href="/dashboard/profile"
            className="flex w-full items-center rounded-xl px-4 py-2.5 text-left text-[13px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            My Profile ↗
          </Link>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "w-full rounded-xl px-4 py-2.5 text-left text-[13px] font-semibold transition-colors",
                tab === t.id
                  ? "bg-brand text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Content area ─────────────────────────────────────────── */}
      <div className="flex-1 space-y-6 min-w-0">

        {/* ── NOTIFICATIONS ────────────────────────────────── */}
        {tab === "notifications" && (
          <SectionCard title="Notification Preferences" description="Choose which alerts and digests are sent to you.">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Staffing Alerts</p>
            <ToggleRow label="SLA breach alerts"     desc="Notify when a ticket exceeds the 2-day movement target" defaultChecked={true} />
            <ToggleRow label="New ticket assigned"   desc="Alert when a ticket is assigned to you" defaultChecked={true} />
            <ToggleRow label="Candidate submitted"   desc="Update when a candidate has been sent to the client" defaultChecked={false} />
            <Separator />
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">HR & Attendance</p>
            <ToggleRow label="Late check-in alerts"     desc="Get notified when staff are 15+ min late" defaultChecked={true} />
            <ToggleRow label="Unplanned absence alerts" desc="Immediate alert for no-shows"             defaultChecked={true} />
            <ToggleRow label="Overtime threshold"       desc="Alert when overtime exceeds 20 hrs/month" defaultChecked={false} />
            <Separator />
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Digests</p>
            <ToggleRow label="Performance review reminders" desc="Weekly digest of pending reviews"     defaultChecked={false} />
            <ToggleRow label="Weekly staffing summary"      desc="Overview of open, closed and new tickets" defaultChecked={true} />
            <div className="flex justify-end pt-2">
              <button className="rounded-xl bg-brand px-6 py-2.5 text-[13px] font-bold text-white hover:bg-brand/90 transition-colors">
                Save preferences
              </button>
            </div>
          </SectionCard>
        )}

        {/* ── APPEARANCE ───────────────────────────────────── */}
        {tab === "appearance" && (
          <>
            <SectionCard title="Theme" description="Customise how the dashboard looks and feels.">
              <ToggleRow label="Dark mode"      desc="Toggle between light and dark interface" defaultChecked={false} />
              <ToggleRow label="Compact sidebar" desc="Always use the icon-only collapsed sidebar" defaultChecked={false} />
              <Separator />
              <div>
                <p className={labelCls}>Accent colour</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { name: "Brand Blue", hex: "#2d60ff" },
                    { name: "Violet",     hex: "#845ef7" },
                    { name: "Teal",       hex: "#16dbcc" },
                    { name: "Amber",      hex: "#ffbb38" },
                    { name: "Rose",       hex: "#ff4b4a" },
                  ].map(c => (
                    <button
                      key={c.name}
                      title={c.name}
                      className="h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-card ring-transparent hover:ring-foreground/30 transition-all first:ring-brand"
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button className="rounded-xl bg-brand px-6 py-2.5 text-[13px] font-bold text-white hover:bg-brand/90 transition-colors">
                  Save
                </button>
              </div>
            </SectionCard>

            <SectionCard title="Display" description="Adjust data density and language settings.">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} htmlFor="density">Data density</label>
                  <select id="density" className={inputCls}>
                    <option>Comfortable</option>
                    <option>Compact</option>
                    <option>Spacious</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="locale">Language</label>
                  <select id="locale" className={inputCls}>
                    <option>English (UK)</option>
                    <option>English (US)</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </SectionCard>
          </>
        )}

        {/* ── SECURITY ─────────────────────────────────────── */}
        {tab === "security" && (
          <>
            <SectionCard title="Password" description="Change your login password.">
              <Field id="current-pw"  label="Current password"  type="password" placeholder="••••••••" />
              <Field id="new-pw"      label="New password"      type="password" placeholder="••••••••" />
              <Field id="confirm-pw"  label="Confirm new password" type="password" placeholder="••••••••" />
              <div className="flex justify-end">
                <button className="rounded-xl bg-brand px-6 py-2.5 text-[13px] font-bold text-white hover:bg-brand/90 transition-colors">
                  Update password
                </button>
              </div>
            </SectionCard>

            <SectionCard title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success text-xl">🔐</div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">Authenticator app</p>
                    <p className="text-[12px] text-muted-foreground">Not configured</p>
                  </div>
                </div>
                <button className="rounded-xl border border-border bg-card px-4 py-2 text-[12px] font-semibold hover:bg-muted transition-colors">
                  Set up
                </button>
              </div>
              <Separator />
              <ToggleRow label="Login notifications" desc="Email me when a new device logs into my account" defaultChecked={true} />
            </SectionCard>

            <SectionCard title="Active Sessions" description="Devices currently logged in to your account.">
              {[
                { device: "MacBook Pro 14″", location: "London, UK",   time: "Current session",   current: true },
                { device: "iPhone 15 Pro",   location: "London, UK",   time: "2 hours ago",       current: false },
                { device: "Windows PC",      location: "Manchester, UK", time: "Yesterday, 14:32", current: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-base">
                      {s.device.includes("iPhone") ? "📱" : "💻"}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground flex items-center gap-2">
                        {s.device}
                        {s.current && (
                          <span className="rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-bold text-success">
                            CURRENT
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{s.location} · {s.time}</p>
                    </div>
                  </div>
                  {!s.current && (
                    <button className="text-[11px] font-semibold text-destructive hover:underline">
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </SectionCard>
          </>
        )}

        {/* ── SYSTEM ───────────────────────────────────────── */}
        {tab === "system" && (
          <>
            <SectionCard title="Application" description="Core system configuration.">
              <div className="grid grid-cols-2 gap-4">
                <Field id="app-name"    label="App name"    defaultValue={siteConfig.name} />
                <Field id="tagline"     label="Tagline"     defaultValue={siteConfig.tagline} />
                <div className="col-span-2">
                  <Field id="description" label="Description" defaultValue={siteConfig.description} />
                </div>
              </div>
              <Separator />
              <ToggleRow label="Maintenance mode"  desc="Take the dashboard offline for updates" defaultChecked={false} />
              <ToggleRow label="Debug logging"     desc="Enable verbose logging for troubleshooting" defaultChecked={false} />
              <div className="flex justify-end">
                <button className="rounded-xl bg-brand px-6 py-2.5 text-[13px] font-bold text-white hover:bg-brand/90 transition-colors">
                  Save
                </button>
              </div>
            </SectionCard>

            <SectionCard title="Data & Privacy" description="Manage data retention and export.">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-foreground">Export all data</p>
                  <p className="text-[12px] text-muted-foreground">Download a CSV export of all tickets and staff records</p>
                </div>
                <button className="rounded-xl border border-border bg-card px-4 py-2 text-[12px] font-semibold hover:bg-muted transition-colors">
                  Export
                </button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-destructive">Delete all data</p>
                  <p className="text-[12px] text-muted-foreground">Permanently remove all ticket and staff data</p>
                </div>
                <button className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-[12px] font-semibold text-destructive hover:bg-destructive/20 transition-colors">
                  Delete
                </button>
              </div>
            </SectionCard>
          </>
        )}
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="text-muted-foreground text-sm p-8">Loading settings…</div>}>
      <SettingsContent />
    </Suspense>
  )
}
