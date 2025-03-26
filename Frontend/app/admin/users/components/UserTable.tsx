"use client"

import { useState, useEffect } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  Row,
  FilterFn,
  RowSelectionState
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter, 
  Save, 
  Calendar,
  X,
  Check,
  ListFilter,
  Star,
  Plus,
  Download,
  UserCog,
  UserCheck,
  UserX,
  MoreHorizontal
} from "lucide-react"
import { UserActions } from "./UserActions"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { FilterBar } from "./FilterBar"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  lastLogin: string | null;
  loginCount: number;
  activityScore: number;
}

interface FilterOption {
  id: string;
  label: string;
  clear: () => void;
}

interface SavedFilter {
  id: string;
  name: string;
  config: {
    role?: string[];
    status?: string[];
    joinDateAfter?: string;
    joinDateBefore?: string;
  };
}

interface DateRangeFilter {
  from?: string;
  to?: string;
  comparison: 'gte' | 'lte';
}

// Mock data
const data: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-01-15",
    lastLogin: "2023-10-20T14:30:45Z",
    loginCount: 42,
    activityScore: 78
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-02-20",
    lastLogin: "2023-10-22T09:15:22Z",
    loginCount: 28,
    activityScore: 65
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-03-10",
    lastLogin: "2023-10-23T11:45:36Z",
    loginCount: 112,
    activityScore: 92
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Customer",
    status: "Inactive",
    joinDate: "2023-04-05",
    lastLogin: "2023-09-15T17:22:18Z",
    loginCount: 5,
    activityScore: 12
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-05-12",
    lastLogin: "2023-10-21T08:30:42Z",
    loginCount: 35,
    activityScore: 67
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: "Support",
    status: "Active",
    joinDate: "2023-06-18",
    lastLogin: "2023-10-23T10:12:33Z",
    loginCount: 87,
    activityScore: 85
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    role: "Customer",
    status: "Suspended",
    joinDate: "2023-07-22",
    lastLogin: "2023-08-30T15:45:21Z",
    loginCount: 12,
    activityScore: 23
  },
  {
    id: "8",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-08-30",
    lastLogin: "2023-10-22T16:33:54Z",
    loginCount: 32,
    activityScore: 71
  },
  {
    id: "9",
    name: "James Anderson",
    email: "james.anderson@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-09-14",
    lastLogin: "2023-10-23T09:47:12Z",
    loginCount: 18,
    activityScore: 54
  },
  {
    id: "10",
    name: "Lisa Thomas",
    email: "lisa.thomas@example.com",
    role: "Content Editor",
    status: "Active",
    joinDate: "2023-10-05",
    lastLogin: "2023-10-22T14:25:38Z",
    loginCount: 24,
    activityScore: 63
  },
]

// Extract unique values for filters
const roles = ["Admin", "Customer", "Support", "Content Editor"]
const statuses = ["Active", "Inactive", "Suspended"]

// Role and status filter function
const arrayFilterFn: FilterFn<User> = (row: Row<User>, id: string, value: string[]) => {
  return value.length === 0 || value.includes(row.getValue(id))
}

// Date range filter function
const dateRangeFilterFn: FilterFn<User> = (row: Row<User>, id: string, value: DateRangeFilter) => {
  if (!value) return true;
  
  const cellValue = row.getValue(id) as string
  const cellDate = new Date(cellValue)
  
  // Handle date range with both from and to values
  if (value.from && value.to) {
    const fromDate = new Date(value.from)
    const toDate = new Date(value.to)
    // Add one day to toDate to make it inclusive
    toDate.setDate(toDate.getDate() + 1)
    return cellDate >= fromDate && cellDate <= toDate
  }
  
  // Handle only from date
  if (value.from) {
    return cellDate >= new Date(value.from)
  }
  
  // Handle only to date
  if (value.to) {
    // Add one day to toDate to make it inclusive
    const toDate = new Date(value.to)
    toDate.setDate(toDate.getDate() + 1)
    return cellDate <= toDate
  }
  
  return true
}

// Define preset filter configurations
const presetFilters: SavedFilter[] = [
  { id: "1", name: "New customers", config: { role: ["Customer"], joinDateAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } },
  { id: "2", name: "Inactive users", config: { status: ["Inactive"] } },
  { id: "3", name: "Admin team", config: { role: ["Admin"] } },
]

export function UserTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  
  // Add state for user data
  const [userData, setUserData] = useState<User[]>(data)
  
  // Advanced filter states
  const [roleFilter, setRoleFilter] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [joinDateAfter, setJoinDateAfter] = useState("")
  const [joinDateBefore, setJoinDateBefore] = useState("")
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([])
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>(presetFilters)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [showBulkActions, setShowBulkActions] = useState(false)
  
  // Add confirmation dialog states
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [pendingStatusChange, setPendingStatusChange] = useState<string | null>(null)
  
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [pendingRoleAssignment, setPendingRoleAssignment] = useState<string | null>(null)
  
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

  // *** Define all handler functions first ***
  
  // Handle edit user action
  const handleEdit = (user: User) => {
    toast({
      title: "Edit User",
      description: `Editing user: ${user.name}`,
      variant: "default",
    })
  }

  // Handle delete user action
  const handleDelete = (userId: string) => {
    toast({
      title: "Delete User",
      description: `User with ID ${userId} has been deleted`,
      variant: "destructive",
    })
  }

  // Handle suspend user action
  const handleSuspendUser = (userId: string) => {
    const user = userData.find(u => u.id === userId)
    if (user) {
      // Update user status
      user.status = "Suspended"
      setUserData([...userData])
      
      toast({
        title: "User Suspended",
        description: `${user.name} has been suspended`,
        variant: "default",
      })
    }
  }

  // Handle activate user action
  const handleActivateUser = (userId: string) => {
    const user = userData.find(u => u.id === userId)
    if (user) {
      // Update user status
      user.status = "Active"
      setUserData([...userData])
      
      toast({
        title: "User Activated",
        description: `${user.name} has been activated`,
        variant: "default",
      })
    }
  }
  
  // Function to handle initial status change click
  const handleStatusChangeClick = (status: string) => {
    setPendingStatusChange(status)
    setStatusDialogOpen(true)
  }

  // Function to handle initial role assignment click
  const handleRoleAssignmentClick = (role: string) => {
    setPendingRoleAssignment(role)
    setRoleDialogOpen(true)
  }

  // Function to handle initial export click
  const handleExportClick = () => {
    setExportDialogOpen(true)
  }

  // Function to handle bulk status change
  const handleBulkStatusChange = (newStatus: string) => {
    // Close the dialog
    setStatusDialogOpen(false)
    
    // In a real app, you would call an API to update the status
    console.log(`Changing status to ${newStatus} for ${Object.keys(rowSelection).length} users`);
    
    // Create a new data array with updated statuses
    const updatedData = [...userData];
    Object.keys(rowSelection).forEach(idx => {
      const index = parseInt(idx);
      if (updatedData[index]) {
        updatedData[index].status = newStatus;
      }
    });
    
    // Update the state with the new data
    setUserData(updatedData);
    
    // Show toast notification
    toast({
      title: "Status Updated",
      description: `Changed status to ${newStatus} for ${Object.keys(rowSelection).length} user${Object.keys(rowSelection).length > 1 ? 's' : ''}`,
      variant: "default",
    });
    
    // Reset selection after action
    setRowSelection({});
  }

  // Function to handle bulk role assignment
  const handleBulkRoleAssignment = (newRole: string) => {
    // Close the dialog
    setRoleDialogOpen(false)
    
    // In a real app, you would call an API to update the role
    console.log(`Assigning role ${newRole} to ${Object.keys(rowSelection).length} users`);
    
    // Create a new data array with updated roles
    const updatedData = [...userData];
    Object.keys(rowSelection).forEach(idx => {
      const index = parseInt(idx);
      if (updatedData[index]) {
        updatedData[index].role = newRole;
      }
    });
    
    // Update the state with the new data
    setUserData(updatedData);
    
    // Show toast notification
    toast({
      title: "Role Assigned",
      description: `Assigned role ${newRole} to ${Object.keys(rowSelection).length} user${Object.keys(rowSelection).length > 1 ? 's' : ''}`,
      variant: "default",
    });
    
    // Reset selection after action
    setRowSelection({});
  }

  // Function to handle bulk user export
  const handleExportUsers = () => {
    // Close the dialog
    setExportDialogOpen(false)
    
    // Get selected users
    const selectedUserData = Object.keys(rowSelection).map(
      (idx) => userData[parseInt(idx)]
    ).filter(Boolean);
    
    if (selectedUserData.length === 0) {
      toast({
        title: "No Users Selected",
        description: "Please select at least one user to export",
        variant: "destructive",
      });
      return;
    }
    
    // Convert user data to CSV
    const headers = ["ID", "Name", "Email", "Role", "Status", "Join Date"];
    const csvContent = [
      // Add headers
      headers.join(","),
      // Add data rows
      ...selectedUserData.map(user => [
        user.id,
        `"${user.name}"`, // Wrap in quotes to handle names with commas
        `"${user.email}"`,
        `"${user.role}"`,
        `"${user.status}"`,
        user.joinDate
      ].join(","))
    ].join("\n");
    
    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create a download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    // Set link properties
    link.setAttribute("href", url);
    link.setAttribute("download", `user-export-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    
    // Add link to document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show toast notification
    toast({
      title: "Export Complete",
      description: `Exported ${selectedUserData.length} user${selectedUserData.length > 1 ? 's' : ''} to CSV`,
      variant: "default",
    });
    
    // Don't reset selection after export so users can perform other actions
  }

  // Define the columns array after all handlers are defined
  const columns = [
    {
      id: "select",
      header: ({ table }: { table: any }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: { row: Row<User> }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      filterFn: arrayFilterFn,
      cell: ({ row }: { row: Row<User> }) => {
        const role = row.getValue("role") as string
        return (
          <div className="flex items-center">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                role === "Admin"
                  ? "bg-purple-100 text-purple-800"
                  : role === "Support"
                    ? "bg-blue-100 text-blue-800"
                    : role === "Content Editor"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
              }`}
            >
              {role}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: arrayFilterFn,
      cell: ({ row }: { row: Row<User> }) => {
        const status = row.getValue("status") as string
        return (
          <div className="flex items-center">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                status === "Active"
                  ? "bg-green-100 text-green-800"
                  : status === "Inactive"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      filterFn: dateRangeFilterFn,
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }: { row: Row<User> }) => {
        const lastLogin: string | null = row.getValue("lastLogin")
        
        if (!lastLogin) {
          return <div className="text-muted-foreground">Never</div>
        }
        
        const loginDate = new Date(lastLogin)
        const now = new Date()
        const diffMs = now.getTime() - loginDate.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        
        // Format based on recency
        if (loginDate.toDateString() === now.toDateString()) {
          return (
            <div className="text-green-600 font-medium">
              Today at {loginDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          )
        } else if (diffDays === 1) {
          return <div>Yesterday</div>
        } else if (diffDays < 7) {
          return <div>{diffDays} days ago</div>
        } else {
          return (
            <div>
              {loginDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric'
              })}
            </div>
          )
        }
      },
      filterFn: (row: Row<User>, id: string, value: string) => {
        if (!value) return true
        
        const lastLogin = row.getValue(id) as string | null
        
        // Handle users who never logged in
        if (!lastLogin) {
          return value === "never"
        }
        
        const loginDate = new Date(lastLogin)
        const now = new Date()
        const diffMs = now.getTime() - loginDate.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        
        // Filter by login recency
        switch (value) {
          case "today":
            return loginDate.toDateString() === now.toDateString()
          case "yesterday":
            return diffDays === 1
          case "thisWeek": 
            return diffDays < 7
          case "thisMonth":
            return diffDays < 30
          default:
            return true
        }
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original
        
        return (
          <UserActions 
            user={user} 
            onEdit={(user) => handleEdit(user)}
            onDelete={(userId) => handleDelete(userId)}
            onSuspend={(userId) => handleSuspendUser(userId)}
            onActivate={(userId) => handleActivateUser(userId)}
          />
        )
      },
    },
  ]

  // Apply filters to the table
  useEffect(() => {
    // Start with empty filters array
    const filters: ColumnFiltersState = []
    
    // Add role filter if any roles are selected
    if (roleFilter.length > 0) {
      filters.push({
        id: "role",
        value: roleFilter
      })
    }
    
    // Add status filter if any statuses are selected
    if (statusFilter.length > 0) {
      filters.push({
        id: "status",
        value: statusFilter
      })
    }
    
    // Handle date range as a single filter when both dates are provided
    if (joinDateAfter || joinDateBefore) {
      filters.push({
        id: "joinDate",
        value: {
          from: joinDateAfter || undefined,
          to: joinDateBefore || undefined
        }
      })
    }
    
    // Set the column filters
    setColumnFilters(filters)
    
    // Update active filters display
    const newActiveFilters: FilterOption[] = []
    
    if (roleFilter.length > 0) {
      newActiveFilters.push({
        id: "role",
        label: `Role: ${roleFilter.join(", ")}`,
        clear: () => setRoleFilter([])
      })
    }
    
    if (statusFilter.length > 0) {
      newActiveFilters.push({
        id: "status", 
        label: `Status: ${statusFilter.join(", ")}`,
        clear: () => setStatusFilter([])
      })
    }
    
    if (joinDateAfter) {
      newActiveFilters.push({
        id: "joinDateAfter",
        label: `Joined after: ${joinDateAfter}`,
        clear: () => setJoinDateAfter("")
      })
    }
    
    if (joinDateBefore) {
      newActiveFilters.push({
        id: "joinDateBefore",
        label: `Joined before: ${joinDateBefore}`,
        clear: () => setJoinDateBefore("")
      })
    }
    
    setActiveFilters(newActiveFilters)
  }, [roleFilter, statusFilter, joinDateAfter, joinDateBefore])

  // Apply saved filter
  const applySavedFilter = (filter: SavedFilter) => {
    const { config } = filter
    
    if (config.role) setRoleFilter(config.role)
    if (config.status) setStatusFilter(config.status)
    if (config.joinDateAfter) setJoinDateAfter(config.joinDateAfter)
    if (config.joinDateBefore) setJoinDateBefore(config.joinDateBefore)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setRoleFilter([])
    setStatusFilter([])
    setJoinDateAfter("")
    setJoinDateBefore("")
    setGlobalFilter("")
  }

  // Show/hide bulk actions based on selection
  useEffect(() => {
    setShowBulkActions(Object.keys(rowSelection).length > 0)
  }, [rowSelection])

  const table = useReactTable({
    data: userData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    enableRowSelection: true,
  })

  // Get selected users
  const selectedUsers = Object.keys(rowSelection).map(
    (idx) => userData[parseInt(idx)]
  ).filter(Boolean)

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <FilterBar
        roles={roles}
        statuses={statuses}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        joinDateAfter={joinDateAfter}
        setJoinDateAfter={setJoinDateAfter}
        joinDateBefore={joinDateBefore}
        setJoinDateBefore={setJoinDateBefore}
        activeFilters={activeFilters}
        clearAllFilters={clearAllFilters}
        savedFilters={savedFilters}
        setSavedFilters={setSavedFilters}
        applySavedFilter={applySavedFilter}
      />

      {/* Status Change Confirmation Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status of {Object.keys(rowSelection).length} user{Object.keys(rowSelection).length > 1 ? 's' : ''} to <span className="font-medium">{pendingStatusChange}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => pendingStatusChange && handleBulkStatusChange(pendingStatusChange)}
              className={`${
                pendingStatusChange === "Active"
                  ? "bg-green-600 hover:bg-green-700"
                  : pendingStatusChange === "Inactive"
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Assignment Confirmation Dialog */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Role Assignment</DialogTitle>
            <DialogDescription>
              Are you sure you want to assign the role <span className="font-medium">{pendingRoleAssignment}</span> to {Object.keys(rowSelection).length} user{Object.keys(rowSelection).length > 1 ? 's' : ''}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => pendingRoleAssignment && handleBulkRoleAssignment(pendingRoleAssignment)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Confirmation Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Export</DialogTitle>
            <DialogDescription>
              Are you sure you want to export {Object.keys(rowSelection).length} user{Object.keys(rowSelection).length > 1 ? 's' : ''}?
              This will download a CSV file with all selected users' data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExportUsers}>
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Actions and Results Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-2">
        <div className="text-sm text-gray-500">
          Showing {table.getFilteredRowModel().rows.length} of {data.length} users
          {Object.keys(rowSelection).length > 0 && (
            <span className="ml-2 font-medium text-blue-600">
              ({Object.keys(rowSelection).length} selected)
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Bulk Change Status Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex gap-1 items-center"
                disabled={Object.keys(rowSelection).length === 0}
              >
                <UserCheck className="h-4 w-4" />
                <span>Change Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Set Status To</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statuses.map((status) => (
                <DropdownMenuItem 
                  key={status}
                  onClick={() => {
                    handleStatusChangeClick(status);
                  }}
                >
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    status === "Active"
                      ? "bg-green-500"
                      : status === "Inactive"
                        ? "bg-gray-500"
                        : "bg-red-500"
                  }`} />
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bulk Assign Role Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex gap-1 items-center"
                disabled={Object.keys(rowSelection).length === 0}
              >
                <UserCog className="h-4 w-4" />
                <span>Assign Role</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Assign Role To Users</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {roles.map((role) => (
                <DropdownMenuItem 
                  key={role}
                  onClick={() => {
                    handleRoleAssignmentClick(role);
                  }}
                >
                  {role}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export Button */}
          <Button 
            size="sm" 
            variant="outline" 
            className="flex gap-1 items-center" 
            onClick={handleExportClick}
            disabled={Object.keys(rowSelection).length === 0}
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>

          {/* Clear Selection (only shown when users are selected) */}
          {Object.keys(rowSelection).length > 0 && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="flex gap-1 items-center" 
              onClick={() => setRowSelection({})}
            >
              <X className="h-4 w-4" />
              <span>Clear Selection</span>
            </Button>
          )}
        </div>
      </div>

      {/* Users table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

