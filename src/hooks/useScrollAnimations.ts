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

    // BASIC SCROLL-DRIVEN FEATURES - Just the essentials

    // 1. Simple title fade-in
    gsap.fromTo('.dream-title', 
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.dream-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // 2. Simple text reveal
    gsap.fromTo('.dream-text', 
      { 
        y: 30
        // opacity: 0  // Temporarily removed to test text color
      },
      {
        y: 0,
        // opacity: 1,  // Temporarily removed to test text color
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.dream-text',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // 3. Simple image scale on scroll
    gsap.to('section:has(img) img', {
      scale: 1.1,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: 'section:has(img)',
        start: 'top center',
        end: 'bottom center',
        scrub: true
      }
    })
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
