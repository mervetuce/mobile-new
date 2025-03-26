"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  MapPin,
  Phone,
  Calendar,
  Edit,
  MessageSquare,
  User,
  Shield,
  CreditCard
} from "lucide-react"

interface UserProfileHeaderProps {
  user: {
    id: string
    name: string
    email: string
    role: string
    status: string
    joinDate: string
    avatar?: string
    phone?: string
    location?: string
    bio?: string
    verified?: boolean
    subscriptionTier?: string
    subscriptionStatus?: string
  }
  onEdit: () => void
}

export function UserProfileHeader({ user, onEdit }: UserProfileHeaderProps) {
  // Format join date
  const formatJoinDate = (joinDate: string) => {
    const date = new Date(joinDate)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }
  
  // Get color for role badge
  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'manager':
        return 'bg-purple-100 text-purple-800'
      case 'editor':
        return 'bg-blue-100 text-blue-800'
      case 'customer':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  // Get color for status badge
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'suspended':
        return 'bg-amber-100 text-amber-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  // Get subscription tier details
  const getSubscriptionBadge = () => {
    if (!user.subscriptionTier) return null
    
    const tierColors: Record<string, string> = {
      'free': 'bg-gray-100 text-gray-800',
      'basic': 'bg-blue-100 text-blue-800',
      'premium': 'bg-purple-100 text-purple-800',
      'enterprise': 'bg-amber-100 text-amber-800'
    }
    
    const statusColors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'trialing': 'bg-blue-100 text-blue-800',
      'past_due': 'bg-red-100 text-red-800',
      'canceled': 'bg-gray-100 text-gray-800'
    }
    
    return (
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tierColors[user.subscriptionTier.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
          {user.subscriptionTier}
        </span>
        {user.subscriptionStatus && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.subscriptionStatus.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
            {user.subscriptionStatus}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* User Avatar and Basic Info */}
            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-4 md:w-1/4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col items-center md:items-center gap-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeVariant(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                
                {/* Subscription Info */}
                <div className="mt-2">
                  {getSubscriptionBadge()}
                </div>
                
                {/* Edit Profile Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 w-full"
                  onClick={onEdit}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            {/* Contact and Details */}
            <div className="md:w-3/4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Contact Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                      {user.verified && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    
                    {user.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Member since {formatJoinDate(user.joinDate)}</span>
                    </div>
                  </div>
                </div>
                
                {/* User Bio */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">About</h3>
                  <p className="text-muted-foreground">
                    {user.bio || "No bio information available."}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  View Activity
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  View Billing
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 