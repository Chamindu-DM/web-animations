import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mobileFrame from '../assets/iPhone 16 Pro.png';
import tabletFrame from '../assets/iPad Pro M4 13_.png';
import slideMobile from '../assets/slide-3.png';
import slideTablet from '../assets/slide-9.png';

export default function DeviceScrollAnimation() {
  const containerRef = useRef(null);
  
  const iphoneGroupRef = useRef(null);
  const ipadGroupRef = useRef(null);
  const tabletImageRef = useRef(null);

  useEffect(() => {
    // Register plugin inside the effect to ensure it's bound to the correct GSAP instance in production
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx;
    
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        
        gsap.set(ipadGroupRef.current, { rotation: -90, scale: 0.77 });
        gsap.set(tabletImageRef.current, { rotation: 90, scale: 1.35 });

        // Start timeline paused. ScrollTrigger will take control of it.
        const tl = gsap.timeline({ paused: true });

        tl.to(iphoneGroupRef.current, { opacity: 0, duration: 0.2 }, 0.2)
          .to(ipadGroupRef.current, { opacity: 1, duration: 0.2 }, 0.2);

        tl.to(ipadGroupRef.current, {
          rotation: 0, 
          scale: 1,    
          duration: 0.2,
          ease: "power2.inOut"
        }, 0.6)
        .to(tabletImageRef.current, {
          rotation: 0, 
          scale: 1,    
          duration: 0.2,
          ease: "power2.inOut"
        }, 0.6);

        tl.to({}, { duration: 0.2 }, 0.8);

        // Explicitly create the ScrollTrigger independently of the timeline config
        ScrollTrigger.create({
          animation: tl,
          trigger: containerRef.current,
          start: "top top",
          // Use Math.max to guarantee at least 1500px of scroll distance even if offsetHeight is evaluated as 0 initially
          end: () => `+=${Math.max(1500, containerRef.current.offsetHeight - window.innerHeight)}`,
          scrub: 1, 
          invalidateOnRefresh: true,
        });

      }, containerRef);
      
      ScrollTrigger.refresh();
      
    }, 250);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
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
