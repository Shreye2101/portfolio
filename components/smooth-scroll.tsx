"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { useScroll } from "./scroll-provider"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { scrollContainer, setScrollY } = useScroll()
  const locoScroll = useRef<any>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Initialize smooth scrolling
    const initSmoothScroll = async () => {
      try {
        // Make sure we're on the client side and the container exists
        if (typeof window === "undefined" || !scrollContainer.current) return

        const LocomotiveScroll = (await import("locomotive-scroll")).default

        // Check again if the container exists after the async import
        if (!scrollContainer.current) return

        locoScroll.current = new LocomotiveScroll({
          el: scrollContainer.current,
          smooth: true,
          multiplier: 1,
          class: "is-revealed",
          lerp: 0.07,
        })

        // Update ScrollTrigger when locomotive scroll updates
        locoScroll.current.on("scroll", (instance) => {
          setScrollY(instance.scroll.y)
          ScrollTrigger.update()
        })

        // Set up ScrollTrigger scroller proxy
        if (scrollContainer.current) {
          ScrollTrigger.scrollerProxy(scrollContainer.current, {
            scrollTop(value) {
              return arguments.length
                ? locoScroll.current.scrollTo(value, 0, 0)
                : locoScroll.current.scroll.instance.scroll.y
            },
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              }
            },
            pinType: scrollContainer.current.style.transform ? "transform" : "fixed",
          })
        }

        // Refresh ScrollTrigger and locomotive scroll
        ScrollTrigger.addEventListener("refresh", () => {
          if (locoScroll.current) locoScroll.current.update()
        })
        ScrollTrigger.refresh()
      } catch (error) {
        console.error("Failed to initialize smooth scroll:", error)
      }
    }

    // Only run on client-side
    if (typeof window !== "undefined") {
      initSmoothScroll()
    }

    return () => {
      if (locoScroll.current) {
        locoScroll.current.destroy()
        locoScroll.current = null
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      ScrollTrigger.clearMatchMedia()
    }
  }, [scrollContainer, setScrollY])

  return (
    <div ref={scrollContainer} className="scroll-container" data-scroll-container>
      {children}
    </div>
  )
}
