"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "./Table"
import Link from "next/link"
import { Row } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"

interface Activity {
  id: number;
  action: string;
  actionType: "create" | "update" | "delete" | "process" | "close";
  description: string;
  admin: string;
  timestamp: string;
  href: string;
}

export function RecentActivity() {
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const activities = [
    {
      id: 1,
      action: "User Created",
      actionType: "create",
      description: "New user account created for John Doe",
      admin: "Admin User",
      timestamp: "2 hours ago",
      href: "/admin/users/1",
    },
    {
      id: 2,
      action: "Service Updated",
      actionType: "update",
      description: "Tourist Visa Package price updated to $199",
      admin: "Admin User",
      timestamp: "3 hours ago",
      href: "/admin/services/2",
    },
    {
      id: 3,
      action: "Payment Processed",
      actionType: "process",
      description: "Payment of $299 received for Business Visa Package",
      admin: "System",
      timestamp: "5 hours ago",
      href: "/admin/payments/3",
    },
    {
      id: 4,
      action: "Content Updated",
      actionType: "update",
      description: "Homepage hero section text and images updated",
      admin: "Content Editor",
      timestamp: "Yesterday",
      href: "/admin/content-management",
    },
    {
      id: 5,
      action: "Support Ticket Closed",
      actionType: "close",
      description: "Ticket #1234 resolved and closed",
      admin: "Support Agent",
      timestamp: "Yesterday",
      href: "/admin/support/5",
    },
  ]

  const getActionColor = (type: string) => {
    switch (type) {
      case "create": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "update": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "delete": return "bg-red-100 text-red-800 hover:bg-red-200";
      case "process": return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "close": return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const columns = [
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: { row: Row<Activity> }) => (
        <Badge className={cn(
          "font-normal transition-colors",
          getActionColor(row.original.actionType)
        )}>
          {row.original.action}
        </Badge>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }: { row: Row<Activity> }) => (
        <Link 
          href={row.original.href} 
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-2 group"
        >
          {row.original.description}
          <Eye className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      ),
    },
    {
      header: "Admin",
      accessorKey: "admin",
    },
    {
      header: "Timestamp",
      accessorKey: "timestamp",
      cell: ({ row }: { row: Row<Activity> }) => (
        <span className="text-gray-500 text-sm">{row.original.timestamp}</span>
      ),
    },
  ]

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions by administrators</CardDescription>
          </div>
          {!isLoading && (
            <Link 
              href="/admin/reports/activity" 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              View all activity
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded flex items-center px-4">
              <div className="grid grid-cols-4 gap-4 w-full">
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="py-3 border-b border-gray-100 last:border-0">
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DataTable data={activities} columns={columns} />
        )}
      </CardContent>
    </Card>
  )
}

