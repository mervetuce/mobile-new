"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ChevronDown, 
  Filter, 
  Search,
  Calendar,
  LogIn,
  LogOut,
  Settings,
  ShoppingCart,
  FileEdit,
  AlertCircle,
  Trash,
  Mail
} from "lucide-react"

interface ActivityLog {
  id: string
  timestamp: string
  action: string
  details: string
  ipAddress: string
  device: string
  status: "success" | "warning" | "error"
}

interface UserActivityLogsProps {
  userId: string
}

// Mock activity logs data
const generateMockLogs = (userId: string): ActivityLog[] => {
  const actions = [
    { action: "login", icon: LogIn, details: "User logged in", status: "success" as const },
    { action: "logout", icon: LogOut, details: "User logged out", status: "success" as const },
    { action: "profile_update", icon: FileEdit, details: "Updated profile information", status: "success" as const },
    { action: "password_change", icon: Settings, details: "Changed account password", status: "success" as const },
    { action: "order_placed", icon: ShoppingCart, details: "Placed new order #ORD-2023-9856", status: "success" as const },
    { action: "failed_login", icon: AlertCircle, details: "Failed login attempt", status: "error" as const },
    { action: "email_changed", icon: Mail, details: "Changed email address", status: "warning" as const },
    { action: "account_deletion_request", icon: Trash, details: "Requested account deletion", status: "warning" as const },
  ]
  
  const devices = ["Desktop - Chrome", "Mobile - Safari", "Desktop - Firefox", "Mobile - Chrome", "Tablet - Safari"]
  
  // Generate random IP addresses
  const generateIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
  }
  
  // Generate random dates within the last 30 days
  const generateTimestamp = () => {
    const now = new Date()
    const daysAgo = Math.floor(Math.random() * 30)
    const hoursAgo = Math.floor(Math.random() * 24)
    const minutesAgo = Math.floor(Math.random() * 60)
    
    now.setDate(now.getDate() - daysAgo)
    now.setHours(now.getHours() - hoursAgo)
    now.setMinutes(now.getMinutes() - minutesAgo)
    
    return now.toISOString()
  }
  
  // Generate 20 random logs
  return Array.from({ length: 20 }).map((_, i) => {
    const actionItem = actions[Math.floor(Math.random() * actions.length)]
    return {
      id: `log-${userId}-${i}`,
      timestamp: generateTimestamp(),
      action: actionItem.action,
      details: actionItem.details,
      ipAddress: generateIP(),
      device: devices[Math.floor(Math.random() * devices.length)],
      status: actionItem.status
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Sort by most recent first
}

export function UserActivityLogs({ userId }: UserActivityLogsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(generateMockLogs(userId))

  // Format date for display
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Helper to display the relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    } else {
      return 'Just now'
    }
  }
  
  // Filter logs based on search query
  const filteredLogs = activityLogs.filter(log => 
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.device.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Get icon for action type
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login':
        return <LogIn className="h-4 w-4" />
      case 'logout':
        return <LogOut className="h-4 w-4" />
      case 'profile_update':
        return <FileEdit className="h-4 w-4" />
      case 'password_change':
        return <Settings className="h-4 w-4" />
      case 'order_placed':
        return <ShoppingCart className="h-4 w-4" />
      case 'failed_login':
        return <AlertCircle className="h-4 w-4" />
      case 'email_changed':
        return <Mail className="h-4 w-4" />
      case 'account_deletion_request':
        return <Trash className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-medium">Activity Log</h3>
        
        <div className="flex w-full sm:w-auto items-center space-x-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search activity logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-1 items-center">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => setActivityLogs(generateMockLogs(userId).filter(log => log.status === "success"))}>
                Success Events
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActivityLogs(generateMockLogs(userId).filter(log => log.status === "warning"))}>
                Warning Events
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActivityLogs(generateMockLogs(userId).filter(log => log.status === "error"))}>
                Error Events
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActivityLogs(generateMockLogs(userId))}>
                Reset Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="hidden md:table-cell">Details</TableHead>
              <TableHead className="hidden lg:table-cell">IP Address</TableHead>
              <TableHead className="hidden lg:table-cell">Device</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No activity logs found.
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="text-sm">{formatDateTime(log.timestamp)}</div>
                    <div className="text-xs text-muted-foreground">{getRelativeTime(log.timestamp)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`p-1 rounded-full ${
                        log.status === "success" ? "bg-green-100 text-green-800" :
                        log.status === "warning" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {getActionIcon(log.action)}
                      </span>
                      <span className="capitalize">{log.action.replace(/_/g, ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {log.details}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell font-mono text-xs">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {log.device}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 