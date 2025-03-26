import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoleManagement } from "./components/RoleManagement"
import { SecurityLogs } from "./components/SecurityLogs"
import { APIKeys } from "./components/APIKeys"
import { SystemSettings } from "./components/SystemSettings"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-gray-500 mt-2">Manage system settings, roles, and security</p>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="security">Security Logs</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="roles">
          <RoleManagement />
        </TabsContent>
        <TabsContent value="security">
          <SecurityLogs />
        </TabsContent>
        <TabsContent value="api">
          <APIKeys />
        </TabsContent>
        <TabsContent value="system">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

