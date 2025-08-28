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

     // SECTION 2 Timeline
     let tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-1",
        start: "top top",     // when section hits center of screen
        end: "bottom top",
        scrub: true,
        pin: true,               // keep section pinned during sequence
      }
    });

    tl1.fromTo(".section-1 .title-01",
      { opacity: 0 },
      { opacity: 1, duration: 3 },
    );

    tl1.fromTo(".section-1 .title-02",
      { opacity: 0 },
      { opacity: 1, duration: 3, delay: 8 },
    );


    // SECTION 2 Timeline
    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-2",
        start: "top top",     // when section hits center of screen
        end: "bottom top",
        scrub: true,
        pin: true,               // keep section pinned during sequence
      }
    });

    // STEP 1: fade in image
    tl2.fromTo(".section-2 img",
      { opacity: 0 },
      { opacity: 1, duration: 3, delay: 2 },
    );

    // STEP 2: halfway through scaling, bring in text
    tl2.fromTo(".section-2 .dream-title",
      { x: "200vw", opacity: 0 },
      { x: 0, opacity: 1, duration: 8, delay: 2 },
      0
    );

    // STEP 3: then scale image (starts after opacity finishes)
    tl2.to(".section-2 img",
      { scale: 1.7, duration: 8, delay: 1 },
      0
    ); // ">" means right after previous ends

    tl2.fromTo(".section-2 img",
      { opacity: 1 },
      { opacity: 0, duration: 3 },
    );

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
