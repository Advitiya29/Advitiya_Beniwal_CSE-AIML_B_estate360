"use client"

import { useState, useEffect } from "react"

interface ToastProps {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

export function toast({ title, description, variant = "default" }: ToastProps) {
  // Create a custom event to trigger toast
  const event = new CustomEvent("toast", {
    detail: {
      title,
      description,
      variant,
    },
  })

  // Dispatch the event
  window.dispatchEvent(event)
}

export function useToast() {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

  useEffect(() => {
    const handleToast = (event: Event) => {
      const { title, description, variant } = (event as CustomEvent).detail

      const id = Math.random().toString(36).substring(2, 9)

      setToasts((prev) => [...prev, { id, title, description, variant }])

      // Auto remove toast after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 5000)
    }

    window.addEventListener("toast", handleToast)

    return () => {
      window.removeEventListener("toast", handleToast)
    }
  }, [])

  return {
    toasts,
    dismiss: (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    },
  }
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg shadow-lg p-4 min-w-[300px] max-w-md animate-in slide-in-from-right ${
            toast.variant === "destructive" ? "bg-red-50 border border-red-200" : "bg-white border border-beige-200"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-medium ${toast.variant === "destructive" ? "text-red-700" : "text-brown-900"}`}>
                {toast.title}
              </h3>
              {toast.description && (
                <p className={`text-sm mt-1 ${toast.variant === "destructive" ? "text-red-600" : "text-brown-600"}`}>
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className={`ml-4 text-sm ${
                toast.variant === "destructive"
                  ? "text-red-500 hover:text-red-700"
                  : "text-brown-500 hover:text-brown-700"
              }`}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
