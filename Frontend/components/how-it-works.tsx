"use client"

import { motion } from "framer-motion"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create an Account",
      description: "Register on our platform to access personalized visa packages based on your profile.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    },
    {
      number: "02",
      title: "Select Your Package",
      description: "Choose a visa package that matches your destination, purpose, job, and personal details.",
      image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?q=80&w=2070&auto=format&fit=crop",
    },
    {
      number: "03",
      title: "Access Documentation Guide",
      description: "Receive a comprehensive guide on required documents and how to prepare them correctly.",
      image: "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=2070&auto=format&fit=crop",
    },
    {
      number: "04",
      title: "Follow Application Steps",
      description: "Get detailed instructions on where and how to submit your visa application.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    },
    {
      number: "05",
      title: "Track Your Visa",
      description: "Once approved, track your visa validity, remaining days, and entry rights through your dashboard.",
      image: "https://images.unsplash.com/photo-1581362072978-14998d01fdaa?q=80&w=2070&auto=format&fit=crop",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="magazine-title text-3xl md:text-5xl mb-4 text-black">How It Works</h2>
          <p className="magazine-body max-w-3xl mx-auto">
            Our streamlined digital process makes visa applications simple and stress-free.
          </p>
        </div>

        <div className="space-y-24 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
            >
              <div className="md:w-1/2 space-y-6">
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-2xl font-light font-display">
                    {step.number}
                  </div>
                  <h3 className="text-3xl font-bold font-display text-black">{step.title}</h3>
                </motion.div>
                <motion.p
                  className="magazine-caption text-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {step.description}
                </motion.p>
              </div>
              <motion.div
                className="md:w-1/2 h-80 overflow-hidden rounded-lg shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

