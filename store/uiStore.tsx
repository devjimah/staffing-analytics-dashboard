"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

interface SidebarContextValue {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

export const SidebarContext = createContext<SidebarContextValue>({
  isOpen: true,
  toggle: () => {},
  close: () => {},
})

export function useSidebar() {
  return useContext(SidebarContext)
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isOpen, setIsOpen] = useState(true)

  // Auto-collapse on mobile
  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  )
}
