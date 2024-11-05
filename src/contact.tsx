'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  Mail,
  MapPin,
  Globe,
} from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const mailtoLink = `mailto:info@yalamainternational.com?subject=Contact Form Submission from ${encodeURIComponent(
      formData.name
    )}&body=Name: ${encodeURIComponent(
      formData.name
    )}%0AEmail: ${encodeURIComponent(
      formData.email
    )}%0AMessage: ${encodeURIComponent(formData.message)}`

    window.location.href = mailtoLink

    setFormData({ name: "", email: "", message: "" })
  }

  const locations = [
    {
      region: "DUBAI:",
      address: [
        "Dubai World Central Block C, Emirates Road,",
        "Jabel Ali, Dubai",
        "United Arab Emirates",
        "P.O. Box 28228"
      ],
      phone: "+971 568 862 632",
      maps: "https://www.google.com/maps/place/Dubai+World+Central"
    },
    {
      region: "UNITED STATES:",
      address: [
        "Lakeview Parkway",
        "Alpharetta GA 30009",
        "United States"
      ],
      phone: "+01 804 239 3377",
      maps: "https://www.google.com/maps/place/Lakeview+Parkway+Alpharetta,+GA+30009"
    },
    {
      region: "UNITED KINGDOM:",
      address: [
        "3 Church View",
        "Boadelwayddan",
        "Rhyl LL18 5TF, UK"
      ],
      phone: "+44 (741) 741 4003",
      maps: "https://www.google.com/maps/place/3+Church+Vw,+Bodelwyddan,+Rhyl+LL18+5TF,+UK"
    }
  ]

  return (
    <section id="contact" className="bg-[#F5F8F5] py-16 md:py-24" aria-labelledby="contact-heading">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="contact-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-[#2F5233] sm:text-4xl"
          >
            Get in Touch
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            We're here to help and answer any questions you might have about Yalama International. 
            Contact us at any of our global offices.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {locations.map((location, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-sm h-full">
                <h3 className="mb-4 text-xl font-semibold text-[#2F5233]">
                  {location.region}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 text-gray-600">
                    <MapPin className="h-5 w-5 text-[#2F5233] mt-1" aria-hidden="true" />
                    <div>
                      {location.address.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                      <a
                        href={location.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-[#2F5233] hover:underline"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="h-5 w-5 text-[#2F5233]" aria-hidden="true" />
                    <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="hover:text-[#2F5233]">
                      {location.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-white p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-6 text-xl font-semibold text-[#2F5233]">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#2F5233] text-white hover:bg-[#2F5233]/90 transition-colors"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
              <div>
                <h3 className="mb-6 text-xl font-semibold text-[#2F5233]">
                  Global Inquiries
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="h-5 w-5 text-[#2F5233]" aria-hidden="true" />
                    <a
                      href="mailto:info@yalamainternational.com"
                      className="hover:text-[#2F5233]"
                    >
                      info@yalamainternational.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Globe className="h-5 w-5 text-[#2F5233]" aria-hidden="true" />
                    <span>Available Worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}