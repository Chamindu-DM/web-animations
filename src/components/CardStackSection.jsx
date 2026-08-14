import { useRef } from "react";
import { useTransform, motion, useScroll, color } from "framer-motion";

const cardItems = [
  {
    id: "tech-consulting",
    title: "Technology Consulting",
    description:
      "Optimize IT strategies with consulting services focused on streamlining workflows, improving efficiency, and advancing digital transformation.",
    actionText: "Transform",
    actionLink: "#",
    tags: [
      "Enterprise Architecture",
      "Infrastructure Strategy",
      "Digital Transformation",
    ],
    glowColor: "from-blue-600/40 via-blue-500/20",
    borderColor: "border-blue-500/30",
    color: "bg-[#2F2FE4]",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Architecture",
    description:
      "Architect resilient cloud infrastructure with automated CI/CD pipelines, multi-region failover, and zero-downtime microservice deployments.",
    actionText: "Explore Architecture",
    actionLink: "#",
    tags: [
      "Multi-Cloud Orchestration",
      "Kubernetes & Docker",
      "Zero-Downtime CI/CD",
    ],
    glowColor: "from-cyan-600/40 via-blue-600/20",
    borderColor: "border-cyan-500/30",
    color: "bg-[#162E93]",
  },
  {
    id: "ai-data",
    title: "AI & Data Intelligence",
    description:
      "Unlock high-value insights and automate business-critical decisions using tailored LLMs, neural networks, and real-time streaming analytics.",
    actionText: "Deploy AI Models",
    actionLink: "#",
    tags: [
      "LLM Integration",
      "Predictive Analytics",
      "Real-Time Data Pipelines",
    ],
    glowColor: "from-indigo-600/40 via-purple-600/20",
    borderColor: "border-indigo-500/30",
    color: "bg-[#1A1953]",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Resilience",
    description:
      "Fortify digital assets with zero-trust network boundaries, continuous automated vulnerability audits, and instant threat neutralization.",
    actionText: "Secure Systems",
    actionLink: "#",
    tags: [
      "Zero-Trust Security",
      "Continuous Monitoring",
      "SOC2 Compliance",
    ],
    glowColor: "from-blue-500/40 via-indigo-600/20",
    borderColor: "border-blue-400/30",
    color: "bg-[#080616]",
  },
];

export const Card = ({
  i,
  card,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 p-4 md:p-8"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 30}px)`,
        }}
        className={`relative w-full max-w-[1200px] min-h-[480px] md:min-h-[520px] ${card.color} rounded-[32px] border ${card.borderColor} p-6 sm:p-8 md:p-12 overflow-hidden flex flex-col justify-between origin-top`}
      >
        {/* Subtle background star grid pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Glowing Blue aura at bottom matching screenshot */}
        <div
          className={`absolute -bottom-28 left-1/2 -translate-x-1/2 w-[85%] h-56 bg-gradient-to-t ${card.glowColor} to-transparent blur-[90px] rounded-full pointer-events-none`}
        />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
                {card.title}
              </h3>
              <p className="text-slate-300 text-base md:text-lg max-w-xl font-instrument leading-relaxed mb-8">
                {card.description}
              </p>
              <a
                href={card.actionLink}
                className="inline-flex items-center gap-2 text-white font-medium text-lg hover:text-blue-400 transition-colors group"
              >
                <span>{card.actionText}</span>
                <span className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Tags Pills */}
        <div className="relative z-10 pt-8 mt-6 border-t border-white/10 flex flex-wrap gap-3 items-center">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="px-5 py-2 rounded-full border border-white/20 text-slate-200 text-sm font-medium backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function CardStackSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container} className="relative w-full bg-white">
      
      {/* Stacking Cards */}
      <section className="text-white w-full pb-[10vh]">
        {cardItems.map((card, i) => {
          const targetScale = 1 - (cardItems.length - i) * 0.05;
          return (
            <Card
              key={card.id}
              i={i}
              card={card}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              color={card.color}
            />
          );
        })}
      </section>
    </main>
  );
}
