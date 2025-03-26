"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the charts
const popularServicesData = [
  { name: "Tourist Visa", value: 45 },
  { name: "Business Visa", value: 25 },
  { name: "Student Visa", value: 15 },
  { name: "Work Visa", value: 10 },
  { name: "Family Visa", value: 5 },
]

const serviceUsageData = [
  { month: "Jan", tourists: 120, business: 80, students: 40, work: 30 },
  { month: "Feb", tourists: 140, business: 90, students: 45, work: 35 },
  { month: "Mar", tourists: 160, business: 100, students: 50, work: 40 },
  { month: "Apr", tourists: 180, business: 110, students: 55, work: 45 },
  { month: "May", tourists: 200, business: 120, students: 60, work: 50 },
  { month: "Jun", tourists: 220, business: 130, students: 65, work: 55 },
  { month: "Jul", tourists: 240, business: 120, students: 70, work: 60 },
  { month: "Aug", tourists: 260, business: 110, students: 65, work: 50 },
  { month: "Sep", tourists: 280, business: 100, students: 60, work: 40 },
  { month: "Oct", tourists: 300, business: 110, students: 55, work: 45 },
  { month: "Nov", tourists: 320, business: 120, students: 50, work: 50 },
  { month: "Dec", tourists: 340, business: 130, students: 45, work: 55 },
]

const serviceTimeData = [
  { name: "< 1 week", tourists: 10, business: 20, students: 5 },
  { name: "1-2 weeks", tourists: 20, business: 35, students: 15 },
  { name: "2-3 weeks", tourists: 35, business: 25, students: 30 },
  { name: "3-4 weeks", tourists: 25, business: 15, students: 35 },
  { name: "> 4 weeks", tourists: 10, business: 5, students: 15 },
]

const satisfactionData = [
  { name: "Very Satisfied", value: 45 },
  { name: "Satisfied", value: 30 },
  { name: "Neutral", value: 15 },
  { name: "Dissatisfied", value: 7 },
  { name: "Very Dissatisfied", value: 3 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]
const SATISFACTION_COLORS = ["#00C49F", "#8884d8", "#FFBB28", "#FF8042", "#FF0000"]

interface ServiceAnalyticsProps {
  variant?: "compact" | "full"
}

export function ServiceAnalytics({ variant = "full" }: ServiceAnalyticsProps) {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  if (variant === "compact") {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={popularServicesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {popularServicesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="popular" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="popular">Popular Services</TabsTrigger>
            <TabsTrigger value="trends">Usage Trends</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select defaultValue="12months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Most Popular Services</CardTitle>
            <CardDescription>Distribution by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={popularServicesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {popularServicesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Service Usage Over Time</CardTitle>
            <CardDescription>Monthly usage by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                tourists: {
                  label: "Tourist Visa",
                  color: "hsl(var(--chart-1))",
                },
                business: {
                  label: "Business Visa",
                  color: "hsl(var(--chart-2))",
                },
                students: {
                  label: "Student Visa",
                  color: "hsl(var(--chart-3))",
                },
                work: {
                  label: "Work Visa",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={serviceUsageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="tourists"
                    stackId="1"
                    stroke="var(--color-tourists)"
                    fill="var(--color-tourists)"
                  />
                  <Area
                    type="monotone"
                    dataKey="business"
                    stackId="1"
                    stroke="var(--color-business)"
                    fill="var(--color-business)"
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stackId="1"
                    stroke="var(--color-students)"
                    fill="var(--color-students)"
                  />
                  <Area
                    type="monotone"
                    dataKey="work"
                    stackId="1"
                    stroke="var(--color-work)"
                    fill="var(--color-work)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Processing Time Distribution</CardTitle>
            <CardDescription>Time to complete by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                tourists: {
                  label: "Tourist Visa",
                  color: "hsl(var(--chart-1))",
                },
                business: {
                  label: "Business Visa",
                  color: "hsl(var(--chart-2))",
                },
                students: {
                  label: "Student Visa",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="tourists" fill="var(--color-tourists)" />
                  <Bar dataKey="business" fill="var(--color-business)" />
                  <Bar dataKey="students" fill="var(--color-students)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>Service satisfaction ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SATISFACTION_COLORS[index % SATISFACTION_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

