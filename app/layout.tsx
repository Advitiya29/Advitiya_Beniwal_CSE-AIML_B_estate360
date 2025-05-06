import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/use-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Estate 360 | Premium Real Estate in Gurgaon",
  description: "Find your dream home in Gurgaon with Estate 360. Explore premium properties with 360° virtual tours.",
  keywords: "real estate, property, Gurgaon, Gurugram, buy property, rent property, luxury homes, apartments",
  authors: [{ name: "Advitya Beniwal" }, { name: "Sanyam Sharma" }],
  openGraph: {
    title: "Estate 360 | Premium Real Estate in Gurgaon",
    description: "Find your dream home in Gurgaon with Estate 360. Explore premium properties with 360° virtual tours.",
    url: "https://estate360.in",
    siteName: "Estate 360",
    locale: "en_IN",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
