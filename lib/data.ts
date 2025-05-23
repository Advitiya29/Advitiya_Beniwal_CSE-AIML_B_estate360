import type { Property } from "./types"

// Mock data for development
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Apartment in Sector 54",
    description:
      "A beautiful 3-bedroom apartment with modern amenities and a stunning view of the city. This property features high-end finishes, spacious rooms, and a prime location in the heart of Gurgaon.",
    price: 12500000,
    pricePerSqFt: 12500,
    location: "Sector 54, Gurgaon",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 1000,
    images: [
      "/properties/property1-1.png",
      "/properties/property1-2.png",
      "/properties/property1-3.png",
      "/properties/property1-4.png",
      "/properties/property1-5.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: [
      "Swimming Pool",
      "Gym",
      "24/7 Security",
      "Power Backup",
      "Club House",
      "Children's Play Area",
      "Parking",
    ],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    similarProperties: [
      {
        id: "2",
        title: "Modern Apartment in Sector 56",
        location: "Sector 56, Gurgaon",
        price: 11000000,
        image: "/properties/property2-1.png",
      },
      {
        id: "3",
        title: "Spacious Flat in DLF Phase 5",
        location: "DLF Phase 5, Gurgaon",
        price: 13500000,
        image: "/properties/property3-1.png",
      },
      {
        id: "4",
        title: "Premium Apartment in Golf Course Road",
        location: "Golf Course Road, Gurgaon",
        price: 15000000,
        image: "/properties/property4-1.png",
      },
    ],
  },
  {
    id: "2",
    title: "Modern Apartment in Sector 56",
    description:
      "A well-designed 2-bedroom apartment with contemporary finishes and excellent connectivity. Perfect for young professionals or small families.",
    price: 11000000,
    pricePerSqFt: 11000,
    location: "Sector 56, Gurgaon",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    images: [
      "/properties/property2-1.png",
      "/properties/property2-2.png",
      "/properties/property2-3.png",
      "/properties/property2-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Power Backup", "Parking"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Spacious Villa in DLF Phase 5",
    description:
      "An elegant 4-bedroom villa with luxurious interiors and a private garden. This property offers the perfect blend of comfort and sophistication.",
    price: 35000000,
    pricePerSqFt: 17500,
    location: "DLF Phase 5, Gurgaon",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 4,
    area: 2000,
    images: [
      "/properties/property3-1.png",
      "/properties/property3-2.png",
      "/properties/property3-3.png",
      "/properties/property3-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Private Garden", "Swimming Pool", "Home Theater", "Modular Kitchen", "24/7 Security", "Power Backup"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Premium Apartment in Golf Course Road",
    description:
      "A high-end 3-bedroom apartment with panoramic views and premium amenities. Located in the most sought-after area of Gurgaon.",
    price: 15000000,
    pricePerSqFt: 15000,
    location: "Golf Course Road, Gurgaon",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 1000,
    images: [
      "/properties/property4-1.png",
      "/properties/property4-2.png",
      "/properties/property4-3.png",
      "/properties/property4-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Swimming Pool", "Gym", "Spa", "Club House", "24/7 Security", "Power Backup", "Parking"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Affordable 2BHK in Sohna Road",
    description:
      "A well-maintained 2-bedroom apartment with essential amenities at an affordable price point. Ideal for first-time homebuyers.",
    price: 7500000,
    pricePerSqFt: 7500,
    location: "Sohna Road, Gurgaon",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    images: [
      "/properties/property5-1.png",
      "/properties/property5-2.png",
      "/properties/property5-3.png",
      "/properties/property5-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Power Backup", "Parking"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Commercial Space in Cyber City",
    description:
      "A prime commercial property in the business hub of Gurgaon. Perfect for offices, retail, or mixed-use development.",
    price: 25000000,
    pricePerSqFt: 25000,
    location: "Cyber City, Gurgaon",
    type: "Commercial",
    bedrooms: 0,
    bathrooms: 2,
    area: 1000,
    images: [
      "/properties/property6-1.png",
      "/properties/property6-2.png",
      "/properties/property6-3.png",
      "/properties/property6-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["24/7 Security", "Power Backup", "Parking", "High-speed Internet", "Conference Room"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Penthouse in MG Road",
    description:
      "A luxurious penthouse with stunning views and exclusive amenities. Experience the pinnacle of urban living.",
    price: 40000000,
    pricePerSqFt: 26667,
    location: "MG Road, Gurgaon",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    area: 1500,
    images: [
      "/properties/property7-1.png",
      "/properties/property7-2.png",
      "/properties/property7-3.png",
      "/properties/property7-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Private Terrace", "Swimming Pool", "Gym", "Spa", "Home Theater", "24/7 Security", "Power Backup"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Residential Plot in Sector 45",
    description:
      "A prime residential plot in a well-developed area. Build your dream home according to your preferences.",
    price: 20000000,
    pricePerSqFt: 10000,
    location: "Sector 45, Gurgaon",
    type: "Plot",
    bedrooms: 0,
    bathrooms: 0,
    area: 2000,
    images: [
      "/properties/property8-1.png",
      "/properties/property8-2.png",
      "/properties/property8-3.png",
      "/properties/property8-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Gated Community", "24/7 Security", "Park", "Water Supply", "Electricity"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "9",
    title: "Luxury Villa in Nirvana Country",
    description:
      "An exquisite 5-bedroom villa with premium finishes and a private pool. Perfect for those seeking luxury and privacy.",
    price: 45000000,
    pricePerSqFt: 18000,
    location: "Nirvana Country, Gurgaon",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 5,
    area: 2500,
    images: [
      "/properties/property9-1.png",
      "/properties/property9-2.png",
      "/properties/property9-3.png",
      "/properties/property9-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Private Pool", "Garden", "Home Theater", "Smart Home", "24/7 Security", "Power Backup", "Parking"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "10",
    title: "Modern Flat in Sector 67",
    description: "A contemporary 3-bedroom flat with modern amenities and excellent connectivity. Ideal for families.",
    price: 9500000,
    pricePerSqFt: 9500,
    location: "Sector 67, Gurgaon",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 1000,
    images: [
      "/properties/property10-1.png",
      "/properties/property10-2.png",
      "/properties/property10-3.png",
      "/properties/property10-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Swimming Pool", "Gym", "Club House", "24/7 Security", "Power Backup", "Parking"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Adding 10 more properties with AI-generated images
  {
    id: "11",
    title: "Elegant Bungalow in DLF Phase 4",
    description:
      "A stunning 4-bedroom bungalow with traditional architecture and modern amenities. Features a beautiful garden, spacious interiors, and premium finishes throughout.",
    price: 55000000,
    pricePerSqFt: 22000,
    location: "DLF Phase 4, Gurgaon",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 4,
    area: 2500,
    images: [
      "/properties/property11-1.png",
      "/properties/property11-2.png",
      "/properties/property11-3.png",
      "/properties/property11-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: [
      "Private Garden",
      "Swimming Pool",
      "Home Theater",
      "Modular Kitchen",
      "24/7 Security",
      "Power Backup",
      "Smart Home",
    ],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "12",
    title: "Luxury Apartment in Sector 58",
    description:
      "A premium 3-bedroom apartment with high-end finishes and panoramic views. Located in a gated community with world-class amenities.",
    price: 18500000,
    pricePerSqFt: 15400,
    location: "Sector 58, Gurgaon",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 1200,
    images: [
      "/properties/property12-1.png",
      "/properties/property12-2.png",
      "/properties/property12-3.png",
      "/properties/property12-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: [
      "Swimming Pool",
      "Gym",
      "Spa",
      "Club House",
      "24/7 Security",
      "Power Backup",
      "Parking",
      "Children's Play Area",
    ],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "13",
    title: "Modern Townhouse in Sushant Lok",
    description:
      "A contemporary 3-bedroom townhouse with sleek design and functional spaces. Perfect for modern families looking for comfort and style.",
    price: 16500000,
    pricePerSqFt: 13750,
    location: "Sushant Lok, Gurgaon",
    type: "Townhouse",
    bedrooms: 3,
    bathrooms: 3,
    area: 1200,
    images: [
      "/properties/property13-1.png",
      "/properties/property13-2.png",
      "/properties/property13-3.png",
      "/properties/property13-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: [
      "Community Garden",
      "Gym",
      "24/7 Security",
      "Power Backup",
      "Parking",
      "Children's Play Area",
      "Jogging Track",
    ],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "14",
    title: "Premium Office Space in Udyog Vihar",
    description:
      "A state-of-the-art office space with modern infrastructure and excellent connectivity. Ideal for businesses looking for a prestigious address.",
    price: 32000000,
    pricePerSqFt: 16000,
    location: "Udyog Vihar, Gurgaon",
    type: "Commercial",
    bedrooms: 0,
    bathrooms: 4,
    area: 2000,
    images: [
      "/properties/property14-1.png",
      "/properties/property14-2.png",
      "/properties/property14-3.png",
      "/properties/property14-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: [
      "24/7 Security",
      "Power Backup",
      "Parking",
      "High-speed Internet",
      "Conference Rooms",
      "Cafeteria",
      "Reception Area",
    ],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "15",
    title: "Luxury Farmhouse in Chattarpur",
    description:
      "An expansive 5-bedroom farmhouse set on 1 acre of lush greenery. Features a private pool, outdoor entertainment areas, and luxurious interiors.",
    price: 75000000,
    pricePerSqFt: 18750,
    location: "Chattarpur, Delhi NCR",
    type: "Farmhouse",
    bedrooms: 5,
    bathrooms: 6,
    area: 4000,
    images: [
      "/properties/property15-1.png",
      "/properties/property15-2.png",
      "/properties/property15-3.png",
      "/properties/property15-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: [
      "Private Pool",
      "Garden",
      "Home Theater",
      "Modular Kitchen",
      "24/7 Security",
      "Power Backup",
      "Parking",
      "Outdoor Kitchen",
      "Guest House",
    ],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "16",
    title: "Affordable 1BHK in Sector 82",
    description:
      "A cozy 1-bedroom apartment perfect for singles or young couples. Located in a developing area with good connectivity and essential amenities.",
    price: 4500000,
    pricePerSqFt: 7500,
    location: "Sector 82, Gurgaon",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    images: [
      "/properties/property16-1.png",
      "/properties/property16-2.png",
      "/properties/property16-3.png",
      "/properties/property16-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Power Backup", "Parking"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "17",
    title: "Premium Duplex in Sector 48",
    description:
      "A spacious 4-bedroom duplex with double-height living room and premium finishes. Offers the perfect blend of luxury and comfort.",
    price: 28000000,
    pricePerSqFt: 14000,
    location: "Sector 48, Gurgaon",
    type: "Duplex",
    bedrooms: 4,
    bathrooms: 4,
    area: 2000,
    images: [
      "/properties/property17-1.png",
      "/properties/property17-2.png",
      "/properties/property17-3.png",
      "/properties/property17-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: [
      "Swimming Pool",
      "Gym",
      "Club House",
      "24/7 Security",
      "Power Backup",
      "Parking",
      "Children's Play Area",
      "Tennis Court",
    ],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "18",
    title: "Studio Apartment in MG Road",
    description:
      "A compact studio apartment with smart design and modern amenities. Perfect for professionals or students looking for a convenient city lifestyle.",
    price: 5500000,
    pricePerSqFt: 11000,
    location: "MG Road, Gurgaon",
    type: "Studio",
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    images: [
      "/properties/property18-1.png",
      "/properties/property18-2.png",
      "/properties/property18-3.png",
      "/properties/property18-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Gym", "24/7 Security", "Power Backup", "Parking", "Rooftop Garden"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "19",
    title: "Luxury Penthouse in Golf Course Extension",
    description:
      "An exclusive 4-bedroom penthouse with a private terrace and panoramic views. Features high-end finishes, smart home technology, and premium amenities.",
    price: 65000000,
    pricePerSqFt: 32500,
    location: "Golf Course Extension, Gurgaon",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 5,
    area: 2000,
    images: [
      "/properties/property19-1.png",
      "/properties/property19-2.png",
      "/properties/property19-3.png",
      "/properties/property19-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: [
      "Private Terrace",
      "Swimming Pool",
      "Gym",
      "Spa",
      "Home Theater",
      "24/7 Security",
      "Power Backup",
      "Smart Home",
      "Private Elevator",
    ],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "20",
    title: "Independent House in Palam Vihar",
    description:
      "A charming 3-bedroom independent house with a garden and terrace. Offers privacy, space, and a peaceful neighborhood.",
    price: 22000000,
    pricePerSqFt: 11000,
    location: "Palam Vihar, Gurgaon",
    type: "House",
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    images: [
      "/properties/property20-1.png",
      "/properties/property20-2.png",
      "/properties/property20-3.png",
      "/properties/property20-4.png",
    ],
    panorama: "/panoramas/fallback-panorama.png",
    amenities: ["Garden", "Terrace", "Modular Kitchen", "Power Backup", "Parking", "Study Room"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Function to get all properties
export async function getProperties(): Promise<Property[]> {
  // In a real application, this would fetch from a database
  return mockProperties
}

// Function to get a property by ID
export async function getPropertyById(id: string): Promise<Property | null> {
  // In a real application, this would fetch from a database
  const property = mockProperties.find((p) => p.id === id)
  return property || null
}

// Function to search properties
export async function searchProperties(query: string): Promise<Property[]> {
  // In a real application, this would search in a database
  const lowercaseQuery = query.toLowerCase()
  return mockProperties.filter(
    (p) =>
      p.title.toLowerCase().includes(lowercaseQuery) ||
      p.location.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.type.toLowerCase().includes(lowercaseQuery),
  )
}

// Function to filter properties
export async function filterProperties(filters: {
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  propertyType?: string
  location?: string
}): Promise<Property[]> {
  // In a real application, this would filter in a database
  return mockProperties.filter((p) => {
    if (filters.minPrice && p.price < filters.minPrice) return false
    if (filters.maxPrice && p.price > filters.maxPrice) return false
    if (filters.bedrooms && p.bedrooms < filters.bedrooms) return false
    if (filters.bathrooms && p.bathrooms < filters.bathrooms) return false
    if (filters.propertyType && p.type !== filters.propertyType) return false
    if (filters.location && !p.location.includes(filters.location)) return false
    return true
  })
}
