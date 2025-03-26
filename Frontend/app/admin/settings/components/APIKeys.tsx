"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Copy, Eye, EyeOff, Plus, RefreshCw, Trash } from "lucide-react"

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "vis_prod_a1b2c3d4e5f6g7h8i9j0",
    created: "2023-09-15",
    lastUsed: "2023-10-16",
    status: "Active",
  },
  {
    id: 2,
    name: "Development API Key",
    key: "vis_dev_z9y8x7w6v5u4t3s2r1q0",
    created: "2023-10-01",
    lastUsed: "2023-10-15",
    status: "Active",
  },
  {
    id: 3,
    name: "Test API Key",
    key: "vis_test_j9i8h7g6f5e4d3c2b1a0",
    created: "2023-10-10",
    lastUsed: "2023-10-12",
    status: "Inactive",
  },
]

export function APIKeys() {
  const [showKeys, setShowKeys] = useState(false)
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")

  const toggleShowKeys = () => {
    setShowKeys(!showKeys)
  }

  const handleCreateKey = () => {
    // Handle API key creation
    console.log("Creating new API key:", newKeyName)
    setShowNewKeyForm(false)
    setNewKeyName("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">API Keys</h2>
          <p className="text-gray-500">Manage API keys for external integrations</p>
        </div>
        <Button onClick={() => setShowNewKeyForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Generate New Key
        </Button>
      </div>

      {showNewKeyForm && (
        <Card>
          <CardHeader>
            <CardTitle>Generate New API Key</CardTitle>
            <CardDescription>Create a new API key for external integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">API Key Name</Label>
                <Input
                  id="keyName"
                  placeholder="e.g., Production API Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
                <p className="text-sm text-gray-500">Give your API key a descriptive name to identify its purpose</p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  API keys provide full access to your account. Keep them secure and never share them in public
                  repositories or client-side code.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowNewKeyForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey} disabled={!newKeyName.trim()}>
              Generate API Key
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your API Keys</CardTitle>
            <Button variant="outline" size="sm" onClick={toggleShowKeys}>
              {showKeys ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide Keys
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Show Keys
                </>
              )}
            </Button>
          </div>
          <CardDescription>API keys allow external applications to access the Visify API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell className="font-medium">{apiKey.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {showKeys ? apiKey.key : apiKey.key.substring(0, 8) + "•••••••••••••"}
                        </code>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{apiKey.created}</TableCell>
                    <TableCell>{apiKey.lastUsed}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          apiKey.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {apiKey.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

