"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, Plus, Search, Trash, Upload } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Tips for Successful Visa Applications",
    slug: "top-10-tips-for-successful-visa-applications",
    excerpt: "Learn the essential strategies to ensure your visa application gets approved on the first try.",
    status: "Published",
    publishDate: "2023-10-15",
    author: "John Doe",
    category: "Visa Tips",
    views: 1245,
  },
  {
    id: 2,
    title: "Understanding Schengen Visa Requirements",
    slug: "understanding-schengen-visa-requirements",
    excerpt: "A comprehensive guide to the documentation and eligibility criteria for Schengen visas.",
    status: "Published",
    publishDate: "2023-09-22",
    author: "Jane Smith",
    category: "Visa Types",
    views: 987,
  },
  {
    id: 3,
    title: "Best Destinations for Digital Nomads in 2024",
    slug: "best-destinations-for-digital-nomads-2024",
    excerpt: "Explore the top countries offering digital nomad visas and remote work opportunities.",
    status: "Draft",
    publishDate: null,
    author: "Robert Johnson",
    category: "Travel Trends",
    views: 0,
  },
  {
    id: 4,
    title: "How to Prepare for Your Visa Interview",
    slug: "how-to-prepare-for-visa-interview",
    excerpt: "Expert advice on acing your visa interview with confidence and proper preparation.",
    status: "Scheduled",
    publishDate: "2023-11-05",
    author: "Emily Davis",
    category: "Visa Tips",
    views: 0,
  },
]

export function BlogManagement() {
  const [selectedPost, setSelectedPost] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && post.status.toLowerCase() === activeTab.toLowerCase()
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-gray-500">Create and manage blog articles with SEO optimization</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Articles</CardTitle>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedPost?.id === post.id ? "border-black bg-gray-50" : "hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium truncate">{post.title}</h3>
                        <Badge
                          variant={
                            post.status === "Published" ? "default" : post.status === "Draft" ? "outline" : "secondary"
                          }
                        >
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{post.category}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.publishDate || "Not scheduled"}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">No articles found matching your search</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedPost ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Edit Article</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button size="sm">Save Changes</Button>
                  </div>
                </div>
                <CardDescription>Last edited on {new Date().toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="content" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Article Title</Label>
                      <Input id="title" defaultValue={selectedPost.title} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Input id="excerpt" defaultValue={selectedPost.excerpt} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <div className="border rounded-md p-2 min-h-[300px]">
                        <div className="flex items-center gap-2 border-b pb-2 mb-2">
                          <Button variant="outline" size="sm">
                            B
                          </Button>
                          <Button variant="outline" size="sm">
                            I
                          </Button>
                          <Button variant="outline" size="sm">
                            U
                          </Button>
                          <Button variant="outline" size="sm">
                            Link
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                        <textarea
                          id="content"
                          className="w-full h-[250px] resize-none border-none focus:outline-none"
                          defaultValue="Article content goes here..."
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="seo" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="slug">
                        URL Slug
                        <span className="ml-2 text-xs text-gray-500">
                          (visify.com/blog/<span className="text-black">{selectedPost.slug}</span>)
                        </span>
                      </Label>
                      <Input id="slug" defaultValue={selectedPost.slug} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">
                        Meta Title
                        <span className="ml-2 text-xs text-gray-500">(50-60 characters)</span>
                      </Label>
                      <Input id="metaTitle" defaultValue={selectedPost.title} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">
                        Meta Description
                        <span className="ml-2 text-xs text-gray-500">(120-160 characters)</span>
                      </Label>
                      <textarea
                        id="metaDescription"
                        className="w-full h-20 resize-none rounded-md border p-2"
                        defaultValue={selectedPost.excerpt}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Google Search Preview</Label>
                      <div className="border rounded-md p-4 bg-white">
                        <div className="text-blue-600 text-lg font-medium truncate">{selectedPost.title} | Visify</div>
                        <div className="text-green-700 text-sm">https://visify.com/blog/{selectedPost.slug}</div>
                        <div className="text-sm text-gray-600 line-clamp-2">{selectedPost.excerpt}</div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select id="status" className="w-full rounded-md border p-2" defaultValue={selectedPost.status}>
                          <option value="Draft">Draft</option>
                          <option value="Published">Published</option>
                          <option value="Scheduled">Scheduled</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="publishDate">Publish Date</Label>
                        <Input id="publishDate" type="date" defaultValue={selectedPost.publishDate} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input id="author" defaultValue={selectedPost.author} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          className="w-full rounded-md border p-2"
                          defaultValue={selectedPost.category}
                        >
                          <option value="Visa Tips">Visa Tips</option>
                          <option value="Visa Types">Visa Types</option>
                          <option value="Travel Trends">Travel Trends</option>
                          <option value="Destinations">Destinations</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input id="tags" defaultValue="visa, application, tips" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="featuredImage">Featured Image</Label>
                      <div className="flex gap-2">
                        <Input id="featuredImage" defaultValue="/images/blog/visa-tips.jpg" />
                        <Button variant="outline">Browse</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Article
                </Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-md p-12">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">No Article Selected</h3>
                <p className="text-gray-500 mb-4">Select an article from the list to edit or create a new one</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Article
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

