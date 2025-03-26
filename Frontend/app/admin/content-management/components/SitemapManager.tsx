"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, Download, RefreshCw, Send } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function SitemapManager() {
  const [lastGenerated, setLastGenerated] = useState("2023-10-15 14:30:22")
  const [sitemapUrls, setSitemapUrls] = useState(124)
  const [robotsTxt, setRobotsTxt] = useState(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/

Sitemap: https://visify.com/sitemap.xml`)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sitemap & Robots.txt Manager</h2>
          <p className="text-gray-500">Manage your XML sitemap and robots.txt file</p>
        </div>
      </div>

      <Tabs defaultValue="sitemap">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sitemap">XML Sitemap</TabsTrigger>
          <TabsTrigger value="robots">Robots.txt</TabsTrigger>
        </TabsList>
        <TabsContent value="sitemap" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>XML Sitemap</CardTitle>
              <CardDescription>
                Automatically generate and manage your XML sitemap for better search engine indexing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">Current Sitemap Status</p>
                  <p className="text-sm text-gray-500">Last generated: {lastGenerated}</p>
                  <p className="text-sm text-gray-500">URLs included: {sitemapUrls}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sitemap Settings</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeImages">Include image data</Label>
                    <Switch id="includeImages" defaultChecked />
                  </div>
                  <p className="text-xs text-gray-500">Add image metadata to help Google index your images</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeLastmod">Include last modified dates</Label>
                    <Switch id="includeLastmod" defaultChecked />
                  </div>
                  <p className="text-xs text-gray-500">
                    Add lastmod dates to help search engines know when content was updated
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includePriority">Include priority values</Label>
                    <Switch id="includePriority" defaultChecked />
                  </div>
                  <p className="text-xs text-gray-500">Add priority values to indicate the importance of pages</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excludePatterns">Exclude URL patterns (one per line)</Label>
                  <Textarea
                    id="excludePatterns"
                    placeholder="/admin/*
/private/*
/temp/*"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    URLs matching these patterns will be excluded from the sitemap
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sitemap Submission</h3>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Sitemap Submission Tip</AlertTitle>
                  <AlertDescription>
                    Submitting your sitemap to search engines helps them discover and index your pages faster.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="googleUrl">Google Search Console</Label>
                    <div className="flex gap-2">
                      <Input id="googleUrl" value="https://visify.com/sitemap.xml" readOnly />
                      <Button>
                        <Send className="mr-2 h-4 w-4" />
                        Submit
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bingUrl">Bing Webmaster Tools</Label>
                    <div className="flex gap-2">
                      <Input id="bingUrl" value="https://visify.com/sitemap.xml" readOnly />
                      <Button>
                        <Send className="mr-2 h-4 w-4" />
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Last submitted to Google: 2023-10-15</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Last submitted to Bing: 2023-10-15</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6">
              <Button>Save Settings & Regenerate Sitemap</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="robots" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Robots.txt Editor</CardTitle>
              <CardDescription>Control how search engines crawl and index your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  The robots.txt file tells search engines which pages they can and cannot crawl. Use with caution as
                  incorrect settings can affect your site's visibility.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="robotsTxt">robots.txt Content</Label>
                <Textarea
                  id="robotsTxt"
                  value={robotsTxt}
                  onChange={(e) => setRobotsTxt(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Common Rules</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="blockAdmin">Block /admin/ directory</Label>
                      <Switch id="blockAdmin" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="blockApi">Block /api/ endpoints</Label>
                      <Switch id="blockApi" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeSitemap">Include sitemap reference</Label>
                      <Switch id="includeSitemap" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="blockSearch">Block search result pages</Label>
                      <Switch id="blockSearch" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6">
              <Button>Save robots.txt</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

