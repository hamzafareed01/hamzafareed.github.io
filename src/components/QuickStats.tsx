import { motion } from "motion/react";
import { Cloud, GitBranch, Zap, CheckCircle } from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function QuickStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Cloud,
      title: "Cloud-Native Mindset",
      description: "Azure certified with hands-on experience",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: GitBranch,
      title: "CI/CD Pipelines",
      description: "GitHub Actions & automated workflows",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "REST APIs & Automation",
      description: "Building scalable backend solutions",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: CheckCircle,
      title: "Agile & Unit Testing",
      description: "Test-driven development approach",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl p-6 glass hover:border-[#0078d4] transition-all duration-300"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white mb-2">{stat.title}</h3>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>

              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(0, 120, 212, 0.5), transparent)`,
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['200% 0', '-200% 0'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.2,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
