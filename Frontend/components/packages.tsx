"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Plane, Users, Check } from "lucide-react"

export default function Packages() {
  const packageTypes = [
    {
      icon: <Briefcase className="h-10 w-10 text-black" strokeWidth={1.5} />,
      title: "Business Visa Packages",
      description: "For professionals traveling for business meetings, conferences, or corporate events.",
      features: [
        "Business invitation letter templates",
        "Company documentation guidance",
        "Business travel history optimization",
        "Interview preparation for business visas",
      ],
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2070&auto=format&fit=crop",
      popular: false,
    },
    {
      icon: <Plane className="h-10 w-10 text-black" strokeWidth={1.5} />,
      title: "Tourist Visa Packages",
      description: "For leisure travelers planning holidays, sightseeing, or visiting friends abroad.",
      features: [
        "Travel itinerary planning",
        "Accommodation documentation",
        "Financial requirements guidance",
        "Return intention documentation",
      ],
      image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2070&auto=format&fit=crop",
      popular: true,
    },
    {
      icon: <Users className="h-10 w-10 text-black" strokeWidth={1.5} />,
      title: "Visitor Visa Packages",
      description: "For those visiting family or friends abroad with formal invitation letters.",
      features: [
        "Invitation letter verification",
        "Host accommodation documentation",
        "Family relationship evidence",
        "Temporary visitor guidance",
      ],
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop",
      popular: false,
    },
  ]

  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display text-black">Visa Packages</h2>
          <p className="text-xl text-black max-w-3xl mx-auto font-serif">
            Our visa packages are tailored to your specific profile, travel purpose, and destination country.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packageTypes.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`bg-white border-gray-200 overflow-hidden relative ${pkg.popular ? "border-black" : ""} hover:shadow-xl transition-all duration-300 h-full`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-black text-white px-4 py-1 text-sm font-bold z-10">
                    POPULAR
                  </div>
                )}
                <div className="h-48 overflow-hidden">
                  <img
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="mb-4">{pkg.icon}</div>
                  <CardTitle className="text-xl font-bold font-display text-black">{pkg.title}</CardTitle>
                  <CardDescription className="text-gray-600 font-serif text-base">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-gray-700 font-serif text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">View Package Options</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
            View All Package Types
          </Button>
        </div>
      </div>
    </section>
  )
}

