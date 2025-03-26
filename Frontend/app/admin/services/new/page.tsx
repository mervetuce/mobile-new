"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NewServicePage() {
  const router = useRouter()
  
  // Redirect to the main services page with the query parameter to open the form
  useEffect(() => {
    router.push("/admin/services?new=true")
  }, [router])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
} 