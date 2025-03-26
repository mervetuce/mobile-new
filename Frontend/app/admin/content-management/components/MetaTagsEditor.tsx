"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Eye, Save, Search } from "lucide-react"

const pages = [
  {
    id: 1,
    title: "Homepage",
    url: "/",
    metaTitle: "Visify - Travel Agency & Visa Consultation",
    metaDescription:
      "Expert guidance for visa applications and personalized travel planning to make your international adventures seamless.",
    keywords: "visa, travel, consultation, visa application, travel planning",
    ogTitle: "Visify - Expert Visa Consultation Services",
    ogDescription: "Get expert guidance for your visa applications and travel planning.",
    ogImage: "/images/og-home.jpg",
    indexStatus: "index,follow",
    canonicalUrl: "https://visify.com/",
    lastUpdated: "2023-10-15",
  },
  {
    id: 2,
    title: "Services",
    url: "/services",
    metaTitle: "Our Visa Services | Visify",
    metaDescription:
      "Explore our comprehensive visa services including application assistance, document preparation, and interview coaching.",
    keywords: "visa services, visa application, document preparation, interview coaching",
    ogTitle: "Visa Services | Visify",
    ogDescription: "Comprehensive visa services to make your application process smooth and successful.",
    ogImage: "/images/og-services.jpg",
    indexStatus: "index,follow",
    canonicalUrl: "https://visify.com/services",
    lastUpdated: "2023-09-22",
  },
  {
    id: 3,
    title: "About Us",
    url: "/about",
    metaTitle: "About Visify | Your Trusted Visa Consultation Partner",
    metaDescription:
      "Learn about our experienced team of visa consultants and our mission to simplify international travel.",
    keywords: "about visify, visa consultants, visa experts, travel agency",
    ogTitle: "About Visify | Visa Consultation Experts",
    ogDescription: "Meet our team of experienced visa consultants dedicated to simplifying your travel experience.",
    ogImage: "/images/og-about.jpg",
    indexStatus: "index,follow",
    canonicalUrl: "https://visify.com/about",
    lastUpdated: "2023-08-10",
  },
  {
    id: 4,
    title: "Contact",
    url: "/contact",
    metaTitle: "Contact Visify | Get Expert Visa Assistance",
    metaDescription:
      "Reach out to our visa experts for personalized assistance with your visa application and travel planning.",
    keywords: "contact visify, visa help, visa consultation, travel assistance",
    ogTitle: "Contact Our Visa Experts | Visify",
    ogDescription: "Get in touch with our visa consultants for personalized assistance with your travel plans.",
    ogImage: "/images/og-contact.jpg",
    indexStatus: "index,follow",
    canonicalUrl: "https://visify.com/contact",
    lastUpdated: "2023-07-15",
  },
]

export function MetaTagsEditor() {
  const [selectedPage, setSelectedPage] = useState(pages[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [editedPage, setEditedPage] = useState(pages[0])

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.url.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedPage((prev) => ({ ...prev, [name]: value }))
  }

  const handlePageSelect = (page) => {
    setSelectedPage(page)
    setEditedPage(page)
  }

  const calculateSeoScore = () => {
    let score = 0
    const metaTitleLength = editedPage.metaTitle.length
    const metaDescLength = editedPage.metaDescription.length

    // Title length check (50-60 chars is optimal)
    if (metaTitleLength >= 50 && metaTitleLength <= 60) score += 25
    else if (metaTitleLength >= 40 && metaTitleLength < 50) score += 20
    else if (metaTitleLength > 60 && metaTitleLength <= 70) score += 20
    else score += 10

    // Description length check (120-160 chars is optimal)
    if (metaDescLength >= 120 && metaDescLength <= 160) score += 25
    else if (metaDescLength >= 100 && metaDescLength < 120) score += 20
    else if (metaDescLength > 160 && metaDescLength <= 180) score += 20
    else score += 10

    // Keywords check
    if (editedPage.keywords && editedPage.keywords.split(",").length >= 3) score += 15
    else if (editedPage.keywords && editedPage.keywords.split(",").length >= 1) score += 10

    // OG tags check
    if (editedPage.ogTitle && editedPage.ogDescription && editedPage.ogImage) score += 20
    else if (
      (editedPage.ogTitle && editedPage.ogDescription) ||
      (editedPage.ogTitle && editedPage.ogImage) ||
      (editedPage.ogDescription && editedPage.ogImage)
    )
      score += 15
    else if (editedPage.ogTitle || editedPage.ogDescription || editedPage.ogImage) score += 10

    // Canonical URL check
    if (editedPage.canonicalUrl) score += 15

    return score
  }

  const seoScore = calculateSeoScore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Meta Tags Editor</h2>
          <p className="text-gray-500">Optimize your website's SEO with proper meta tags</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pages</CardTitle>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search pages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>
              <CardDescription>Select a page to edit its meta tags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => (
                    <div
                      key={page.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedPage?.id === page.id ? "border-black bg-gray-50" : "hover:border-gray-400"
                      }`}
                      onClick={() => handlePageSelect(page)}
                    >
                      <h3 className="font-medium">{page.title}</h3>
                      <p className="text-sm text-gray-500">{page.url}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Last updated: {page.lastUpdated}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">No pages found matching your search</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedPage ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedPage.title}</CardTitle>
                    <CardDescription>{selectedPage.url}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button size="sm">Save Changes</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic SEO</TabsTrigger>
                    <TabsTrigger value="social">Social Media</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">
                        Meta Title
                        <span
                          className={`ml-2 text-xs ${
                            editedPage.metaTitle.length > 60
                              ? "text-red-500"
                              : editedPage.metaTitle.length < 50
                                ? "text-amber-500"
                                : "text-green-500"
                          }`}
                        >
                          ({editedPage.metaTitle.length}/60)
                        </span>
                      </Label>
                      <Input
                        id="metaTitle"
                        name="metaTitle"
                        value={editedPage.metaTitle}
                        onChange={handleInputChange}
                      />
                      <p className="text-xs text-gray-500">
                        Optimal length: 50-60 characters. This appears as the clickable headline in search results.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">
                        Meta Description
                        <span
                          className={`ml-2 text-xs ${
                            editedPage.metaDescription.length > 160
                              ? "text-red-500"
                              : editedPage.metaDescription.length < 120
                                ? "text-amber-500"
                                : "text-green-500"
                          }`}
                        >
                          ({editedPage.metaDescription.length}/160)
                        </span>
                      </Label>
                      <Textarea
                        id="metaDescription"
                        name="metaDescription"
                        value={editedPage.metaDescription}
                        onChange={handleInputChange}
                        rows={3}
                      />
                      <p className="text-xs text-gray-500">
                        Optimal length: 120-160 characters. This appears as the descriptive text in search results.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords (comma separated)</Label>
                      <Input id="keywords" name="keywords" value={editedPage.keywords} onChange={handleInputChange} />
                      <p className="text-xs text-gray-500">
                        While not as important as they once were, keywords can still help search engines understand your
                        content.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Google Search Preview</Label>
                      <div className="border rounded-md p-4 bg-white">
                        <div className="text-blue-600 text-lg font-medium truncate">{editedPage.metaTitle}</div>
                        <div className="text-green-700 text-sm">https://visify.com{editedPage.url}</div>
                        <div className="text-sm text-gray-600 line-clamp-2">{editedPage.metaDescription}</div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="social" className="space-y-4 pt-4">
                    <Alert className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Social Media Optimization</AlertTitle>
                      <AlertDescription>
                        These tags control how your page appears when shared on social media platforms like Facebook,
                        Twitter, and LinkedIn.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <Label htmlFor="ogTitle">Open Graph Title</Label>
                      <Input id="ogTitle" name="ogTitle" value={editedPage.ogTitle} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ogDescription">Open Graph Description</Label>
                      <Textarea
                        id="ogDescription"
                        name="ogDescription"
                        value={editedPage.ogDescription}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ogImage">Open Graph Image URL</Label>
                      <div className="flex gap-2">
                        <Input id="ogImage" name="ogImage" value={editedPage.ogImage} onChange={handleInputChange} />
                        <Button variant="outline">Browse</Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Recommended size: 1200 x 630 pixels for optimal display across platforms.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Social Media Preview</Label>
                      <div className="border rounded-md overflow-hidden">
                        <div className="h-40 bg-gray-200 flex items-center justify-center">
                          {editedPage.ogImage ? (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <p className="text-gray-500">Image: {editedPage.ogImage}</p>
                            </div>
                          ) : (
                            <p className="text-gray-500">No image set</p>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg">{editedPage.ogTitle || editedPage.metaTitle}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                            {editedPage.ogDescription || editedPage.metaDescription}
                          </p>
                          <p className="text-gray-500 text-xs mt-2">visify.com</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="advanced" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="indexStatus">Indexing Directives</Label>
                      <select
                        id="indexStatus"
                        name="indexStatus"
                        className="w-full rounded-md border p-2"
                        value={editedPage.indexStatus}
                        onChange={handleInputChange}
                      >
                        <option value="index,follow">index,follow (Default)</option>
                        <option value="noindex,follow">noindex,follow</option>
                        <option value="index,nofollow">index,nofollow</option>
                        <option value="noindex,nofollow">noindex,nofollow</option>
                      </select>
                      <p className="text-xs text-gray-500">
                        Controls whether search engines should index this page and follow its links.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="canonicalUrl">Canonical URL</Label>
                      <Input
                        id="canonicalUrl"
                        name="canonicalUrl"
                        value={editedPage.canonicalUrl}
                        onChange={handleInputChange}
                      />
                      <p className="text-xs text-gray-500">
                        Helps prevent duplicate content issues by specifying the preferred version of a page.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hreflang">Hreflang Tags (for multilingual sites)</Label>
                      <Textarea
                        id="hreflang"
                        rows={3}
                        placeholder="<link rel='alternate' hreflang='es' href='https://visify.com/es/services' />"
                      />
                      <p className="text-xs text-gray-500">
                        Helps search engines understand which language you're using on a specific page.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="structuredData">Structured Data (JSON-LD)</Label>
                      <Textarea
                        id="structuredData"
                        rows={5}
                        placeholder='<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Visify",
  "url": "https://visify.com"
}
</script>'
                      />
                      <p className="text-xs text-gray-500">
                        Helps search engines understand your content and can enable rich results in search.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">SEO Score:</div>
                  <div
                    className={`text-sm font-medium ${
                      seoScore >= 90 ? "text-green-600" : seoScore >= 70 ? "text-amber-600" : "text-red-600"
                    }`}
                  >
                    {seoScore}/100
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        seoScore >= 90 ? "bg-green-600" : seoScore >= 70 ? "bg-amber-600" : "bg-red-600"
                      }`}
                      style={{ width: `${seoScore}%` }}
                    ></div>
                  </div>
                </div>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-md p-12">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">No Page Selected</h3>
                <p className="text-gray-500 mb-4">Select a page from the list to edit its meta tags</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

