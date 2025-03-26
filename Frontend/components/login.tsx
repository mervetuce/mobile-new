"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Login submitted:", formData)
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold font-display tracking-tight text-black">Welcome Back</h1>
        <p className="text-gray-600 font-serif">Sign in to your Visify account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-black flex items-center">
            <Mail size={16} className="mr-2 text-gray-500" />
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="h-10 border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white text-black"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-black flex items-center">
              <Lock size={16} className="mr-2 text-gray-500" />
              Password
            </Label>
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-black transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              className="h-10 border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white text-black pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
          />
          <Label htmlFor="remember" className="text-sm text-gray-600 font-serif">
            Remember me
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-white hover:bg-gray-100 text-black border border-black font-medium uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-md"
        >
          SIGN IN
        </Button>

        <div className="text-center pt-4">
          <p className="text-gray-600 font-serif">
            Don't have an account?{" "}
            <Link href="/register" className="text-black font-medium hover:underline" prefetch={true}>
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

