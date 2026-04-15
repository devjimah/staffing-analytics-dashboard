"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const homeIcon = "https://www.figma.com/api/mcp/asset/584430a1-aa4f-41c6-b0db-5a26864e5224"
const transferIcon = "https://www.figma.com/api/mcp/asset/a274d459-e6c5-4abc-b648-89d19e825e53"
const userIcon = "https://www.figma.com/api/mcp/asset/420b436a-4458-42d4-8acc-26a74345425d"
const investIcon = "https://www.figma.com/api/mcp/asset/a13255dd-0f99-4277-832b-a7e88f0749ff"
const cardIcon = "https://www.figma.com/api/mcp/asset/ccaa63d5-f566-453e-aac1-ce6899272ed9"
const loanIcon = "https://www.figma.com/api/mcp/asset/500adc77-569a-4280-ac95-c4930eac4d64"
const privilegesIcon = "https://www.figma.com/api/mcp/asset/4d7b656a-85d8-494d-a23a-944f4f7e7a88"
const settingsIcon = "https://www.figma.com/api/mcp/asset/249f7c65-ee10-407f-9107-b32dc5ad0078"
const logoIcon = "https://www.figma.com/api/mcp/asset/15ea7675-fe36-4ab4-9e4b-dd557acae68e"

const navItems = [
  { label: "Dashboard", href: "/bankdash", icon: homeIcon },
  { label: "Transactions", href: "/bankdash/transactions", icon: transferIcon },
  { label: "Accounts", href: "/bankdash/accounts", icon: userIcon },
  { label: "Investments", href: "/bankdash/investments", icon: investIcon },
  { label: "Credit Cards", href: "/bankdash/credit-cards", icon: cardIcon },
  { label: "Loans", href: "/bankdash/loans", icon: loanIcon },
  { label: "Services", href: "/bankdash/services", icon: null },
  { label: "My Privileges", href: "/bankdash/privileges", icon: privilegesIcon },
  { label: "Setting", href: "/bankdash/setting", icon: settingsIcon },
]

export function BankDashSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[250px] shrink-0 bg-white h-full flex flex-col border-r border-[#e6eff5]">
      {/* Logo */}
      <div className="h-[100px] flex items-center px-9 gap-3 border-b border-[#e6eff5]">
        <img src={logoIcon} alt="BankDash logo" className="w-9 h-9 object-cover" />
        <span className="text-[#343c6a] text-2xl font-extrabold tracking-tight">
          BankDash.
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-6 px-10 py-[18px] text-[18px] font-medium transition-colors",
                isActive
                  ? "text-[#2d60ff]"
                  : "text-[#b1b1b1] hover:text-[#343c6a]"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-[6px] bg-[#2d60ff] rounded-r-[10px]" />
              )}
              {item.icon ? (
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-6 h-6 object-contain"
                  style={isActive ? { filter: "invert(26%) sepia(98%) saturate(2283%) hue-rotate(213deg) brightness(98%) contrast(101%)" } : {}}
                />
              ) : (
                /* Services — simple grid icon */
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="9" height="9" rx="2" fill={isActive ? "#2d60ff" : "#b1b1b1"} />
                  <rect x="13" y="2" width="9" height="9" rx="2" fill={isActive ? "#2d60ff" : "#b1b1b1"} />
                  <rect x="2" y="13" width="9" height="9" rx="2" fill={isActive ? "#2d60ff" : "#b1b1b1"} />
                  <rect x="13" y="13" width="9" height="9" rx="2" fill={isActive ? "#2d60ff" : "#b1b1b1"} />
                </svg>
              )}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
