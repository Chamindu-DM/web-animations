import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import slideMobile from '../assets/slide-3.png';
import slideTablet from '../assets/slide-9.png';

export default function DeviceScrollAnimation() {
  const containerRef = useRef(null);
  const scaleWrapperRef = useRef(null);
  
  const deviceContainerRef = useRef(null);
  const bezelRef = useRef(null);
  const notchRef = useRef(null);
  const screenContainerRef = useRef(null);
  
  const mobileImgRef = useRef(null);
  const tabletImgRef = useRef(null);

  // Handle dynamic wrapper scaling to ensure the devices fit the viewport gracefully
  useEffect(() => {
    const updateScale = () => {
      if (!scaleWrapperRef.current) return;
      if (window.innerWidth >= 768) {
         const maxW = (window.innerWidth / 2) * 0.88; 
         const maxH = (window.innerHeight - 72) * 0.88; // 72px offset from top
         const scaleW = maxW / 1468; 
         const scaleH = maxH / 1468; 
         const s = Math.min(scaleW, scaleH, 0.5); 
         gsap.set(scaleWrapperRef.current, { scale: s });
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Desktop Animation
    mm.add("(min-width: 768px)", () => {
      const timer = setTimeout(() => {
        const tl = gsap.timeline({ paused: true });

        // Ensure iPhone starts slightly larger for prominence
        gsap.set(deviceContainerRef.current, { scale: 1.15 });

        // Phase 1: Morph iPhone -> iPad Portrait
        tl.to(deviceContainerRef.current, {
          width: "1126px",
          height: "1468px",
          scale: 1.0,
          duration: 0.3,
          ease: "power2.inOut"
        }, 0.2);

        tl.to(bezelRef.current, {
          attr: {
            width: 1080,
            height: 1422,
            rx: 55,
            "stroke-width": 46,
            x: 23,
            y: 23
          },
          duration: 0.3,
          ease: "power2.inOut"
        }, 0.2);

        tl.to(screenContainerRef.current, {
          left: "46px",
          top: "46px",
          width: "1034px",
          height: "1376px",
          borderRadius: "32px",
          duration: 0.3,
          ease: "power2.inOut"
        }, 0.2);

        tl.to(notchRef.current, {
          opacity: 0,
          duration: 0.1,
        }, 0.2);

        tl.to(tabletImgRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: "power1.inOut"
        }, 0.25);
        
        tl.to(mobileImgRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power1.inOut"
        }, 0.25);

        // Phase 2: Rotate iPad Portrait -> Landscape
        tl.to(deviceContainerRef.current, {
          rotation: -90,
          duration: 0.4,
          ease: "power2.inOut"
        }, 0.6);

        tl.to({}, { duration: 0.2 }, 1.0);

        ScrollTrigger.create({
          animation: tl,
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.max(1500, containerRef.current.offsetHeight - window.innerHeight)}`,
          scrub: 1, 
          invalidateOnRefresh: true,
        });
        
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(timer);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full max-w-full bg-[#0b131e] text-white overflow-x-clip py-12 md:py-0">
      
      {/* DESKTOP LAYOUT (Sticky GSAP Scroll Scrub Animation) */}
      <div className="hidden md:flex max-w-7xl mx-auto flex-row items-start">
        
        {/* Sticky Left Column offset by top-[72px] */}
        <div className="w-1/2 h-[calc(100vh-72px)] sticky top-[72px] flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center relative">
            
            <div ref={scaleWrapperRef} className="origin-center flex items-center justify-center will-change-transform">
               <div 
                 ref={deviceContainerRef} 
                 className="relative flex items-center justify-center will-change-[width,height,transform]"
                 style={{ width: "434px", height: "906px" }}
               >
                 <svg 
                   className="absolute pointer-events-none" 
                   style={{ top: 0, left: 0, width: "100%", height: "100%", overflow: "visible" }}
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <rect 
                     ref={bezelRef} 
                     x="8" y="8" width="418" height="890" rx="72" 
                     stroke="white" strokeWidth="16" fill="transparent" 
                   />
                   <rect 
                     ref={notchRef} 
                     x="155" y="30" width="124" height="36" rx="18" fill="white" 
                   />
                 </svg>

                 <div 
                   ref={screenContainerRef} 
                   className="absolute overflow-hidden flex items-center justify-center bg-black"
                   style={{ left: "16px", top: "16px", width: "402px", height: "874px", borderRadius: "64px" }}
                 >
                   <img 
                     ref={mobileImgRef}
                     src={slideMobile} 
                     alt="Mobile App" 
                     className="absolute w-full h-full object-fill z-10" 
                   />
                   <img 
                     ref={tabletImgRef} 
                     src={slideTablet} 
                     alt="Tablet App" 
                     className="absolute z-20 object-fill flex-shrink-0 opacity-0 max-w-none" 
                     style={{ 
                       width: "1376px", 
                       height: "1034px", 
                       left: "50%", 
                       top: "50%", 
                       transform: "translate(-50%, -50%) rotate(90deg)" 
                     }}
                   />
                 </div>
               </div>
            </div>

          </div>
        </div>

        {/* Right Column - Scrolling Text */}
        <div className="w-1/2 flex flex-col relative z-10">
            <div className="h-[20vh]"></div>
            
            <div className="text-section h-screen flex flex-col justify-center px-12">
               <h3 className="text-5xl font-bold leading-tight mb-6 font-luckiest">Fox jump over the water like,</h3>
               <p className="text-xl text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
            </div>

            <div className="text-section h-screen flex flex-col justify-center px-12">
               <h3 className="text-5xl font-bold leading-tight mb-6 font-luckiest">Another fox jump over the water,</h3>
               <p className="text-xl text-gray-300">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
            </div>

            <div className="text-section h-screen flex flex-col justify-center px-12">
               <h3 className="text-5xl font-bold leading-tight mb-6 font-luckiest">And another fox jump over the water,</h3>
               <p className="text-xl text-gray-300">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
            
            <div className="h-[20vh]"></div>
        </div>
      </div>

      {/* MOBILE LAYOUT (Single Column - Device Frame + Title & Paragraph stacked one by one) */}
      <div className="flex md:hidden flex-col gap-16 px-6 max-w-md mx-auto py-8">
        
        {/* Card 1: iPhone Frame + Text 1 */}
        <div className="flex flex-col items-center text-center">
           <div className="relative w-full max-w-[260px] aspect-[434/906] flex items-center justify-center mb-6">
              <svg viewBox="0 0 434 906" className="absolute inset-0 w-full h-full pointer-events-none">
                 <rect x="8" y="8" width="418" height="890" rx="72" stroke="white" strokeWidth="16" fill="transparent" />
                 <rect x="155" y="30" width="124" height="36" rx="18" fill="white" />
              </svg>
              <div className="absolute overflow-hidden bg-black" style={{ left: "3.68%", top: "1.76%", width: "92.6%", height: "96.4%", borderRadius: "14%" }}>
                 <img src={slideMobile} alt="Mobile App" className="w-full h-full object-fill" />
              </div>
           </div>
           <h3 className="text-2xl font-bold font-luckiest mb-3">Fox jump over the water like,</h3>
           <p className="text-gray-300 text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
        </div>

        {/* Card 2: iPad Portrait Frame + Text 2 */}
        <div className="flex flex-col items-center text-center">
           <div className="relative w-full max-w-[280px] aspect-[1126/1468] flex items-center justify-center mb-6">
              <svg viewBox="0 0 1126 1468" className="absolute inset-0 w-full h-full pointer-events-none">
                 <rect x="23" y="23" width="1080" height="1422" rx="55" stroke="#FEFEFE" strokeWidth="46" fill="transparent" />
              </svg>
              <div className="absolute overflow-hidden bg-black flex items-center justify-center" style={{ left: "4.08%", top: "3.13%", width: "91.8%", height: "93.7%", borderRadius: "7%" }}>
                 <img 
                   src={slideTablet} 
                   alt="Tablet App Portrait" 
                   className="absolute max-w-none object-fill" 
                   style={{ 
                     width: "130.38%", 
                     height: "100%", 
                     left: "50%", 
                     top: "50%", 
                     transform: "translate(-50%, -50%) rotate(90deg)" 
                   }} 
                 />
              </div>
           </div>
           <h3 className="text-2xl font-bold font-luckiest mb-3">Another fox jump over the water,</h3>
           <p className="text-gray-300 text-sm leading-relaxed">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
        </div>

        {/* Card 3: iPad Landscape Frame + Text 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-full max-w-[320px] aspect-[1468/1126] flex items-center justify-center mb-6">
              <svg viewBox="0 0 1468 1126" className="absolute inset-0 w-full h-full pointer-events-none">
                 <rect x="23" y="23" width="1422" height="1080" rx="55" stroke="#FEFEFE" strokeWidth="46" fill="transparent" />
              </svg>
              <div className="absolute overflow-hidden bg-black" style={{ left: "3.13%", top: "4.08%", width: "93.7%", height: "91.8%", borderRadius: "7%" }}>
                 <img src={slideTablet} alt="Tablet App Landscape" className="w-full h-full object-fill" />
              </div>
           </div>
           <h3 className="text-2xl font-bold font-luckiest mb-3">And another fox jump over the water,</h3>
           <p className="text-gray-300 text-sm leading-relaxed">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>

      </div>

    </section>
  );
}
