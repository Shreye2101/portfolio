"use client"

import type React from "react"
import { createContext, useContext, useState, useRef, type ReactNode, useEffect } from "react"

interface ScrollContextType {
  scrollContainer: React.RefObject<HTMLDivElement>
  scrollY: number
  setScrollY: (value: number) => void
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const scrollContainer = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure we're mounted on the client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted && typeof window === "undefined") {
    // Return a simpler version during SSR
    return <>{children}</>
  }

  return <ScrollContext.Provider value={{ scrollContainer, scrollY, setScrollY }}>{children}</ScrollContext.Provider>
}

export function useScroll() {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider")
  }
  return context
}
