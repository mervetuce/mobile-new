"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, RefreshCw, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function VisaTracker() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <section id="visa-tracker" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2074&auto=format&fit=crop"
          alt="World map background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">Visa Tracking Dashboard</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Monitor your active visas, track remaining days, and manage entry rights all in one place.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-xl">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-4 text-lg font-medium ${
                  activeTab === "dashboard"
                    ? "bg-black/5 border-b-2 border-black text-black"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                Active Visas
              </button>
              <button
                className={`px-6 py-4 text-lg font-medium ${
                  activeTab === "history"
                    ? "bg-black/5 border-b-2 border-black text-black"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("history")}
              >
                Visa History
              </button>
              <button
                className={`px-6 py-4 text-lg font-medium ${
                  activeTab === "add"
                    ? "bg-black/5 border-b-2 border-black text-black"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("add")}
              >
                Add New Visa
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              {activeTab === "dashboard" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white border-gray-200 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold font-display mb-1">Schengen Visa</h3>
                          <p className="text-gray-600">Multiple Entry</p>
                        </div>
                        <div className="bg-green-500/10 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          Active
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-black mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Valid Until</p>
                            <p className="font-medium">15 Dec 2025</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-black mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Days Remaining</p>
                            <p className="font-medium">45 of 90 days</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <RefreshCw className="h-5 w-5 text-black mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Entries</p>
                            <p className="font-medium">2 of Multiple</p>
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-black h-full rounded-full" style={{ width: "50%" }}></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">50% of stay duration used</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-gray-200 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold font-display mb-1">UK Visa</h3>
                          <p className="text-gray-600">Single Entry</p>
                        </div>
                        <div className="bg-yellow-500/10 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                          Expiring Soon
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-black mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Valid Until</p>
                            <p className="font-medium">30 Apr 2025</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-black mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Days Remaining</p>
                            <p className="font-medium">12 of 30 days</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Status</p>
                            <p className="font-medium text-yellow-600">Expires in 15 days</p>
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-black h-full rounded-full" style={{ width: "80%" }}></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">80% of validity period elapsed</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "history" && (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">Login to view your visa history</p>
                  <Button className="bg-black hover:bg-gray-800 text-white">Sign In to View</Button>
                </div>
              )}

              {activeTab === "add" && (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">Login to add and track your visas</p>
                  <Button className="bg-black hover:bg-gray-800 text-white">Sign In to Add Visa</Button>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Create an account to track all your visas in one place and receive expiration alerts
            </p>
            <Button className="bg-black hover:bg-gray-800 text-white">Register Now</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

