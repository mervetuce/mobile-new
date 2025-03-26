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
import { Input } from "@/components/ui/input"
import { Search, LogIn, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LoginSession {
  id: string
  timestamp: string
  ipAddress: string
  device: string
  browser: string
  location: string
  duration: number // in minutes
  status: "success" | "suspicious" | "failed"
}

interface UserLoginHistoryProps {
  userId: string
}

// Mock login history data
const generateMockLoginHistory = (userId: string): LoginSession[] => {
  const devices = ["Windows PC", "MacBook Pro", "iPhone 13", "Android Tablet", "iPad Pro"]
  const browsers = ["Chrome 98.0.4758", "Safari 15.4", "Firefox 99.0", "Edge 99.0.1150", "Opera 85.0"]
  const locations = [
    "New York, United States",
    "London, United Kingdom",
    "Toronto, Canada",
    "Sydney, Australia",
    "Berlin, Germany",
    "Tokyo, Japan",
    "Paris, France"
  ]
  
  // Generate random IP addresses
  const generateIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
  }
  
  // Generate random dates within the last 30 days
  const generateTimestamp = (index: number) => {
    const now = new Date()
    const daysAgo = Math.floor(index / 2) // Sequential order with some days having multiple logins
    const hoursOffset = (index % 2) * 8 // Space out logins on the same day
    
    now.setDate(now.getDate() - daysAgo)
    now.setHours(now.getHours() - hoursOffset)
    
    return now.toISOString()
  }
  
  // Generate 15 login records
  return Array.from({ length: 15 }).map((_, i) => {
    // More recent sessions are more likely to be successful
    const statusOptions: ("success" | "suspicious" | "failed")[] = 
      i < 3 ? ["success", "success", "suspicious"] : 
      i < 10 ? ["success", "success", "success", "suspicious", "failed"] :
      ["success", "suspicious", "failed", "failed"];
    
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    
    // Use consistent device/location for successful logins but vary for suspicious/failed attempts
    const deviceIndex = status === "success" ? (i % 3) : Math.floor(Math.random() * devices.length);
    const locationIndex = status === "success" ? (i % 3) : Math.floor(Math.random() * locations.length);
    
    return {
      id: `login-${userId}-${i}`,
      timestamp: generateTimestamp(i),
      ipAddress: generateIP(),
      device: devices[deviceIndex],
      browser: browsers[Math.floor(Math.random() * browsers.length)],
      location: locations[locationIndex],
      duration: status === "success" ? Math.floor(Math.random() * 240) + 10 : 0, // 10-250 minutes for successful logins
      status
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Sort by most recent first
}

export function UserLoginHistory({ userId }: UserLoginHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [loginHistory, setLoginHistory] = useState<LoginSession[]>(generateMockLoginHistory(userId))

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
  
  // Format duration as hours and minutes
  const formatDuration = (minutes: number) => {
    if (minutes === 0) return "N/A";
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  }
  
  // Filter login history based on search query
  const filteredHistory = loginHistory.filter(session => 
    session.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.browser.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.location.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Calculate statistics
  const successfulLogins = loginHistory.filter(session => session.status === "success").length
  const failedLogins = loginHistory.filter(session => session.status === "failed").length
  const suspiciousLogins = loginHistory.filter(session => session.status === "suspicious").length
  
  // Get status icon and color
  const getStatusDetails = (status: "success" | "suspicious" | "failed") => {
    switch (status) {
      case "success":
        return { 
          icon: <LogIn className="h-4 w-4" />,
          label: "Successful",
          bgColor: "bg-green-100", 
          textColor: "text-green-800",
          badgeClass: "bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs font-semibold"
        }
      case "suspicious":
        return { 
          icon: <AlertTriangle className="h-4 w-4" />,
          label: "Suspicious",
          bgColor: "bg-yellow-100", 
          textColor: "text-yellow-800",
          badgeClass: "bg-yellow-100 text-yellow-800 rounded-full px-2 py-1 text-xs font-semibold"
        }
      case "failed":
        return { 
          icon: <Shield className="h-4 w-4" />,
          label: "Failed",
          bgColor: "bg-red-100", 
          textColor: "text-red-800",
          badgeClass: "bg-red-100 text-red-800 rounded-full px-2 py-1 text-xs font-semibold"
        }
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Logins</CardTitle>
            <LogIn className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulLogins}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Attempts</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedLogins}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Activity</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suspiciousLogins}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Login Sessions</h3>
        
        <div className="relative w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search login sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden lg:table-cell">IP Address</TableHead>
              <TableHead className="hidden md:table-cell">Device & Browser</TableHead>
              <TableHead className="hidden lg:table-cell">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No login sessions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredHistory.map((session) => {
                const statusDetails = getStatusDetails(session.status);
                
                return (
                  <TableRow key={session.id}>
                    <TableCell>
                      {formatDateTime(session.timestamp)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`p-1 rounded-full ${statusDetails.bgColor} ${statusDetails.textColor}`}>
                          {statusDetails.icon}
                        </span>
                        <span className={statusDetails.badgeClass}>
                          {statusDetails.label}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {session.location}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell font-mono text-xs">
                      {session.ipAddress}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>{session.device}</div>
                      <div className="text-xs text-muted-foreground">{session.browser}</div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDuration(session.duration)}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 