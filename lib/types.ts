export interface Property {
  id: string
  title: string
  description: string
  price: number
  pricePerSqFt?: number
  location: string
  type: string
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  panorama: string
  amenities: string[]
  status: "active" | "pending" | "sold"
  createdAt: string
  updatedAt: string
  similarProperties?: {
    id: string
    title: string
    location: string
    price: number
    image: string
  }[]
}

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "agent"
  createdAt: string
}

export interface Wishlist {
  id: string
  userId: string
  propertyIds: string[]
}
