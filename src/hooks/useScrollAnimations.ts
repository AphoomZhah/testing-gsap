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
        x: '200vw',        // 🎯 RESPONSIVE: 200% of viewport width (matches CSS!)
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
          scrub: true,                   // 🎯 KEY: Animation follows scroll position!
          pin: false,                    // 🎯 PIN: Lock section in place during animation!
          pinSpacing: false              // Maintain scroll space
        }
      }
    )

    // ANIMATION 2: Image fades in from 0 to 100% opacity during scroll
    gsap.fromTo('section:has(img) img', 
      {
        // START: Image completely invisible
        opacity: 0
      },
      {
        // END: Image fully visible
        opacity: 1,
        
        // SCROLL TRIGGER SETTINGS
        scrollTrigger: {
          trigger: 'section:has(img)',     // Watch the section with image
          start: 'top bottom',             // Start when section top hits bottom of screen
          end: 'bottom top',               // End when section bottom hits top of screen
          scrub: true,                     // Follow scroll position exactly
          pin: false
        }
      }
    )

    // ANIMATION 2: Background image moves after title animation completes
    gsap.to('section:has(img) img', {
      top: 0,                          // Move image up 100px
      scale: 1.5,                       // Slightly scale up the image
      scrollTrigger: {
        trigger: 'section:has(img)',     // Watch the section with image
        start: 'top top',                // Start when section top hits screen top
        end: 'bottom top',               // End when section bottom hits screen top
        scrub: true,                     // Follow scroll position
        pin: true                       // Don't pin this section
      }
    })

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
