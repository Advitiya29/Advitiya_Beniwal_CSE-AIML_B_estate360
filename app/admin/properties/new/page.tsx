"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProperty } from "@/lib/actions"

export default function NewPropertyPage() {
  const [images, setImages] = useState<File[]>([])
  const [panorama, setPanorama] = useState<File | null>(null)
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [panoramaPreviewUrl, setPanoramaPreviewUrl] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setImages([...images, ...newFiles])

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls])
    }
  }

  const handlePanoramaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setPanorama(file)
      setPanoramaPreviewUrl(URL.createObjectURL(file))
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    const newPreviewUrls = [...imagePreviewUrls]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviewUrls[index])

    newImages.splice(index, 1)
    newPreviewUrls.splice(index, 1)

    setImages(newImages)
    setImagePreviewUrls(newPreviewUrls)
  }

  const removePanorama = () => {
    if (panoramaPreviewUrl) {
      URL.revokeObjectURL(panoramaPreviewUrl)
    }
    setPanorama(null)
    setPanoramaPreviewUrl(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    // Add images and panorama to formData
    images.forEach((image, index) => {
      formData.append(`images`, image)
    })

    if (panorama) {
      formData.append("panorama", panorama)
    }

    try {
      await createProperty(formData)
      // Redirect or show success message
    } catch (error) {
      console.error("Error creating property:", error)
      // Show error message
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Estate 360</span>
            <span className="text-sm font-medium text-muted-foreground">Admin</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/admin" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/admin/properties" className="text-sm font-medium">
              Properties
            </Link>
            <Link href="/admin/users" className="text-sm font-medium">
              Users
            </Link>
            <Link href="/admin/settings" className="text-sm font-medium">
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm font-medium mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Add New Property</h1>
              <p className="text-muted-foreground">Create a new property listing</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input id="title" name="title" placeholder="e.g. Luxury Apartment in Sector 54" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the property in detail..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input id="price" name="price" type="number" placeholder="e.g. 10000000" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Area (sq.ft)</Label>
                    <Input id="area" name="area" type="number" placeholder="e.g. 1200" required />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" name="bedrooms" type="number" placeholder="e.g. 3" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input id="bathrooms" name="bathrooms" type="number" placeholder="e.g. 2" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Property Type</Label>
                    <Select name="type" defaultValue="apartment">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="plot">Plot</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" placeholder="e.g. Sector 54, Gurgaon" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amenities">Amenities</Label>
                  <Textarea
                    id="amenities"
                    name="amenities"
                    placeholder="Enter amenities separated by commas (e.g. Swimming Pool, Gym, 24/7 Security)"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue="active">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Property Images</Label>
                  <div className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-muted">
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Preview ${index}`}
                            className="object-cover w-full h-full"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Drag and drop images here or click to browse
                        </p>
                        <Input
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => document.getElementById("images")?.click()}
                        >
                          Select Images
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>360° Panorama Image</Label>
                  <div className="border rounded-lg p-4">
                    {panoramaPreviewUrl ? (
                      <div className="relative aspect-video rounded-md overflow-hidden bg-muted mb-4">
                        <img
                          src={panoramaPreviewUrl || "/placeholder.svg"}
                          alt="Panorama Preview"
                          className="object-cover w-full h-full"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={removePanorama}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6">
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">Upload a 360° panorama image</p>
                          <Input
                            id="panorama"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePanoramaChange}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => document.getElementById("panorama")?.click()}
                          >
                            Select Panorama
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>AI-Generated Property Images</Label>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6">
                      <div className="text-center">
                        <p className="mt-2 text-sm text-muted-foreground">
                          Generate AI images based on property description
                        </p>
                        <Button type="button" variant="outline" size="sm" className="mt-2">
                          Generate AI Images
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Create Property</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
