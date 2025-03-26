"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, 
  Calendar, 
  ArrowUpRight, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Package
} from "lucide-react"

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: string
  features: string[]
  limits: {
    storage: number
    users: number
    projects: number
  }
  isCurrentPlan: boolean
}

interface BillingHistoryItem {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  invoiceUrl?: string
}

interface UsageMetric {
  name: string
  used: number
  limit: number
  percentUsed: number
}

interface UserSubscriptionInfoProps {
  user: {
    id: string
    name: string
    email: string
    subscriptionTier?: string
    subscriptionStatus?: string
    subscriptionRenewDate?: string
    paymentMethod?: {
      brand: string
      last4: string
      expiryMonth: number
      expiryYear: number
    }
  }
  billingHistory: BillingHistoryItem[]
  availablePlans: SubscriptionPlan[]
  usage: UsageMetric[]
}

export function UserSubscriptionInfo({ 
  user, 
  billingHistory, 
  availablePlans,
  usage
}: UserSubscriptionInfoProps) {
  
  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
  
  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }
  
  // Format storage size helper
  const formatStorageSize = (sizeInMB: number) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(1)} GB`
    }
    return `${sizeInMB.toFixed(0)} MB`
  }
  
  // Get status badge for billing history
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Paid
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Calendar className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subscription">Current Plan</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
          <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
        </TabsList>
        
        {/* Current Subscription Tab */}
        <TabsContent value="subscription" className="space-y-4">
          {/* Current Plan Details */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>
                {user.subscriptionTier 
                  ? `${user.name} is currently on the ${user.subscriptionTier} plan`
                  : "No active subscription"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Plan */}
              {user.subscriptionTier ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{user.subscriptionTier} Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.subscriptionStatus === 'active' 
                          ? `Renews on ${user.subscriptionRenewDate ? formatDate(user.subscriptionRenewDate) : 'N/A'}`
                          : `Status: ${user.subscriptionStatus || 'N/A'}`
                        }
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage Plan
                    </Button>
                  </div>
                  
                  {/* Payment Method */}
                  {user.paymentMethod && (
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-2">Payment Method</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              {user.paymentMethod.brand} ••••{user.paymentMethod.last4}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Expires {user.paymentMethod.expiryMonth}/{user.paymentMethod.expiryYear}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Update</Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-center p-6">
                  <div className="text-center">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No Active Subscription</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This user doesn't have an active subscription plan.
                    </p>
                    <Button className="mt-4">Add Subscription</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Available Plans */}
          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>
                Compare plans and upgrade options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {availablePlans.map((plan) => (
                  <Card key={plan.id} className={`border ${plan.isCurrentPlan ? 'border-blue-500' : ''}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        {plan.isCurrentPlan && (
                          <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                        )}
                      </div>
                      <CardDescription className="text-2xl font-bold">
                        {formatCurrency(plan.price)}<span className="text-sm font-normal">/{plan.interval}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <ul className="space-y-2 text-sm">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Storage</span>
                          <span>{formatStorageSize(plan.limits.storage)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Users</span>
                          <span>{plan.limits.users}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Projects</span>
                          <span>{plan.limits.projects}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant={plan.isCurrentPlan ? "outline" : "default"}
                        className="w-full"
                        disabled={plan.isCurrentPlan}
                      >
                        {plan.isCurrentPlan ? "Current Plan" : "Change to This Plan"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Billing History Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View past invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              {billingHistory.length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 p-4 font-medium border-b">
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div className="text-right">Invoice</div>
                  </div>
                  <div>
                    {billingHistory.map((item) => (
                      <div 
                        key={item.id} 
                        className="grid grid-cols-4 p-4 items-center border-b last:border-0 hover:bg-muted/50"
                      >
                        <div>{formatDate(item.date)}</div>
                        <div>{formatCurrency(item.amount)}</div>
                        <div>{getStatusBadge(item.status)}</div>
                        <div className="text-right">
                          {item.invoiceUrl ? (
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Download className="h-4 w-4" />
                              PDF
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">N/A</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-6">
                  <div className="text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No Billing History</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This user doesn't have any billing history yet.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Usage & Limits Tab */}
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage</CardTitle>
              <CardDescription>
                View current usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {usage.map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{metric.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {metric.name === 'Storage' 
                            ? `${formatStorageSize(metric.used)} of ${formatStorageSize(metric.limit)} used` 
                            : `${metric.used} of ${metric.limit} used`}
                        </p>
                      </div>
                      <span className={`text-sm font-medium ${
                        metric.percentUsed > 90 ? 'text-red-600' : 
                        metric.percentUsed > 75 ? 'text-amber-600' : 
                        'text-muted-foreground'
                      }`}>
                        {metric.percentUsed}%
                      </span>
                    </div>
                    <Progress value={metric.percentUsed} className={`h-2 ${
                      metric.percentUsed > 90 ? 'bg-red-100' : 
                      metric.percentUsed > 75 ? 'bg-amber-100' : 
                      'bg-muted'
                    }`} />
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Detailed Usage Reports
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 