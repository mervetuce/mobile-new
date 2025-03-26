"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Code, Plus, Search, Trash } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqCategories = [
  {
    id: 1,
    name: "Visa Types",
    faqs: [
      {
        id: 1,
        question: "What is the difference between a tourist visa and a business visa?",
        answer:
          "A tourist visa is for recreational travel, while a business visa is for professional activities like meetings or conferences. Business visas typically require additional documentation such as invitation letters from companies in the destination country.",
      },
      {
        id: 2,
        question: "How long does a Schengen visa allow me to stay in Europe?",
        answer:
          "A standard Schengen visa allows you to stay for up to 90 days within a 180-day period across all Schengen countries combined. This is calculated on a rolling basis, not per calendar year.",
      },
    ],
  },
  {
    id: 2,
    name: "Application Process",
    faqs: [
      {
        id: 3,
        question: "What documents are typically required for a visa application?",
        answer:
          "Common documents include a valid passport, visa application form, passport-sized photos, proof of travel insurance, flight itinerary, hotel reservations, bank statements, and a letter stating the purpose of your visit.",
      },
      {
        id: 4,
        question: "How far in advance should I apply for a visa?",
        answer:
          "It's recommended to apply at least 3-4 weeks before your planned travel date. For peak travel seasons or countries with longer processing times, consider applying 2-3 months in advance.",
      },
    ],
  },
  {
    id: 3,
    name: "Processing Time",
    faqs: [
      {
        id: 5,
        question: "How long does it take to process a US tourist visa?",
        answer:
          "US tourist visa (B1/B2) processing typically takes 3-5 business days after the interview. However, wait times for interview appointments can vary significantly by location, ranging from a few days to several months.",
      },
    ],
  },
]

export function FAQManagement() {
  const [selectedCategory, setSelectedCategory] = useState(faqCategories[0])
  const [selectedFAQ, setSelectedFAQ] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSchemaCode, setShowSchemaCode] = useState(false)

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">FAQ Management</h2>
          <p className="text-gray-500">Create and organize frequently asked questions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Category
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New FAQ
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>FAQ Categories</CardTitle>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>
              <CardDescription>Select a category to manage its FAQs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCategories.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredCategories.map((category) => (
                      <AccordionItem key={category.id} value={`category-${category.id}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div
                            className={`text-left ${selectedCategory?.id === category.id ? "font-medium" : ""}`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category.name} ({category.faqs.length})
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4 space-y-2 pt-2">
                            {category.faqs.map((faq) => (
                              <div
                                key={faq.id}
                                className={`p-2 rounded-md cursor-pointer ${
                                  selectedFAQ?.id === faq.id ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                                }`}
                                onClick={() => setSelectedFAQ(faq)}
                              >
                                {faq.question}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-8 text-gray-500">No FAQs found matching your search</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedFAQ ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Edit FAQ</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowSchemaCode(!showSchemaCode)}>
                      <Code className="mr-2 h-4 w-4" />
                      {showSchemaCode ? "Hide Schema" : "View Schema"}
                    </Button>
                    <Button size="sm">Save Changes</Button>
                  </div>
                </div>
                <CardDescription>Category: {selectedCategory.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {showSchemaCode ? (
                  <div className="space-y-2">
                    <Label>FAQ Schema (JSON-LD)</Label>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                      <pre>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "${selectedFAQ.question}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${selectedFAQ.answer}"
      }
    }
  ]
}
</script>`}</pre>
                    </div>
                    <p className="text-sm text-gray-500">
                      This schema markup helps Google recognize this content as an FAQ and may display it as a rich
                      result in search.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="question">Question</Label>
                      <Input id="question" defaultValue={selectedFAQ.question} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="answer">Answer</Label>
                      <Textarea id="answer" rows={6} defaultValue={selectedFAQ.answer} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          className="w-full rounded-md border p-2"
                          defaultValue={selectedCategory.id}
                        >
                          {faqCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="order">Display Order</Label>
                        <Input id="order" type="number" defaultValue="1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keywords">SEO Keywords (comma separated)</Label>
                      <Input id="keywords" defaultValue="visa, application, requirements" />
                      <p className="text-xs text-gray-500">
                        These keywords help search engines understand what this FAQ is about.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete FAQ
                </Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-md p-12">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">No FAQ Selected</h3>
                <p className="text-gray-500 mb-4">Select an FAQ from the list to edit or create a new one</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New FAQ
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

