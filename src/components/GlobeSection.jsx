import { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { motion } from "framer-motion";

export default function GlobeSection() {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    // Auto-rotate the globe and adjust controls
    // Using setTimeout to ensure the Globe component has initialized its internal ThreeJS scene
    const initControls = () => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.8; // Adjust this value to change rotation speed
          controls.enableZoom = false; // Prevents users from zooming in/out
        }

        // --- HOW TO ADJUST GLOBE SIZE ---
        // You can change the altitude to make the globe bigger or smaller relative to the screen.
        // Default is usually around 2.5. 
        // Increase value (e.g. 3.0) -> Globe gets smaller.
        // Decrease value (e.g. 1.8) -> Globe gets bigger.
        globeRef.current.pointOfView({ altitude: 3 }); 
      }
    };
    
    if (dimensions.width > 0) {
      // Small delay ensures globe has mounted its internal canvas
      setTimeout(initControls, 100);
    }
  }, [dimensions.width]);

  useEffect(() => {
    // Resize observer to make globe responsive
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <section className="relative w-full min-h-[100vh] bg-black text-white flex flex-col md:flex-row items-center justify-center overflow-hidden">
      
      {/* Background Gradient at the bottom to blend with other sections if needed */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#110e0c] to-transparent z-10 pointer-events-none"></div>

      {/* 
        Globe Container - Absolute positioning to cover full background.
        Math trick: By making it 150vw wide and shifting left by 50vw on desktop, 
        the globe is perfectly centered in the left 50% of the screen, 
        but the starry background canvas spans the entire 100vw screen width!
        On mobile, it's shifted up to center the globe in the top half.
      */}
      <div 
        ref={containerRef}
        className="absolute z-0
                   top-[-50vh] left-0 w-full h-[150vh] 
                   md:top-0 md:left-[-50vw] md:w-[150vw] md:h-full"
      >
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            atmosphereColor="#4a90e2"
            atmosphereAltitude={0.15}
          />
        )}
      </div>

      {/* Content Container - Right Side (Desktop) / Bottom Side (Mobile) */}
      <div className="w-full md:w-1/2 p-8 pt-[50vh] md:pt-16 md:p-16 lg:pr-32 flex flex-col items-center md:items-end text-center md:text-right z-30 md:ml-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl pointer-events-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif mb-8 leading-tight tracking-wide">
            a <br className="hidden md:block" /> planetwide <br className="hidden md:block" /> network
          </h2>
          
          <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed max-w-md md:ml-auto">
            Food banks, food rescuers, meal programs and other types of food
            support organizations - we are working to bring them all together. After all, we can't
            call this planet an advanced civilization until everyone is food secure, everywhere.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
