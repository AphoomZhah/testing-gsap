import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimations = () => {
  const lenisRef = useRef<Lenis | null>(null)
  const appRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    // RAF loop for Lenis
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Connect Lenis to GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update)

    // GSAP ScrollTrigger setup
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000)
    })

    // Cleanup function
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Function to create basic scroll-triggered animations
  const createBasicScrollAnimations = () => {
    if (!appRef.current) return

    // ANIMATION 1: Title slides in from the left DURING scroll
    gsap.fromTo('.dream-title', 
      {
        // START STATE: Element starts off-screen to the right and invisible
        x: '180vw',        // 🎯 RESPONSIVE: 100% of viewport width (works on any screen!)
        opacity: 0         // Completely invisible
      },
      {
        // END STATE: Element moves to normal position and becomes visible
        x: 0,              // Move to normal position (x: 0)
        opacity: 1,        // Fully visible
        
        // ANIMATION SETTINGS
        duration: 1,       // Total animation duration (will be controlled by scroll)
        ease: 'none',      // Linear movement (no easing) for smooth scroll control
        
        // SCROLL TRIGGER SETTINGS
        scrollTrigger: {
          trigger: '.dream-title',        // Watch this element
          start: 'top bottom',           // Start when element top hits bottom of screen
          end: 'bottom top',             // End when element bottom hits top of screen
          scrub: true                    // 🎯 KEY: Animation follows scroll position!
        }
      }
    )

    // TODO: Add more animations here
    console.log('🎯 First animation added: Title slide-in from left!')
  }

  useEffect(() => {
    // Create animations after component mounts
    const timer = setTimeout(() => {
      createBasicScrollAnimations()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return { appRef, lenisRef }
}
