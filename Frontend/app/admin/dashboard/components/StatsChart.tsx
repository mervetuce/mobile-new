"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { cn } from "@/lib/utils"

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
  { month: "Jul", revenue: 7000 },
  { month: "Aug", revenue: 8000 },
  { month: "Sep", revenue: 7500 },
  { month: "Oct", revenue: 9000 },
  { month: "Nov", revenue: 8500 },
  { month: "Dec", revenue: 10000 },
]

const servicesData = [
  { month: "Jan", services: 20 },
  { month: "Feb", services: 25 },
  { month: "Mar", services: 30 },
  { month: "Apr", services: 35 },
  { month: "May", services: 40 },
  { month: "Jun", services: 45 },
  { month: "Jul", services: 50 },
  { month: "Aug", services: 55 },
  { month: "Sep", services: 60 },
  { month: "Oct", services: 65 },
  { month: "Nov", services: 70 },
  { month: "Dec", services: 75 },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, dataKey }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="text-sm font-medium text-gray-800">{`${label}`}</p>
        <p className="text-sm text-blue-600 font-semibold">
          {dataKey === 'revenue' ? `$${payload[0].value}` : `${payload[0].value} services`}
        </p>
      </div>
    );
  }
  return null;
};

export function StatsChart() {
  const [period, setPeriod] = useState("yearly")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("revenue")
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div>
              <CardTitle className="text-xl">Statistics</CardTitle>
              <CardDescription className="text-sm">Revenue and service trends</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="h-[360px] w-full flex items-center justify-center bg-gray-50 rounded-md">
            <div className="space-y-4 w-full p-4">
              <div className="h-6 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
              <div className="h-[280px] w-full bg-gray-200 rounded animate-pulse opacity-70"></div>
              <div className="flex justify-between">
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="transition-opacity duration-500 ease-in-out">
            <div className={cn("h-[360px]", activeTab === "revenue" ? "block" : "hidden")}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip content={<CustomTooltip dataKey="revenue" />} cursor={{ stroke: '#f0f0f0', strokeWidth: 1 }} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2, fill: 'white' }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className={cn("h-[360px]", activeTab === "services" ? "block" : "hidden")}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={servicesData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorServices" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip dataKey="services" />} cursor={{ stroke: '#f0f0f0', strokeWidth: 1 }} />
                  <Area 
                    type="monotone" 
                    dataKey="services" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorServices)" 
                    activeDot={{ r: 6, stroke: '#82ca9d', strokeWidth: 2, fill: 'white' }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

