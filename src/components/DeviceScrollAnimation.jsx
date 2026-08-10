import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mobileFrame from '../assets/iPhone 16 Pro.png';
import tabletFrame from '../assets/iPad Pro M4 13_.png';
import slideMobile from '../assets/slide-3.png';
import slideTablet from '../assets/slide-9.png';

gsap.registerPlugin(ScrollTrigger);

export default function DeviceScrollAnimation() {
  const containerRef = useRef(null);
  
  const iphoneGroupRef = useRef(null);
  const ipadGroupRef = useRef(null);
  const tabletImageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // Initialize the tablet group to be rotated (portrait view) and scaled down
      // Its natural size is landscape (78vh x 60vh).
      // Rotated -90, it stands 78vh tall.
      // To match the 60vh height of the phone, we scale it by 60/78 = ~0.77.
      gsap.set(ipadGroupRef.current, { rotation: -90, scale: 0.77 });

      // Initialize the tablet screen image rotated so it looks upright to the user,
      // and scaled up so it covers the corners of its landscape container while rotated.
      gsap.set(tabletImageRef.current, { rotation: 90, scale: 1.35 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrub
        }
      });

      // Total timeline duration is logically 1.0 (from 0 to 1)
      
      // Phase 1: Morph to Tablet Portrait
      // Happens when scrolling from section 1 to section 2 (around 0.2 to 0.4 progress)
      tl.to(iphoneGroupRef.current, { opacity: 0, duration: 0.2 }, 0.2)
        .to(ipadGroupRef.current, { opacity: 1, duration: 0.2 }, 0.2);

      // Phase 2: Rotate to Tablet Landscape
      // Happens when scrolling from section 2 to section 3 (around 0.6 to 0.8 progress)
      tl.to(ipadGroupRef.current, {
        rotation: 0, // Rotate back to landscape
        scale: 1,    // Scale to full landscape size
        duration: 0.2,
        ease: "power2.inOut"
      }, 0.6)
      .to(tabletImageRef.current, {
        rotation: 0, // Rotate image back to normal
        scale: 1,    // Reset scale
        duration: 0.2,
        ease: "power2.inOut"
      }, 0.6);

      // Add a dummy tween to pad the end of the timeline out to 1.0
      tl.to({}, { duration: 0.2 }, 0.8);

    }, containerRef);

    // In production builds, images loading in sections above this one can cause layout shifts
    // AFTER ScrollTrigger has calculated the start/end positions. 
    // We refresh ScrollTrigger slightly after mount to recalculate correct positions.
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const timer3 = setTimeout(() => ScrollTrigger.refresh(), 1500);
    
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('load', handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0b131e] text-white overflow-visible">
      <div className="max-w-7xl mx-auto flex items-start">
        
        {/* Left Column - Sticky Device */}
        <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center">
          
          <div className="relative flex items-center justify-center w-full h-full">
                
                {/* Mobile Group */}
                <div ref={iphoneGroupRef} className="absolute z-20 flex items-center justify-center" style={{ width: "30vh", height: "60vh" }}>
                   <img src={mobileFrame} alt="Mobile Frame" className="absolute w-full h-full object-contain pointer-events-none z-10" />
                   {/* Mobile Screen Content */}
                   <div className="absolute z-0 overflow-hidden" style={{ top: "3%", bottom: "3%", left: "6%", right: "6%", borderRadius: "10%" }}>
                     <img src={slideMobile} alt="Mobile App" className="w-full h-full object-cover" />
                   </div>
                </div>

                {/* Tablet Group */}
                {/* Landscape dimensions (78vh x 60vh) */}
                <div ref={ipadGroupRef} className="absolute z-10 opacity-0 flex items-center justify-center" style={{ width: "78vh", height: "60vh" }}>
                   <img src={tabletFrame} alt="Tablet Frame" className="absolute w-full h-full object-contain pointer-events-none z-10" />
                   {/* Tablet Screen Content */}
                   <div className="absolute z-0 overflow-hidden" style={{ top: "4%", bottom: "4%", left: "3.5%", right: "3.5%", borderRadius: "3%" }}>
                     <img ref={tabletImageRef} src={slideTablet} alt="Tablet App" className="w-full h-full object-cover" />
                   </div>
                </div>

          </div>
        </div>

        {/* Right Column - Scrolling Text */}
        <div className="w-1/2 flex flex-col relative z-10">
            {/* Blank padding at top so first section is centered initially */}
            <div className="h-[25vh]"></div>
            
            <div className="text-section h-screen flex flex-col justify-center pr-12 pl-12">
               <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Fox jump over the water like,</h3>
               <p className="text-xl text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
            </div>

            <div className="text-section h-screen flex flex-col justify-center pr-12 pl-12">
               <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Another fox jump over the water,</h3>
               <p className="text-xl text-gray-300">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
            </div>

            <div className="text-section h-screen flex flex-col justify-center pr-12 pl-12">
               <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-6">And another fox jump over the water,</h3>
               <p className="text-xl text-gray-300">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
            
            <div className="h-[25vh]"></div>
        </div>

      </div>
    </section>
  );
}
