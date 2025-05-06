"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { toast } from "@/components/ui/use-toast"

export default function SignInPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = () => {
    const newErrors: {
      email?: string
      password?: string
    } = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append("email", formData.email)
      formDataObj.append("password", formData.password)
      formDataObj.append("remember", formData.remember.toString())

      // For demo purposes, accept any valid email/password
      if (formData.email && formData.password.length >= 6) {
        // Store user info in localStorage for demo purposes
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            name: formData.email.split("@")[0],
            isAuthenticated: true,
          }),
        )

        toast({
          title: "Sign in successful",
          description: "You have been signed in successfully.",
        })

        router.push("/")
        router.refresh()
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      console.error("Error signing in:", error)
      setErrors({
        general: "Invalid email or password. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-12 bg-beige-50">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-brown-900">Sign In</h1>
            <p className="text-brown-600">Enter your credentials to access your account</p>
          </div>
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                  {errors.general}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-brown-800">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border-brown-300 focus-visible:ring-olive-600 ${errors.email ? "border-red-300" : ""}`}
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-brown-800">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-olive-600 underline-offset-4 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`border-brown-300 focus-visible:ring-olive-600 ${errors.password ? "border-red-300" : ""}`}
                />
                {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, remember: checked === true }))}
                  className="border-brown-300 data-[state=checked]:bg-olive-600 data-[state=checked]:border-olive-600"
                />
                <Label htmlFor="remember" className="text-sm font-normal text-brown-700">
                  Remember me
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-olive-600 hover:bg-olive-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-beige-300"></div>
              </div>
              <div className="relative bg-beige-50 px-4 text-sm text-brown-500">Or continue with</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full border-brown-300 text-brown-800 hover:bg-brown-100">
                Google
              </Button>
              <Button variant="outline" className="w-full border-brown-300 text-brown-800 hover:bg-brown-100">
                Facebook
              </Button>
            </div>
            <div className="text-center text-sm text-brown-700">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-olive-600 underline-offset-4 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
