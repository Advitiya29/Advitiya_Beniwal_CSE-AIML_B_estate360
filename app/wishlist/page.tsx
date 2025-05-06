"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, MapPin, Bed, Bath, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { getProperties } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import type { Property } from "@/lib/types"

export default function WishlistPage() {
  const [wishlistProperties, setWishlistProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlistProperties = async () => {
      try {
        // Get wishlist from localStorage
        const storedWishlist = localStorage.getItem("wishlist")
        let wishlistIds: string[] = []

        if (storedWishlist) {
          wishlistIds = JSON.parse(storedWishlist)
        }

        // Get all properties
        const allProperties = await getProperties()

        // Filter properties in wishlist
        const properties = allProperties.filter((property) => wishlistIds.includes(property.id))

        setWishlistProperties(properties)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching wishlist properties:", error)
        setLoading(false)
      }
    }

    fetchWishlistProperties()
  }, [])

  const removeFromWishlist = (propertyId: string, propertyTitle: string) => {
    try {
      // Get current wishlist
      const storedWishlist = localStorage.getItem("wishlist")
      let wishlist: string[] = []

      if (storedWishlist) {
        wishlist = JSON.parse(storedWishlist)
      }

      // Remove property from wishlist
      wishlist = wishlist.filter((id) => id !== propertyId)

      // Save updated wishlist
      localStorage.setItem("wishlist", JSON.stringify(wishlist))

      // Update state
      setWishlistProperties((prev) => prev.filter((property) => property.id !== propertyId))

      // Update wishlist count in header
      const event = new CustomEvent("wishlistUpdated", { detail: { count: wishlist.length } })
      window.dispatchEvent(event)

      toast({
        title: "Removed from wishlist",
        description: `${propertyTitle} has been removed from your wishlist.`,
      })
    } catch (error) {
      console.error("Error removing from wishlist:", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-brown-900">My Wishlist</h1>
              <p className="text-brown-600">{wishlistProperties.length} properties saved</p>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-lg bg-beige-100 animate-pulse" />
              ))}
            </div>
          ) : wishlistProperties.length > 0 ? (
            <div className="grid gap-6">
              {wishlistProperties.map((property) => (
                <div
                  key={property.id}
                  className="relative overflow-hidden rounded-lg border border-beige-200 bg-background shadow-sm"
                >
                  <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr]">
                    <div className="relative aspect-video md:aspect-square overflow-hidden">
                      <Image
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-brown-800">{property.title}</h2>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3.5 w-3.5 text-brown-500" />
                            <p className="text-sm text-brown-500">{property.location}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-brown-700 hover:text-red-600"
                          onClick={() => removeFromWishlist(property.id, property.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove from wishlist</span>
                        </Button>
                      </div>

                      <div className="mt-4">
                        <p className="text-brown-600 line-clamp-2">{property.description}</p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-4">
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4 text-brown-500" />
                          <span className="text-sm text-brown-700">{property.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4 text-brown-500" />
                          <span className="text-sm text-brown-700">{property.bathrooms} Baths</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square className="h-4 w-4 text-brown-500" />
                          <span className="text-sm text-brown-700">{property.area} sq.ft</span>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <p className="text-2xl font-bold text-brown-900">₹{formatPrice(property.price)}</p>
                        <div className="flex gap-2">
                          <Link href={`/property/${property.id}`}>
                            <Button variant="outline" className="border-brown-300 text-brown-800 hover:bg-brown-100">
                              View Details
                            </Button>
                          </Link>
                          <Button className="bg-olive-600 hover:bg-olive-700 text-white">Contact Agent</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-beige-100 p-6 mb-4">
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
                  className="h-10 w-10 text-brown-500"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-brown-800">Your wishlist is empty</h2>
              <p className="text-brown-600 mt-2 max-w-md">
                Start browsing properties and save your favorites to your wishlist.
              </p>
              <Link href="/properties" className="mt-6">
                <Button className="bg-olive-600 hover:bg-olive-700 text-white">Browse Properties</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
