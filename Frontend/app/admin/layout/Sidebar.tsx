"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Users,
  Package,
  CreditCard,
  FileText,
  MessageSquare,
  LineChart,
  Settings,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const sidebarLinks = [
  {
    category: "Management",
    items: [
      {
        title: "Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Services",
        href: "/admin/services",
        icon: Package,
      },
      {
        title: "Content",
        href: "/admin/content-management",
        icon: FileText,
      },
      {
        title: "Support",
        href: "/admin/support",
        icon: MessageSquare,
      },
    ]
  },
  {
    category: "Financial",
    items: [
      {
        title: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
      },
      {
        title: "Reports",
        href: "/admin/reports",
        icon: LineChart,
      },
    ]
  },
  {
    category: "System",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ]
  },
]

export function Sidebar({ isMobile, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  // If mobile, use the isOpen prop to control collapse state
  useEffect(() => {
    if (isMobile) {
      setCollapsed(false) // Always expanded on mobile when shown
    }
  }, [isMobile, isOpen])

  const handleLogout = () => {
    // In a real app, this would make an API call to log out the user
    // Then redirect to login page
    console.log("Logging out...")
    router.push("/")
    if (isMobile && onClose) {
      onClose()
    }
  }

  return (
    <div 
      className={cn(
        "bg-slate-50 text-slate-800 h-screen flex flex-col border-r border-slate-200 transition-all duration-300 ease-in-out sticky top-0",
        collapsed && !isMobile ? "w-20" : "w-72",
        isMobile ? "shadow-xl" : ""
      )}
    >
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        {(!collapsed || isMobile) && (
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-1 rounded-md">
              <Home className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Visify</span>
          </Link>
        )}
        {collapsed && !isMobile && (
          <Link href="/admin/dashboard" className="mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-1 rounded-md">
              <Home className="h-5 w-5" />
            </div>
          </Link>
        )}
        
        {isMobile ? (
          // Close button for mobile
          <Button 
            variant="ghost" 
            size="icon"
            aria-label="Close Menu"
            className="text-slate-500 hover:text-slate-700 transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </Button>
        ) : (
          // Collapse toggle for desktop
          <button 
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="text-slate-500 hover:text-slate-700 transition-colors p-1 rounded-md hover:bg-slate-200"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-6 px-3">
          {/* Dashboard Button with special styling */}
          <div className="mb-6">
            <Link
              href="/admin/dashboard"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-all duration-200",
                "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100",
                pathname === "/admin/dashboard" 
                  ? "from-blue-100 to-indigo-100 text-blue-800 shadow-sm" 
                  : "text-blue-700 hover:from-blue-100 hover:to-indigo-100",
                "hover:translate-x-1 hover:shadow-sm",
                collapsed && !isMobile && "justify-center p-3",
                isMobile && "py-4" // Larger touch target on mobile
              )}
              onClick={isMobile && onClose ? onClose : undefined}
              title={collapsed && !isMobile ? "Dashboard" : undefined}
            >
              <BarChart3 className={cn("h-5 w-5", pathname === "/admin/dashboard" && "text-blue-600")} />
              {(!collapsed || isMobile) && "Dashboard"}
            </Link>
          </div>

          {sidebarLinks.map((section, index) => (
            <div key={index} className="space-y-1">
              {(!collapsed || isMobile) && (
                <div className="px-3 mb-2">
                  <h3 className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
                    {section.category}
                  </h3>
                </div>
              )}
              {section.items.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    "hover:translate-x-1 hover:shadow-sm",
                    pathname === link.href 
                      ? "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 shadow-sm" 
                      : "text-slate-700 hover:bg-slate-200/50 hover:text-slate-900",
                    collapsed && !isMobile && "justify-center px-0",
                    isMobile && "py-4 text-base" // Larger touch target on mobile
                  )}
                  onClick={isMobile && onClose ? onClose : undefined}
                  title={collapsed && !isMobile ? link.title : undefined}
                >
                  <link.icon className={cn("h-5 w-5", pathname === link.href && "text-blue-600")} />
                  {(!collapsed || isMobile) && link.title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-200">
        <button 
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700",
            "hover:bg-red-50 hover:text-red-600 transition-colors w-full hover:translate-x-1 duration-200",
            collapsed && !isMobile && "justify-center px-0",
            isMobile && "py-4 text-base" // Larger touch target on mobile
          )}
          title={collapsed && !isMobile ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5" />
          {(!collapsed || isMobile) && "Logout"}
        </button>
      </div>
    </div>
  )
}

