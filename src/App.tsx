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

      {/* Empty Dark Section - Breathing Room */}
      <section className="section-1 h-screen relative overflow-hidden bg-[#151515] void-space" style={{ marginBottom: '-1px' }}>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-gray-300 mx-auto px-6">
            <div className="dream-title title-01 text-9xl md:text-9xl tracking-wide">
              Then I see them
            </div>
            <div className="dream-title title-02 text-9xl md:text-9xl tracking-wide">
              Again... 
            </div>
          </div>
        </div>
      </section>      
      
      {/* Faces made of eyes */}
      <section className="section-2 h-screen relative overflow-hidden bg-[#151515]" style={{ marginTop: '-1px', marginBottom: '-1px' }}>
        <div className="absolute inset-0">
          <img
            src={dream01}
            alt="Blurred head - identity dissolving"
            className="w-full h-full object-cover main-img"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white mx-auto px-6">
            <div className="dream-title text-9xl md:text-9xl font-light mb-8 tracking-wide">
              Faces made of eyes
            </div>
            {/* Sample Grid */}
            <div className="sample-grid absolute inset-0 grid grid-cols-4 gap-4">
              <img src={dream01} alt="Face 1" className="object-cover h-full"/>
              <img src={dream01} alt="Face 2" className="object-cover h-full"/>
              <img src={dream01} alt="Face 3" className="object-cover h-full"/>
              <img src={dream01} alt="Face 4" className="object-cover h-full"/>
            </div>
            {/* Sample Grid */}
          </div>
        </div>
      </section>

      {/* Empty Dark Section - Breathing Room */}
      <section className="section-3 h-screen relative overflow-hidden bg-[#151515] void-space" style={{ marginTop: '-1px' }}>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-gray-300 max-w-md mx-auto px-6">
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
