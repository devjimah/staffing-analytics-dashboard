import type { Metadata } from "next"
import { BankDashSidebar } from "@/components/bankdash/BankDashSidebar"
import { BankDashHeader } from "@/components/bankdash/BankDashHeader"

export const metadata: Metadata = {
  title: "BankDash | Overview",
  description: "BankDash Banking Dashboard",
}

export default function BankDashLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <BankDashSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <BankDashHeader title="Overview" />
        <main className="flex-1 overflow-y-auto bg-[#f5f7fa] p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
