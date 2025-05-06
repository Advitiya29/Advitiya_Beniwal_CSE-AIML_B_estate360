import { notFound } from "next/navigation"
import PropertyClientPage from "./PropertyClientPage"
import { getPropertyById } from "@/lib/data"
import type { Metadata } from "next"

interface PropertyPageProps {
  params: {
    id: string
  }
  searchParams?: {
    tab?: string
  }
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const property = await getPropertyById(params.id)

  if (!property) {
    return {
      title: "Property Not Found | Estate 360",
      description: "The property you are looking for does not exist.",
    }
  }

  return {
    title: `${property.title} | Estate 360`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: `${property.title} | Estate 360`,
      description: property.description.substring(0, 160),
      images: [property.images[0]],
    },
  }
}

export default async function PropertyPage({ params, searchParams }: PropertyPageProps) {
  const property = await getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  return <PropertyClientPage property={property} />
}
