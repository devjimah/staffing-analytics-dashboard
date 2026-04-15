import Image from "next/image"

const userAvatar = "https://www.figma.com/api/mcp/asset/7da09d15-a844-4a7f-899b-2fc5f3b86cb0"
const searchIcon = "https://www.figma.com/api/mcp/asset/4b56b7c7-f9ef-4e78-bedf-e50cc17859ab"
const settingsIcon = "https://www.figma.com/api/mcp/asset/d6930966-e3d8-4add-8e91-f291bad0acac"
const notifIcon = "https://www.figma.com/api/mcp/asset/1ec3b5ef-7559-44e1-b7f0-73d0296409c4"

interface BankDashHeaderProps {
  title?: string
}

export function BankDashHeader({ title = "Overview" }: BankDashHeaderProps) {
  return (
    <header className="h-[100px] bg-white border-b border-[#e6eff5] flex items-center px-8 gap-6 shrink-0">
      {/* Page title */}
      <h1 className="text-[#343c6a] text-[28px] font-semibold flex-1">{title}</h1>

      {/* Search */}
      <div className="relative">
        <div className="bg-[#f5f7fa] rounded-[40px] h-[50px] w-[255px] flex items-center px-5 gap-3">
          <img src={searchIcon} alt="search" className="w-5 h-5 object-contain opacity-60" />
          <input
            type="text"
            placeholder="Search for something"
            className="bg-transparent text-[#8ba3cb] text-[15px] outline-none flex-1 placeholder:text-[#8ba3cb]"
          />
        </div>
      </div>

      {/* Settings icon */}
      <button className="w-[50px] h-[50px] rounded-full bg-[#f5f7fa] flex items-center justify-center hover:bg-[#e6eff5] transition-colors">
        <img src={settingsIcon} alt="settings" className="w-5 h-5 object-contain" />
      </button>

      {/* Notification icon */}
      <button className="w-[50px] h-[50px] rounded-full bg-[#f5f7fa] flex items-center justify-center hover:bg-[#e6eff5] transition-colors">
        <img src={notifIcon} alt="notifications" className="w-5 h-5 object-contain" />
      </button>

      {/* User avatar */}
      <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0">
        <img
          src={userAvatar}
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  )
}
