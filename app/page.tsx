import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PropertyCard from "@/components/property-card"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import FeaturedProperties from "@/components/featured-properties"
import { getProperties } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Estate 360 | Premium Real Estate in Gurgaon",
  description: "Find your dream home in Gurgaon with Estate 360. Explore premium properties with 360° virtual tours.",
}

export default async function Home() {
  const properties = await getProperties()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-beige-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brown-900">
                  Find Your Dream Home in Gurgaon
                </h1>
                <p className="max-w-[700px] text-brown-700 md:text-xl">
                  Explore premium properties with 360° virtual tours and detailed information.
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
                    />
                  </div>
                  <Button type="submit" className="bg-olive-600 hover:bg-olive-700 text-white">
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties Showcase */}
        <section className="w-full py-8 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-brown-900">Featured Properties</h2>
              <p className="text-brown-600">
                Experience our exclusive collection of premium properties with 360° virtual tours.
              </p>
            </div>
            <FeaturedProperties properties={properties.slice(10, 20)} />
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-brown-900">Explore Our Properties</h2>
                <p className="text-brown-600">Discover our handpicked selection of premium properties in Gurgaon.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-brown-300 text-brown-800">
                  Filter
                </Button>
                <select className="h-9 rounded-md border border-brown-300 bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive-600">
                  <option value="recent">Most Recent</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
              {properties.slice(0, 8).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button variant="outline" className="border-brown-300 text-brown-800 hover:bg-brown-100">
                Load More Properties
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-beige-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-brown-900">Why Choose Estate 360?</h2>
                <p className="max-w-[700px] text-brown-700 md:text-xl">
                  We provide a seamless experience for finding your perfect home.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-background shadow-sm">
                  <div className="p-2 rounded-full bg-olive-100">
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
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-brown-800">360° Virtual Tours</h3>
                  <p className="text-sm text-brown-600 text-center">
                    Explore properties from the comfort of your home with immersive 360° tours.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-background shadow-sm">
                  <div className="p-2 rounded-full bg-olive-100">
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
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-brown-800">Wishlist</h3>
                  <p className="text-sm text-brown-600 text-center">
                    Save your favorite properties and compare them later.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-background shadow-sm">
                  <div className="p-2 rounded-full bg-olive-100">
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
                      <path d="M20 7h-9" />
                      <path d="M14 17H5" />
                      <circle cx="17" cy="17" r="3" />
                      <circle cx="7" cy="7" r="3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-brown-800">Advanced Filters</h3>
                  <p className="text-sm text-brown-600 text-center">
                    Find exactly what you're looking for with our detailed search filters.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-background shadow-sm">
                  <div className="p-2 rounded-full bg-olive-100">
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
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-brown-800">Expert Support</h3>
                  <p className="text-sm text-brown-600 text-center">
                    Our real estate experts are available to help you find your perfect home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
