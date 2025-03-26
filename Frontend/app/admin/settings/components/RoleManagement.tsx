"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus, Save, Trash } from "lucide-react"

const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all features and settings",
    users: 2,
    permissions: {
      dashboard: { view: true, edit: true },
      users: { view: true, create: true, edit: true, delete: true },
      services: { view: true, create: true, edit: true, delete: true },
      payments: { view: true, create: true, edit: true, delete: true },
      content: { view: true, create: true, edit: true, delete: true },
      support: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, create: true, edit: true, delete: true },
    },
  },
  {
    id: 2,
    name: "Admin",
    description: "Access to most features except settings",
    users: 5,
    permissions: {
      dashboard: { view: true, edit: true },
      users: { view: true, create: true, edit: true, delete: false },
      services: { view: true, create: true, edit: true, delete: false },
      payments: { view: true, create: true, edit: true, delete: false },
      content: { view: true, create: true, edit: true, delete: false },
      support: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, create: true, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    },
  },
  {
    id: 3,
    name: "Content Editor",
    description: "Can manage website content only",
    users: 8,
    permissions: {
      dashboard: { view: true, edit: false },
      users: { view: false, create: false, edit: false, delete: false },
      services: { view: true, create: false, edit: false, delete: false },
      payments: { view: false, create: false, edit: false, delete: false },
      content: { view: true, create: true, edit: true, delete: false },
      support: { view: false, create: false, edit: false, delete: false },
      reports: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    },
  },
  {
    id: 4,
    name: "Support Agent",
    description: "Can manage support tickets only",
    users: 12,
    permissions: {
      dashboard: { view: true, edit: false },
      users: { view: true, create: false, edit: false, delete: false },
      services: { view: true, create: false, edit: false, delete: false },
      payments: { view: false, create: false, edit: false, delete: false },
      content: { view: false, create: false, edit: false, delete: false },
      support: { view: true, create: true, edit: true, delete: false },
      reports: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    },
  },
]

export function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [editMode, setEditMode] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Roles & Permissions</h2>
          <p className="text-gray-500">Manage admin roles and access permissions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Available Roles</CardTitle>
              <CardDescription>Select a role to view or edit permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedRole?.id === role.id ? "border-black bg-gray-50" : "hover:border-gray-400"
                    }`}
                    onClick={() => {
                      setSelectedRole(role)
                      setEditMode(false)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{role.name}</h3>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{role.users} users</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedRole ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedRole.name}</CardTitle>
                    <CardDescription>{selectedRole.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {editMode ? (
                      <Button onClick={() => setEditMode(false)}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={() => setEditMode(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Role
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {editMode && (
                    <div className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="roleName">Role Name</Label>
                        <Input id="roleName" defaultValue={selectedRole.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="roleDescription">Description</Label>
                        <Input id="roleDescription" defaultValue={selectedRole.description} />
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-medium mb-4">Permissions</h3>
                    <div className="border rounded-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Module</TableHead>
                            <TableHead className="text-center">View</TableHead>
                            <TableHead className="text-center">Create</TableHead>
                            <TableHead className="text-center">Edit</TableHead>
                            <TableHead className="text-center">Delete</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(selectedRole.permissions).map(([module, permissions]) => (
                            <TableRow key={module}>
                              <TableCell className="font-medium capitalize">{module}</TableCell>
                              <TableCell className="text-center">
                                <Checkbox checked={permissions.view} disabled={!editMode} />
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox checked={permissions.create} disabled={!editMode || !permissions.view} />
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox checked={permissions.edit} disabled={!editMode || !permissions.view} />
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox checked={permissions.delete} disabled={!editMode || !permissions.view} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {editMode && (
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Role
                      </Button>
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-md p-12">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">No Role Selected</h3>
                <p className="text-gray-500 mb-4">Select a role from the list to view or edit its permissions</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

