"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Clock, 
  BarChart3, 
  CalendarDays, 
  LogIn 
} from "lucide-react"

interface UserActivityMetricsProps {
  user: {
    id: string
    name: string
    email: string
    lastLogin: string | null
    loginCount: number
    activityScore: number
    joinDate: string
  }
}

export function UserActivityMetrics({ user }: UserActivityMetricsProps) {
  // Format the last login date
  const formatLastLogin = (lastLogin: string | null) => {
    if (!lastLogin) return "Never logged in";
    
    const loginDate = new Date(lastLogin);
    const now = new Date();
    const diffMs = now.getTime() - loginDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Check if the login was today
    if (loginDate.toDateString() === now.toDateString()) {
      return `Today at ${loginDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if the login was yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (loginDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${loginDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if the login was within the last week
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }
    
    // Default to full date format
    return loginDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Calculate activity level based on score
  const getActivityLevel = (score: number) => {
    if (score >= 80) return { label: "High", color: "text-green-600" };
    if (score >= 50) return { label: "Medium", color: "text-yellow-600" };
    return { label: "Low", color: "text-red-600" };
  };
  
  const activityLevel = getActivityLevel(user.activityScore);
  
  // Format join date
  const formatJoinDate = (joinDate: string) => {
    const date = new Date(joinDate);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Calculate membership duration
  const getMembershipDuration = (joinDate: string) => {
    const start = new Date(joinDate);
    const now = new Date();
    
    const diffYears = now.getFullYear() - start.getFullYear();
    const diffMonths = now.getMonth() - start.getMonth();
    const totalMonths = (diffYears * 12) + diffMonths;
    
    if (totalMonths < 1) {
      // Calculate days
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.round(Math.abs((now.getTime() - start.getTime()) / oneDay));
      return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    }
    
    if (totalMonths < 12) {
      return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
    }
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
    
    return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">User Activity Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Login</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatLastLogin(user.lastLogin)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Login Count</CardTitle>
            <LogIn className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.loginCount}</div>
            <p className="text-xs text-muted-foreground">Total logins</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold">{user.activityScore}</div>
              <div className={`text-sm font-medium ${activityLevel.color}`}>
                {activityLevel.label}
              </div>
            </div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  user.activityScore >= 80 ? 'bg-green-500' : 
                  user.activityScore >= 50 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`} 
                style={{ width: `${user.activityScore}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatJoinDate(user.joinDate)}</div>
            <p className="text-xs text-muted-foreground">{getMembershipDuration(user.joinDate)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 