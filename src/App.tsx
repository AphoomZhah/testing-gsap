import { useEffect, useRef } from 'react'
import { useScrollAnimations } from './hooks/useScrollAnimations'

// Import just one dream image
import dream01 from './assets/img/05.jpg'

function App() {
  const { appRef } = useScrollAnimations()

  // Debug function to check styles
  useEffect(() => {
    console.log('🔍 DEBUG: App component mounted')
    
    // Check if Tailwind classes are being applied
    setTimeout(() => {
      const titleElement = document.querySelector('.dream-text')
      if (titleElement) {
        console.log('🎯 DEBUG: Found title element:', titleElement)
        console.log('📋 DEBUG: Title classes:', titleElement.className)
        console.log('🎨 DEBUG: Computed styles:', window.getComputedStyle(titleElement))
        console.log('📏 DEBUG: Font size:', window.getComputedStyle(titleElement).fontSize)
        console.log('🎨 DEBUG: Color:', window.getComputedStyle(titleElement).color)
        console.log('⚖️ DEBUG: Font weight:', window.getComputedStyle(titleElement).fontWeight)
      } else {
        console.log('❌ DEBUG: Title element not found!')
      }
    }, 1000)
  }, [])

  return (
    <div ref={appRef} className="relative">
      {/* Dream 01 - Identity Dissolving */}
      <section className="h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={dream01}
            alt="Blurred head - identity dissolving"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white mx-auto px-6">
            <h2 className="dream-title text-9xl md:text-9xl font-light mb-8 tracking-wide">
              Faces made of eyes
            </h2>
          </div>
        </div>
      </section>

      {/* Empty Dark Section - Breathing Room */}
      <section className="h-screen relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black void-space">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-gray-400 max-w-md mx-auto px-6">
            <p className="text-sm md:text-base tracking-widest uppercase">
              Between Dreams
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
