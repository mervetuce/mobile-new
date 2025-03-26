"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronDown } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Form schema with validation
const formSchema = z.object({
  country: z.string().min(1, { message: "Please select a country" }),
  travelPurpose: z.string().min(1, { message: "Please select a travel purpose" }),
  professionalStatus: z.string().min(1, { message: "Please select your professional status" }),
  gender: z.enum(["female", "male"], {
    required_error: "Please select your gender",
  }),
  birthDay: z.coerce
    .number()
    .min(1, { message: "Day must be at least 1" })
    .max(31, { message: "Day cannot exceed 31" }),
  birthMonth: z.string().min(1, { message: "Please select a month" }),
  birthYear: z.coerce
    .number()
    .min(1900, { message: "Year must be at least 1900" })
    .max(new Date().getFullYear(), { message: "Year cannot exceed current year" }),
})

type FormValues = z.infer<typeof formSchema>

interface VisaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VisaDialog({ open, onOpenChange }: VisaDialogProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      travelPurpose: "",
      professionalStatus: "",
      gender: "female",
      birthDay: 1,
      birthMonth: "",
      birthYear: new Date().getFullYear(),
    },
  })

  // Check if content is scrollable
  useEffect(() => {
    if (open && contentRef.current) {
      const checkScrollable = () => {
        const element = contentRef.current
        if (element) {
          setShowScrollIndicator(element.scrollHeight > element.clientHeight)
        }
      }

      // Check initially and on resize
      checkScrollable()
      window.addEventListener("resize", checkScrollable)

      // Cleanup
      return () => window.removeEventListener("resize", checkScrollable)
    }
  }, [open])

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        country: "",
        travelPurpose: "",
        professionalStatus: "",
        gender: "female",
        birthDay: 1,
        birthMonth: "",
        birthYear: new Date().getFullYear(),
      })
    }
  }, [open, form])

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data)
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!")
    onOpenChange(false)
  }

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden bg-white sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px]">
        <div className="flex flex-col max-h-[calc(100vh-4rem)]">
          {/* Fixed header */}
          <div className="p-6 pb-2 border-b">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Visa Application Form</DialogTitle>
            </DialogHeader>
          </div>

          {/* Scrollable content */}
          <div
            ref={contentRef}
            className="p-6 overflow-y-auto flex-grow relative scroll-smooth"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d5db transparent",
            }}
          >
            {/* Scroll indicator */}
            {showScrollIndicator && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 pointer-events-none animate-bounce">
                <ChevronDown className="h-6 w-6 text-gray-400" />
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium text-base">Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="jp">Japan</SelectItem>
                          <SelectItem value="schengen">Schengen Area</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="it">Italy</SelectItem>
                          <SelectItem value="es">Spain</SelectItem>
                          <SelectItem value="sg">Singapore</SelectItem>
                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelPurpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium text-base">Travel Purpose</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Travel Purpose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tourism">Tourism</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="family">Family Visit</SelectItem>
                          <SelectItem value="work">Work</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="cultural">Cultural Exchange</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="professionalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-medium text-base">Professional Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Professional Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="business-owner">Business Owner</SelectItem>
                          <SelectItem value="freelancer">Freelancer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-black font-medium text-base">Gender</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-8">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" className="h-5 w-5 border-gray-400" />
                            <Label htmlFor="female" className="text-base">
                              Female
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" className="h-5 w-5 border-gray-400" />
                            <Label htmlFor="male" className="text-base">
                              Male
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel className="text-black font-medium text-base">Date of Birth</FormLabel>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <FormField
                      control={form.control}
                      name="birthDay"
                      render={({ field }) => (
                        <FormItem className="sm:flex-1">
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Day"
                              min={1}
                              max={31}
                              className="h-12 border-gray-300 text-center text-base"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => {
                                const value = e.target.value === "" ? 1 : Number.parseInt(e.target.value, 10)
                                field.onChange(value)
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthMonth"
                      render={({ field }) => (
                        <FormItem className="sm:flex-[2]">
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {months.map((month, index) => (
                                <SelectItem key={month} value={(index + 1).toString()}>
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthYear"
                      render={({ field }) => (
                        <FormItem className="sm:flex-[1.5]">
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Year"
                              min={1900}
                              max={new Date().getFullYear()}
                              className="h-12 border-gray-300 text-center text-base"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => {
                                const value = e.target.value === "" ? new Date().getFullYear() : Number.parseInt(e.target.value, 10)
                                field.onChange(value)
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>

          {/* Fixed footer */}
          <div className="p-6 pt-4 border-t">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-4 rounded-md text-base"
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

