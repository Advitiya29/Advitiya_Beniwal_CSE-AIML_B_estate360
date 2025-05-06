"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface UserType {
  name: string
  email: string
  isAuthenticated: boolean
}

export default function SiteHeader() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }

    // Check wishlist count
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        const wishlist = JSON.parse(storedWishlist)
        setWishlistCount(wishlist.length)
      } catch (e) {
        console.error("Error parsing wishlist data:", e)
      }
    }

    // Listen for wishlist updates
    const handleWishlistUpdate = (event: CustomEvent) => {
      setWishlistCount(event.detail.count)
    }

    window.addEventListener("wishlistUpdated", handleWishlistUpdate as EventListener)

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate as EventListener)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-brown-800">Estate 360</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-olive-700">
            Home
          </Link>
          <Link href="/properties" className="text-sm font-medium hover:text-olive-700">
            Properties
          </Link>
          <Link href="/360-tours" className="text-sm font-medium hover:text-olive-700 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-olive-600"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16.2 7.8c-2-2-5.4-2-7.4 0" />
              <path d="M7.8 16.2c2 2 5.4 2 7.4 0" />
            </svg>
            360° Tours
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-olive-700">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-olive-700">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <span className="sr-only">Wishlist</span>
              <Heart className="h-5 w-5 text-brown-700" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-olive-600 text-xs text-primary-foreground flex items-center justify-center">
                {wishlistCount}
              </span>
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-brown-800 border-brown-300 hover:bg-brown-100">
                  <User className="h-4 w-4 mr-2" />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wishlist" className="w-full">
                    My Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="outline" size="sm" className="text-brown-800 border-brown-300 hover:bg-brown-100">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-olive-600 hover:bg-olive-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
