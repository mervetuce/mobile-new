"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Bell, Search, User, Moon, Sun, ChevronRight, Plus, PlusCircle, FileText, Settings, LifeBuoy, LogOut, FileQuestion, FileEdit, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock search suggestions data
const searchSuggestions = [
  { type: "User", name: "John Doe", path: "/admin/users/1" },
  { type: "User", name: "Jane Smith", path: "/admin/users/2" },
  { type: "Service", name: "Tourist Visa Package", path: "/admin/services/tourist-visa" },
  { type: "Service", name: "Business Visa Package", path: "/admin/services/business-visa" },
  { type: "Payment", name: "Invoice #1234", path: "/admin/payments/1234" },
]

interface HeaderProps {
  isMobile?: boolean;
  onMenuClick?: () => void;
}

export function Header({ isMobile, onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; path: string }[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [hasNewNotification, setHasNewNotification] = useState(true)
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchSuggestions)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Generate breadcrumbs based on pathname
  useEffect(() => {
    const generateBreadcrumbs = () => {
      const pathSegments = pathname
        .split('/')
        .filter(segment => segment !== '')
      
      const crumbs = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`
        return {
          label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          path
        }
      })
      
      setBreadcrumbs([{ label: 'Admin', path: '/admin' }, ...crumbs])
    }
    
    generateBreadcrumbs()
  }, [pathname])

  // Filter suggestions based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = searchSuggestions.filter(
        suggestion => 
          suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          suggestion.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions([])
    }
  }, [searchTerm])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <div className="flex flex-col">
        {/* Breadcrumbs - Hide on mobile when not on search */}
        {(!isMobile || !isSearchFocused) && (
          <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100 dark:border-gray-800 flex items-center overflow-x-auto scrollbar-hide">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 h-8 w-8 md:hidden" 
                onClick={onMenuClick}
                aria-label="Toggle Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center whitespace-nowrap">
                {index > 0 && <ChevronRight className="h-3 w-3 mx-1 text-gray-400 flex-shrink-0" />}
                <Link 
                  href={crumb.path} 
                  className={cn(
                    "hover:text-blue-600 transition-colors",
                    index === breadcrumbs.length - 1 ? "font-medium text-blue-600" : ""
                  )}
                >
                  {/* Show only the current page on very small screens */}
                  {(!isMobile || index === breadcrumbs.length - 1 || window.innerWidth > 400) && crumb.label}
                </Link>
              </div>
            ))}
          </div>
        )}
        
        {/* Main Header */}
        <div className={cn(
          "flex items-center justify-between p-3 sm:p-4",
          isSearchFocused && isMobile ? "pb-0" : ""
        )}>
          {/* Enhanced Search Bar */}
          <div className={cn(
            "relative flex items-center gap-2",
            isSearchFocused && isMobile ? "w-full" : "w-full max-w-md"
          )}>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <Input 
                type="search" 
                placeholder={isMobile ? "Search..." : "Search users, services, payments..."} 
                className={cn(
                  "pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-gray-700",
                  isMobile ? "h-10" : ""
                )}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  setShowSuggestions(true)
                  setIsSearchFocused(true)
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setShowSuggestions(false)
                    setIsSearchFocused(false)
                  }, 200)
                }}
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className={cn(
                  "absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-50 overflow-auto dark:bg-gray-800 dark:border-gray-700",
                  isMobile ? "max-h-48" : "max-h-60"
                )}>
                  {filteredSuggestions.map((suggestion, index) => (
                    <Link 
                      key={index} 
                      href={suggestion.path}
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
                          {suggestion.type}
                        </div>
                        <span>{suggestion.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Hide action items when search is focused on mobile */}
          {(!isSearchFocused || !isMobile) && (
            <div className={cn(
              "flex items-center",
              isMobile ? "gap-1" : "gap-4" 
            )}>
              {/* Quick Actions - Hide text on mobile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className={cn(
                    "h-9 gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
                    isMobile ? "w-9 px-0" : ""
                  )}>
                    <Plus className="h-4 w-4" />
                    {!isMobile && <span className="hidden sm:inline">Actions</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/admin/content-management/articles/new" passHref>
                      <DropdownMenuItem>
                        <FileEdit className="mr-2 h-4 w-4" />
                        <span>New Article</span>
                        <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/admin/services/new" passHref>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>New Service</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/admin/content-management/faqs/new" passHref>
                      <DropdownMenuItem>
                        <FileQuestion className="mr-2 h-4 w-4" />
                        <span>New FAQs</span>
                        <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={cn(
                    "relative",
                    isMobile ? "h-9 w-9" : ""  
                  )}>
                    <Bell className={cn(
                      isMobile ? "h-4 w-4" : "h-5 w-5"
                    )} />
                    {hasNewNotification && (
                      <span className="absolute top-0 right-0 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={cn(
                  isMobile ? "w-72" : "w-80"
                )}>
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setHasNewNotification(false)}
                      className="text-xs h-6 hover:bg-transparent hover:text-blue-600 p-0"
                    >
                      Mark all as read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className={cn(
                    "overflow-auto",
                    isMobile ? "max-h-72" : "max-h-96"
                  )}>
                    <DropdownMenuItem className="cursor-pointer p-4 hover:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">New user registered</p>
                        <p className="text-sm text-gray-500">John Doe created an account</p>
                        <p className="text-xs text-gray-400">2 minutes ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer p-4 hover:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">New payment received</p>
                        <p className="text-sm text-gray-500">$199 for Tourist Visa Package</p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer p-4 hover:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">Support ticket opened</p>
                        <p className="text-sm text-gray-500">Visa application status inquiry</p>
                        <p className="text-xs text-gray-400">3 hours ago</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={cn(
                    "rounded-full",
                    isMobile ? "h-9 w-9" : ""
                  )}>
                    <User className={cn(
                      isMobile ? "h-4 w-4" : "h-5 w-5"
                    )} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/admin/profile" passHref>
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/admin/settings" passHref>
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/admin/support" passHref>
                      <DropdownMenuItem className="cursor-pointer">
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
                    className="cursor-pointer focus:bg-transparent"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {theme === "dark" ? (
                          <>
                            <Sun className="h-4 w-4" />
                            <span>Light Mode</span>
                          </>
                        ) : (
                          <>
                            <Moon className="h-4 w-4" />
                            <span>Dark Mode</span>
                          </>
                        )}
                      </div>
                      <div className="h-4 w-8 rounded-full bg-gray-200 dark:bg-gray-700 relative">
                        <div className={cn(
                          "absolute top-0 h-4 w-4 rounded-full transition-all duration-200 transform",
                          theme === "dark" 
                            ? "right-0 bg-blue-500 translate-x-0" 
                            : "left-0 bg-gray-500 translate-x-0"
                        )}></div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

