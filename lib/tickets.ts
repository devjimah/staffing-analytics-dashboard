import type { StaffingTicket, TicketStatus, TicketTag } from "@/types"

// ── Helper ─────────────────────────────────────────────────────────
/** Convert a percentage (0-100) to a base-10 ratio string: e.g. 83 → "8/10" */
export function toBase10(pct: number): string {
  return `${Math.round(pct / 10)}/10`
}

// ── Mock Tickets (remapped to 4 boards) ────────────────────────────
export const MOCK_TICKETS: StaffingTicket[] = [
  // ── Open — tagged "new" ────────────────────────────────────────────
  { id: "TKT-001", title: "Senior React Developer",   client: "Accenture",          requestedBy: "James Kwarteng", assignedTo: "Maria Santos", status: "open",             tags: ["new"],                  priority: "high",   headcount: 2, department: "Engineering",   createdAt: "2026-04-14", dueDate: "2026-04-28", lastMovedAt: "2026-04-14", slaBreached: false, notes: "Hybrid – 3 days on-site" },
  { id: "TKT-002", title: "Data Analyst",             client: "Google LLC",          requestedBy: "Linda Osei",     assignedTo: "David Park",   status: "open",             tags: ["new"],                  priority: "medium", headcount: 1, department: "Data",           createdAt: "2026-04-13", dueDate: "2026-04-27", lastMovedAt: "2026-04-13", slaBreached: false, notes: "Python & SQL required" },
  { id: "TKT-003", title: "Project Manager",          client: "Microsoft",           requestedBy: "Ben Asante",     assignedTo: "Maria Santos", status: "open",             tags: ["new"],                  priority: "urgent", headcount: 1, department: "PMO",            createdAt: "2026-04-15", dueDate: "2026-04-22", lastMovedAt: "2026-04-15", slaBreached: false, notes: "Must hold PMP certification" },

  // ── Open — tagged "more-details-needed" ───────────────────────────
  { id: "TKT-004", title: "UX Designer",              client: "Meta Platforms",      requestedBy: "Sarah Clarke",   assignedTo: "David Park",   status: "open",             tags: ["more-details-needed"],  priority: "low",    headcount: 1, department: "Design",         createdAt: "2026-04-11", dueDate: "2026-04-25", lastMovedAt: "2026-04-12", slaBreached: false, notes: "Waiting on job spec from client" },
  { id: "TKT-005", title: "DevOps Engineer",          client: "Amazon Web Services", requestedBy: "Tom Bricker",    assignedTo: "Jane Doe",     status: "open",             tags: ["more-details-needed"],  priority: "high",   headcount: 2, department: "Infrastructure", createdAt: "2026-04-10", dueDate: "2026-04-24", lastMovedAt: "2026-04-11", slaBreached: true,  notes: "Rate band needed from client" },

  // ── In Review ──────────────────────────────────────────────────────
  { id: "TKT-006", title: "Backend Engineer",         client: "Netflix",             requestedBy: "Ama Mensah",     assignedTo: "Maria Santos", status: "in-review",        tags: [],                       priority: "high",   headcount: 3, department: "Engineering",   createdAt: "2026-04-08", dueDate: "2026-04-22", lastMovedAt: "2026-04-10", slaBreached: true,  notes: "Go / Kafka experience required" },
  { id: "TKT-007", title: "Product Manager",          client: "Spotify",             requestedBy: "Jake Turner",    assignedTo: "David Park",   status: "in-review",        tags: [],                       priority: "medium", headcount: 1, department: "Product",        createdAt: "2026-04-09", dueDate: "2026-04-23", lastMovedAt: "2026-04-11", slaBreached: false, notes: "" },
  { id: "TKT-008", title: "QA Engineer",              client: "Apple Inc.",          requestedBy: "Nina Ross",      assignedTo: "Jane Doe",     status: "in-review",        tags: [],                       priority: "low",    headcount: 2, department: "Engineering",   createdAt: "2026-04-07", dueDate: "2026-04-21", lastMovedAt: "2026-04-09", slaBreached: false, notes: "Automation focus (Playwright)" },
  { id: "TKT-009", title: "Data Scientist",           client: "Tesla",               requestedBy: "Marc Blanc",     assignedTo: "Maria Santos", status: "in-review",        tags: [],                       priority: "urgent", headcount: 1, department: "Data",           createdAt: "2026-04-12", dueDate: "2026-04-19", lastMovedAt: "2026-04-13", slaBreached: false, notes: "ML / TensorFlow expertise" },

  // ── Awaiting Internal Feedback ─────────────────────────────────────
  { id: "TKT-010", title: "Solutions Architect",      client: "IBM",                 requestedBy: "Chloe Williams", assignedTo: "David Park",   status: "awaiting-feedback", tags: [],                       priority: "high",   headcount: 1, department: "Architecture",  createdAt: "2026-04-06", dueDate: "2026-04-20", lastMovedAt: "2026-04-08", slaBreached: true,  notes: "AWS certified required" },
  { id: "TKT-011", title: "ML Engineer",              client: "NVIDIA",              requestedBy: "Omar Hassan",    assignedTo: "Jane Doe",     status: "awaiting-feedback", tags: [],                       priority: "medium", headcount: 2, department: "AI/ML",          createdAt: "2026-04-07", dueDate: "2026-04-21", lastMovedAt: "2026-04-10", slaBreached: false, notes: "CUDA / PyTorch preferred" },
  { id: "TKT-012", title: "Business Analyst",         client: "Deloitte",            requestedBy: "Fiona Grant",    assignedTo: "Maria Santos", status: "awaiting-feedback", tags: [],                       priority: "low",    headcount: 1, department: "Consulting",     createdAt: "2026-04-05", dueDate: "2026-04-19", lastMovedAt: "2026-04-08", slaBreached: false, notes: "" },

  // ── Outcome — candidate submitted ──────────────────────────────────
  { id: "TKT-013", title: "Full Stack Developer",     client: "X Corp",              requestedBy: "Paul Mamba",     assignedTo: "David Park",   status: "outcome",          tags: ["candidate-submitted"],  priority: "high",   headcount: 2, department: "Engineering",   createdAt: "2026-04-03", dueDate: "2026-04-17", lastMovedAt: "2026-04-12", slaBreached: false, notes: "React + Node.js stack" },
  { id: "TKT-014", title: "Cloud Architect",          client: "Oracle",              requestedBy: "Grace Kim",      assignedTo: "Jane Doe",     status: "outcome",          tags: ["candidate-submitted"],  priority: "medium", headcount: 1, department: "Cloud",          createdAt: "2026-04-04", dueDate: "2026-04-18", lastMovedAt: "2026-04-13", slaBreached: false, notes: "OCI / Azure multi-cloud" },
  { id: "TKT-015", title: "Scrum Master",             client: "SAP SE",              requestedBy: "Lukas Braun",    assignedTo: "Maria Santos", status: "outcome",          tags: ["candidate-submitted"],  priority: "low",    headcount: 1, department: "PMO",            createdAt: "2026-04-05", dueDate: "2026-04-19", lastMovedAt: "2026-04-14", slaBreached: false, notes: "CSM / PSM certified" },

  // ── Outcome — successful ────────────────────────────────────────────
  { id: "TKT-016", title: "Angular Developer",        client: "Adobe Systems",       requestedBy: "Diana Fitz",     assignedTo: "David Park",   status: "outcome",          tags: ["successful"],           priority: "medium", headcount: 1, department: "Engineering",   createdAt: "2026-03-20", dueDate: "2026-04-03", lastMovedAt: "2026-04-01", slaBreached: false, notes: "" },
  { id: "TKT-017", title: "Systems Engineer",         client: "HP Inc.",             requestedBy: "Sam Boateng",    assignedTo: "Jane Doe",     status: "outcome",          tags: ["successful"],           priority: "high",   headcount: 2, department: "Systems",        createdAt: "2026-03-18", dueDate: "2026-04-01", lastMovedAt: "2026-03-30", slaBreached: false, notes: "" },
  { id: "TKT-018", title: "Product Designer",         client: "Figma Inc.",          requestedBy: "Tina Luo",       assignedTo: "Maria Santos", status: "outcome",          tags: ["successful"],           priority: "medium", headcount: 1, department: "Design",         createdAt: "2026-03-22", dueDate: "2026-04-05", lastMovedAt: "2026-04-03", slaBreached: false, notes: "" },

  // ── Outcome — unsuccessful ─────────────────────────────────────────
  { id: "TKT-019", title: "Security Engineer",        client: "Cisco Systems",       requestedBy: "Rex Johnson",    assignedTo: "David Park",   status: "outcome",          tags: ["unsuccessful"],         priority: "high",   headcount: 1, department: "Security",       createdAt: "2026-03-25", dueDate: "2026-04-08", lastMovedAt: "2026-04-07", slaBreached: true,  notes: "CISSP required — no suitable candidate found" },

  // ── Outcome — withdrawn ────────────────────────────────────────────
  { id: "TKT-020", title: "IT Support Specialist",    client: "Dell Technologies",   requestedBy: "Amy Chen",       assignedTo: "Jane Doe",     status: "outcome",          tags: ["withdrawn"],            priority: "low",    headcount: 3, department: "IT",             createdAt: "2026-03-28", dueDate: "2026-04-11", lastMovedAt: "2026-04-05", slaBreached: false, notes: "Client budget freeze" },
]

// ── KPI computation ────────────────────────────────────────────────

export const ACTIVE_STATUSES: TicketStatus[] = [
  "open", "in-review", "awaiting-feedback",
]

function computeKPIs(tickets: StaffingTicket[]) {
  const total       = tickets.length
  const pending     = tickets.filter(t => ACTIVE_STATUSES.includes(t.status)).length
  const successful  = tickets.filter(t => t.tags.includes("successful")).length
  const rejected    = tickets.filter(t => t.tags.includes("unsuccessful") || t.tags.includes("withdrawn")).length
  const inReview    = tickets.filter(t => t.status === "in-review").length
  const awaitingFb  = tickets.filter(t => t.status === "awaiting-feedback").length
  const breached    = tickets.filter(t => t.slaBreached).length
  const reworked    = tickets.filter(t => t.tags.includes("more-details-needed")).length
  const newTickets  = tickets.filter(t => t.tags.includes("new")).length

  const slaCompliancePct  = total ? Math.round(((total - breached) / total) * 100) : 0
  const fulfillmentPct    = (successful + rejected) > 0
    ? Math.round((successful / (successful + rejected)) * 100)
    : 0
  const reworkPct         = total ? Math.round((reworked / total) * 100) : 0

  return {
    total,
    pending,
    successful,
    rejected,
    inReview,
    awaitingFeedback: awaitingFb,
    activeRequests: pending,
    slaBreachedCount: breached,
    newThisWeek: newTickets,

    // Base-10 display values
    slaCompliance10:  toBase10(slaCompliancePct),
    fulfillmentRate10: toBase10(fulfillmentPct),
    reworkRate10:     toBase10(reworkPct),

    // Raw percentages (for charts that need numbers)
    slaCompliancePct,
    fulfillmentPct,
    reworkPct,

    avgTimeToStaff:       12,   // days
    feedbackResponseTime: 38,  // hours
  }
}

export function getKPIs(tickets: StaffingTicket[]) {
  const current = computeKPIs(tickets)

  // Previous month — tickets created in March 2026
  const prevMonthTickets = MOCK_TICKETS.filter(t => t.createdAt.startsWith("2026-03"))
  const prev = computeKPIs(prevMonthTickets)

  return {
    ...current,
    prevMonth: {
      total:            prev.total,
      successful:       prev.successful,
      pending:          prev.pending,
      rejected:         prev.rejected,
      inReview:         prev.inReview,
      awaitingFeedback: prev.awaitingFeedback,
      slaCompliance10:  prev.slaCompliance10,
      fulfillmentRate10: prev.fulfillmentRate10,
      avgTimeToStaff:   15,  // mock slightly worse for comparison
    },
  }
}

// ── Board metadata ─────────────────────────────────────────────────

export const STATUS_META: Record<TicketStatus, { label: string; color: string; bg: string; dot: string }> = {
  "open":             { label: "Open",                      color: "text-brand",        bg: "bg-brand/10",        dot: "bg-brand"        },
  "in-review":        { label: "In Review",                 color: "text-purple-600",   bg: "bg-purple-50",       dot: "bg-purple-500"   },
  "awaiting-feedback":{ label: "Awaiting Internal Feedback",color: "text-yellow-600",   bg: "bg-yellow-50",       dot: "bg-yellow-400"   },
  "outcome":          { label: "Outcome",                   color: "text-success",      bg: "bg-success/10",      dot: "bg-success"      },
}

export const TAG_META: Record<TicketTag, { label: string; color: string; bg: string }> = {
  "new":                  { label: "New",                 color: "text-brand",        bg: "bg-brand/10"        },
  "more-details-needed":  { label: "More Details",        color: "text-warning",      bg: "bg-warning/10"      },
  "candidate-submitted":  { label: "Candidate Sent",      color: "text-sky-600",      bg: "bg-sky-50"          },
  "successful":           { label: "Successful",          color: "text-success",      bg: "bg-success/10"      },
  "unsuccessful":         { label: "Unsuccessful",        color: "text-destructive",  bg: "bg-destructive/10"  },
  "withdrawn":            { label: "Withdrawn",           color: "text-muted-foreground", bg: "bg-muted"       },
}

export const PRIORITY_META: Record<StaffingTicket["priority"], { label: string; color: string; bg: string }> = {
  low:    { label: "Low",    color: "text-muted-foreground", bg: "bg-muted"         },
  medium: { label: "Medium", color: "text-warning",          bg: "bg-warning/10"    },
  high:   { label: "High",   color: "text-orange-600",       bg: "bg-orange-50"     },
  urgent: { label: "Urgent", color: "text-destructive",      bg: "bg-destructive/10"},
}

export const KANBAN_COLUMNS: { status: TicketStatus; label: string }[] = [
  { status: "open",             label: "Open" },
  { status: "in-review",        label: "In Review" },
  { status: "awaiting-feedback",label: "Awaiting Internal Feedback" },
  { status: "outcome",          label: "Outcome" },
]

export const TEAM_MEMBERS = ["Maria Santos", "David Park", "Jane Doe"]

export const ALL_TAGS: TicketTag[] = [
  "new", "more-details-needed", "candidate-submitted",
  "successful", "unsuccessful", "withdrawn",
]
