export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: number
}

export interface StatCardData {
  label: string
  value: string
  trend: number
  unit?: string
}

export interface StaffMember {
  id: string
  name: string
  role: string
  department: string
  status: "active" | "on-leave" | "remote"
  avatar?: string
}

export interface AttendanceRecord {
  date: string
  present: number
  absent: number
  late: number
}

export interface PerformanceRecord {
  employeeId: string
  score: number
  period: string
}

// ── Staffing Request Ticket types ─────────────────────────────────

export type TicketStatus =
  | "new"
  | "more-details-needed"
  | "in-review"
  | "awaiting-feedback"
  | "candidate-submitted"
  | "successful"
  | "unsuccessful"
  | "withdrawn"

export type TicketPriority = "low" | "medium" | "high" | "urgent"

export interface StaffingTicket {
  id: string
  title: string           // Role requested, e.g. "Senior React Developer"
  client: string          // Client company name
  requestedBy: string     // PM / AM / BDM name
  assignedTo: string      // Staffing team member
  status: TicketStatus
  priority: TicketPriority
  headcount: number       // Number of staff needed
  department: string      // Department needing staff
  createdAt: string       // ISO date string
  dueDate: string         // ISO date string
  lastMovedAt: string     // For 2-day SLA movement tracking
  notes: string
  slaBreached: boolean
}
