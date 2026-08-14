import React, { useState } from 'react';
import { motion } from 'framer-motion';
import samuraiImg from '../assets/samurai.png';

export const EXPERTISE_SECTIONS_DATA = [
  {
    id: "01",
    heroNumber: "// 01",
    heroTitle: "Creative Leadership",
    sectionNumber: "01",
    heading: "Designing the Future With Intelligent Creative Systems",
    description: "I use AI as a creative amplifier—building custom tools, producing on-brand imagery, training custom LoRAs, and designing automated workflows that accelerate output. Across image, video, audio, copy, and code, AI removes the friction once inherent in ideation and iteration, enabling faster exploration, broader experimentation, and more fully realized creative ideas.",
    items: [
      { id: "01", title: "Generative AI Systems" },
      { id: "02", title: "AI-Assisted Development" },
      { id: "03", title: "Custom LoRA Training" },
      { id: "04", title: "Advanced Prompt Engineering" },
      { id: "05", title: "Workflow Automation (n8n)" },
      { id: "06", title: "Creative AI Pipelines" },
      { id: "07", title: "AI Toolchain Architecture" },
    ]
  },
  {
    id: "02",
    heroNumber: "// 02",
    heroTitle: "Creative Leadership",
    sectionNumber: "02",
    heading: "Unifying Vision, Strategy, and Execution Into Cohesive Experiences",
    description: "I provide brand-first creative direction rooted in vision and clarity—uncovering a brand’s “why” and aligning design, voice, and experience into cohesive systems. I connect the big picture across visual, written, audio, and motion to ensure every touchpoint feels intentional.",
    items: [
      { id: "01", title: "Brand Vision & Alignment" },
      { id: "02", title: "Art Direction" },
      { id: "03", title: "Cross-Disciplinary Leadership" },
      { id: "04", title: "Concept Development" },
      { id: "05", title: "Design Systems Thinking" },
      { id: "06", title: "Visual Storytelling" },
      { id: "07", title: "Stakeholder Collaboration" },
      { id: "08", title: "Creative Review & Critique" },
    ]
  },
  {
    id: "03",
    heroNumber: "// 03",
    heroTitle: "Branding",
    sectionNumber: "03",
    heading: "Transforming Purpose Into Brands People Feel and Believe In",
    description: "I help brands uncover their “why” and translate it into identity, voice, and positioning that feel authentic and emotionally resonant—creating brands that connect deeply with the people they are meant to serve.",
    items: [
      { id: "01", title: "Brand Discovery" },
      { id: "02", title: "Uncovering the “Why”" },
      { id: "03", title: "Brand Strategy" },
      { id: "04", title: "Positioning & Differentiation" },
      { id: "05", title: "Brand Voice & Messaging" },
      { id: "06", title: "Brand Guidelines" },
      { id: "07", title: "Emotional Brand Connection" },
    ]
  },
  {
    id: "04",
    heroNumber: "// 04",
    heroTitle: "Web Design & Development",
    sectionNumber: "04",
    heading: "Where Thoughtful Design Meets Scalable Engineering",
    description: "With over 20 years of experience, I design and build conversion-focused websites that balance aesthetics and usability—specializing in UX/UI, WordPress development, custom code, and integrating generative AI into modern digital products.",
    items: [
      { id: "01", title: "UX/UI Design" },
      { id: "02", title: "Conversion-Focused Design" },
      { id: "03", title: "Web Architecture" },
      { id: "04", title: "WordPress Development" },
      { id: "05", title: "Custom Theme Development" },
      { id: "06", title: "JavaScript" },
      { id: "07", title: "AI-Integrated Applications" },
      { id: "08", title: "Modern Dev Workflows (Replit, Cursor, Antigravity)" },
    ]
  }
];

export function ExpertiseHeroBanner({ 
  heroNumber = "// 01", 
  heroTitle = "Creative Leadership", 
  imageSrc = samuraiImg,
  duration = 1.0 
}) {
  const words = heroTitle.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="self-stretch w-full h-[60vh] sm:h-[70vh] md:h-[75vh] px-6 sm:px-12 md:px-20 relative bg-red-600 flex flex-col justify-end items-start gap-2 overflow-hidden">
      {/* Background Image - Zoom Out Animation to fill parent container */}
      <motion.img
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1.0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imageSrc}
        alt={heroTitle}
      />
      
      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-0" />

      {/* Hero Number - Pushing from bottom to top */}
      <div className="overflow-hidden relative z-10">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: duration, ease: [0.16, 1, 0.3, 1] }}
          className="justify-start text-white text-lg sm:text-xl md:text-2xl font-normal font-['Inter'] uppercase"
        >
          {heroNumber}
        </motion.div>
      </div>

      {/* Hero Title - Word by word pushing from bottom to top */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap gap-x-[0.3em] text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-['Inter'] uppercase relative z-10 overflow-hidden leading-tight break-words"
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden py-1">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ExpertiseStickyNumber({ number = "01", duration = 1.6 }) {
  return (
    <div className="lg:sticky top-0 px-2 sm:px-4 py-4 lg:py-10 flex flex-col justify-start items-start">
      <motion.div
        initial={{ opacity: 0, y: 80, filter: 'blur(20px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        className="justify-start text-white text-7xl sm:text-9xl md:text-[180px] lg:text-[320px] xl:text-[400px] font-regular font-['Instrument_Sans'] leading-none"
      >
        {number}
      </motion.div>
    </div>
  );
}

export function ExpertiseContentHeader({ 
  heading = "Designing the Future With Intelligent Creative Systems", 
  description = "I use AI as a creative amplifier—building custom tools, producing on-brand imagery, training custom LoRAs, and designing automated workflows that accelerate output. Across image, video, audio, copy, and code, AI removes the friction once inherent in ideation and iteration, enabling faster exploration, broader experimentation, and more fully realized creative ideas.",
  duration = 1.6
}) {
  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-4 md:gap-6">
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(16px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="self-stretch justify-start text-white text-2xl sm:text-4xl md:text-5xl font-bold font-['Inter'] uppercase leading-tight"
      >
        {heading}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="self-stretch justify-start text-white/80 text-sm sm:text-base font-light font-['Inter'] leading-relaxed"
      >
        {description}
      </motion.div>
    </div>
  );
}

export function ExpertiseItem({ id, title, isActive, onMouseEnter, onMouseLeave, duration = 1.6, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: duration, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 + index * 0.1 
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative self-stretch h-16 px-4 flex justify-center items-center gap-2 overflow-hidden cursor-pointer"
    >
      {/* White rectangle background sliding bottom to top */}
      <div
        className={`absolute inset-0 bg-white transition-transform duration-300 ease-out z-0 ${
          isActive ? 'translate-y-0' : 'translate-y-full'
        }`}
      />
      
      {/* Title Content */}
      <div
        className={`flex-1 justify-start text-base font-normal font-['Inter'] relative z-10 transition-colors duration-300 ${
          isActive ? 'text-black' : 'text-white'
        }`}
      >
        {title}
      </div>

      {/* ID Content */}
      <div
        className={`justify-start text-base font-normal font-['Inter'] relative z-10 transition-colors duration-300 ${
          isActive ? 'text-black' : 'text-white'
        }`}
      >
        {id}
      </div>

      {/* Bottom stroke animating from left to right */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ 
          duration: duration, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.3 + index * 0.1 
        }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20 origin-left z-20 pointer-events-none"
      />
    </motion.div>
  );
}

export function SingleExpertiseSection({
  heroNumber = "// 01",
  heroTitle = "Creative Leadership",
  heroImage = samuraiImg,
  sectionNumber = "01",
  heading = "Designing the Future With Intelligent Creative Systems",
  description = "I use AI as a creative amplifier...",
  items = [],
  duration = 1.6,
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="w-full max-w-full flex flex-col justify-center items-center">
      <ExpertiseHeroBanner
        heroNumber={heroNumber}
        heroTitle={heroTitle}
        imageSrc={heroImage}
        duration={duration}
      />
      <div className="w-full max-w-full px-4 sm:px-8 md:px-12 lg:px-20 bg-black flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-8 relative">
        <ExpertiseStickyNumber number={sectionNumber} duration={duration} />
        <div className="flex-1 w-full max-w-[1080px] px-2 sm:px-4 py-8 md:py-16 lg:py-24 flex flex-col justify-start items-start gap-8 md:gap-16 lg:gap-24 overflow-hidden">
          <ExpertiseContentHeader
            heading={heading}
            description={description}
            duration={duration}
          />
          <div
            className="w-full flex flex-col justify-start items-start overflow-hidden"
            onMouseLeave={() => setActiveIndex(null)}
          >
            {items.map((item, index) => (
              <ExpertiseItem
                key={item.id || index}
                id={item.id}
                title={item.title}
                isActive={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                duration={duration}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpertiseSection({ sections = EXPERTISE_SECTIONS_DATA, heroImage = samuraiImg, duration = 1.6 }) {
  return (
    <div className="w-full flex flex-col justify-start items-center bg-black">
      {sections.map((sectionData, index) => (
        <React.Fragment key={sectionData.id}>
          {index > 0 && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: duration, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[1px] bg-white/40 origin-left z-30 pointer-events-none"
            />
          )}
          <SingleExpertiseSection
            heroNumber={sectionData.heroNumber}
            heroTitle={sectionData.heroTitle}
            heroImage={sectionData.heroImage || heroImage}
            sectionNumber={sectionData.sectionNumber}
            heading={sectionData.heading}
            description={sectionData.description}
            items={sectionData.items}
            duration={duration}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
