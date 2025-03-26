"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  UserActivityMetrics, 
  UserLoginHistory, 
  UserActivityLogs 
} from "@/app/admin/users/components"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, UserCircle } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  lastLogin: string | null
  loginCount: number
  activityScore: number
  joinDate: string
  role: string
  status: string
}

// Mock user data
const mockUser: User = {
  id: "user-123",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Customer",
  status: "Active",
  joinDate: "2022-06-15T10:30:00Z",
  lastLogin: "2023-05-10T14:25:00Z",
  loginCount: 42,
  activityScore: 78,
}

export function UserActivityPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params?.userId as string
  
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // In a real app, you would fetch user data from an API
    // For now, we'll use mock data with a fake delay
    const loadUser = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Use the userId from the URL to "fetch" the user
        // In a real app, this would be an API call like:
        // const response = await fetch(`/api/users/${userId}`)
        // const data = await response.json()
        
        // For now, just use our mock data but update the ID
        setUser({
          ...mockUser,
          id: userId || mockUser.id
        })
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setLoading(false)
      }
    }
    
    if (userId) {
      loadUser()
    }
  }, [userId])
  
  if (loading) {
    return <div className="p-8 text-center">Loading user activity data...</div>
  }
  
  if (!user) {
    return <div className="p-8 text-center">User not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">User Activity</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <UserCircle className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>
      
      <UserActivityMetrics user={user} />
      
      <Tabs defaultValue="login-history" className="w-full">
        <TabsList>
          <TabsTrigger value="login-history">Login History</TabsTrigger>
          <TabsTrigger value="activity-logs">Activity Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login-history" className="mt-6">
          <UserLoginHistory userId={user.id} />
        </TabsContent>
        
        <TabsContent value="activity-logs" className="mt-6">
          <UserActivityLogs userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 