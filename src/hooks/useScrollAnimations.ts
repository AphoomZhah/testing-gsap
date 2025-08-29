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
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true, // keep section pinned during sequence
    }
  });

  // --- Title enters ---
  tl2.fromTo(".section-2 .dream-title",
    { x: "200vw", opacity: 0 },
    { x: 0, opacity: 1, duration: 8 },
    "start" // label
  );

  // --- Main image fades in + zooms ---
  tl2.fromTo(".section-2 .main-img",
    { opacity: 0 },
    { opacity: 1, duration: 4 },
    "start+=3" // start 3s after title starts
  );

  tl2.to(".section-2 .main-img",
    { scale: 1.7, duration: 8 },
    "start+=3"
  );

  // --- Main image fades out ---
  tl2.to(".section-2 .main-img",
    { opacity: 0, duration: 8 },
    "start+=11" // starts later in the flow
  );

  // --- Grid slides in (push effect) ---
  tl2.fromTo(".sample-grid",
    { x: "200vw", opacity: 0 },
    {
      x: (i, el) => `-${el.scrollWidth - window.innerWidth}px`, // dynamic width calc
      opacity: 1,
      duration: 12,
      ease: "power1.inOut"
    },
    "start+=10" // align so it overlaps with title fade-out
  );

  // --- Title slides out (pushed left) ---
  tl2.to(".section-2 .dream-title",
    { x: "-200vw", opacity: 0, duration: 8 },
    "start+=10.5" // slight offset so it feels "pushed"
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
