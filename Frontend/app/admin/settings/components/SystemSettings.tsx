"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

export function SystemSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Visify",
    siteDescription: "Expert guidance for visa applications and personalized travel planning",
    supportEmail: "support@visify.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Travel Street, Global City, 10001",
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@visify.com",
    smtpPassword: "••••••••••••",
    fromEmail: "no-reply@visify.com",
    fromName: "Visify Support",
  })

  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmailChange = (e) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-gray-500">Configure global system settings</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic information about your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    name="supportEmail"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={generalSettings.address} onChange={handleGeneralChange} />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">System Preferences</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <Switch id="maintenanceMode" />
                  </div>
                  <p className="text-xs text-gray-500">
                    When enabled, the website will display a maintenance message to visitors
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="userRegistration">Allow User Registration</Label>
                    <Switch id="userRegistration" defaultChecked />
                  </div>
                  <p
                    className="text-xs text-gray
-500"
                  >
                    Allow new users to register on the website
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="debugMode">Debug Mode</Label>
                    <Switch id="debugMode" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Enable detailed error messages (not recommended for production)
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save General Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="email" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email server settings for notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" name="smtpPort" value={emailSettings.smtpPort} onChange={handleEmailChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input id="fromEmail" name="fromEmail" value={emailSettings.fromEmail} onChange={handleEmailChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input id="fromName" name="fromName" value={emailSettings.fromName} onChange={handleEmailChange} />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="userRegistration">User Registration</Label>
                    <Switch id="userRegistration" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newOrder">New Order</Label>
                    <Switch id="newOrder" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="supportTicket">Support Ticket</Label>
                    <Switch id="supportTicket" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="passwordReset">Password Reset</Label>
                    <Switch id="passwordReset" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Test Email</Button>
              <Button>Save Email Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="integrations" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>Connect external services and APIs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Gateways</h3>

                <div className="space-y-2 border p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Stripe</div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Connected</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="stripePublic">Public Key</Label>
                      <Input id="stripePublic" value="pk_test_•••••••••••••••••••••••••" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripeSecret">Secret Key</Label>
                      <Input id="stripeSecret" type="password" value="sk_test_•••••••••••••••••••••••••" readOnly />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">PayPal</div>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Not Connected</span>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    Connect PayPal
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Analytics & Tracking</h3>

                <div className="space-y-2 border p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Google Analytics</div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Connected</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="gaTrackingId">Tracking ID</Label>
                    <Input id="gaTrackingId" value="UA-123456789-1" />
                  </div>
                </div>

                <div className="space-y-2 border p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Facebook Pixel</div>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Not Connected</span>
                    </div>
                    <Switch />
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="fbPixelId">Pixel ID</Label>
                    <Input id="fbPixelId" placeholder="Enter your Facebook Pixel ID" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Integration Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

