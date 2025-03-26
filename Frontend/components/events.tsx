"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function Events() {
  const events = [
    {
      title: "Travel Trends 2025",
      date: "January 15, 2025",
      location: "Online Webinar",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
      excerpt: "Discover the hottest travel destinations and visa requirements for the upcoming year.",
      category: "Trends",
    },
    {
      title: "Navigating Post-Pandemic Travel",
      date: "February 10, 2025",
      location: "Virtual Conference",
      image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070&auto=format&fit=crop",
      excerpt: "Expert insights on changing visa policies and health requirements for international travel.",
      category: "Guide",
    },
    {
      title: "Digital Nomad Visa Opportunities",
      date: "March 5, 2025",
      location: "Online Workshop",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      excerpt: "Learn about countries offering special visas for remote workers and digital nomads.",
      category: "Remote Work",
    },
    {
      title: "Summer Festival Guide",
      date: "April 20, 2025",
      location: "Blog Article",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?q=80&w=2070&auto=format&fit=crop",
      excerpt: "A comprehensive guide to the biggest summer festivals worldwide and their visa requirements.",
      category: "Events",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showButtons, setShowButtons] = useState(false)
  const visibleEvents = 1

  useEffect(() => {
    // Show buttons initially and then on hover
    setShowButtons(true)
    const timer = setTimeout(() => setShowButtons(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleEvents >= events.length ? 0 : prevIndex + 1))
    setShowButtons(true)
    setTimeout(() => setShowButtons(false), 2000)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, events.length - visibleEvents) : prevIndex - 1))
    setShowButtons(true)
    setTimeout(() => setShowButtons(false), 2000)
  }

  return (
    <section
      id="events"
      className="py-20 bg-white"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="magazine-title text-3xl md:text-5xl mb-4 text-black">Travel Trends</h2>
          <p className="magazine-body max-w-3xl mx-auto">
            Stay informed about travel trends, visa updates, and global events.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence>
            {showButtons && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black text-white border-black hover:bg-black/80 shadow-lg"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous</span>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black text-white border-black hover:bg-black/80 shadow-lg"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next</span>
                  </Button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / visibleEvents}%)`,
              }}
            >
              {events.map((event, index) => (
                <div key={index} className="w-full flex-shrink-0 p-4">
                  <Card className="bg-white border-gray-200 shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 h-64 md:h-auto relative">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-medium px-3 py-1 rounded-full">
                            {event.category}
                          </div>
                        </div>
                        <div className="md:w-1/2 p-8 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold font-display mb-3 text-black">{event.title}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <Calendar className="h-4 w-4 mr-2" strokeWidth={1.5} />
                              <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-4">
                              <MapPin className="h-4 w-4 mr-2" strokeWidth={1.5} />
                              <span className="text-sm">{event.location}</span>
                            </div>
                            <p className="magazine-caption mb-6">{event.excerpt}</p>
                          </div>
                          <Link
                            href="#"
                            className="inline-flex items-center text-white font-medium bg-black px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                          >
                            Read More <ArrowRight className="ml-1 h-4 w-4" strokeWidth={1.5} />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            {events.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${index === currentIndex ? "bg-black" : "bg-gray-300"}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-black hover:bg-gray-800 text-white">View All Articles</Button>
        </div>
      </div>
    </section>
  )
}

