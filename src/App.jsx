import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeaturesSection from "./components/FeaturesSection";
import CardStackSection from "./components/CardStackSection";
import Navbar from "./components/Navbar";
import ContactSection from "./components/ContactSection";
import { Button } from "./components/Button";
import { ArrowRight, Calendar, Download, Plus, Trash2 } from "lucide-react";
import DeviceScrollAnimation from "./components/DeviceScrollAnimation";
import ExpertiseSection from "./components/ExpertiseSection";
import GlobeSection from "./components/GlobeSection";
import TermsPage from "./components/TermsPage";

function HomePage() {
  return (
    <main className="bg-white min-h-screen w-full max-w-full overflow-x-clip">
      <Navbar/>
      {/* Intro hero section */}
      <div className="min-h-[60vh] py-12 flex flex-col justify-center items-center text-black px-4 text-center">
        <h1 className="font-luckiest text-3xl sm:text-4xl md:text-5xl max-w-2xl">Scroll down for start animation</h1>
        <div className="flex flex-wrap justify-center gap-4 p-4 md:p-8">
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

      {/* Rotating Globe Section */}
      <GlobeSection />

      {/* GSAP Exact Card Stacking Section */}
      <CardStackSection />

      {/* Expertise Section */}
      <ExpertiseSection />

      {/* GSAP Device Scroll Animation */}
      <DeviceScrollAnimation />

      {/* Contact Form Section */}
      <ContactSection />

      {/* Footer section */}
      <footer>
        <Link
          to="/terms"
          className="text-neutral-400 hover:text-white underline text-sm transition-colors"
        >
          Terms of Use
        </Link>
      </footer>
    </main>
  );
}

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/terms" element={<TermsPage/>} />
      </Routes>
    </Router>
  )
}
