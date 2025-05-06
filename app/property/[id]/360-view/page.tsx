import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PanoramaViewer from "@/components/panorama-viewer"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { getPropertyById } from "@/lib/data"
import type { Metadata } from "next"

interface PropertyViewPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PropertyViewPageProps): Promise<Metadata> {
  const property = await getPropertyById(params.id)

  if (!property) {
    return {
      title: "360° View Not Found | Estate 360",
      description: "The property you are looking for does not exist.",
    }
  }

  return {
    title: `360° View of ${property.title} | Estate 360`,
    description: `Experience an immersive 360° virtual tour of ${property.title} in ${property.location}.`,
  }
}

export default async function PropertyViewPage({ params }: PropertyViewPageProps) {
  const property = await getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-black">
        <div className="container px-4 py-4">
          <Link
            href={`/property/${params.id}`}
            className="inline-flex items-center gap-1 text-sm font-medium mb-4 text-white hover:text-olive-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to property details
          </Link>
          <h1 className="text-xl font-bold text-white mb-4">360° Virtual Tour: {property.title}</h1>

          <div className="h-[calc(100vh-200px)] min-h-[500px] rounded-lg overflow-hidden">
            <PanoramaViewer panoramaUrl={property.panorama} />
          </div>

          <div className="mt-6 p-4 bg-gray-900 rounded-lg text-white">
            <h2 className="text-lg font-semibold mb-2">How to use this 360° tour</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Click and drag your mouse to look around in any direction</li>
              <li>Use your scroll wheel to zoom in and out</li>
              <li>Click the fullscreen button in the bottom right for an immersive experience</li>
              <li>Use the reset button to return to the starting view</li>
            </ul>
            <div className="mt-4">
              <p className="text-gray-300">
                This 360° virtual tour allows you to explore every corner of {property.title} from the comfort of your
                device. Experience the space as if you were actually there!
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
