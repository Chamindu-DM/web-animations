import FeaturesSection from "./components/FeaturesSection";
import CardStackSection from "./components/CardStackSection";
import { Button } from "./components/Button";
import { ArrowRight, Calendar, Download, Plus, Trash2 } from "lucide-react";

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
        <div className="flex gap-4 p-8">
          {/* Primary Icon Button */}
          <Button 
            variant="primary" 
            icon={Plus} 
            isIconOnly 
            aria-label="Add item" 
          />
          {/* Secondary Icon Button */}
          <Button 
            variant="secondary" 
            icon={Trash2} 
            isIconOnly 
            aria-label="Delete item" 
          />
          {/* Passing Icon as children */}
          <Button variant="primary" isIconOnly aria-label="Next">
            <ArrowRight className="w-5 h-5" />
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
