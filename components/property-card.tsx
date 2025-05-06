"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import type { Property } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    // Check if property is in wishlist
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        const wishlist = JSON.parse(storedWishlist)
        setIsWishlisted(wishlist.includes(property.id))
      } catch (e) {
        console.error("Error parsing wishlist data:", e)
      }
    }
  }, [property.id])

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add properties to your wishlist.",
        variant: "destructive",
      })
      return
    }

    try {
      // Get current wishlist
      const storedWishlist = localStorage.getItem("wishlist")
      let wishlist: string[] = []

      if (storedWishlist) {
        wishlist = JSON.parse(storedWishlist)
      }

      // Toggle property in wishlist
      if (isWishlisted) {
        wishlist = wishlist.filter((id) => id !== property.id)
        toast({
          title: "Removed from wishlist",
          description: `${property.title} has been removed from your wishlist.`,
        })
      } else {
        wishlist.push(property.id)
        toast({
          title: "Added to wishlist",
          description: `${property.title} has been added to your wishlist.`,
        })
      }

      // Save updated wishlist
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      setIsWishlisted(!isWishlisted)

      // Update wishlist count in header
      const event = new CustomEvent("wishlistUpdated", { detail: { count: wishlist.length } })
      window.dispatchEvent(event)
    } catch (error) {
      console.error("Error updating wishlist:", error)
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-beige-200 bg-background shadow-sm transition-all hover:shadow-md">
      <Link href={`/property/${property.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View property</span>
      </Link>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={property.images[0] || "/placeholder.svg"}
          alt={property.title}
          className="object-cover transition-all group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-olive-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              {property.type}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="z-20 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-olive-600 text-olive-600" : "text-brown-700"}`} />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1 text-brown-800">{property.title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="h-3.5 w-3.5 text-brown-500" />
          <p className="text-sm text-brown-500 line-clamp-1">{property.location}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="font-semibold text-xl text-brown-900">₹{formatPrice(property.price)}</p>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-beige-200 pt-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-brown-500" />
              <span className="text-xs text-brown-700">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-brown-500" />
              <span className="text-xs text-brown-700">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4 text-brown-500" />
              <span className="text-xs text-brown-700">{property.area} sq.ft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
