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
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  
  const iphoneGroupRef = useRef(null);
  const ipadGroupRef = useRef(null);

  const deviceContainerRef = useRef(null);
  const innerDeviceRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // Pin the left column
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false, // Right column will scroll normally
      });

      // We will create a timeline tied to the whole container's scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrub
        }
      });

      // Initial State is mobile portrait.
      // innerDeviceRef has -90deg rotation in CSS.
      // iPhone group has 90deg rotation in CSS to counteract it.
      // iPad group has 0deg rotation in CSS, so it's rotated -90deg (portrait).

      // Phase 1: Morph to Tablet Portrait (between section 1 and 2)
      tl.to(iphoneGroupRef.current, { opacity: 0, duration: 1 }, 0.5)
        .to(ipadGroupRef.current, { opacity: 1, duration: 1 }, 0.5)
        .to(deviceContainerRef.current, { 
          width: "45vh", // Tablet portrait width
          height: "60vh", // Tablet portrait height
          duration: 1 
        }, 0.5);

      // Phase 2: Rotate to Tablet Landscape (between section 2 and 3)
      tl.to(innerDeviceRef.current, {
        rotation: 0, // Rotate back to landscape
        duration: 1
      }, 2)
      .to(deviceContainerRef.current, {
        width: "70vh", // Tablet landscape width
        height: "50vh", // Tablet landscape height
        duration: 1
      }, 2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0b131e] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-start">
        
        {/* Left Column - Sticky Device */}
        <div ref={leftColRef} className="w-1/2 h-screen flex items-center justify-center">
          
          <div 
            ref={deviceContainerRef} 
            className="relative flex items-center justify-center"
            style={{ width: "30vh", height: "60vh" }}
          >
            {/* The inner rotation handler. Initially rotated -90deg so landscape iPad looks portrait */}
            <div ref={innerDeviceRef} className="absolute inset-0 flex items-center justify-center w-full h-full -rotate-90">
                
                {/* Mobile Group */}
                <div ref={iphoneGroupRef} className="absolute inset-0 w-full h-full rotate-90 z-20 flex items-center justify-center">
                   <img src={mobileFrame} alt="Mobile Frame" className="absolute w-full h-full object-contain pointer-events-none z-10" />
                   {/* Mobile Screen Content */}
                   <div className="absolute z-0 overflow-hidden" style={{ top: "4%", bottom: "4%", left: "6%", right: "6%", borderRadius: "10%" }}>
                     <img src={slideMobile} alt="Mobile App" className="w-full h-full object-cover" />
                   </div>
                </div>

                {/* Tablet Group */}
                <div ref={ipadGroupRef} className="absolute inset-0 w-full h-full z-10 opacity-0 flex items-center justify-center">
                   <img src={tabletFrame} alt="Tablet Frame" className="absolute w-full h-full object-contain pointer-events-none z-10" />
                   {/* Tablet Screen Content */}
                   <div className="absolute z-0 overflow-hidden" style={{ top: "4%", bottom: "4%", left: "4%", right: "4%", borderRadius: "3%" }}>
                     <img src={slideTablet} alt="Tablet App" className="w-full h-full object-cover" />
                   </div>
                </div>

            </div>
          </div>

        </div>

        {/* Right Column - Scrolling Text */}
        <div ref={rightColRef} className="w-1/2 flex flex-col relative z-10">
            {/* Blank padding at top so first section is centered initially */}
            <div className="h-[25vh]"></div>
            
            <div className="text-section h-screen flex flex-col justify-center pr-12 pl-12">
               <h2 className="text-xs font-bold text-[#f5a623] uppercase tracking-widest mb-4">User-Friendly</h2>
               <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Our app is designed to be user-friendly,</h3>
               <p className="text-xl text-gray-300">so you can start creating stunning stable diffusion photos right away.</p>
            </div>

            <div className="text-section h-screen flex flex-col justify-center pr-12 pl-12">
               <h2 className="text-xs font-bold text-[#f5a623] uppercase tracking-widest mb-4">Tablet Optimized</h2>
               <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Experience on a larger screen</h3>
               <p className="text-xl text-gray-300">Switch to tablet mode seamlessly with adaptive layouts that give you more room to breathe.</p>
            </div>

            <div className="text-section h-screen flex flex-col justify-center pr-12 pl-12">
               <h2 className="text-xs font-bold text-[#00e5ff] uppercase tracking-widest mb-4">Share</h2>
               <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Share your stable diffusion photos</h3>
               <p className="text-xl text-gray-300">with just a tap in beautiful landscape view, connecting with the community instantly.</p>
            </div>
            
            <div className="h-[25vh]"></div>
        </div>

      </div>
    </section>
  );
}
