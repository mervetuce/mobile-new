import { CheckCircle2 } from "lucide-react"

export default function VisaProcess() {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "Schedule a free consultation to discuss your travel plans and visa requirements with our experts.",
    },
    {
      number: "02",
      title: "Document Preparation",
      description: "We'll guide you through the required documentation and help you prepare a strong visa application.",
    },
    {
      number: "03",
      title: "Application Submission",
      description: "Our team will review your application before submission to ensure everything is in order.",
    },
    {
      number: "04",
      title: "Interview Preparation",
      description: "Get comprehensive preparation for visa interviews with mock sessions and expert tips.",
    },
    {
      number: "05",
      title: "Visa Approval",
      description: "We'll track your application status and notify you once your visa is approved.",
    },
  ]

  return (
    <section id="visa-process" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Visa Process</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A streamlined approach to make your visa application process smooth and successful.
          </p>
        </div>

        <div className="relative">
          {/* Process Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-x-1/2" />

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className="md:w-1/2 text-center md:text-left">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 border-2 border-purple-500 text-2xl font-bold mb-4 relative z-10 ${
                      index % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                <div className="hidden md:block md:w-1/2">
                  <div
                    className={`w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center relative z-10 ${
                      index % 2 === 0 ? "ml-auto mr-0" : "ml-0 mr-auto"
                    }`}
                  >
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

