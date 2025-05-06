import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0 bg-beige-100">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24 px-4 md:px-6">
        <p className="text-sm text-brown-700">© {new Date().getFullYear()} Estate 360. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-sm text-brown-700 hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-brown-700 hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/contact" className="text-sm text-brown-700 hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
