"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontal, 
  Edit, 
  Trash, 
  UserX, 
  UserCheck, 
  Activity,
  User
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface UserActionsProps {
  user: {
    id: string
    name: string
    email: string
    role: string
    status: string
    lastLogin?: string | null
    loginCount?: number
    activityScore?: number
  }
  onEdit: (user: any) => void
  onDelete: (userId: string) => void
  onSuspend: (userId: string) => void
  onActivate: (userId: string) => void
}

export function UserActions({ user, onEdit, onDelete, onSuspend, onActivate }: UserActionsProps) {
  const router = useRouter()
  
  // State for confirmation dialogs
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  
  // Handle editing a user
  const handleEdit = () => {
    setEditDialogOpen(false)
    // In a real app, navigate to edit page or show edit form
    toast({
      title: "User Edit",
      description: `Editing user: ${user.name}`,
      variant: "default",
    })
  }
  
  // Handle deleting a user
  const handleDelete = () => {
    setDeleteDialogOpen(false)
    // In a real app, call API to delete user
    toast({
      title: "User Deleted",
      description: `User ${user.name} has been deleted`,
      variant: "destructive",
    })
  }
  
  // Handle changing user status
  const handleStatusChange = () => {
    setStatusDialogOpen(false)
    const newStatus = user.status === "Active" ? "Suspended" : "Active"
    
    // In a real app, call API to update status
    toast({
      title: "Status Updated",
      description: `${user.name}'s status changed to ${newStatus}`,
      variant: user.status === "Active" ? "default" : "default",
    })
  }
  
  // View user activity logs
  const handleViewActivityLogs = () => {
    router.push(`/admin/users/${user.id}/activity`)
  }

  // Add new function to handle view profile
  const handleViewProfile = () => {
    router.push(`/admin/users/${user.id}/profile`)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)} className="cursor-pointer">
            Copy user ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewProfile}>
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => setEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          {user.status === "Active" ? (
            <DropdownMenuItem className="cursor-pointer text-amber-600" onClick={() => setStatusDialogOpen(true)}>
              <UserX className="mr-2 h-4 w-4" />
              Suspend
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="cursor-pointer text-green-600" onClick={() => setStatusDialogOpen(true)}>
              <UserCheck className="mr-2 h-4 w-4" />
              Activate
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="cursor-pointer text-blue-600" onClick={handleViewActivityLogs}>
            <Activity className="mr-2 h-4 w-4" />
            View Activity
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => setDeleteDialogOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Edit Confirmation Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Are you sure you want to edit the user {user.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>
              Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the user {user.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Status Change Confirmation Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{user.status === "Active" ? "Suspend" : "Activate"} User</DialogTitle>
            <DialogDescription>
              Are you sure you want to {user.status === "Active" ? "suspend" : "activate"} the user {user.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant={user.status === "Active" ? "default" : "default"}
              className={user.status === "Active" ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"}
              onClick={handleStatusChange}
            >
              {user.status === "Active" ? "Suspend" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

