import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Briefcase, ChevronDown, Zap, TrendingUp, Code, Users, Cloud } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences: ExperienceItem[] = [
    {
      company: "TheCoded Inc",
      role: "Associate Frontend Developer",
      location: "Remote",
      period: "Oct 2025 – Present",
      bullets: [
        "Built a React/JS front-end from Figma specs, cutting page load by 28% via code-splitting and asset optimization",
        "Implemented CI/CD with GitHub Actions (lint, unit tests, preview deploys), reducing manual release steps",
        "Integrated REST endpoints (auth, payments), writing integration checks and improving API error handling"
      ],
      tags: ["React", "CI/CD", "Performance"]
    },
    {
      company: "TheCoded Inc",
      role: "Associate Developer Intern",
      location: "Remote",
      period: "Mar 2022 – Dec 2022",
      bullets: [
        "Architected low-code solutions (PowerApps + Azure) to digitize workflows, boosting efficiency by 35%",
        "Implemented CI/CD pipelines (GitHub Actions) and unit testing, reducing defects by 25%",
        "Implemented unit testing and automated error handling, improving system efficiency by 35%"
      ],
      tags: ["PowerApps", "Azure", "CI/CD"]
    }
  ];

  const tagIcons: Record<string, any> = {
    "React": Code,
    "CI/CD": TrendingUp,
    "Performance": Zap,
    "PowerApps": Code,
    "Azure": Cloud
  };

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#0078d4] rounded-full opacity-10 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">Experience</h2>
          <p className="text-gray-400 text-lg">Building impactful solutions across diverse environments</p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0078d4] via-[#0078d4]/50 to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className="relative pl-20"
              >
                {/* Timeline node */}
                <motion.div
                  className="absolute left-5 top-6 w-7 h-7 rounded-full bg-[#0a0e27] border-2 border-[#0078d4] flex items-center justify-center group-hover:scale-125 transition-transform"
                  whileHover={{ scale: 1.3 }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[#0078d4]"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>

                <motion.div
                  className="group relative overflow-hidden rounded-2xl glass p-6 cursor-pointer hover:border-[#0078d4] transition-all duration-300"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  whileHover={{ y: -5 }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0078d4]/0 via-[#0078d4]/5 to-[#0078d4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-[#0078d4]/10 border border-[#0078d4]/30">
                          <Briefcase className="w-5 h-5 text-[#0078d4]" />
                        </div>
                        <div>
                          <h3 className="text-xl text-white mb-1">{exp.role}</h3>
                          <p className="text-[#0078d4] mb-1">{exp.company}</p>
                          <p className="text-sm text-gray-400">{exp.location} • {exp.period}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedIndex === index ? "auto" : 0,
                        opacity: expandedIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-white/10">
                        <ul className="space-y-3 mb-4">
                          {exp.bullets.map((bullet, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={expandedIndex === index ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-3 text-gray-300"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[#0078d4] mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{bullet}</span>
                            </motion.li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag, i) => {
                            const Icon = tagIcons[tag] || Zap;
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={expandedIndex === index ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.2 + i * 0.05 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0078d4]/10 border border-[#0078d4]/30 text-[#0078d4] text-sm"
                              >
                                <Icon className="w-3.5 h-3.5" />
                                {tag}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}