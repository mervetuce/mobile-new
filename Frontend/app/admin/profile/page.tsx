"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Mail, Phone, Shield, User } from "lucide-react"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@visify.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    joined: "January 15, 2022",
    avatarUrl: "",
  })

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementation for profile update
    alert("Profile updated successfully")
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementation for password change
    alert("Password changed successfully")
    setPassword({ current: "", new: "", confirm: "" })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData.avatarUrl} alt={`${profileData.firstName} ${profileData.lastName}`} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
                <p className="text-sm text-muted-foreground">{profileData.role}</p>
              </div>
              <div className="w-full pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member since {profileData.joined}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Edit Tabs */}
        <div className="md:col-span-3">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details here
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileUpdate}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={profileData.firstName}
                          onChange={e => setProfileData({...profileData, firstName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={profileData.lastName}
                          onChange={e => setProfileData({...profileData, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email}
                        onChange={e => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={profileData.phone}
                        onChange={e => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Profile Picture</Label>
                      <Input 
                        id="avatar" 
                        type="file" 
                        className="cursor-pointer"
                        onChange={e => {
                          // Handle file upload here
                          const file = e.target.files?.[0];
                          if (file) {
                            // You can process the file here or store it in state
                            console.log("File selected:", file.name);
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your password and account security
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordChange}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        type="password" 
                        value={password.current}
                        onChange={e => setPassword({...password, current: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        value={password.new}
                        onChange={e => setPassword({...password, new: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        value={password.confirm}
                        onChange={e => setPassword({...password, confirm: e.target.value})}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="font-medium mb-2">Password Requirements:</h3>
                      <ul className="space-y-1">
                        <li className="text-sm flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Minimum 8 characters
                        </li>
                        <li className="text-sm flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          At least one uppercase letter
                        </li>
                        <li className="text-sm flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          At least one number
                        </li>
                        <li className="text-sm flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          At least one special character
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Change Password</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 