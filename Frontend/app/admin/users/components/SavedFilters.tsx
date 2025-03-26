"use client"

import { useState } from "react"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Save, Edit, Trash, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface SavedFilter {
  id: string;
  name: string;
  config: {
    role?: string[];
    status?: string[];
    joinDateAfter?: string;
    joinDateBefore?: string;
  };
}

interface SavedFiltersProps {
  savedFilters: SavedFilter[];
  onApplyFilter: (filter: SavedFilter) => void;
  onSaveFilter: (name: string) => void;
  onDeleteFilter: (id: string) => void;
}

export function SavedFilters({ 
  savedFilters, 
  onApplyFilter, 
  onSaveFilter,
  onDeleteFilter
}: SavedFiltersProps) {
  const [newFilterName, setNewFilterName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<SavedFilter | null>(null)
  
  const handleSaveFilter = () => {
    if (!newFilterName.trim()) return
    
    onSaveFilter(newFilterName)
    setNewFilterName("")
    setIsDialogOpen(false)
    toast({
      title: "Filter saved",
      description: `Your filter "${newFilterName}" has been saved successfully.`,
    })
  }
  
  const handleDeleteFilter = (id: string, name: string) => {
    onDeleteFilter(id)
    toast({
      title: "Filter deleted",
      description: `The filter "${name}" has been removed.`,
    })
  }
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex gap-1">
            <Star className="h-4 w-4" />
            <span>Saved Filters</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Saved Filters</DropdownMenuLabel>
          
          {savedFilters.length === 0 ? (
            <div className="px-2 py-4 text-sm text-center text-gray-500">
              No saved filters yet
            </div>
          ) : (
            <>
              <DropdownMenuSeparator />
              {savedFilters.map((filter) => (
                <DropdownMenuItem 
                  key={filter.id}
                  className="flex items-center justify-between cursor-pointer py-2 px-2"
                >
                  <span 
                    className="flex-1"
                    onClick={() => onApplyFilter(filter)}
                  >
                    {filter.name}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleDeleteFilter(filter.id, filter.name)}
                  >
                    <Trash className="h-3.5 w-3.5 text-gray-500 hover:text-red-500" />
                  </Button>
                </DropdownMenuItem>
              ))}
            </>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Save current filter
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Filter</DialogTitle>
            <DialogDescription>
              Create a name for your current filter settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Input
                id="filter-name"
                placeholder="Filter name"
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveFilter} disabled={!newFilterName.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 