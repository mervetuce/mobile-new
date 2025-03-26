"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react"

const securityLogs = [
  {
    id: 1,
    action: "Login",
    user: "admin@visify.com",
    role: "Super Admin",
    ip: "192.168.1.1",
    userAgent: "Chrome/Windows",
    status: "Success",
    timestamp: "2023-10-15 14:30:22",
  },
  {
    id: 2,
    action: "User Created",
    user: "admin@visify.com",
    role: "Super Admin",
    ip: "192.168.1.1",
    userAgent: "Chrome/Windows",
    status: "Success",
    timestamp: "2023-10-15 14:35:10",
  },
  {
    id: 3,
    action: "Login",
    user: "editor@visify.com",
    role: "Content Editor",
    ip: "192.168.1.2",
    userAgent: "Firefox/Mac",
    status: "Success",
    timestamp: "2023-10-15 15:12:45",
  },
  {
    id: 4,
    action: "Content Updated",
    user: "editor@visify.com",
    role: "Content Editor",
    ip: "192.168.1.2",
    userAgent: "Firefox/Mac",
    status: "Success",
    timestamp: "2023-10-15 15:20:33",
  },
  {
    id: 5,
    action: "Login",
    user: "unknown@example.com",
    role: "N/A",
    ip: "203.0.113.1",
    userAgent: "Chrome/Linux",
    status: "Failed",
    timestamp: "2023-10-15 16:45:12",
  },
  {
    id: 6,
    action: "Password Reset",
    user: "support@visify.com",
    role: "Support Agent",
    ip: "192.168.1.3",
    userAgent: "Safari/Mac",
    status: "Success",
    timestamp: "2023-10-15 17:10:05",
  },
  {
    id: 7,
    action: "Login",
    user: "support@visify.com",
    role: "Support Agent",
    ip: "192.168.1.3",
    userAgent: "Safari/Mac",
    status: "Success",
    timestamp: "2023-10-15 17:15:22",
  },
  {
    id: 8,
    action: "API Key Generated",
    user: "admin@visify.com",
    role: "Super Admin",
    ip: "192.168.1.1",
    userAgent: "Chrome/Windows",
    status: "Success",
    timestamp: "2023-10-16 09:05:18",
  },
  {
    id: 9,
    action: "Login",
    user: "unknown@example.com",
    role: "N/A",
    ip: "203.0.113.1",
    userAgent: "Chrome/Linux",
    status: "Failed",
    timestamp: "2023-10-16 10:30:45",
  },
  {
    id: 10,
    action: "Role Updated",
    user: "admin@visify.com",
    role: "Super Admin",
    ip: "192.168.1.1",
    userAgent: "Chrome/Windows",
    status: "Success",
    timestamp: "2023-10-16 11:20:33",
  },
]

export function SecurityLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredLogs = securityLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Logs</h2>
          <p className="text-gray-500">View admin activity and security events</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Activity Logs</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-64"
              />
            </div>
          </div>
          <CardDescription>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLogs.length)} of{" "}
            {filteredLogs.length} logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.length > 0 ? (
                  paginatedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.role}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            log.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {log.status}
                        </span>
                      </TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No logs found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

