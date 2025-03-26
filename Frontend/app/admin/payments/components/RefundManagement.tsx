"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Define the Refund type
type RefundRequest = {
  id: string
  customerName: string
  customerEmail: string
  amount: number
  reason: string
  date: string
  status: "pending" | "approved" | "rejected"
  transactionId: string
  service: string
  avatarUrl?: string
}

// Sample data
const refundRequests: RefundRequest[] = [
  {
    id: "r1",
    customerName: "David Wilson",
    customerEmail: "david.wilson@example.com",
    amount: 249.99,
    reason: "Service not as described",
    date: "2023-03-12T14:10:00",
    status: "pending",
    transactionId: "txn_6789012345",
    service: "Tourist Visa - Standard",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "r2",
    customerName: "Olivia White",
    customerEmail: "olivia.white@example.com",
    amount: 399.99,
    reason: "Changed travel plans",
    date: "2023-03-05T11:30:00",
    status: "pending",
    transactionId: "txn_5432109876",
    service: "Work Visa - Premium",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "r3",
    customerName: "Jessica Thomas",
    customerEmail: "jessica.thomas@example.com",
    amount: 179.99,
    reason: "Visa application rejected",
    date: "2023-03-07T09:15:00",
    status: "pending",
    transactionId: "txn_7890123456",
    service: "Business Visa - Basic",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "r4",
    customerName: "Robert Miller",
    customerEmail: "robert.miller@example.com",
    amount: 199.99,
    reason: "Duplicate payment",
    date: "2023-03-10T15:30:00",
    status: "pending",
    transactionId: "txn_2345678901",
    service: "Student Visa - Standard",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "r5",
    customerName: "Jennifer Davis",
    customerEmail: "jennifer.davis@example.com",
    amount: 299.99,
    reason: "Service too slow",
    date: "2023-03-09T13:45:00",
    status: "pending",
    transactionId: "txn_8901234567",
    service: "Work Visa - Standard",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "r6",
    customerName: "Michael Anderson",
    customerEmail: "michael.anderson@example.com",
    amount: 449.99,
    reason: "Unsatisfied with service",
    date: "2023-03-08T10:20:00",
    status: "pending",
    transactionId: "txn_4567890123",
    service: "Tourist Visa - Premium Plus",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "r7",
    customerName: "Emily Brown",
    customerEmail: "emily.brown@example.com",
    amount: 399.99,
    reason: "Changed destination",
    date: "2023-03-13T16:20:00",
    status: "pending",
    transactionId: "txn_3456789012",
    service: "Work Visa - Premium",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

interface RefundManagementProps {
  limit?: number
}

export function RefundManagement({ limit }: RefundManagementProps) {
  const [requests, setRequests] = useState<RefundRequest[]>(refundRequests)
  const [selectedRequest, setSelectedRequest] = useState<RefundRequest | null>(null)
  const [dialogType, setDialogType] = useState<"approve" | "reject" | null>(null)
  const [note, setNote] = useState("")

  const data = limit ? requests.slice(0, limit) : requests

  const handleApprove = (request: RefundRequest) => {
    setSelectedRequest(request)
    setDialogType("approve")
  }

  const handleReject = (request: RefundRequest) => {
    setSelectedRequest(request)
    setDialogType("reject")
  }

  const confirmAction = () => {
    if (!selectedRequest) return

    const updatedRequests = requests.map((req) => {
      if (req.id === selectedRequest.id) {
        return {
          ...req,
          status: dialogType === "approve" ? "approved" : "rejected",
        }
      }
      return req
    })

    setRequests(updatedRequests)
    setSelectedRequest(null)
    setDialogType(null)
    setNote("")
  }

  return (
    <div className="space-y-4">
      {data.map((request) => (
        <Card key={request.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={request.avatarUrl} alt={request.customerName} />
                  <AvatarFallback>{request.customerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{request.customerName}</h4>
                  <p className="text-xs text-muted-foreground">{request.customerEmail}</p>
                </div>
              </div>
              <Badge variant="outline">${request.amount.toFixed(2)}</Badge>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Service:</p>
                <p className="font-medium">{request.service}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Date:</p>
                <p className="font-medium">{new Date(request.date).toLocaleDateString()}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Reason:</p>
                <p className="font-medium">{request.reason}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleReject(request)}
              >
                <XCircle className="mr-1 h-4 w-4" />
                Reject
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-green-500 hover:text-green-700 hover:bg-green-50"
                onClick={() => handleApprove(request)}
              >
                <CheckCircle className="mr-1 h-4 w-4" />
                Approve
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No pending refund requests</p>
        </div>
      )}

      <Dialog open={dialogType !== null} onOpenChange={() => setDialogType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogType === "approve" ? "Approve Refund Request" : "Reject Refund Request"}</DialogTitle>
            <DialogDescription>
              {dialogType === "approve"
                ? "Are you sure you want to approve this refund request? This action cannot be undone."
                : "Are you sure you want to reject this refund request? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-2">
              <div className="flex justify-between">
                <span className="font-medium">Customer:</span>
                <span>{selectedRequest.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Amount:</span>
                <span>${selectedRequest.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Service:</span>
                <span>{selectedRequest.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Reason:</span>
                <span>{selectedRequest.reason}</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Add a note (optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Enter a note about this decision..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogType(null)}>
              Cancel
            </Button>
            <Button variant={dialogType === "approve" ? "default" : "destructive"} onClick={confirmAction}>
              {dialogType === "approve" ? "Approve Refund" : "Reject Refund"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

