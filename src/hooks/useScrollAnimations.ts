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

    // ANIMATION: Background image moves after title animation completes
    gsap.to('.section-1', {
      top: 0,                          // Move image up 100px// Slightly scale up the image
      scrollTrigger: {
        trigger: '.section-1',     // Watch the section with image
        start: 'top top',                // Start when section top hits screen top
        end: 'bottom top',               // End when section bottom hits screen top
        scrub: true,                     // Follow scroll position
        pin: true                       // Don't pin this section
      }
    })

    // ANIMATION: Title fades out during scroll
    gsap.fromTo('.section-1 .dream-title', 
      {
        // START: Image completely invisible
        opacity: 0,
        scale: 0.8,
      },
      {
        // END: Image fully visible
        opacity: 1,
        scale: 1.3,
        
        // SCROLL TRIGGER SETTINGS
        scrollTrigger: {
          trigger: '.section-1 .dream-title',     // Watch the section with image
          start: 'center center',             // Start when section top hits bottom of screen
          end: 'bottom top',               // End when section bottom hits top of screen
          scrub: true,                     // Follow scroll position exactly
          pin: false
        }
      }
    )


    // SECTION 2 Timeline
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-2",
        start: "top top",     // when section hits center of screen
        end: "bottom top",
        scrub: true,
        pin: true,               // keep section pinned during sequence
      }
    });

    // STEP 1: fade in image
    tl.fromTo(".section-2 img",
      { opacity: 0 },
      { opacity: 1, duration: 3 },
    );

    // STEP 2: halfway through scaling, bring in text
    tl.fromTo(".section-2 .dream-title",
      { x: "200vw", opacity: 0 },
      { x: 0, opacity: 1, duration: 8 },
      0
    );

    // STEP 3: then scale image (starts after opacity finishes)
    tl.to(".section-2 img",
      { scale: 1.7, duration: 8 },
      0
    ); // ">" means right after previous ends
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
