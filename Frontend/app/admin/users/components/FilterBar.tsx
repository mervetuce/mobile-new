"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { SavedFilters } from "../components/SavedFilters"
import {
  X,
  Search,
  Calendar,
  Users,
  Activity,
  XCircle,
} from "lucide-react"

interface FilterBarProps {
  roles: string[];
  statuses: string[];
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  roleFilter: string[];
  setRoleFilter: (value: string[]) => void;
  statusFilter: string[];
  setStatusFilter: (value: string[]) => void;
  joinDateAfter: string;
  setJoinDateAfter: (value: string) => void;
  joinDateBefore: string;
  setJoinDateBefore: (value: string) => void;
  activeFilters: Array<{
    id: string;
    label: string;
    clear: () => void;
  }>;
  clearAllFilters: () => void;
  savedFilters: Array<{
    id: string;
    name: string;
    config: {
      role?: string[];
      status?: string[];
      joinDateAfter?: string;
      joinDateBefore?: string;
    };
  }>;
  setSavedFilters: (filters: any) => void;
  applySavedFilter: (filter: any) => void;
}

export function FilterBar({
  roles,
  statuses,
  globalFilter,
  setGlobalFilter,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  joinDateAfter,
  setJoinDateAfter,
  joinDateBefore,
  setJoinDateBefore,
  activeFilters,
  clearAllFilters,
  savedFilters,
  setSavedFilters,
  applySavedFilter,
}: FilterBarProps) {
  
  // Temporary state for role filter selection
  const [tempRoleFilter, setTempRoleFilter] = useState<string[]>([]);
  // Temporary state for status filter selection
  const [tempStatusFilter, setTempStatusFilter] = useState<string[]>([]);
  // Temporary state for date range
  const [tempJoinDateAfter, setTempJoinDateAfter] = useState("");
  const [tempJoinDateBefore, setTempJoinDateBefore] = useState("");
  
  // Control popover open states
  const [rolePopoverOpen, setRolePopoverOpen] = useState(false);
  const [statusPopoverOpen, setStatusPopoverOpen] = useState(false);
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  
  // Initialize temporary states when popovers open
  const handleRolePopoverOpenChange = (open: boolean) => {
    if (open) {
      setTempRoleFilter([...roleFilter]);
    }
    setRolePopoverOpen(open);
  };
  
  const handleStatusPopoverOpenChange = (open: boolean) => {
    if (open) {
      setTempStatusFilter([...statusFilter]);
    }
    setStatusPopoverOpen(open);
  };
  
  const handleDatePopoverOpenChange = (open: boolean) => {
    if (open) {
      setTempJoinDateAfter(joinDateAfter);
      setTempJoinDateBefore(joinDateBefore);
    }
    setDatePopoverOpen(open);
  };
  
  // Apply handlers for each filter type
  const applyRoleFilter = () => {
    setRoleFilter(tempRoleFilter);
    setRolePopoverOpen(false);
  };
  
  const applyStatusFilter = () => {
    setStatusFilter(tempStatusFilter);
    setStatusPopoverOpen(false);
  };
  
  const applyDateFilter = () => {
    setJoinDateAfter(tempJoinDateAfter);
    setJoinDateBefore(tempJoinDateBefore);
    setDatePopoverOpen(false);
  };
  
  const handleSaveFilter = (name: string) => {
    const newFilter = {
      id: String(savedFilters.length + 1),
      name,
      config: {
        role: roleFilter.length > 0 ? roleFilter : undefined,
        status: statusFilter.length > 0 ? statusFilter : undefined,
        joinDateAfter: joinDateAfter || undefined,
        joinDateBefore: joinDateBefore || undefined
      }
    }
    
    setSavedFilters([...savedFilters, newFilter])
  }
  
  const handleDeleteFilter = (id: string) => {
    setSavedFilters(savedFilters.filter(filter => filter.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Search and filter controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
          
          {/* Role filter button */}
          <Popover open={rolePopoverOpen} onOpenChange={handleRolePopoverOpenChange}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={`flex gap-1 ${roleFilter.length > 0 ? "border-blue-500 text-blue-600" : ""}`}
              >
                <Users className="h-4 w-4" />
                <span>Role {roleFilter.length > 0 ? `(${roleFilter.length})` : ""}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-3">
              <div className="space-y-3">
                <h5 className="text-sm font-medium">Filter by Role</h5>
                
                <div className="space-y-2">
                  {roles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`role-filter-${role}`} 
                        checked={tempRoleFilter.includes(role)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setTempRoleFilter([...tempRoleFilter, role])
                          } else {
                            setTempRoleFilter(tempRoleFilter.filter(r => r !== role))
                          }
                        }}
                      />
                      <label 
                        htmlFor={`role-filter-${role}`}
                        className="text-sm cursor-pointer"
                      >
                        {role}
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTempRoleFilter([])}
                  >
                    Clear
                  </Button>
                  
                  <Button size="sm" onClick={applyRoleFilter}>Apply</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Status filter button */}
          <Popover open={statusPopoverOpen} onOpenChange={handleStatusPopoverOpenChange}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={`flex gap-1 ${statusFilter.length > 0 ? "border-blue-500 text-blue-600" : ""}`}
              >
                <Activity className="h-4 w-4" />
                <span>Status {statusFilter.length > 0 ? `(${statusFilter.length})` : ""}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-3">
              <div className="space-y-3">
                <h5 className="text-sm font-medium">Filter by Status</h5>
                
                <div className="space-y-2">
                  {statuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-filter-${status}`} 
                        checked={tempStatusFilter.includes(status)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setTempStatusFilter([...tempStatusFilter, status])
                          } else {
                            setTempStatusFilter(tempStatusFilter.filter(s => s !== status))
                          }
                        }}
                      />
                      <label 
                        htmlFor={`status-filter-${status}`}
                        className="text-sm cursor-pointer"
                      >
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTempStatusFilter([])}
                  >
                    Clear
                  </Button>
                  
                  <Button size="sm" onClick={applyStatusFilter}>Apply</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Date range filter button */}
          <Popover open={datePopoverOpen} onOpenChange={handleDatePopoverOpenChange}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={`flex gap-1 ${(joinDateAfter || joinDateBefore) ? "border-blue-500 text-blue-600" : ""}`}
              >
                <Calendar className="h-4 w-4" />
                <span>Date Range</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-3">
              <div className="space-y-3">
                <h5 className="text-sm font-medium">Join Date Range</h5>
                
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        type="date" 
                        value={tempJoinDateAfter}
                        onChange={(e) => setTempJoinDateAfter(e.target.value)}
                        className="h-9 pl-8"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500">End Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        type="date" 
                        value={tempJoinDateBefore}
                        onChange={(e) => setTempJoinDateBefore(e.target.value)}
                        className="h-9 pl-8"
                      />
                    </div>
                  </div>
                  
                  {/* Quick date range filters */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500">Quick Filters</label>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        className="px-2 py-0 h-7 text-xs"
                        onClick={() => {
                          const today = new Date();
                          const threeMonthsAgo = new Date();
                          threeMonthsAgo.setMonth(today.getMonth() - 3);
                          setTempJoinDateAfter(threeMonthsAgo.toISOString().split('T')[0]);
                          setTempJoinDateBefore(today.toISOString().split('T')[0]);
                        }}
                      >
                        3 Months
                      </Button>
                      <Button 
                        variant="outline"
                        className="px-2 py-0 h-7 text-xs"
                        onClick={() => {
                          const today = new Date();
                          const sixMonthsAgo = new Date();
                          sixMonthsAgo.setMonth(today.getMonth() - 6);
                          setTempJoinDateAfter(sixMonthsAgo.toISOString().split('T')[0]);
                          setTempJoinDateBefore(today.toISOString().split('T')[0]);
                        }}
                      >
                        6 Months
                      </Button>
                      <Button 
                        variant="outline"
                        className="px-2 py-0 h-7 text-xs"
                        onClick={() => {
                          const today = new Date();
                          const oneYearAgo = new Date();
                          oneYearAgo.setFullYear(today.getFullYear() - 1);
                          setTempJoinDateAfter(oneYearAgo.toISOString().split('T')[0]);
                          setTempJoinDateBefore(today.toISOString().split('T')[0]);
                        }}
                      >
                        1 Year
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setTempJoinDateAfter("");
                        setTempJoinDateBefore("");
                      }}
                    >
                      Clear
                    </Button>
                    
                    <Button size="sm" onClick={applyDateFilter}>Apply</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Saved filters */}
          <SavedFilters 
            savedFilters={savedFilters}
            onApplyFilter={applySavedFilter}
            onSaveFilter={handleSaveFilter}
            onDeleteFilter={handleDeleteFilter}
          />
          
          {/* Clear all filters button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllFilters}
            className="flex gap-1"
            disabled={roleFilter.length === 0 && statusFilter.length === 0 && !joinDateAfter && !joinDateBefore && !globalFilter}
          >
            <XCircle className="h-4 w-4" />
            <span>Clear All</span>
          </Button>
        </div>
      </div>
      
      {/* Active filters display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge 
              key={filter.id} 
              variant="outline"
              className="flex items-center gap-1 px-2 py-1"
            >
              {filter.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={filter.clear} 
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Results count will be shown in the table component */}
    </div>
  )
} 