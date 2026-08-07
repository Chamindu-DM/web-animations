import { useRef } from "react";
import Line from "./Line";
import sc from "../assets/videoframe.png";

export default function FeaturesSection() {
  const containerRef = useRef(null);

  const cardData = [
    {
      title: "all in one hub for home services",
      description:
        "Share one link everywhere - Instagram, Facebook ads, Google listings, or your website. Works on any platform, converts traffic into jobs instantly",
      imageLeft: false,
    },
    {
      title: "all in one hub for home services",
      description:
        "Share one link everywhere - Instagram, Facebook ads, Google listings, or your website. Works on any platform, converts traffic into jobs instantly",
      imageLeft: true,
    },
    {
      title: "all in one hub for home services",
      description:
        "Share one link everywhere - Instagram, Facebook ads, Google listings, or your website. Works on any platform, converts traffic into jobs instantly",
      imageLeft: false,
    },
    {
      title: "all in one hub for home services",
      description:
        "Share one link everywhere - Instagram, Facebook ads, Google listings, or your website. Works on any platform, converts traffic into jobs instantly",
      imageLeft: true,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full mx-auto bg-[#7c54c4] py-16 md:pt-20 md:pb-32 flex flex-col items-center justify-center gap-16 md:gap-40 overflow-hidden px-4 md:px-8"
    >
      {/* Background Animated SVG Line positioned at z-0 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Line containerRef={containerRef} />
      </div>

      {/* Main Header - z-40 on top of the drawing line */}
      <div className="relative z-40 w-full px-2 md:px-8 bg-[#7c54c4] flex justify-center">
        <h1 className="font-luckiest text-white text-center uppercase text-4xl md:text-7xl lg:text-[88px] leading-tight max-w-[1200px] tracking-wide drop-shadow-md">
          From visitors to booked jobs in minutes
        </h1>
      </div>

      {/* Feature Blocks Container - z-40 */}
      <div className="relative z-40 flex flex-col gap-16 md:gap-40 w-full items-center">
        {cardData.map((item, index) => (
          <div key={index} className="w-full flex justify-center">
            {/* Mobile & 768px Tablet Layout (< lg): Single Card with Image Clipped at Bottom */}
            <div className="flex lg:hidden w-full max-w-[340px] sm:max-w-[420px] h-[520px] sm:h-[560px] pt-8 px-6 pb-0 -rotate-1 bg-[#262322] rounded-[36px] flex-col justify-between items-center overflow-hidden shadow-2xl">
              <div className="flex flex-col gap-4 self-stretch">
                <h2 className="font-gothic text-white text-5xl sm:text-6xl uppercase leading-[0.95] tracking-wide">
                  {item.title}
                </h2>
                <p className="font-instrument text-white/90 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Image Mockup clipped cleanly by parent card bottom */}
              <div className="w-[85%] max-w-[240px] sm:max-w-[280px] mt-4 rounded-t-[24px] overflow-hidden bg-white shadow-2xl flex-shrink-0">
                <img
                  src={sc}
                  alt="App Screenshot"
                  className="w-full object-cover object-top"
                />
              </div>
            </div>

            {/* Desktop Side-by-Side Layout (>= lg / 1024px+) */}
            <div
              className={`hidden lg:flex items-center justify-center gap-12 lg:gap-24 xl:gap-60 w-full ${
                item.imageLeft ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Text Card */}
              <div className="w-full max-w-[512px] p-10 bg-[#262322] rounded-3xl flex flex-col gap-8 shadow-2xl -rotate-1">
                <h2 className="font-gothic text-white text-5xl md:text-6xl uppercase leading-none tracking-wide">
                  {item.title}
                </h2>
                <p className="font-instrument text-white/90 text-xl leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Mobile App Mockup Card */}
              <div className="rotate-1 border-[10px] border-[#262322] rounded-2xl overflow-hidden shadow-2xl bg-[#262322]">
                <div className="w-[215px] h-[440px] bg-neutral-100 flex flex-col justify-center items-center overflow-hidden">
                  <img
                    src={sc}
                    alt="App Screenshot"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Title - z-40 */}
      <div className="relative z-40 w-full px-4 md:px-8 bg-[#7c54c4] flex justify-center mt-8 md:mt-16">
        <h2 className="font-luckiest text-white text-center uppercase text-4xl md:text-7xl lg:text-[80px] leading-tight">
          all in one
          <br />
          hub for
          <br />
          home services
        </h2>
      </div>
    </section>
  );
}
