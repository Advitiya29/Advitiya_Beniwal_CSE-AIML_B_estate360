"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import type { Property } from "@/lib/types"

interface FeaturedPropertiesProps {
  properties: Property[]
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const featuredProperties = properties.slice(0, 5) // Show only 5 featured properties

  const nextProperty = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProperties.length)
  }

  const prevProperty = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredProperties.length) % featuredProperties.length)
  }

  const currentProperty = featuredProperties[currentIndex]

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={currentProperty.images[0] || "/placeholder.svg"}
          alt={currentProperty.title}
          fill
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-900/70 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="container px-4 md:px-6">
          <div className="max-w-lg">
            <span className="inline-block bg-olive-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
              Featured Property
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{currentProperty.title}</h2>
            <p className="text-white/90 mb-4 line-clamp-2">{currentProperty.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-white">
                <span className="text-lg font-bold">₹{formatPrice(currentProperty.price)}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-white/90">
                  <span>{currentProperty.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-1 text-white/90">
                  <span>{currentProperty.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-1 text-white/90">
                  <span>{currentProperty.area} sq.ft</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/property/${currentProperty.id}`}>
                <Button className="bg-white text-brown-900 hover:bg-beige-100">View Details</Button>
              </Link>
              <Link href={`/property/${currentProperty.id}?tab=360-view`}>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  View 360° Tour
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
          onClick={prevProperty}
        >
          <ChevronLeft className="h-6 w-6 text-brown-800" />
          <span className="sr-only">Previous Property</span>
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
          onClick={nextProperty}
        >
          <ChevronRight className="h-6 w-6 text-brown-800" />
          <span className="sr-only">Next Property</span>
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 flex gap-1">
        {featuredProperties.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full ${
              index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"
            } transition-all duration-300`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Property {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
