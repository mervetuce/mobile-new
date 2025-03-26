"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceTable, ServiceForm } from "./components"
import { useSearchParams } from "next/navigation"

export default function ServicesPage() {
  const searchParams = useSearchParams()
  const [isAddingService, setIsAddingService] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)

  // Check URL parameters when component mounts
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setIsAddingService(true)
    }
  }, [searchParams])

  const handleAddNew = () => {
    setEditingService(null)
    setIsAddingService(true)
  }

  const handleEdit = (service: any) => {
    setEditingService(service)
    setIsAddingService(true)
  }

  const handleCancel = () => {
    setIsAddingService(false)
    setEditingService(null)
  }

  const handleSave = () => {
    // Save logic would go here
    setIsAddingService(false)
    setEditingService(null)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Visa Services & Packages</h1>
        {!isAddingService && (
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Button>
        )}
      </div>

      {isAddingService ? (
        <ServiceForm service={editingService} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <ServiceTable onEdit={handleEdit} />
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            <ServiceTable onEdit={handleEdit} filter="active" />
          </TabsContent>
          <TabsContent value="draft" className="space-y-4">
            <ServiceTable onEdit={handleEdit} filter="draft" />
          </TabsContent>
          <TabsContent value="packages" className="space-y-4">
            <ServiceTable onEdit={handleEdit} filter="package" />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

