"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Check, Eye, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function HomepageEditor() {
  const [activeSection, setActiveSection] = useState("hero")
  const [previewMode, setPreviewMode] = useState(false)
  const [seoScore, setSeoScore] = useState(85)

  const sections = [
    { id: "hero", name: "Hero Section" },
    { id: "services", name: "Services Section" },
    { id: "testimonials", name: "Testimonials" },
    { id: "contact", name: "Contact Information" },
  ]

  const [heroContent, setHeroContent] = useState({
    headline: "Apply Visa Easily",
    subtext: "Expert guidance for visa applications tailored to your profile, purpose, and destination.",
    ctaText: "Discover",
    image: "/hero-image.jpg",
    metaTitle: "Visify - Travel Agency & Visa Consultation",
    metaDescription:
      "Expert guidance for visa applications and personalized travel planning to make your international adventures seamless.",
  })

  const handleHeroChange = (e) => {
    const { name, value } = e.target
    setHeroContent((prev) => ({ ...prev, [name]: value }))

    // Simulate SEO score calculation
    if (name === "metaTitle" || name === "metaDescription") {
      const titleLength = heroContent.metaTitle.length
      const descLength = heroContent.metaDescription.length

      let newScore = 85
      if (titleLength > 40 && titleLength < 60) newScore += 5
      if (descLength > 120 && descLength < 160) newScore += 5
      if (descLength < 120 || descLength > 160) newScore -= 5

      setSeoScore(Math.min(100, Math.max(0, newScore)))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Homepage Editor</h2>
          <p className="text-gray-500">Edit homepage content and SEO settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? "Edit Mode" : "Preview"}
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Page Sections</CardTitle>
              <CardDescription>Select a section to edit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>SEO Score</CardTitle>
              <CardDescription>Current optimization level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Score</span>
                  <span
                    className={`text-sm font-medium ${
                      seoScore >= 90 ? "text-green-600" : seoScore >= 70 ? "text-amber-600" : "text-red-600"
                    }`}
                  >
                    {seoScore}/100
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      seoScore >= 90 ? "bg-green-600" : seoScore >= 70 ? "bg-amber-600" : "bg-red-600"
                    }`}
                    style={{ width: `${seoScore}%` }}
                  ></div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Meta title is set</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Meta description is set</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span>Description could be more detailed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {activeSection === "hero" && (
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Edit the main hero section content</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="content" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="headline">Headline</Label>
                      <Input id="headline" name="headline" value={heroContent.headline} onChange={handleHeroChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtext">Subtext</Label>
                      <Textarea
                        id="subtext"
                        name="subtext"
                        value={heroContent.subtext}
                        onChange={handleHeroChange}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ctaText">CTA Button Text</Label>
                        <Input id="ctaText" name="ctaText" value={heroContent.ctaText} onChange={handleHeroChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="image">Background Image</Label>
                        <div className="flex gap-2">
                          <Input id="image" name="image" value={heroContent.image} onChange={handleHeroChange} />
                          <Button variant="outline">Browse</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="seo" className="space-y-4 pt-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>SEO Tip</AlertTitle>
                      <AlertDescription>
                        Keep your meta title between 50-60 characters and meta description between 120-160 characters
                        for optimal search engine visibility.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">
                        Meta Title
                        <span
                          className={`ml-2 text-xs ${
                            heroContent.metaTitle.length > 60
                              ? "text-red-500"
                              : heroContent.metaTitle.length < 40
                                ? "text-amber-500"
                                : "text-green-500"
                          }`}
                        >
                          ({heroContent.metaTitle.length}/60)
                        </span>
                      </Label>
                      <Input
                        id="metaTitle"
                        name="metaTitle"
                        value={heroContent.metaTitle}
                        onChange={handleHeroChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">
                        Meta Description
                        <span
                          className={`ml-2 text-xs ${
                            heroContent.metaDescription.length > 160
                              ? "text-red-500"
                              : heroContent.metaDescription.length < 120
                                ? "text-amber-500"
                                : "text-green-500"
                          }`}
                        >
                          ({heroContent.metaDescription.length}/160)
                        </span>
                      </Label>
                      <Textarea
                        id="metaDescription"
                        name="metaDescription"
                        value={heroContent.metaDescription}
                        onChange={handleHeroChange}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Google Search Preview</Label>
                      <div className="border rounded-md p-4 bg-white">
                        <div className="text-blue-600 text-lg font-medium truncate">
                          {heroContent.metaTitle || "Visify - Travel Agency & Visa Consultation"}
                        </div>
                        <div className="text-green-700 text-sm">https://visify.com/</div>
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {heroContent.metaDescription ||
                            "Expert guidance for visa applications and personalized travel planning to make your international adventures seamless."}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Other section editors would go here */}
          {activeSection !== "hero" && (
            <Card>
              <CardHeader>
                <CardTitle>{sections.find((s) => s.id === activeSection)?.name}</CardTitle>
                <CardDescription>Edit this section's content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-gray-500">Editor for {sections.find((s) => s.id === activeSection)?.name}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

