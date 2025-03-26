"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface ServiceFormProps {
  service?: any
  onSave: () => void
  onCancel: () => void
}

export function ServiceForm({ service, onSave, onCancel }: ServiceFormProps) {
  const isEditing = !!service

  const [formData, setFormData] = useState({
    name: service?.name || "",
    type: service?.type || "service",
    price: service?.price || "",
    processingTime: service?.processingTime || "",
    status: service?.status || "draft",
    description: service?.description || "",
    requirements: service?.requirements || "",
    features: service?.features || [],
    seoTitle: service?.seoTitle || "",
    seoDescription: service?.seoDescription || "",
    seoKeywords: service?.seoKeywords || "",
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form validation would go here
    onSave()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Service" : "Add New Service"}</CardTitle>
          <CardDescription>
            {isEditing
              ? "Update the details of an existing visa service or package."
              : "Create a new visa service or package to offer to your customers."}
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue="basic" className="w-full">
          <CardContent className="pt-6">
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="details">Details & Requirements</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Options</TabsTrigger>
              <TabsTrigger value="seo">SEO Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Tourist Visa"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service">Individual Service</SelectItem>
                      <SelectItem value="package">Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the service or package..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => handleChange("status", checked ? "active" : "draft")}
                />
                <Label htmlFor="status">{formData.status === "active" ? "Active" : "Draft"}</Label>
                <span className="text-sm text-muted-foreground ml-2">
                  {formData.status === "active"
                    ? "This service is visible to customers"
                    : "This service is hidden from customers"}
                </span>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="List all required documents and conditions..."
                  rows={6}
                  value={formData.requirements}
                  onChange={(e) => handleChange("requirements", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  List all documents and conditions required for this visa service.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Features & Benefits</Label>
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Feature ${index}`}
                        value={formData.features[index - 1] || ""}
                        onChange={(e) => {
                          const newFeatures = [...formData.features]
                          newFeatures[index - 1] = e.target.value
                          handleChange("features", newFeatures)
                        }}
                      />
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm">
                  Add Feature
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 149.99"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="processingTime">Processing Time</Label>
                  <Input
                    id="processingTime"
                    placeholder="e.g., 5-7 business days"
                    value={formData.processingTime}
                    onChange={(e) => handleChange("processingTime", e.target.value)}
                  />
                </div>
              </div>

              {formData.type === "package" && (
                <div className="space-y-4">
                  <Label>Included Services</Label>
                  <div className="border rounded-md p-4">
                    <p className="text-sm text-muted-foreground mb-4">Select the services included in this package:</p>
                    {["Tourist Visa", "Visa Processing", "Document Check", "Express Processing"].map((service) => (
                      <div key={service} className="flex items-center space-x-2 mb-2">
                        <Switch id={`service-${service}`} />
                        <Label htmlFor={`service-${service}`}>{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Discounts & Promotions</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input id="discount" type="number" placeholder="e.g., 10" min="0" max="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validUntil">Valid Until</Label>
                    <Input id="validUntil" type="date" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  placeholder="SEO optimized title"
                  value={formData.seoTitle}
                  onChange={(e) => handleChange("seoTitle", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Recommended length: 50-60 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">Meta Description</Label>
                <Textarea
                  id="seoDescription"
                  placeholder="Brief description for search engines"
                  rows={3}
                  value={formData.seoDescription}
                  onChange={(e) => handleChange("seoDescription", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Recommended length: 150-160 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoKeywords">Keywords</Label>
                <Input
                  id="seoKeywords"
                  placeholder="e.g., visa, tourist visa, travel"
                  value={formData.seoKeywords}
                  onChange={(e) => handleChange("seoKeywords", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Separate keywords with commas</p>
              </div>

              <div className="border rounded-md p-4 bg-muted/50">
                <h4 className="text-sm font-medium mb-2">Google Search Preview</h4>
                <div className="space-y-1">
                  <p className="text-blue-600 text-base font-medium truncate">
                    {formData.seoTitle || "Service Title - Visify"}
                  </p>
                  <p className="text-green-700 text-sm">
                    https://visify.com/services/{formData.name.toLowerCase().replace(/\s+/g, "-") || "service-name"}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {formData.seoDescription ||
                      "Description of the visa service will appear here. Make sure to write a compelling description that encourages users to click."}
                  </p>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>

        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{isEditing ? "Update Service" : "Create Service"}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

