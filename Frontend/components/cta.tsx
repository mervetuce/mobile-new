"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CTA() {
  const globalEvents = [
    {
      title: "Coachella Music Festival",
      location: "California, USA",
      date: "April 2025",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
      category: "Music",
    },
    {
      title: "FIFA World Cup",
      location: "Multiple Cities",
      date: "June-July 2026",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2069&auto=format&fit=crop",
      category: "Sports",
    },
    {
      title: "Venice Biennale",
      location: "Venice, Italy",
      date: "May-November 2025",
      image: "https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=2076&auto=format&fit=crop",
      category: "Art",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display text-black">Global Events</h2>
          <p className="text-xl text-black max-w-3xl mx-auto font-serif">
            Plan ahead for these major international events and secure your visa in time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {globalEvents.map((event, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3">
                  {event.category}
                </span>
                <h3 className="text-2xl font-bold mb-1 font-display">{event.title}</h3>
                <p className="text-white/80 mb-1 font-serif">{event.location}</p>
                <p className="text-white/80 mb-4 font-serif">{event.date}</p>
                <Button variant="outline" size="sm" className="border-white text-white bg-black/30 hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xl text-black mb-6 max-w-3xl mx-auto font-serif">
            Stay informed about upcoming global events and travel trends to plan your international trips.
          </p>
          <Link href="#events">
            <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg">
              Explore All Events <ArrowRight className="ml-2 h-5 w-5" strokeWidth={1.5} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

