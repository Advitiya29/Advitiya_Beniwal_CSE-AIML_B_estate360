import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Estate 360",
  description:
    "Learn about Estate 360, the premier real estate agency in Gurgaon specializing in luxury properties and 360° virtual tours.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-beige-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brown-900">About Estate 360</h1>
                <p className="max-w-[700px] text-brown-700 md:text-xl">
                  Your trusted partner in finding the perfect property in Gurgaon.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-brown-900">Our Story</h2>
                <p className="text-brown-700">
                  Founded in 2018 by Advitya Beniwal and Sanyam Sharma, Estate 360 has quickly established itself as the
                  premier real estate agency in Gurgaon. Our mission is to revolutionize the property buying experience
                  through innovative technology and personalized service.
                </p>
                <p className="text-brown-700">
                  What sets us apart is our commitment to transparency and our pioneering use of 360° virtual tours,
                  allowing clients to explore properties remotely with unprecedented detail and immersion.
                </p>
                <p className="text-brown-700">
                  Over the years, we've helped hundreds of families find their dream homes and investors secure
                  lucrative properties across Gurgaon and the National Capital Region.
                </p>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg"
                  alt="Estate 360 Office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-beige-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-brown-900">Meet Our Founders</h2>
              <p className="mt-2 text-brown-700">The visionaries behind Estate 360</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full mb-4">
                  <Image src="/placeholder.svg" alt="Advitya Beniwal" fill className="object-cover" sizes="160px" />
                </div>
                <h3 className="text-xl font-bold text-brown-900">Advitya Beniwal</h3>
                <p className="text-brown-600">Co-Founder & CEO</p>
                <p className="mt-2 text-brown-700">
                  With over 15 years of experience in real estate and technology, Advitya brings a unique perspective to
                  property marketing and sales. His vision for integrating virtual reality into real estate has
                  transformed how clients experience properties.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full mb-4">
                  <Image src="/placeholder.svg" alt="Sanyam Sharma" fill className="object-cover" sizes="160px" />
                </div>
                <h3 className="text-xl font-bold text-brown-900">Sanyam Sharma</h3>
                <p className="text-brown-600">Co-Founder & COO</p>
                <p className="mt-2 text-brown-700">
                  Sanyam's background in finance and real estate development gives him a deep understanding of property
                  valuation and investment potential. He leads our operations and ensures every client receives
                  personalized attention throughout their journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-brown-900">Our Values</h2>
              <p className="mt-2 text-brown-700">The principles that guide everything we do</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-beige-100">
                <div className="p-3 rounded-full bg-olive-100 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-olive-600"
                  >
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brown-900">Integrity</h3>
                <p className="mt-2 text-brown-700">
                  We believe in complete transparency and honesty in all our dealings. Our clients trust us because we
                  always put their interests first.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-beige-100">
                <div className="p-3 rounded-full bg-olive-100 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-olive-600"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brown-900">Innovation</h3>
                <p className="mt-2 text-brown-700">
                  We constantly push the boundaries of what's possible in real estate technology, from 360° tours to
                  AI-powered property matching.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-beige-100">
                <div className="p-3 rounded-full bg-olive-100 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-olive-600"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brown-900">Client-Centric</h3>
                <p className="mt-2 text-brown-700">
                  Every decision we make is guided by what's best for our clients. We're not satisfied until you find
                  the perfect property that meets all your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
