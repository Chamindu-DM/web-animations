import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
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

function TermCard({ section, index, progress, total }) {
  const targetScale = 1 - (total - index) * 0.025;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div
      id={section.id}
      className="relative mb-16 sm:mb-24 scroll-mt-16"
    >
      {/* Inner Sticky Container */}
      <div className="sticky top-12 sm:top-16 flex flex-col justify-start origin-top">
        <motion.div
          style={{ scale }}
          className={`w-full h-[520px] sm:h-[560px] md:h-[580px] ${section.bgColor} ${section.textColor} rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col justify-between border border-black/5 origin-top`}
        >
          {/* Card Header */}
          <div className="border-b border-current/15 pb-4 shrink-0">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {section.num}. {section.title}
            </h3>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto pr-2 my-4 flex flex-col gap-6 text-[15px] sm:text-base leading-relaxed">
            {section.subsections.map((sub, sIdx) => (
              <div key={sIdx} className="flex flex-col gap-2">
                {sub.title && (
                  <h4 className="font-bold text-base sm:text-lg opacity-95">
                    {sub.title}
                  </h4>
                )}
                {sub.content.map((para, pIdx) => (
                  <p key={pIdx} className="opacity-90 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Card Footer Indicator */}
          <div className="pt-3 border-t border-current/10 flex justify-between items-center text-xs font-semibold uppercase tracking-wider opacity-70 shrink-0">
            <span>HungerLink Terms</span>
            <span>Section 0{section.num} / 0{total}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}



export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("section-1");
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMobileDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Use 64px for sm:top-16 (desktop) and 48px for top-12 (mobile)
      // Actually, now that we have a mobile sticky header, the sticky top padding on mobile might need to account for it!
      // The sticky header height is roughly: 73px (logo padding) + 72px (dropdown padding) = ~145px
      const isDesktop = window.innerWidth >= 640;
      const topOffset = isDesktop ? -64 : -145;

      const y = element.getBoundingClientRect().top + window.scrollY + topOffset;

      window.scrollTo({
        top: Math.max(0, y),
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPosition = scrollY + 200;
      
      // Show sticky header after scrolling past the inline logo (approx 150px)
      if (scrollY > 150) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
        setIsMobileDropdownOpen(false);
      }

      for (let i = termsSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(termsSections[i].id);
        if (section) {
          const top = section.getBoundingClientRect().top + scrollY;
          if (scrollPosition >= top) {
            setActiveSection(termsSections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen text-black font-['Inter',sans-serif] selection:bg-amber-200">
      
      {/* Mobile Sticky Header (Visible on Scroll) */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[60] bg-white border-b border-black/10 flex flex-col lg:hidden transition-transform duration-300 ${
          showStickyHeader ? "translate-y-0 shadow-md" : "-translate-y-full"
        }`}
      >
        <div className="p-6 border-b border-black/10 flex items-center">
          <img src={hungerLinkLogo} alt="HungerLink Logo" className="h-7 w-auto object-contain" />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            className="w-full flex items-center justify-between p-5 text-sm sm:text-base font-medium text-black hover:bg-black/5 transition-colors"
          >
            <span>
              {termsSections.find(s => s.id === activeSection)?.num}.{" "}
              {termsSections.find(s => s.id === activeSection)?.title}
            </span>
            <ChevronsUpDown className="w-5 h-5 text-neutral-500 shrink-0 ml-4" />
          </button>
          
          {/* Dropdown Menu */}
          <AnimatePresence>
            {isMobileDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 bg-[#f5f5f5] border-b border-black/10 shadow-2xl max-h-[60vh] overflow-y-auto z-[60]"
              >
                <nav className="flex flex-col">
                  {termsSections.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-sm p-4 transition-all duration-150 leading-snug cursor-pointer border-b border-black/5 last:border-0 ${
                        activeSection === item.id
                          ? "font-bold text-black bg-black/5"
                          : "font-normal text-neutral-600 hover:text-black hover:bg-black/5"
                      }`}
                    >
                      {item.num}. {item.title}
                    </button>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen">
        {/* Left Sidebar: Logo & Interactive Table of Contents */}
        <aside className="w-full lg:w-[38%] xl:w-[32%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-black/10 bg-white z-30">
          <div className="flex items-center">
            <img
              src={hungerLinkLogo}
              alt="HungerLink Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>

          <div className="mt-10 lg:mt-auto pt-6">
            <div className="border-b border-black/15 pb-3 mb-4">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black">
                Table of contents
              </h3>
            </div>
            <nav className="flex flex-col gap-3">
              {termsSections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-sm sm:text-base transition-all duration-150 leading-snug cursor-pointer ${activeSection === item.id
                      ? "font-bold text-black translate-x-1"
                      : "font-normal text-neutral-500 hover:text-black hover:translate-x-0.5"
                    }`}
                >
                  {item.num}. {item.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right Main Stacking Card Area */}
        <main
          ref={containerRef}
          className="w-full lg:w-[62%] xl:w-[68%] p-6 sm:p-12 lg:p-14 flex flex-col gap-8 relative"
        >
          {/* Header Title Section */}
          <div className="flex flex-col gap-2 pb-4">
            <h1 className="text-5xl sm:text-7xl lg:text-[80px] font-black uppercase tracking-tight leading-[0.95] text-black">
              Terms of use
            </h1>
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-neutral-600 mt-2">
              Effective date: February 22, 2022
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-black mb-6">
              Terms
            </h2>
          </div>

          {/* Stacking Terms Cards */}
          <div className="flex flex-col w-full pb-32">
            {termsSections.map((section, index) => (
              <TermCard
                key={section.id}
                section={section}
                index={index}
                progress={scrollYProgress}
                total={termsSections.length}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
