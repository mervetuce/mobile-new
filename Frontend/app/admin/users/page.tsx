"use client"

import { useState, useEffect } from "react"
import { UserTable } from "./components/UserTable"
import { UserForm } from "./components/UserForm"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function UsersPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)

  // Check URL parameters when component mounts
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setShowForm(true)
    }
  }, [searchParams])

  const handleAddNewUser = () => {
    router.push("/admin/users?new=true")
    setShowForm(true)
  }

  const handleCancelForm = () => {
    router.push("/admin/users")
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-500 mt-1">View, filter, and manage user accounts</p>
        </div>
        {!showForm && (
          <Button 
            className="bg-black text-white hover:bg-gray-800 flex items-center gap-2" 
            onClick={handleAddNewUser}
          >
            <Plus className="h-4 w-4" />
            Add New User
          </Button>
        )}
      </div>

      {showForm ? (
        <div className="space-y-4">
          <UserForm />
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleCancelForm}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <UserTable />
      )}
    </div>
  )
}

