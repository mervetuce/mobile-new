import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Packages from "@/components/packages"
import HowItWorks from "@/components/how-it-works"
import Events from "@/components/events"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="space-y-1">
        <Hero />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Packages />
        <div className="section-divider" />
        <HowItWorks />
        <div className="section-divider" />
        <Events />
        <div className="section-divider" />
        <CTA />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

