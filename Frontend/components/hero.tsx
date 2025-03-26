"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import VisaDialog from "./visa-dialog"

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const images = [
    "https://images.unsplash.com/photo-1501408587734-2c22fda1fde2?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?q=80&w=2074&auto=format&fit=crop",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${images[currentImage]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          className="magazine-title text-4xl md:text-7xl mb-6 leading-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Apply Visa Easily
        </motion.h1>
        <motion.p
          className="magazine-body text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Expert guidance for visa applications tailored to your profile, purpose, and destination.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="bg-white text-black px-8 py-6 text-lg font-medium rounded-md relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f8f8f8",
            }}
            whileTap={{
              scale: 0.98,
              backgroundColor: "#e0e0e0",
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
            }}
            onClick={() => setIsDialogOpen(true)}
          >
            <motion.span
              className="relative z-10"
              whileHover={{ letterSpacing: "0.05em" }}
              transition={{ duration: 0.3 }}
            >
              Discover
            </motion.span>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-black"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Visa Dialog */}
      <VisaDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
}

