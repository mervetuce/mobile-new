"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  forcedTheme?: Theme
  enableSystem?: boolean
  attribute?: string
}

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  forcedTheme,
  enableSystem = true,
  attribute = "data-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove old theme attribute
    const oldTheme = root.getAttribute(attribute)
    if (oldTheme) root.removeAttribute(attribute)

    // Add new theme attribute
    const newTheme = forcedTheme || theme
    root.setAttribute(attribute, newTheme)

    // If using class attribute
    if (attribute === "class") {
      root.classList.remove("light", "dark")
      root.classList.add(newTheme)
    }
  }, [theme, forcedTheme, attribute])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (forcedTheme) return
      setTheme(newTheme)
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

