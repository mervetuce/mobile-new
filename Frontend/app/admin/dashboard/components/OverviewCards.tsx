"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, Package, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function OverviewCards() {
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])
  
  const cards = [
    {
      title: "Total Users",
      value: "12,345",
      change: "+12%",
      trend: "up",
      description: "vs. previous month",
      icon: Users,
      href: "/admin/users",
      color: "blue",
    },
    {
      title: "Revenue",
      value: "$48,592",
      change: "+8%",
      trend: "up",
      description: "vs. previous month",
      icon: CreditCard,
      href: "/admin/payments",
      color: "green",
    },
    {
      title: "Active Services",
      value: "24",
      change: "+2",
      trend: "up",
      description: "since last week",
      icon: Package,
      href: "/admin/services",
      color: "indigo",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      trend: "up",
      description: "vs. previous month",
      icon: TrendingUp,
      href: "/admin/reports",
      color: "amber",
    },
  ]

  const getGradient = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50";
      case "green":
        return "from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-200/50";
      case "indigo":
        return "from-indigo-50 to-indigo-100/50 hover:from-indigo-100 hover:to-indigo-200/50";
      case "amber":
        return "from-amber-50 to-amber-100/50 hover:from-amber-100 hover:to-amber-200/50";
      default:
        return "from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-500";
      case "green": return "text-green-500";
      case "indigo": return "text-indigo-500";
      case "amber": return "text-amber-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Link key={index} href={card.href} className="block group">
          <Card className={cn(
            "h-full transition-all duration-300 border border-transparent hover:border-opacity-50",
            `hover:border-${card.color}-300 bg-gradient-to-br ${getGradient(card.color)}`,
            "hover:shadow-lg hover:-translate-y-1",
            isLoading ? "animate-pulse" : ""
          )}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {isLoading ? (
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  card.title
                )}
              </CardTitle>
              {isLoading ? (
                <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
              ) : (
                <div className={cn(
                  "p-2 rounded-full", 
                  `bg-${card.color}-100`
                )}>
                  <card.icon className={cn("h-4 w-4", getIconColor(card.color))} />
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <>
                  <div className="h-7 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <CardDescription className="flex items-center mt-1">
                    <div className={cn(
                      "flex items-center",
                      card.trend === "up" ? "text-green-500" : "text-red-500"
                    )}>
                      {card.trend === "up" ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      <span>{card.change}</span>
                    </div>
                    <span className="ml-1 text-gray-500">{card.description}</span>
                  </CardDescription>
                </>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

