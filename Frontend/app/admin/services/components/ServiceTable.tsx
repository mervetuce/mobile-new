"use client"

import { useState } from "react"
import { MoreHorizontal, ArrowUpDown, Edit, Trash, Eye, Copy } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for services
const mockServices = [
  {
    id: 1,
    name: "Tourist Visa",
    type: "service",
    price: 149.99,
    processingTime: "5-7 business days",
    status: "active",
    popularity: "High",
    lastUpdated: "2023-12-15",
  },
  {
    id: 2,
    name: "Business Visa",
    type: "service",
    price: 249.99,
    processingTime: "3-5 business days",
    status: "active",
    popularity: "Medium",
    lastUpdated: "2023-12-10",
  },
  {
    id: 3,
    name: "Student Visa",
    type: "service",
    price: 199.99,
    processingTime: "7-10 business days",
    status: "active",
    popularity: "Medium",
    lastUpdated: "2023-12-05",
  },
  {
    id: 4,
    name: "Work Visa",
    type: "service",
    price: 299.99,
    processingTime: "10-15 business days",
    status: "draft",
    popularity: "Low",
    lastUpdated: "2023-11-28",
  },
  {
    id: 5,
    name: "Premium Travel Package",
    type: "package",
    price: 499.99,
    processingTime: "2-3 business days",
    status: "active",
    popularity: "High",
    lastUpdated: "2023-12-18",
  },
  {
    id: 6,
    name: "Family Visa Bundle",
    type: "package",
    price: 599.99,
    processingTime: "5-7 business days",
    status: "active",
    popularity: "Medium",
    lastUpdated: "2023-12-12",
  },
  {
    id: 7,
    name: "Express Business Package",
    type: "package",
    price: 799.99,
    processingTime: "1-2 business days",
    status: "draft",
    popularity: "Low",
    lastUpdated: "2023-11-20",
  },
]

interface ServiceTableProps {
  onEdit: (service: any) => void
  filter?: "active" | "draft" | "package" | string
}

export function ServiceTable({ onEdit, filter }: ServiceTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<any>(null)

  // Filter services based on the filter prop and search term
  const filteredServices = mockServices.filter((service) => {
    // Apply tab filter
    if (filter === "active" && service.status !== "active") return false
    if (filter === "draft" && service.status !== "draft") return false
    if (filter === "package" && service.type !== "package") return false

    // Apply search filter
    if (searchTerm && !service.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    return true
  })

  const handleDeleteClick = (service: any) => {
    setServiceToDelete(service)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Delete logic would go here
    setDeleteDialogOpen(false)
    setServiceToDelete(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="service">Services Only</SelectItem>
              <SelectItem value="package">Packages Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                  <span>Service Name</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                  <span>Price</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Processing Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Popularity</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No services found.
                </TableCell>
              </TableRow>
            ) : (
              filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>
                    <Badge variant={service.type === "package" ? "secondary" : "outline"}>
                      {service.type === "package" ? "Package" : "Service"}
                    </Badge>
                  </TableCell>
                  <TableCell>${service.price.toFixed(2)}</TableCell>
                  <TableCell>{service.processingTime}</TableCell>
                  <TableCell>
                    <Badge variant={service.status === "active" ? "success" : "default"}>
                      {service.status === "active" ? "Active" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        service.popularity === "High"
                          ? "destructive"
                          : service.popularity === "Medium"
                            ? "warning"
                            : "default"
                      }
                    >
                      {service.popularity}
                    </Badge>
                  </TableCell>
                  <TableCell>{service.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit(service)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(service)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredServices.length}</span> of{" "}
          <span className="font-medium">{mockServices.length}</span> services
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this service?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the service
              {serviceToDelete && <span className="font-semibold"> "{serviceToDelete.name}"</span>}
              and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

