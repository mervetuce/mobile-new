"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { UserProfileHeader } from "./UserProfileHeader"
import { UserSubscriptionInfo } from "./UserSubscriptionInfo"
import { UserEngagementMetrics } from "./UserEngagementMetrics"
import { UserActivityLogs } from "./UserActivityLogs"
import { UserLoginHistory } from "./UserLoginHistory"
import { toast } from "@/hooks/use-toast"

// Mock user data
const getMockUserData = (userId: string) => ({
  id: userId,
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Customer",
  status: "Active",
  joinDate: "2022-06-15T10:30:00Z",
  lastLogin: "2023-05-10T14:25:00Z",
  loginCount: 42,
  activityScore: 78,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  phone: "+1 (555) 123-4567",
  location: "New York, USA",
  bio: "Product enthusiast and regular customer since 2022. Interested in technology and design products.",
  verified: true,
  subscriptionTier: "Premium",
  subscriptionStatus: "active",
  subscriptionRenewDate: "2023-12-15T00:00:00Z",
  paymentMethod: {
    brand: "Visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2024
  }
})

// Mock billing history
const mockBillingHistory = [
  {
    id: "inv-001",
    date: "2023-05-15T00:00:00Z",
    amount: 29.99,
    status: "paid" as const,
    invoiceUrl: "#"
  },
  {
    id: "inv-002",
    date: "2023-04-15T00:00:00Z",
    amount: 29.99,
    status: "paid" as const,
    invoiceUrl: "#"
  },
  {
    id: "inv-003",
    date: "2023-03-15T00:00:00Z",
    amount: 29.99,
    status: "paid" as const,
    invoiceUrl: "#"
  },
  {
    id: "inv-004",
    date: "2023-02-15T00:00:00Z",
    amount: 19.99,
    status: "paid" as const,
    invoiceUrl: "#"
  },
  {
    id: "inv-005",
    date: "2023-01-15T00:00:00Z",
    amount: 19.99,
    status: "paid" as const,
    invoiceUrl: "#"
  }
]

// Mock subscription plans
const mockSubscriptionPlans = [
  {
    id: "plan-free",
    name: "Free",
    price: 0,
    interval: "month",
    features: [
      "Basic access to platform",
      "1 project",
      "Community support"
    ],
    limits: {
      storage: 500,
      users: 1,
      projects: 1
    },
    isCurrentPlan: false
  },
  {
    id: "plan-basic",
    name: "Basic",
    price: 19.99,
    interval: "month",
    features: [
      "Full access to platform",
      "Up to 3 projects",
      "Email support",
      "API access"
    ],
    limits: {
      storage: 5120,
      users: 5,
      projects: 3
    },
    isCurrentPlan: false
  },
  {
    id: "plan-premium",
    name: "Premium",
    price: 29.99,
    interval: "month",
    features: [
      "Everything in Basic",
      "Unlimited projects",
      "Priority support",
      "Advanced analytics",
      "Custom integrations"
    ],
    limits: {
      storage: 20480,
      users: 10,
      projects: 999
    },
    isCurrentPlan: true
  }
]

// Mock usage metrics
const mockUsageMetrics = [
  {
    name: "Storage",
    used: 12288,
    limit: 20480,
    percentUsed: 60
  },
  {
    name: "API Calls",
    used: 4350,
    limit: 10000,
    percentUsed: 43
  },
  {
    name: "Users",
    used: 7,
    limit: 10,
    percentUsed: 70
  },
  {
    name: "Projects",
    used: 5,
    limit: 999,
    percentUsed: 1
  }
]

// Mock engagement metrics
const mockEngagementMetrics = [
  {
    name: "Page Views",
    value: 328,
    change: 12,
    trend: "up" as const
  },
  {
    name: "Session Duration",
    value: 24,
    change: 5,
    trend: "up" as const
  },
  {
    name: "Conversion Rate",
    value: 2.8,
    change: -0.5,
    trend: "down" as const
  },
  {
    name: "Bounce Rate",
    value: 42,
    change: -3,
    trend: "up" as const
  }
]

// Mock time series data
const mockTimeSeriesData = [
  {
    name: "Page Views",
    data: Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (30 - i))
      return {
        date: date.toISOString(),
        value: Math.floor(Math.random() * 20) + 5
      }
    })
  },
  {
    name: "Session Duration (mins)",
    data: Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (30 - i))
      return {
        date: date.toISOString(),
        value: Math.floor(Math.random() * 30) + 10
      }
    })
  }
]

// Mock content interactions
const mockRecentInteractions = [
  {
    id: "int-001",
    title: "How to get started with our platform",
    type: "page" as const,
    date: "2023-06-10T10:15:00Z",
    duration: 5
  },
  {
    id: "int-002",
    title: "Premium features explained",
    type: "page" as const,
    date: "2023-06-09T14:30:00Z",
    duration: 8
  },
  {
    id: "int-003",
    title: "Ultra HD Bluetooth Headphones",
    type: "product" as const,
    date: "2023-06-08T16:45:00Z",
    duration: 12,
    action: "Added to cart"
  },
  {
    id: "int-004",
    title: "What's new in version 2.0",
    type: "post" as const,
    date: "2023-06-07T09:20:00Z",
    duration: 3
  },
  {
    id: "int-005",
    title: "Great product, really helped me with my work!",
    type: "comment" as const,
    date: "2023-06-06T11:05:00Z",
    action: "Posted a comment"
  },
  {
    id: "int-006",
    title: "Wireless Charging Station",
    type: "product" as const,
    date: "2023-06-05T13:40:00Z",
    duration: 6,
    action: "Purchased"
  },
  {
    id: "int-007",
    title: "Account settings",
    type: "page" as const,
    date: "2023-06-04T15:10:00Z",
    duration: 4
  },
  {
    id: "int-008",
    title: "Smart Home Integration Guide",
    type: "post" as const,
    date: "2023-06-03T10:30:00Z",
    duration: 9
  }
]

// Mock top content
const mockTopContent = [
  {
    id: "top-001",
    title: "Premium features explained",
    type: "page" as const,
    date: "2023-06-09T14:30:00Z",
    duration: 45
  },
  {
    id: "top-002",
    title: "Ultra HD Bluetooth Headphones",
    type: "product" as const,
    date: "2023-06-08T16:45:00Z",
    duration: 36
  },
  {
    id: "top-003",
    title: "Smart Home Integration Guide",
    type: "post" as const,
    date: "2023-06-03T10:30:00Z",
    duration: 28
  }
]

export function UserProfilePage() {
  const router = useRouter()
  const params = useParams()
  const userId = params?.userId as string
  
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // In a real app, you would fetch user data from an API
    const loadUserData = async () => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Get mock data with the userId
        setUser(getMockUserData(userId))
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    if (userId) {
      loadUserData()
    }
  }, [userId])
  
  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile edit functionality would open here.",
      variant: "default",
    })
  }
  
  if (loading) {
    return <ProfileSkeleton />
  }
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold">User Not Found</h2>
        <p className="text-muted-foreground mt-2">The requested user could not be found.</p>
        <Button 
          className="mt-4" 
          variant="outline" 
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">User Profile</h1>
      </div>
      
      <UserProfileHeader 
        user={user}
        onEdit={handleEditProfile}
      />
      
      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="logins">Login History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription" className="mt-6">
          <UserSubscriptionInfo 
            user={user}
            billingHistory={mockBillingHistory}
            availablePlans={mockSubscriptionPlans}
            usage={mockUsageMetrics}
          />
        </TabsContent>
        
        <TabsContent value="engagement" className="mt-6">
          <UserEngagementMetrics 
            userId={user.id}
            metrics={mockEngagementMetrics}
            timeSeriesData={mockTimeSeriesData}
            recentInteractions={mockRecentInteractions}
            topContent={mockTopContent}
          />
        </TabsContent>
        
        <TabsContent value="activity" className="mt-6">
          <UserActivityLogs userId={user.id} />
        </TabsContent>
        
        <TabsContent value="logins" className="mt-6">
          <UserLoginHistory userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Loading skeleton
const ProfileSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8" />
      <Skeleton className="h-8 w-40" />
    </div>
    
    <div className="rounded-lg border p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 flex flex-col items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full mt-4" />
        </div>
        
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            
            <div className="space-y-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
      </div>
    </div>
    
    <Skeleton className="h-10 w-full" />
    
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
) 