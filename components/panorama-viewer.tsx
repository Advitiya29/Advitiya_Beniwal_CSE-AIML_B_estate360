"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Maximize, Minimize, RotateCcw, Info } from "lucide-react"

interface PanoramaViewerProps {
  panoramaUrl: string
}

export default function PanoramaViewer({ panoramaUrl }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Use a fallback panorama if the provided one fails to load
  const fallbackPanorama = "/panoramas/fallback-panorama.png"

  useEffect(() => {
    if (!containerRef.current) return

    setIsLoading(true)
    setLoadError(false)

    // Create scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 0)
    cameraRef.current = camera

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create sphere geometry
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1) // Invert the sphere

    // Load panorama texture
    const textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = "anonymous" // Important for CORS

    // Function to load a texture with error handling
    const loadTexture = (url: string) => {
      return new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(
          url,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            resolve(texture)
          },
          undefined,
          (err) => {
            console.error("Error loading texture:", err)
            reject(err)
          },
        )
      })
    }

    // Try to load the panorama, fall back to the default if it fails
    const loadTextureWithFallback = async () => {
      try {
        // First try with the provided URL
        const texture = await loadTexture(panoramaUrl)
        return texture
      } catch (error) {
        console.error("Failed to load panorama, trying fallback:", error)
        try {
          // If that fails, try the fallback
          const fallbackTexture = await loadTexture(fallbackPanorama)
          setLoadError(true)
          return fallbackTexture
        } catch (fallbackError) {
          console.error("Failed to load fallback panorama:", fallbackError)
          // If even the fallback fails, we'll handle this later
          setLoadError(true)
          throw fallbackError
        }
      }
    }

    // Load the texture and create the scene
    loadTextureWithFallback()
      .then((texture) => {
        // Create material with texture
        const material = new THREE.MeshBasicMaterial({ map: texture })

        // Create mesh with geometry and material
        const sphere = new THREE.Mesh(geometry, material)
        scene.add(sphere)

        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Failed to load any panorama:", error)
        setIsLoading(false)
        setLoadError(true)
      })

    // Controls for mouse interaction
    let isUserInteracting = false
    let onPointerDownMouseX = 0
    let onPointerDownMouseY = 0
    let lon = 0
    let onPointerDownLon = 0
    let lat = 0
    let onPointerDownLat = 0
    let phi = 0
    let theta = 0
    let autoRotate = true
    const autoRotateSpeed = 0.1

    // Event listeners for mouse/touch interaction
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      isUserInteracting = true
      autoRotate = false

      const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
      const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY

      onPointerDownMouseX = clientX
      onPointerDownMouseY = clientY
      onPointerDownLon = lon
      onPointerDownLat = lat
    }

    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      if (!isUserInteracting) return

      const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
      const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY

      lon = (onPointerDownMouseX - clientX) * 0.1 + onPointerDownLon
      lat = (clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat
    }

    const onPointerUp = () => {
      isUserInteracting = false
    }

    const onWheel = (event: WheelEvent) => {
      if (!cameraRef.current) return

      const fov = cameraRef.current.fov
      const newFov = Math.max(30, Math.min(90, fov + event.deltaY * 0.05))

      cameraRef.current.fov = newFov
      cameraRef.current.updateProjectionMatrix()
    }

    // Add event listeners
    containerRef.current.addEventListener("mousedown", onPointerDown)
    containerRef.current.addEventListener("touchstart", onPointerDown)
    document.addEventListener("mousemove", onPointerMove)
    document.addEventListener("touchmove", onPointerMove)
    document.addEventListener("mouseup", onPointerUp)
    document.addEventListener("touchend", onPointerUp)
    containerRef.current.addEventListener("wheel", onWheel)

    // Handle window resize
    const onWindowResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", onWindowResize)

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      if (!cameraRef.current || !sceneRef.current || !rendererRef.current) return

      // Auto-rotate if not interacting
      if (autoRotate) {
        lon += autoRotateSpeed
      }

      // Update camera position based on mouse/touch interaction
      lat = Math.max(-85, Math.min(85, lat))
      phi = THREE.MathUtils.degToRad(90 - lat)
      theta = THREE.MathUtils.degToRad(lon)

      cameraRef.current.position.x = 100 * Math.sin(phi) * Math.cos(theta)
      cameraRef.current.position.y = 100 * Math.cos(phi)
      cameraRef.current.position.z = 100 * Math.sin(phi) * Math.sin(theta)

      cameraRef.current.lookAt(sceneRef.current.position)
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    animate()

    // Show help tooltip after a short delay
    const helpTimeout = setTimeout(() => {
      setShowHelp(true)
      // Hide it after 5 seconds
      setTimeout(() => {
        setShowHelp(false)
      }, 5000)
    }, 1000)

    // Cleanup
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      window.removeEventListener("resize", onWindowResize)
      document.removeEventListener("mousemove", onPointerMove)
      document.removeEventListener("touchmove", onPointerMove)
      document.removeEventListener("mouseup", onPointerUp)
      document.removeEventListener("touchend", onPointerUp)

      if (containerRef.current) {
        containerRef.current.removeEventListener("mousedown", onPointerDown)
        containerRef.current.removeEventListener("touchstart", onPointerDown)
        containerRef.current.removeEventListener("wheel", onWheel)
      }

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      clearTimeout(helpTimeout)
    }
  }, [panoramaUrl, fallbackPanorama])

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const resetView = () => {
    if (cameraRef.current) {
      cameraRef.current.fov = 75
      cameraRef.current.updateProjectionMatrix()
    }
  }

  const toggleHelp = () => {
    setShowHelp(!showHelp)
  }

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full min-h-[400px] rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-beige-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-600"></div>
          </div>
        )}

        {loadError && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-beige-100 bg-opacity-80 z-10 p-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center max-w-md">
              <p className="text-red-600 font-semibold mb-2">We couldn't load the 360° view for this property.</p>
              <p className="text-brown-700 mb-4">
                We're showing a sample 360° view instead. Please try again later or contact us for assistance.
              </p>
              <Button className="bg-olive-600 hover:bg-olive-700 text-white" onClick={() => setLoadError(false)}>
                Continue with Sample View
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={toggleHelp}
        >
          <Info className="h-4 w-4 text-brown-800" />
          <span className="sr-only">Help</span>
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={resetView}
        >
          <RotateCcw className="h-4 w-4 text-brown-800" />
          <span className="sr-only">Reset View</span>
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize className="h-4 w-4 text-brown-800" />
          ) : (
            <Maximize className="h-4 w-4 text-brown-800" />
          )}
          <span className="sr-only">{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</span>
        </Button>
      </div>

      {/* Help tooltip */}
      {showHelp && (
        <div className="absolute top-4 left-4 right-4 bg-black/70 text-white p-3 rounded-md text-sm max-w-md mx-auto">
          <h4 className="font-semibold mb-1">How to navigate:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Click and drag to look around</li>
            <li>Scroll to zoom in and out</li>
            <li>Use the reset button to return to the default view</li>
            <li>Click the fullscreen button for an immersive experience</li>
          </ul>
        </div>
      )}

      {/* Interaction hint */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-xs">
        Click and drag to explore
      </div>
    </div>
  )
}
