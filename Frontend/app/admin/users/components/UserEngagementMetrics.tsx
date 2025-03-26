"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { 
  ChevronUp, 
  ChevronDown, 
  ArrowRight, 
  Clock, 
  MousePointer,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  ShoppingCart,
  BarChart3,
  Eye
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EngagementMetric {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
}

interface TimeSeriesData {
  name: string
  data: Array<{
    date: string
    value: number
  }>
}

interface ContentInteraction {
  id: string
  title: string
  type: 'page' | 'post' | 'product' | 'comment'
  date: string
  duration?: number
  action?: string
}

interface UserEngagementMetricsProps {
  userId: string
  metrics: EngagementMetric[]
  timeSeriesData: TimeSeriesData[]
  recentInteractions: ContentInteraction[]
  topContent: ContentInteraction[]
}

export function UserEngagementMetrics({
  userId,
  metrics,
  timeSeriesData,
  recentInteractions,
  topContent
}: UserEngagementMetricsProps) {
  
  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  // Format time duration helper (converts minutes to readable format)
  const formatDuration = (minutes: number) => {
    if (!minutes) return "N/A"
    
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }
  
  // Get icon for content type
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
        return <BookOpen className="h-4 w-4" />
      case 'post':
        return <MessageSquare className="h-4 w-4" />
      case 'product':
        return <ShoppingCart className="h-4 w-4" />
      case 'comment':
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }
  
  // Get color for trend
  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      case 'neutral':
        return 'text-gray-600'
    }
  }
  
  // Get icon for trend
  const getTrendIcon = (trend: 'up' | 'down' | 'neutral', change: number) => {
    switch (trend) {
      case 'up':
        return (
          <div className="flex items-center text-green-600">
            <ChevronUp className="h-4 w-4 mr-1" />
            <span>{change}%</span>
          </div>
        )
      case 'down':
        return (
          <div className="flex items-center text-red-600">
            <ChevronDown className="h-4 w-4 mr-1" />
            <span>{Math.abs(change)}%</span>
          </div>
        )
      case 'neutral':
        return (
          <div className="flex items-center text-gray-500">
            <ArrowRight className="h-4 w-4 mr-1" />
            <span>0%</span>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="time-series">Time Series</TabsTrigger>
          <TabsTrigger value="content">Content Engagement</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <Card key={metric.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.name}
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    {getTrendIcon(metric.trend, metric.change)}
                    <span className="ml-1">from last month</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Interactions */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest user interactions with the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentInteractions.slice(0, 5).map((interaction) => (
                    <div key={interaction.id} className="flex items-start">
                      <div className="mr-4 mt-1">
                        <Badge className="flex h-8 w-8 items-center justify-center rounded-full">
                          {getContentTypeIcon(interaction.type)}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {interaction.action || `Viewed ${interaction.type}`}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {interaction.title}
                        </p>
                        <div className="flex items-center pt-1">
                          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(interaction.date)}
                            {interaction.duration && ` · ${formatDuration(interaction.duration)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {recentInteractions.length === 0 && (
                    <div className="flex justify-center py-8">
                      <div className="text-center">
                        <MousePointer className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                        <h3 className="mt-4 text-lg font-medium">No Recent Activity</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          This user hasn't had any recent interactions.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {recentInteractions.length > 5 && (
                  <div className="mt-4 text-center">
                    <Button variant="ghost" size="sm">
                      View All Activity
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Most Engaged Content */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Most Engaged Content</CardTitle>
                <CardDescription>
                  Content this user engages with the most
                </CardDescription>
              </CardHeader>
              <CardContent>
                {topContent.length > 0 ? (
                  <div className="space-y-4">
                    {topContent.map((content) => (
                      <div key={content.id} className="flex items-start space-x-3">
                        <Badge className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                          {getContentTypeIcon(content.type)}
                        </Badge>
                        <div className="space-y-1">
                          <p className="font-medium leading-none line-clamp-1">{content.title}</p>
                          <div className="flex items-center">
                            <span className="text-xs capitalize">{content.type}</span>
                            {content.duration && (
                              <div className="ml-2 flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {formatDuration(content.duration)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center py-8">
                    <div className="text-center">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">No Engagement Data</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        No content engagement data available for this user.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Time Series Tab */}
        <TabsContent value="time-series" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Over Time</CardTitle>
              <CardDescription>
                Track user engagement metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8">
                {timeSeriesData.map((series) => (
                  <div key={series.name} className="space-y-2">
                    <h3 className="font-medium">{series.name}</h3>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={series.data.map(item => ({
                            name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                            value: item.value
                          }))}
                          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                        >
                          <XAxis 
                            dataKey="name" 
                            stroke="#888888" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                          />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#2563eb"
                            strokeWidth={2}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
                
                {timeSeriesData.length === 0 && (
                  <div className="flex justify-center py-8">
                    <div className="text-center">
                      <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">No Time Series Data</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        No time series data available for this user.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Content Engagement Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Interaction History</CardTitle>
              <CardDescription>
                Detailed history of content the user has interacted with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 text-sm font-medium border-b">
                  <div className="col-span-5">Content</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-3">Date</div>
                  <div className="col-span-2">Duration</div>
                </div>
                
                {recentInteractions.length > 0 ? (
                  <div>
                    {recentInteractions.map((interaction) => (
                      <div key={interaction.id} className="grid grid-cols-12 p-4 text-sm items-center border-b last:border-0 hover:bg-muted/50">
                        <div className="col-span-5 flex items-center gap-2">
                          {getContentTypeIcon(interaction.type)}
                          <span className="line-clamp-1">{interaction.title}</span>
                        </div>
                        <div className="col-span-2 capitalize">{interaction.type}</div>
                        <div className="col-span-3">{formatDate(interaction.date)}</div>
                        <div className="col-span-2">{interaction.duration ? formatDuration(interaction.duration) : "N/A"}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No interaction history available.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Content Type Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Content Type Breakdown</CardTitle>
              <CardDescription>
                Distribution of content types the user engages with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {recentInteractions.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Pages', value: recentInteractions.filter(i => i.type === 'page').length },
                        { name: 'Posts', value: recentInteractions.filter(i => i.type === 'post').length },
                        { name: 'Products', value: recentInteractions.filter(i => i.type === 'product').length },
                        { name: 'Comments', value: recentInteractions.filter(i => i.type === 'comment').length },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center">
                      <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">No Data Available</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        No content breakdown data available for this user.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 