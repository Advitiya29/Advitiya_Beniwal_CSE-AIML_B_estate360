"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Share2, MapPin, Bed, Bath, Square, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PanoramaViewer from "@/components/panorama-viewer"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { formatPrice } from "@/lib/utils"
import { useSearchParams } from "next/navigation"

import { useEffect } from "react"

interface PropertyPageProps {
  property: any
}

export default function PropertyClientPage({ property }: PropertyPageProps) {
  const searchParams = useSearchParams()

  // Set default tab or use the one from URL
  const defaultTab = searchParams?.get("tab") === "360-view" ? "360-view" : "gallery"

  useEffect(() => {
    // This is a client component
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium mb-6 text-brown-700 hover:text-olive-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold sm:text-3xl text-brown-900">{property.title}</h1>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-brown-300 text-brown-700 hover:bg-brown-100"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-brown-300 text-brown-700 hover:bg-brown-100"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-brown-500" />
                  <p className="text-sm text-brown-500">{property.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-brown-500" />
                    <span className="text-sm text-brown-700">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-brown-500" />
                    <span className="text-sm text-brown-700">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4 text-brown-500" />
                    <span className="text-sm text-brown-700">{property.area} sq.ft</span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue={defaultTab}>
                <TabsList className="grid w-full grid-cols-3 bg-beige-100">
                  <TabsTrigger
                    value="gallery"
                    className="data-[state=active]:bg-olive-600 data-[state=active]:text-white"
                  >
                    Gallery
                  </TabsTrigger>
                  <TabsTrigger
                    value="360-view"
                    className="data-[state=active]:bg-olive-600 data-[state=active]:text-white"
                  >
                    360° View
                  </TabsTrigger>
                  <TabsTrigger value="map" className="data-[state=active]:bg-olive-600 data-[state=active]:text-white">
                    Map
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="gallery" className="mt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={property.images[0] || "/placeholder.svg"}
                        alt={`${property.title} - Main Image`}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {property.images.slice(1, 5).map((image, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${property.title} - Image ${index + 2}`}
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="360-view" className="mt-4">
                  <div className="aspect-video overflow-hidden rounded-lg relative">
                    <PanoramaViewer panoramaUrl={property.panorama} />
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
                  <div className="mt-4 p-4 bg-beige-100 rounded-lg">
                    <h3 className="font-semibold text-brown-800 mb-2">About 360° Virtual Tours</h3>
                    <p className="text-sm text-brown-700">
                      Experience this property in immersive 360° view. Drag to look around, use scroll to zoom in/out,
                      and explore every corner of this beautiful property from the comfort of your device.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="map" className="mt-4">
                  <div className="aspect-video overflow-hidden rounded-lg bg-beige-100 flex items-center justify-center">
                    <p className="text-brown-600">Map view would be integrated here</p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-brown-900">Description</h2>
                <div className="prose max-w-none text-brown-700">
                  <p>{property.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-brown-900">Features & Amenities</h2>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2">
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
                        className="h-4 w-4 text-olive-600"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      <span className="text-sm text-brown-700">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-beige-200 bg-background p-6 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-2xl font-bold text-brown-900">₹{formatPrice(property.price)}</h2>
                  {property.pricePerSqFt && (
                    <p className="text-sm text-brown-500">₹{formatPrice(property.pricePerSqFt)}/sq.ft</p>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <Button className="w-full bg-olive-600 hover:bg-olive-700 text-white">Contact Agent</Button>
                  <Button variant="outline" className="w-full border-brown-300 text-brown-800 hover:bg-brown-100">
                    Schedule Visit
                  </Button>
                </div>

                {/* 360 View Button */}
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-olive-300 text-olive-700 hover:bg-olive-50 flex items-center justify-center gap-2"
                    onClick={() => {
                      const tabElement = document.querySelector('[value="360-view"]') as HTMLElement
                      if (tabElement) tabElement.click()
                    }}
                  >
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
                      className="text-olive-600"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16.2 7.8c-2-2-5.4-2-7.4 0" />
                      <path d="M7.8 16.2c2 2 5.4 2 7.4 0" />
                    </svg>
                    View in 360°
                  </Button>
                </div>

                <div className="mt-6 border-t border-beige-200 pt-6">
                  <h3 className="font-semibold text-brown-800">Property Agent</h3>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src="/placeholder.svg" alt="Agent" className="object-cover" fill sizes="48px" />
                    </div>
                    <div>
                      <p className="font-medium text-brown-800">Vikram Malhotra</p>
                      <p className="text-sm text-brown-500">Estate 360 Agent</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-beige-200 bg-background p-6 shadow-sm">
                <h3 className="font-semibold text-brown-800">Similar Properties</h3>
                <div className="mt-4 space-y-4">
                  {property.similarProperties?.slice(0, 3).map((similar, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative h-16 w-16 flex-none overflow-hidden rounded-md">
                        <Image
                          src={similar.image || "/placeholder.svg"}
                          alt={similar.title}
                          className="object-cover"
                          fill
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium line-clamp-1 text-brown-800">{similar.title}</h4>
                        <p className="text-sm text-brown-500 line-clamp-1">{similar.location}</p>
                        <p className="text-sm font-medium text-brown-700">₹{formatPrice(similar.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
