"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, Bar, BarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for the chart
const monthlyData = [
  { name: "Jan", revenue: 4000, refunds: 400, profit: 3600 },
  { name: "Feb", revenue: 5000, refunds: 300, profit: 4700 },
  { name: "Mar", revenue: 6000, refunds: 500, profit: 5500 },
  { name: "Apr", revenue: 7000, refunds: 600, profit: 6400 },
  { name: "May", revenue: 5500, refunds: 400, profit: 5100 },
  { name: "Jun", revenue: 6500, refunds: 300, profit: 6200 },
  { name: "Jul", revenue: 8000, refunds: 500, profit: 7500 },
  { name: "Aug", revenue: 9000, refunds: 700, profit: 8300 },
  { name: "Sep", revenue: 8500, refunds: 600, profit: 7900 },
  { name: "Oct", revenue: 7500, refunds: 500, profit: 7000 },
  { name: "Nov", revenue: 10000, refunds: 800, profit: 9200 },
  { name: "Dec", revenue: 12000, refunds: 1000, profit: 11000 },
]

const quarterlyData = [
  { name: "Q1", revenue: 15000, refunds: 1200, profit: 13800 },
  { name: "Q2", revenue: 19000, refunds: 1300, profit: 17700 },
  { name: "Q3", revenue: 25500, refunds: 1800, profit: 23700 },
  { name: "Q4", revenue: 29500, refunds: 2300, profit: 27200 },
]

export function RevenueChart() {
  return (
    <Tabs defaultValue="monthly" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-muted-foreground">Refunds</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">Profit</span>
          </div>
        </div>
      </div>

      <TabsContent value="monthly" className="mt-0">
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
            refunds: {
              label: "Refunds",
              color: "hsl(var(--chart-2))",
            },
            profit: {
              label: "Profit",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
              <Line type="monotone" dataKey="refunds" stroke="var(--color-refunds)" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>

      <TabsContent value="quarterly" className="mt-0">
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
            refunds: {
              label: "Refunds",
              color: "hsl(var(--chart-2))",
            },
            profit: {
              label: "Profit",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={quarterlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="revenue" fill="var(--color-revenue)" />
              <Bar dataKey="refunds" fill="var(--color-refunds)" />
              <Bar dataKey="profit" fill="var(--color-profit)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>
    </Tabs>
  )
}

