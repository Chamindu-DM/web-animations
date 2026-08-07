import { motion, useScroll } from "framer-motion";

export default function Line({ containerRef }) {
  // Track scroll progress of the parent section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      {/* Mobile SVG Line (visible on screens < md) */}
      <svg
        viewBox="0 0 489 2329"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block md:hidden absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        <motion.path
          d="M247.754 16C247.754 156.237 27.5133 132.367 27.5131 252.713C27.5128 373.058 473 233.318 473 421.793C473 610.269 16 601.317 16 811.673C16 1022.03 473 1059.33 473 1214.48C473 1369.64 15.9998 1428.82 16 1649.12C16.0002 1869.42 473 1870.91 473 2039.99C473 2209.07 245.75 2318.43 245.75 2489"
          stroke="white"
          strokeWidth="32"
          strokeLinecap="round"
          style={{
            pathLength: scrollYProgress,
          }}
        />
      </svg>

      {/* Desktop SVG Line (visible on screens >= md) */}
      <svg
        viewBox="0 0 2039 3223"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        <motion.path
          d="M913.317 92C913.317 92 877.869 284.218 1057.88 306.739C1237.89 329.261 1563.01 273.219 1563.01 558.141C1563.01 843.063 341.721 755.073 341.721 1076.66C341.721 1398.24 1563.01 1154.17 1563.01 1435.43C1563.01 1716.69 341.721 1627.65 341.721 1927.76C341.721 2227.87 1535.87 1875.38 1563.01 2127.31C1590.15 2379.23 306.273 2338.38 341.721 2656.82C377.169 2975.27 1586.82 2604.97 1617.84 2841.71C1648.86 3078.45 1047.35 2925.51 958.18 3066.92C958.18 3066.92 897.254 3136.06 909.44 3245"
          stroke="white"
          strokeWidth="40"
          strokeLinecap="round"
          style={{
            pathLength: scrollYProgress,
          }}
        />
      </svg>
    </>
  );
}
