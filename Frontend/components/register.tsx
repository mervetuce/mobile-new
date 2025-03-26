"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Create password validation schema
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
    message: "Password must contain at least one special character",
  })

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    
  })

  const [termsAgreed, setTermsAgreed] = useState(false)
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [usernameChecking, setUsernameChecking] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [redirectCountdown, setRedirectCountdown] = useState(5)

  // Generate month options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Simulate username availability check
  useEffect(() => {
    if (formData.username.length > 0) {
      setUsernameChecking(true)
      const timer = setTimeout(() => {
        // Simulate API call - usernames containing "admin" or "test" are taken
        const isTaken =
          formData.username.toLowerCase().includes("admin") || formData.username.toLowerCase().includes("test")
        setUsernameAvailable(!isTaken)
        setUsernameChecking(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [formData.username])

  // Handle redirect countdown
  useEffect(() => {
    if (registrationSuccess && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (registrationSuccess && redirectCountdown === 0) {
      window.location.href = "/login"
    }
  }, [registrationSuccess, redirectCountdown])

  // Password validation rules
  const passwordRules = [
    { id: "length", label: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { id: "uppercase", label: "At least 1 uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
    { id: "lowercase", label: "At least 1 lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    {
      id: "special",
      label: "At least 1 special character",
      test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ]

  // Validate password with Zod
  useEffect(() => {
    const validatePassword = () => {
      try {
        passwordSchema.parse(formData.password)
        setPasswordErrors([])
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          setPasswordErrors(error.errors.map((e) => e.message))
        }
        return false
      }
    }

    if (formData.password) {
      validatePassword()
    } else {
      setPasswordErrors([])
    }

    // Check if passwords match
    if (formData.confirmPassword) {
      setPasswordsMatch(formData.password === formData.confirmPassword)
    } else {
      setPasswordsMatch(true)
    }
  }, [formData.password, formData.confirmPassword])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // For number inputs, ensure only numbers are entered
    if ((name === "day" || name === "year") && value !== "" && !/^\d*$/.test(value)) {
      return
    }

    // Validate day range (1-31)
    if (name === "day" && value !== "") {
      const day = Number.parseInt(value)
      if (day < 1 || day > 31) return
    }

    // For year, just ensure it's numeric but don't restrict the range
    // This allows typing the year properly

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password
    try {
      passwordSchema.parse(formData.password)
    } catch (error) {
      return // Don't submit if password is invalid
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      return
    }

    // Form submission logic would go here
    console.log("Form submitted:", formData)
    console.log("Newsletter opt-in:", newsletterOptIn)

    // Show success message and start countdown
    setRegistrationSuccess(true)
  }

  // Check if password is valid
  const isPasswordValid = passwordRules.every((rule) => rule.test(formData.password))

  // Check if form is valid
  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.username.trim() !== "" &&
    usernameAvailable &&
    formData.day.trim() !== "" &&
    formData.month.trim() !== "" &&
    formData.year.trim() !== "" &&
    formData.gender.trim() !== "" &&
    formData.email.trim() !== "" &&
    isPasswordValid &&
    passwordsMatch &&
    termsAgreed

  return (
    <div className="w-full max-w-md mx-auto p-8 space-y-8">
      {registrationSuccess ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <Check className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Registration Successful</h2>
            <p className="text-gray-600 mb-4">Your account has been created successfully.</p>
            <p className="text-gray-600">Redirecting to login in {redirectCountdown} seconds...</p>
            <Button
              className="mt-6 bg-white hover:bg-gray-100 text-black border border-black"
              onClick={() => (window.location.href = "/login")}
            >
              Go to Login Now
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold font-display tracking-tight text-black">Create Your Account</h1>
            <p className="text-gray-600 font-serif">Join Visify for seamless visa applications</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-black">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-10 border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white text-black"
                    placeholder="First name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-black">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-10 border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white text-black"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-black">
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className={`h-10 border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white text-black pr-10 ${
                      !usernameAvailable && formData.username ? "border-red-500" : ""
                    }`}
                    placeholder="Choose a unique username"
                  />
                  {formData.username && !usernameChecking && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {usernameAvailable ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                    </div>
                  )}
                  {usernameChecking && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="h-4 w-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                {!usernameAvailable && formData.username && (
                  <p className="text-red-500 text-xs mt-1">This username is already taken</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">Date of Birth</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Input
                      id="day"
                      name="day"
                      type="text"
                      required
                      value={formData.day}
                      onChange={handleChange}
                      className="h-10 border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white text-black"
                      placeholder="Day"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <Select value={formData.month} onValueChange={(value) => handleSelectChange("month", value)}>
                      <SelectTrigger className="h-10 border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white text-black">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, index) => (
                          <SelectItem key={index} value={(index + 1).toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input
                      id="year"
                      name="year"
                      type="text"
                      required
                      value={formData.year}
                      onChange={handleChange}
                      className="h-10 border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white text-black"
                      placeholder="Year"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium text-black">
                  Gender
                </Label>
                <div className="flex space-x-6 mt-1">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={() => handleSelectChange("gender", "male")}
                      className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                    />
                    <Label htmlFor="male" className="ml-2 text-sm text-gray-700">
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={() => handleSelectChange("gender", "female")}
                      className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                    />
                    <Label htmlFor="female" className="ml-2 text-sm text-gray-700">
                      Female
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-black">
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
                <Label htmlFor="password" className="text-sm font-medium text-black">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="h-10 border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white text-black pr-10"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password rules - only show when password field is focused or has errors */}
                {(passwordFocused || (formData.password && passwordErrors.length > 0)) && (
                  <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md space-y-1">
                    <p className="text-xs font-medium text-gray-700 mb-1">Password must contain:</p>
                    {passwordRules.map((rule) => (
                      <div key={rule.id} className="flex items-center space-x-2">
                        {rule.test(formData.password) ? (
                          <Check size={12} className="text-green-500" />
                        ) : (
                          <X size={12} className="text-gray-400" />
                        )}
                        <span
                          className={`text-xs ${rule.test(formData.password) ? "text-green-500" : "text-gray-500"}`}
                        >
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-black">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`h-10 border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white text-black pr-10 ${
                      !passwordsMatch && formData.confirmPassword ? "border-red-500" : ""
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {!passwordsMatch && formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
              </div>

              

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={termsAgreed}
                    onCheckedChange={(checked) => setTermsAgreed(checked as boolean)}
                    className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600 font-serif">
                    I agree to the{" "}
                    <Link href="/terms" className="text-black underline hover:text-gray-700 transition-colors">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-black underline hover:text-gray-700 transition-colors">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="newsletter"
                    checked={newsletterOptIn}
                    onCheckedChange={(checked) => setNewsletterOptIn(checked as boolean)}
                    className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black mt-1"
                  />
                  <Label htmlFor="newsletter" className="text-sm text-gray-600 font-serif">
                    I would like to receive newsletters, promotions and updates about visa services
                  </Label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full h-12 bg-white hover:bg-gray-100 text-black border border-black font-medium uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              SIGN UP
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-600 font-serif">
                Already have an account?{" "}
                <Link href="/login" className="text-black font-medium hover:underline" prefetch={true}>
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

