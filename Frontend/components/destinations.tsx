"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Destinations() {
  const destinations = [
    {
      name: "United States",
      image: "/placeholder.svg?height=600&width=800",
      visaType: "B1/B2 Tourist Visa",
    },
    {
      name: "United Kingdom",
      image: "/placeholder.svg?height=600&width=800",
      visaType: "Standard Visitor Visa",
    },
    {
      name: "Schengen Area",
      image: "/placeholder.svg?height=600&width=800",
      visaType: "Schengen Tourist Visa",
    },
    {
      name: "Canada",
      image: "/placeholder.svg?height=600&width=800",
      visaType: "Visitor Visa",
    },
    {
      name: "Australia",
      image: "/placeholder.svg?height=600&width=800",
      visaType: "Tourist Visa (Subclass 600)",
    },
    {
      name: "Japan",
      image: "/placeholder.svg?height=600&width=800",
      visaType: "Tourist Visa",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleDestinations = 3

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleDestinations >= destinations.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, destinations.length - visibleDestinations) : prevIndex - 1,
    )
  }

  return (
    <section id="destinations" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our expertise in visa processing for these top travel destinations around the world.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-gray-700 hover:bg-gray-800"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-gray-700 hover:bg-gray-800"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / visibleDestinations}%)`,
              }}
            >
              {destinations.map((destination, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-4">
                  <Card className="bg-gray-900 border-gray-800 overflow-hidden h-full">
                    <div className="relative h-64 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
                        style={{ backgroundImage: `url(${destination.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-bold">{destination.name}</h3>
                        <p className="text-sm text-gray-300">{destination.visaType}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                        View Visa Requirements
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

