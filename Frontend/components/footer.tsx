import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-black mb-4 font-display">Visify</h3>
            <p className="mb-4">
              Your trusted partner for visa consultations and travel planning. Making international travel accessible
              and stress-free.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-4 font-display">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="hover-underline hover:text-black transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#packages" className="hover-underline hover:text-black transition-colors">
                  Visa Packages
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover-underline hover:text-black transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#visa-tracker" className="hover-underline hover:text-black transition-colors">
                  Visa Tracker
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover-underline hover:text-black transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover-underline hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-4 font-display">Visa Packages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover-underline hover:text-black transition-colors">
                  Tourist Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover-underline hover:text-black transition-colors">
                  Business Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover-underline hover:text-black transition-colors">
                  Student Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover-underline hover:text-black transition-colors">
                  Medical Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover-underline hover:text-black transition-colors">
                  Family Visit Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover-underline hover:text-black transition-colors">
                  Package Comparison
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-4 font-display">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-black" />
                <span>123 Travel Street, Global City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-black" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-black" />
                <span>info@visify.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Visify. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover-underline text-gray-500 hover:text-black transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover-underline text-gray-500 hover:text-black transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover-underline text-gray-500 hover:text-black transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

