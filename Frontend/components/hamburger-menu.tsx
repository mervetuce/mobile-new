"use client"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  User,
  Package,
  Clock,
  ShoppingCart,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Phone,
  ChevronRight,
  LogOut,
} from "lucide-react"

export default function HamburgerMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const menuItems = [
    {
      title: "User Account & Services",
      items: [
        { label: "My Account", icon: <User size={20} />, href: "/account" },
        { label: "My Packages", icon: <Package size={20} />, href: "/packages" },
        { label: "Visa Tracker", icon: <Clock size={20} />, href: "/tracker" },
        { label: "Cart", icon: <ShoppingCart size={20} />, href: "/cart" },
        { label: "Payment", icon: <CreditCard size={20} />, href: "/payment" },
      ],
    },
    {
      title: "Help Center",
      items: [
        { label: "FAQs", icon: <HelpCircle size={20} />, href: "/faqs" },
        { label: "Support (AI Chatbot)", icon: <MessageCircle size={20} />, href: "/support" },
        { label: "Contact Us", icon: <Phone size={20} />, href: "/contact" },
      ],
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.5 }}
          className="fixed inset-0 bg-white z-50 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <Link href="/" className="text-2xl font-bold font-display text-black uppercase tracking-wider">
                VISIFY
              </Link>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-black hover:bg-white/10 border border-black rounded-full p-2">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight size={24} />
                </motion.div>
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <Link
                href="/"
                className="block text-black text-3xl font-display mb-12 hover:opacity-70 transition-opacity"
              >
                Homepage
              </Link>

              {menuItems.map((section, index) => (
                <div key={index} className="mb-12">
                  <h2 className="text-gray-800 text-sm uppercase tracking-wider mb-4">{section.title}</h2>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          href={item.href}
                          className="flex items-center text-black text-xl hover:opacity-70 transition-opacity"
                        >
                          {item.icon}
                          <span className="ml-3">{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <Button
                variant="ghost"
                className="flex items-center text-black text-xl hover:opacity-70 transition-opacity p-0"
              >
                <LogOut size={20} />
                <span className="ml-3">Log Out</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

