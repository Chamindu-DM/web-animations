import FeaturesSection from "./components/FeaturesSection";
import CardStackSection from "./components/CardStackSection";

export default function App() {
  return (
    <main className="bg-slate-900 min-h-screen overflow-clip">
      {/* Intro hero section */}
      <div className="h-[60vh] grid place-items-center text-white">
        <h1 className="font-luckiest text-4xl md:text-5xl">Scroll down for start animation</h1>
      </div>

      {/* Main feature section with background drawing line */}
      <FeaturesSection />

      {/* GSAP Exact Card Stacking Section */}
      <CardStackSection />

      {/* Footer section */}
      <div className="h-[60vh] grid place-items-center bg-slate-950 text-white">
        <h2 className="font-luckiest text-3xl md:text-4xl">End</h2>
      </div>
    </main>
  );
}
