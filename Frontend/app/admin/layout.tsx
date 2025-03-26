"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Sidebar } from "./layout/Sidebar"
import { Header } from "./layout/Header"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on initial load and on resize
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.getElementById('sidebar')
        if (sidebar && !sidebar.contains(e.target as Node)) {
          setSidebarOpen(false)
        }
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobile, sidebarOpen])

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-20 lg:hidden transition-opacity duration-200 ease-in-out"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar for desktop and mobile */}
      <div 
        id="sidebar"
        className={cn(
          "z-30 transition-all duration-300 ease-in-out",
          isMobile ? "fixed h-screen" : "sticky top-0",
          isMobile && !sidebarOpen && "-translate-x-full",
        )}
      >
        <Sidebar 
          isMobile={isMobile} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      </div>
      
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header 
          isMobile={isMobile}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        {/* Mobile menu button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed bottom-6 right-6 z-20 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </Button>
        )}
        
        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-slate-50">{children}</main>
      </div>
    </div>
  )
}

