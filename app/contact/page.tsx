import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Estate 360",
  description:
    "Get in touch with Estate 360 for all your real estate needs in Gurgaon. Our team is ready to assist you.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-beige-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brown-900">Contact Us</h1>
                <p className="max-w-[700px] text-brown-700 md:text-xl">
                  We're here to help you find your dream property in Gurgaon.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-brown-900 mb-4">Get in Touch</h2>
                  <p className="text-brown-700">
                    Have questions about a property or need assistance with your real estate journey? Our team is ready
                    to help you every step of the way.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-olive-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-brown-900">Our Office</h3>
                      <p className="text-brown-700">
                        Estate 360 Headquarters
                        <br />
                        Golf Course Road, Sector 54
                        <br />
                        Gurgaon, Haryana 122002
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-olive-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-brown-900">Phone</h3>
                      <p className="text-brown-700">+91 98765 43210</p>
                      <p className="text-brown-700">+91 98765 43211</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-olive-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-brown-900">Email</h3>
                      <p className="text-brown-700">advitya.sanyam.estate360@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-brown-900">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-2 text-brown-700">
                    <div>Monday - Friday</div>
                    <div>9:00 AM - 7:00 PM</div>
                    <div>Saturday</div>
                    <div>10:00 AM - 5:00 PM</div>
                    <div>Sunday</div>
                    <div>Closed</div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-beige-200 bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold text-brown-900 mb-4">Send Us a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-brown-800">
                        First name
                      </Label>
                      <Input
                        id="first-name"
                        name="firstName"
                        className="border-brown-300 focus-visible:ring-olive-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-brown-800">
                        Last name
                      </Label>
                      <Input id="last-name" name="lastName" className="border-brown-300 focus-visible:ring-olive-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-brown-800">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="border-brown-300 focus-visible:ring-olive-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-brown-800">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="border-brown-300 focus-visible:ring-olive-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-brown-800">
                      Subject
                    </Label>
                    <Input id="subject" name="subject" className="border-brown-300 focus-visible:ring-olive-600" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-brown-800">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your requirements or questions..."
                      className="border-brown-300 focus-visible:ring-olive-600"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-olive-600 hover:bg-olive-700 text-white">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-beige-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-brown-900">Our Location</h2>
              <p className="mt-2 text-brown-700">Visit our office in the heart of Gurgaon</p>
            </div>
            <div className="aspect-video overflow-hidden rounded-lg bg-beige-100 flex items-center justify-center">
              <p className="text-brown-600">Map would be integrated here</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
