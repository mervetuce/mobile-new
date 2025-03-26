"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, UserPlus, FileEdit, MessageSquare, PenTool, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function QuickActions() {
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1700)
    
    return () => clearTimeout(timer)
  }, [])
  
  const actions = [
    {
      title: "Add New Service",
      description: "Create a new visa service or package",
      icon: PlusCircle,
      href: "/admin/services/new",
      color: "blue",
    },
    {
      title: "Add New User",
      description: "Register a new user account",
      icon: UserPlus,
      href: "/admin/users/new",
      color: "indigo",
    },
    {
      title: "Edit Content",
      description: "Update website content and SEO",
      icon: FileEdit,
      href: "/admin/content-management",
      color: "violet",
    },
    {
      title: "Support Tickets",
      description: "View and respond to support tickets",
      icon: MessageSquare,
      href: "/admin/support",
      color: "green",
    },
  ]

  const getGradient = (color: string) => {
    switch (color) {
      case "blue": return "from-blue-50 to-blue-100/80";
      case "indigo": return "from-indigo-50 to-indigo-100/80";
      case "violet": return "from-violet-50 to-violet-100/80";
      case "green": return "from-green-50 to-green-100/80";
      default: return "from-gray-50 to-gray-100/80";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-600";
      case "indigo": return "text-indigo-600";
      case "violet": return "text-violet-600";
      case "green": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <div 
              key={index} 
              className={cn(
                "relative",
                isLoading ? "animate-pulse" : ""
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {isLoading ? (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100">
                  <div className="h-10 w-10 rounded-md bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-5 w-28 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : (
                <Link 
                  href={action.href}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg transition-all duration-300",
                    `bg-gradient-to-r ${getGradient(action.color)}`,
                    "hover:shadow-md group"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-md",
                    `bg-white/80 ${getIconColor(action.color)}`
                  )}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{action.title}</p>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                  <div className={cn(
                    "flex items-center text-gray-400 transition-all duration-300 transform",
                    hoveredIndex === index ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  )}>
                    <ArrowRight size={16} />
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

