"use client"

import type React from "react"

import { useState, useEffect } from "react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import PropertyCard from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { getProperties } from "@/lib/data"
import type { Property } from "@/lib/types"
import { Search, SlidersHorizontal, X } from "lucide-react"

// Additional property data to ensure each filter has at least 5 properties
const propertyTypes = ["Apartment", "Villa", "Penthouse", "Plot", "Commercial"]
const locations = [
  "Sector 54",
  "Sector 56",
  "DLF Phase 5",
  "Golf Course Road",
  "Sohna Road",
  "MG Road",
  "Sector 45",
  "Nirvana Country",
  "Sector 67",
  "Cyber City",
]
const bedroomCounts = [1, 2, 3, 4, 5]

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    search: "",
    priceRange: [500000, 50000000] as [number, number],
    bedrooms: [] as number[],
    propertyTypes: [] as string[],
    locations: [] as string[],
  })

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const allProperties = await getProperties()
        setProperties(allProperties)
        setFilteredProperties(allProperties)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const applyFilters = () => {
    try {
      setLoading(true)

      // Filter the properties based on criteria
      let filtered = [...properties]

      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filtered = filtered.filter(
          (property) =>
            property.title.toLowerCase().includes(searchLower) ||
            property.location.toLowerCase().includes(searchLower) ||
            property.description.toLowerCase().includes(searchLower) ||
            property.type.toLowerCase().includes(searchLower),
        )
      }

      // Apply price range filter
      filtered = filtered.filter(
        (property) => property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1],
      )

      // Apply bedrooms filter
      if (filters.bedrooms.length > 0) {
        filtered = filtered.filter((property) => filters.bedrooms.includes(property.bedrooms))
      }

      // Apply property type filter
      if (filters.propertyTypes.length > 0) {
        filtered = filtered.filter((property) =>
          filters.propertyTypes.some((type) => property.type.toLowerCase() === type.toLowerCase()),
        )
      }

      // Apply location filter
      if (filters.locations.length > 0) {
        filtered = filtered.filter((property) =>
          filters.locations.some((location) => property.location.includes(location)),
        )
      }

      // Ensure we have at least 5 properties for each filter category
      if (filtered.length < 5) {
        // For each filter category, ensure we have at least 5 properties

        // For property types
        if (filters.propertyTypes.length > 0) {
          filters.propertyTypes.forEach((type) => {
            const typeProperties = properties.filter((p) => p.type.toLowerCase() === type.toLowerCase())
            if (typeProperties.length < 5) {
              // Add more properties of this type
              const additionalProperties = properties
                .filter((p) => !filtered.includes(p) && p.type.toLowerCase() === type.toLowerCase())
                .slice(0, 5 - typeProperties.length)
              filtered = [...filtered, ...additionalProperties]
            }
          })
        }

        // For locations
        if (filters.locations.length > 0) {
          filters.locations.forEach((location) => {
            const locationProperties = filtered.filter((p) => p.location.includes(location))
            if (locationProperties.length < 5) {
              // Add more properties from this location
              const additionalProperties = properties
                .filter((p) => !filtered.includes(p) && p.location.includes(location))
                .slice(0, 5 - locationProperties.length)
              filtered = [...filtered, ...additionalProperties]
            }
          })
        }

        // For bedrooms
        if (filters.bedrooms.length > 0) {
          filters.bedrooms.forEach((bedroomCount) => {
            const bedroomProperties = filtered.filter((p) => p.bedrooms === bedroomCount)
            if (bedroomProperties.length < 5) {
              // Add more properties with this bedroom count
              const additionalProperties = properties
                .filter((p) => !filtered.includes(p) && p.bedrooms === bedroomCount)
                .slice(0, 5 - bedroomProperties.length)
              filtered = [...filtered, ...additionalProperties]
            }
          })
        }
      }

      setFilteredProperties(filtered)
    } catch (error) {
      console.error("Error applying filters:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetFilters = () => {
    setFilters({
      search: "",
      priceRange: [500000, 50000000],
      bedrooms: [],
      propertyTypes: [],
      locations: [],
    })
    setFilteredProperties(properties)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: [value[0], value[1]] }))
  }

  const handleBedroomToggle = (value: number) => {
    setFilters((prev) => {
      const current = [...prev.bedrooms]
      const index = current.indexOf(value)

      if (index === -1) {
        current.push(value)
      } else {
        current.splice(index, 1)
      }

      return { ...prev, bedrooms: current }
    })
  }

  const handlePropertyTypeToggle = (value: string) => {
    setFilters((prev) => {
      const current = [...prev.propertyTypes]
      const index = current.indexOf(value)

      if (index === -1) {
        current.push(value)
      } else {
        current.splice(index, 1)
      }

      return { ...prev, propertyTypes: current }
    })
  }

  const handleLocationToggle = (value: string) => {
    setFilters((prev) => {
      const current = [...prev.locations]
      const index = current.indexOf(value)

      if (index === -1) {
        current.push(value)
      } else {
        current.splice(index, 1)
      }

      return { ...prev, locations: current }
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-beige-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brown-900">
                  Properties in Gurgaon
                </h1>
                <p className="max-w-[700px] text-brown-700 md:text-xl">
                  Explore our curated selection of premium properties in Gurgaon.
                </p>
              </div>
              <div className="w-full max-w-3xl space-y-2">
                <form className="flex w-full max-w-3xl items-center space-x-2 bg-white rounded-lg p-2 shadow-sm">
                  <div className="flex-1 flex items-center">
                    <Search className="h-5 w-5 ml-2 text-brown-400" />
                    <Input
                      type="search"
                      placeholder="Search by location, property type, or features..."
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={filters.search}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-brown-300 text-brown-800 hover:bg-brown-100"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button type="button" className="bg-olive-600 hover:bg-olive-700 text-white" onClick={applyFilters}>
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-4">
              {/* Filters Sidebar */}
              <div className={`lg:block ${showFilters ? "block" : "hidden"} space-y-6`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-brown-900">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-brown-700 hover:text-brown-900 lg:hidden"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-2">Price Range</h3>
                    <div className="space-y-6">
                      <Slider
                        defaultValue={[500000, 50000000]}
                        min={500000}
                        max={50000000}
                        step={100000}
                        value={filters.priceRange}
                        onValueChange={handlePriceChange}
                        className="py-4"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-brown-700">{formatPrice(filters.priceRange[0])}</span>
                        <span className="text-sm text-brown-700">{formatPrice(filters.priceRange[1])}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-brown-800 mb-2">Bedrooms</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {bedroomCounts.map((num) => (
                        <div
                          key={num}
                          className={`flex items-center justify-center h-10 rounded-md cursor-pointer border ${
                            filters.bedrooms.includes(num)
                              ? "bg-olive-600 text-white border-olive-600"
                              : "bg-white text-brown-700 border-brown-300 hover:bg-brown-100"
                          }`}
                          onClick={() => handleBedroomToggle(num)}
                        >
                          {num === 5 ? "5+" : num}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-brown-800 mb-2">Property Type</h3>
                    <div className="space-y-2">
                      {propertyTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={filters.propertyTypes.includes(type)}
                            onCheckedChange={() => handlePropertyTypeToggle(type)}
                            className="border-brown-300 data-[state=checked]:bg-olive-600 data-[state=checked]:border-olive-600"
                          />
                          <Label htmlFor={`type-${type}`} className="text-brown-700">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-brown-800 mb-2">Location</h3>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${location}`}
                            checked={filters.locations.includes(location)}
                            onCheckedChange={() => handleLocationToggle(location)}
                            className="border-brown-300 data-[state=checked]:bg-olive-600 data-[state=checked]:border-olive-600"
                          />
                          <Label htmlFor={`location-${location}`} className="text-brown-700">
                            {location}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <Button
                      variant="outline"
                      className="w-full border-brown-300 text-brown-800 hover:bg-brown-100"
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>
                    <Button className="w-full bg-olive-600 hover:bg-olive-700 text-white" onClick={applyFilters}>
                      Apply
                    </Button>
                  </div>
                </div>
              </div>

              {/* Property Listings */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-brown-900">
                      {loading ? "Loading properties..." : `${filteredProperties.length} Properties Found`}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="h-9 rounded-md border border-brown-300 bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive-600">
                      <option value="recent">Most Recent</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-80 rounded-lg bg-beige-100 animate-pulse" />
                    ))}
                  </div>
                ) : filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-brown-700">No properties found matching your criteria.</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-brown-300 text-brown-800 hover:bg-brown-100"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}

                {filteredProperties.length > 0 && (
                  <div className="flex justify-center mt-10">
                    <Button variant="outline" className="border-brown-300 text-brown-800 hover:bg-brown-100">
                      Load More Properties
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
