import FeaturesSection from "./components/FeaturesSection";
import CardStackSection from "./components/CardStackSection";
import { Button } from "./components/Button";
import { ArrowRight, Calendar, Download } from "lucide-react";

export default function App() {
  return (
    <main className="bg-white min-h-screen overflow-clip">
      {/* Intro hero section */}
      <div className="h-[60vh] grid place-items-center text-black">
        <h1 className="font-luckiest text-4xl md:text-5xl">Scroll down for start animation</h1>
        <div className="flex flex-col gap-4 p-8">
          {/* Default Icon on the right */}
          <Button variant="primary" icon={ArrowRight}>
            Book a free intro
          </Button>
          {/* Different icon */}
          <Button variant="primary" icon={Calendar}>
            Schedule Call
          </Button>
          {/* Icon on the left */}
          <Button variant="secondary" icon={Download} iconPosition="left">
            Download Brochure
          </Button>
          {/* Without icon */}
          <Button variant="secondary">
            Plain Button
          </Button>
        </div>
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
