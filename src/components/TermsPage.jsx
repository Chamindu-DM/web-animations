import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronsUpDown, ArrowLeft } from "lucide-react";
import hungerLinkLogo from "../assets/HungerLink_Logo.svg";

const termsSections = [
  {
    id: "section-1",
    num: "1",
    title: "Introduction",
    bgColor: "bg-[#cd8b62]",
    textColor: "text-black",
    subsections: [
      {
        title: "Terms Overview",
        content: [
          `Please read these Terms of Use (these "Terms") carefully as they govern your use of HungerLink's services and other content, including all of our websites and software applications that incorporate or link to these Terms (collectively, the "HungerLink Service") and any other material that is made available through the HungerLink Service (the "Content").`,
          `By signing up for, or otherwise using, the HungerLink Service, you agree to these Terms. If you do not agree to these Terms, then you must not use the service or access any content.`,
          `THESE TERMS CONTAIN A MANDATORY ARBITRATION PROVISION THAT, AS FURTHER SET FORTH IN SECTION 6 BELOW, REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR ANY OTHER COURT PROCEEDINGS, OR CLASS ACTIONS OF ANY KIND.`
        ]
      },
      {
        title: "Service Provider",
        content: [`These Terms are between you and HungerLink Inc, Canada.`]
      },
      {
        title: "Age and Eligibility Requirements",
        content: [
          `BY USING THE HUNGERLINK SERVICE, YOU AFFIRM THAT YOU ARE 18 YEARS OR OLDER TO ENTER INTO THESE TERMS, OR, IF YOU ARE NOT, THAT YOU ARE 13 YEARS OR OLDER AND HAVE OBTAINED PARENTAL OR GUARDIAN CONSENT TO ENTER INTO THESE TERMS.`
        ]
      }
    ]
  },
  {
    id: "section-2",
    num: "2",
    title: "The HungerLink Service Provided by Us",
    bgColor: "bg-[#f7efd2]",
    textColor: "text-black",
    subsections: [
      {
        title: "Third-Party Applications, Devices and Open Source",
        content: [
          `The HungerLink Service may be integrated with, or may otherwise interact with, third-party applications, websites, and services ("Third-Party Applications") and third-party personal computers, mobile handsets, tablets, wearable devices, speakers, and other devices ("Devices"). Your use of such Third-Party Applications and Devices may be subject to additional terms, conditions, and policies provided to you by the applicable third party.`
        ]
      },
      {
        title: "Service Limitations and Modifications",
        content: [
          `We use reasonable efforts to keep the HungerLink Service operational and to provide you with a personalized, immersive experience. However, our service offerings and their availability may change from time to time, without liability to you.`,
          `• The HungerLink Services may experience temporary interruptions due to technical difficulties, maintenance or testing, or regulatory updates.`,
          `• We aim to evolve and improve the HungerLink Service constantly, and we may modify, suspend, or stop providing all or part of the service at any time.`,
          `• HungerLink has no liability to you, nor any obligation to provide a refund, in connection with internet or other service outages or failures caused by events beyond our control.`
        ]
      }
    ]
  },
  {
    id: "section-3",
    num: "3",
    title: "Your Use of the HungerLink Service",
    bgColor: "bg-[#eed7a1]",
    textColor: "text-black",
    subsections: [
      {
        title: "Creating a HungerLink Account",
        content: [
          `You may need to create a HungerLink user account to use all or part of the HungerLink Service. You understand that you are responsible for all use of your account. You should notify us if you believe there has been unauthorized access to your account.`
        ]
      },
      {
        title: "Your Rights to Use the HungerLink Service",
        content: [
          `Subject to your compliance with these Terms, we grant you limited, non-exclusive, revocable permission to make personal, non-commercial use of the HungerLink Service and the Content ("Access"). This Access shall remain in effect unless and until terminated by you or HungerLink.`,
          `The HungerLink software applications and Content are licensed, not sold or transferred to you, and HungerLink and its licensors retain ownership of all copies.`
        ]
      },
      {
        title: "Proprietary Rights",
        content: [
          `The HungerLink Service and Content are the property of HungerLink or its licensors. All HungerLink trademarks, service marks, trade names, logos, domain names, and brand features are the sole property of HungerLink.`
        ]
      }
    ]
  },
  {
    id: "section-4",
    num: "4",
    title: "Content and Intellectual Property Rights",
    bgColor: "bg-[#8a8583]",
    textColor: "text-white",
    subsections: [
      {
        title: "User Content & Responsibility",
        content: [
          `HungerLink users may post, upload, or otherwise contribute content ("User Content"). You promise that you own or have the right to post such User Content and that it does not violate any laws or third-party rights.`,
          `HungerLink reserves the right to monitor, review, remove, or disable access to any User Content for any or no reason without prior notice.`
        ]
      },
      {
        title: "Licenses You Grant to Us",
        content: [
          `You retain ownership of your User Content. However, you grant HungerLink a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to reproduce, display, translate, and distribute your content across our platforms.`,
          `Any feedback, ideas, or suggestions provided regarding the HungerLink Service are non-confidential and may be used without restriction or compensation.`
        ]
      }
    ]
  },
  {
    id: "section-5",
    num: "5",
    title: "Customer Support, Questions & Complaints",
    bgColor: "bg-[#716b67]",
    textColor: "text-white",
    subsections: [
      {
        title: "Customer Inquiries",
        content: [
          `For customer support with account and other questions ("Customer Support Queries"), please use the Customer Support resources listed on the About Us section of our website.`,
          `If you have any questions concerning the HungerLink Service or these Terms, please contact HungerLink Customer Service.`
        ]
      }
    ]
  },
  {
    id: "section-6",
    num: "6",
    title: "Problems, Disputes & Disclaimers",
    bgColor: "bg-[#2d2926]",
    textColor: "text-white",
    subsections: [
      {
        title: "Termination",
        content: [
          `These Terms continue to apply until terminated by either you or HungerLink. We may suspend or terminate your access at any time if we believe you have breached these Terms.`
        ]
      },
      {
        title: "Warranty Disclaimers",
        content: [
          `THE HUNGERLINK SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT ANY WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. HUNGERLINK DISCLAIMS ALL WARRANTIES OF SATISFACTORY QUALITY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.`
        ]
      }
    ]
  }
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("section-1");
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMobileDropdownOpen(false);
      }
    };

    if (isMobileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileDropdownOpen]);

  // Scroll listener to toggle mobile sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 180) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
        setIsMobileDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to accurately track active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    termsSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMobileDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#141210] min-h-screen text-white font-['Inter',sans-serif] selection:bg-amber-400 selection:text-black">
      {/* Fixed Top-Right Return Button (Desktop Only) */}
      <Link
        to="/"
        className="hidden lg:flex fixed lg:top-8 lg:right-8 z-50 px-5 py-2 rounded-full border border-white/20 text-[11px] sm:text-xs font-mono uppercase tracking-widest bg-black/40 hover:bg-white hover:text-black backdrop-blur-md transition-all duration-300 items-center gap-1.5 shadow-lg group"
      >
        <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
        <span>Home</span>
      </Link>

      {/* Backdrop overlay for outside click on mobile */}
      <AnimatePresence>
        {isMobileDropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileDropdownOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sticky Header (Visible on Scroll on mobile screens) */}
      <div
        ref={dropdownRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-[#141210]/95 backdrop-blur-md border-b border-white/10 flex flex-col lg:hidden transition-transform duration-300 ${
          showStickyHeader ? "translate-y-0 shadow-2xl" : "-translate-y-full"
        }`}
      >
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={hungerLinkLogo}
              alt="HungerLink Logo"
              className="h-6 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <Link
            to="/"
            className="px-3.5 py-1 rounded-full border border-white/20 text-[10px] font-mono uppercase tracking-widest bg-white/5 hover:bg-white hover:text-black text-neutral-300 transition-all flex items-center gap-1"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
            <span>Home</span>
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            className="w-full flex items-center justify-between px-6 py-3.5 text-xs font-mono uppercase tracking-wider text-neutral-200 hover:bg-white/5 transition-colors"
          >
            <span className="truncate pr-2">
              {termsSections.find((s) => s.id === activeSection)?.num}.{" "}
              {termsSections.find((s) => s.id === activeSection)?.title}
            </span>
            <ChevronsUpDown className="w-4 h-4 text-neutral-400 shrink-0" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isMobileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 bg-[#141210] border-b border-white/10 shadow-2xl max-h-[60vh] overflow-y-auto z-50"
              >
                <nav className="flex flex-col p-2">
                  {termsSections.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-xs font-mono p-3 transition-all leading-snug cursor-pointer rounded-lg flex items-center justify-between ${
                        activeSection === item.id
                          ? "font-bold text-white bg-white/10"
                          : "font-normal text-neutral-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>
                        {item.num.padStart(2, "0")}. {item.title}
                      </span>
                      {activeSection === item.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Column (w-full on mobile, w-1/2 sticky on desktop) */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen bg-[#141210] flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 z-30">
          {/* Top Row: Logo & Subtitle aligned horizontally with Home button */}
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Link to="/" className="inline-block">
                <img
                  src={hungerLinkLogo}
                  alt="HungerLink Logo"
                  className="h-7 sm:h-9 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="font-mono text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-widest leading-relaxed">
                TERMS OF USE & SERVICE AGREEMENT
              </p>
            </div>

            {/* Mobile Home button aligned horizontally */}
            <Link
              to="/"
              className="lg:hidden px-3.5 py-1.5 rounded-full border border-white/20 text-[10px] font-mono uppercase tracking-widest bg-white/5 hover:bg-white hover:text-black text-neutral-200 transition-all flex items-center gap-1 shrink-0 mt-0.5"
            >
              <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
              <span>Home</span>
            </Link>
          </div>

          {/* Mobile Table of Contents (Initial Inline View - Wireframe 11) */}
          <div className="lg:hidden my-8 pt-6 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-3 block">
              Table of contents
            </span>
            <nav className="flex flex-col gap-2.5">
              {termsSections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-xs font-mono py-1.5 transition-colors flex items-center justify-between ${
                    activeSection === item.id
                      ? "text-amber-400 font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span>
                    {item.num.padStart(2, "0")}. {item.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom Row of Left Column (Desktop Only) */}
          <div className="hidden lg:flex mt-auto pt-6 items-end justify-between gap-8">
            {/* Bottom-Left: Canadian Non-Profit Tag (Desktop) */}
            <div className="font-mono text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>HUNGERLINK © 2026</span>
            </div>

            {/* Bottom-Right of Left Column: Scaled Down Table of Contents (Desktop) */}
            <div className="flex flex-col items-end text-right gap-1.5 max-w-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 ml-4 block">
                Table of contents
              </span>
              <nav className="flex flex-col items-end gap-1.5">
                {termsSections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-right text-[11px] xl:text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-2 group ${
                      activeSection === item.id
                        ? "text-white font-bold translate-x-0 opacity-100"
                        : "text-neutral-500 hover:text-neutral-300 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <span>
                      {item.num.padStart(2, "0")}. {item.title}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-amber-400 scale-100"
                          : "bg-transparent scale-0 group-hover:bg-white/40 group-hover:scale-75"
                      }`}
                    />
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Right Column (w-1/2, Full viewport height per term) */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {termsSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className={`w-full min-h-screen flex flex-col justify-center p-8 sm:p-14 lg:p-16 xl:p-20 relative ${section.bgColor} ${section.textColor}`}
            >
              {/* Big Term Title (Shaun Scholtz style) */}
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02] mb-8 max-w-2xl">
                {section.num}. {section.title}
              </h2>

              {/* Monospace Small Font for Term Description */}
              <div className="font-mono text-xs sm:text-[13px] leading-relaxed space-y-5 max-w-xl opacity-90">
                {section.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    {sub.title && (
                      <h4 className="font-bold text-xs uppercase tracking-wider opacity-95 pt-1">
                        {sub.title}
                      </h4>
                    )}
                    {sub.content.map((para, pIdx) => (
                      <p key={pIdx} className="leading-relaxed opacity-85">
                        {para}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Dedicated Mobile Footer (At the very bottom of the page on mobile) */}
          <footer className="lg:hidden w-full bg-[#141210] text-white py-14 px-8 border-t border-white/10 flex flex-col items-center justify-center gap-3">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>HUNGERLINK © 2026</span>
            </div>
            <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest text-center">
              Terms of Use & Service Agreement
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
