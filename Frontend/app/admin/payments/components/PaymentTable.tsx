"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, Eye, MoreHorizontal, Receipt, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define the Payment type
type Payment = {
  id: string
  amount: number
  status: "successful" | "pending" | "failed" | "refunded"
  email: string
  name: string
  paymentMethod: string
  date: string
  transactionId: string
  service: string
  avatarUrl?: string
}

// Sample data
const payments: Payment[] = [
  {
    id: "p1",
    amount: 299.99,
    status: "successful",
    email: "john.doe@example.com",
    name: "John Doe",
    paymentMethod: "Credit Card",
    date: "2023-03-15T12:30:00",
    transactionId: "txn_1234567890",
    service: "Tourist Visa - Premium",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p2",
    amount: 199.5,
    status: "successful",
    email: "sarah.smith@example.com",
    name: "Sarah Smith",
    paymentMethod: "PayPal",
    date: "2023-03-14T10:15:00",
    transactionId: "txn_0987654321",
    service: "Business Visa - Standard",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p3",
    amount: 149.99,
    status: "pending",
    email: "mike.johnson@example.com",
    name: "Mike Johnson",
    paymentMethod: "Bank Transfer",
    date: "2023-03-14T09:45:00",
    transactionId: "txn_5678901234",
    service: "Student Visa - Basic",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p4",
    amount: 399.99,
    status: "failed",
    email: "emily.brown@example.com",
    name: "Emily Brown",
    paymentMethod: "Credit Card",
    date: "2023-03-13T16:20:00",
    transactionId: "txn_3456789012",
    service: "Work Visa - Premium",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p5",
    amount: 249.99,
    status: "refunded",
    email: "david.wilson@example.com",
    name: "David Wilson",
    paymentMethod: "PayPal",
    date: "2023-03-12T14:10:00",
    transactionId: "txn_6789012345",
    service: "Tourist Visa - Standard",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p6",
    amount: 349.99,
    status: "successful",
    email: "lisa.taylor@example.com",
    name: "Lisa Taylor",
    paymentMethod: "Credit Card",
    date: "2023-03-11T11:05:00",
    transactionId: "txn_9012345678",
    service: "Business Visa - Premium",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p7",
    amount: 199.99,
    status: "successful",
    email: "robert.miller@example.com",
    name: "Robert Miller",
    paymentMethod: "Bank Transfer",
    date: "2023-03-10T15:30:00",
    transactionId: "txn_2345678901",
    service: "Student Visa - Standard",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p8",
    amount: 299.99,
    status: "pending",
    email: "jennifer.davis@example.com",
    name: "Jennifer Davis",
    paymentMethod: "Credit Card",
    date: "2023-03-09T13:45:00",
    transactionId: "txn_8901234567",
    service: "Work Visa - Standard",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p9",
    amount: 449.99,
    status: "successful",
    email: "michael.anderson@example.com",
    name: "Michael Anderson",
    paymentMethod: "PayPal",
    date: "2023-03-08T10:20:00",
    transactionId: "txn_4567890123",
    service: "Tourist Visa - Premium Plus",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p10",
    amount: 179.99,
    status: "failed",
    email: "jessica.thomas@example.com",
    name: "Jessica Thomas",
    paymentMethod: "Credit Card",
    date: "2023-03-07T09:15:00",
    transactionId: "txn_7890123456",
    service: "Business Visa - Basic",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p11",
    amount: 229.99,
    status: "successful",
    email: "william.jackson@example.com",
    name: "William Jackson",
    paymentMethod: "Bank Transfer",
    date: "2023-03-06T14:50:00",
    transactionId: "txn_0123456789",
    service: "Student Visa - Premium",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "p12",
    amount: 399.99,
    status: "refunded",
    email: "olivia.white@example.com",
    name: "Olivia White",
    paymentMethod: "PayPal",
    date: "2023-03-05T11:30:00",
    transactionId: "txn_5432109876",
    service: "Work Visa - Premium",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

// Define the columns
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={payment.avatarUrl} alt={payment.name} />
            <AvatarFallback>{payment.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{payment.name}</span>
            <span className="text-xs text-muted-foreground">{payment.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "successful"
              ? "success"
              : status === "pending"
                ? "outline"
                : status === "failed"
                  ? "destructive"
                  : "secondary"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      const [open, setOpen] = useState(false)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Receipt className="mr-2 h-4 w-4" />
                Download receipt
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={payment.status === "refunded"}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Process refund
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Transaction Details</DialogTitle>
                <DialogDescription>Complete information about this transaction</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Transaction ID:</span>
                  <span className="text-sm">{payment.transactionId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Customer:</span>
                  <span className="text-sm">{payment.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm">{payment.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Service:</span>
                  <span className="text-sm">{payment.service}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Amount:</span>
                  <span className="text-sm font-bold">${payment.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Payment Method:</span>
                  <span className="text-sm">{payment.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">{new Date(payment.date).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge
                    variant={
                      payment.status === "successful"
                        ? "success"
                        : payment.status === "pending"
                          ? "outline"
                          : payment.status === "failed"
                            ? "destructive"
                            : "secondary"
                    }
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]

interface PaymentTableProps {
  limit?: number
}

export function PaymentTable({ limit }: PaymentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const data = limit ? payments.slice(0, limit) : payments

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      {!limit && (
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Filter by customer name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue(undefined)}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("successful")}>
                Successful
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("failed")}>
                Failed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("refunded")}>
                Refunded
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!limit && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

