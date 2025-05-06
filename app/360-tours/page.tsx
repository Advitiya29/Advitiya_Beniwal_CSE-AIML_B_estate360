import Link from "next/link"
import Image from "next/image"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { getProperties } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "360° Virtual Tours | Estate 360",
  description: "Explore our properties with immersive 360° virtual tours. Experience properties as if you were there.",
}

export default async function VirtualToursPage() {
  const allProperties = await getProperties()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-beige-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brown-900">360° Virtual Tours</h1>
                <p className="max-w-[700px] text-brown-700 md:text-xl">
                  Experience our properties in immersive 360° virtual tours. Explore every corner as if you were there.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allProperties.map((property) => (
                <div
                  key={property.id}
                  className="group relative overflow-hidden rounded-lg border border-beige-200 bg-background shadow-sm"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      className="object-cover transition-all group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute top-4 right-4 bg-olive-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16.2 7.8c-2-2-5.4-2-7.4 0" />
                        <path d="M7.8 16.2c2 2 5.4 2 7.4 0" />
                      </svg>
                      360° View
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1 text-brown-800">{property.title}</h3>
                    <p className="text-sm text-brown-500 line-clamp-1">{property.location}</p>
                    <p className="mt-2 font-semibold text-xl text-brown-900">₹{formatPrice(property.price)}</p>
                    <div className="mt-4 flex gap-2">
                      <Link href={`/property/${property.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-brown-300 text-brown-800 hover:bg-brown-100">
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/property/${property.id}?tab=360-view`} className="flex-1">
                        <Button className="w-full bg-olive-600 hover:bg-olive-700 text-white">View 360° Tour</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
