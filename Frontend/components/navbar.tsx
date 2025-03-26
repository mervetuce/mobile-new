"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search, ShoppingCart, User } from "lucide-react"
import HamburgerMenu from "./hamburger-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Top row with hamburger, logo, and profile */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button className="text-black hover:opacity-70 transition-opacity" onClick={() => setIsMenuOpen(true)}>
                <Menu size={24} strokeWidth={1.5} />
              </button>
              <button className="text-black hover:opacity-70 transition-opacity">
                <Search size={20} strokeWidth={1.5} />
              </button>
            </div>

            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <span className="text-2xl font-bold font-display text-black uppercase tracking-wider">VISIFY</span>
            </Link>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="text-black hover:opacity-70 transition-opacity">
                <ShoppingCart size={20} strokeWidth={1.5} />
              </Button>
              <Link href="/login">
                <Button variant="ghost" size="icon" className="text-black hover:opacity-70 transition-opacity">
                  <User size={20} strokeWidth={1.5} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom row with centered navigation links */}
          <div className="flex justify-center pb-4">
            <div className="flex items-center space-x-8">
              {["SERVICES", "PACKAGES", "HOW IT WORKS", "EVENTS", "TRENDS"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="hover-underline text-black font-bold uppercase text-xs tracking-wider"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

