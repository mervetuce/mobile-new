import Login from "@/components/login"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <Login />
      </div>
      <Footer />
    </div>
  )
}

