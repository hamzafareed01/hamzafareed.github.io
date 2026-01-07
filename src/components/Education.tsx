import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);

  useEffect(() => {
    // Check for system-level reduce motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(
      mediaQuery.matches || document.documentElement.classList.contains("reduce-motion")
    );

    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const coursework = [
    {
      title: "Data Structures & Algorithms",
      demonstrates:
        "Build efficient, scalable code using core data structures (trees/graphs/heaps), sorting/searching, and Big-O runtime analysis—validated through hands-on coding labs/projects.",
    },
    {
      title: "Machine Organization & Assembly",
      demonstrates:
        "Understand how software runs on real hardware: CPU + memory architecture, assembly basics, pipelines, and memory hierarchy—plus low-level troubleshooting in Linux.",
    },
    {
      title: "Software Design",
      demonstrates:
        "Apply OOP + design patterns to create maintainable systems, with testing, event-driven design, concurrency, and team-based development practices.",
    },
    {
      title: "Software Project Management",
      demonstrates:
        "Ship projects successfully using planning, estimation, scheduling, risk management, stakeholder communication, and delivery methodologies used in real engineering teams.",
    },
    {
      title: "Linux in Systems Programming",
      demonstrates:
        "Write systems-level programs using processes/threads, IPC, sockets, RPCs, and async events—building distributed components across UNIX and Windows environments.",
    },
    {
      title: "LLM Intelligent Systems",
      demonstrates:
        "Solve AI problems with search + reasoning: heuristic/local search, constraint satisfaction, planning/scheduling, and multi-agent applications—backed by a programming component.",
    },
    {
      title: "Operating Systems",
      demonstrates:
        "Deep understanding of OS internals—scheduling, memory, file systems, deadlocks, and protection—through projects using UNIX/Windows system calls.",
    },
  ];

  const selectedCourse =
    selectedCourseIndex !== null ? coursework[selectedCourseIndex] : null;

  const toggleCourse = (index: number) => {
    setSelectedCourseIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          className="relative overflow-hidden rounded-2xl glass p-8 hover:border-[#0078d4] transition-all duration-300"
        >
          {/* Shimmer effect on hover (respects reduce motion) */}
          {!reduceMotion ? (
            <motion.div
              className="absolute inset-0 pointer-events-none z-0"
              initial={{ x: "-100%", y: "-100%" }}
              animate={isHovered ? { x: "100%", y: "100%" } : { x: "-100%", y: "-100%" }}
              transition={{
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                background:
                  "linear-gradient(135deg, transparent 0%, transparent 40%, rgba(0, 120, 212, 0.08) 50%, rgba(255, 255, 255, 0.12) 50%, rgba(0, 120, 212, 0.08) 60%, transparent 100%)",
                width: "200%",
                height: "200%",
                filter: "blur(1px)",
              }}
            />
          ) : (
            // Simple glow fallback for reduce motion mode
            <motion.div
              className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background:
                  "radial-gradient(circle at center, rgba(0, 120, 212, 0.05) 0%, transparent 70%)",
              }}
            />
          )}

          <div className="relative z-10">
            <div className="flex items-start gap-6 mb-6">
              <img
                src="https://images.unsplash.com/photo-1695556575317-9d49e3dccf75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc2VhbCUyMGxvZ28lMjBlbWJsZW18ZW58MXx8fHwxNjcwNzA1NDQzOHww&ixlib=rb-4.1.0&q=80&w=400"
                alt="Roosevelt University Logo"
                className="w-16 h-16 object-contain"
              />
              <div className="flex-1">
                <h3 className="text-3xl text-white mb-2">Roosevelt University</h3>
                <p className="text-[#0078d4] mb-1">B.S. Computer Science (Software Engineering)</p>
                <p className="text-gray-400">Chicago, IL • Expected Graduation: May 2026</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex items-end justify-between gap-4 mb-4">
                <h4 className="text-white">Relevant Coursework</h4>
                <p className="text-xs text-gray-500">
                  Click a course to see what it demonstrates.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {coursework.map((course, index) => {
                  const isActive = selectedCourseIndex === index;

                  return (
                    <motion.button
                      key={course.title}
                      type="button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: 0.3 + index * 0.05,
                        duration: reduceMotion ? 0 : 0.35,
                      }}
                      whileHover={!reduceMotion ? { scale: 1.05 } : undefined}
                      onClick={() => toggleCourse(index)}
                      aria-pressed={isActive}
                      className={[
                        "px-4 py-2 rounded-lg border transition-all cursor-pointer text-left",
                        isActive
                          ? "bg-[#0078d4]/15 border-[#0078d4]/60 text-white"
                          : "bg-[#252836] border-white/10 text-gray-300 hover:border-[#0078d4]/50",
                      ].join(" ")}
                    >
                      {course.title}
                    </motion.button>
                  );
                })}
              </div>

              {/* Click-to-reveal panel */}
              <AnimatePresence>
                {selectedCourse && (
                  <motion.div
                    key={selectedCourse.title}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                    className="mt-5 rounded-xl bg-[#252836]/50 border border-white/10 p-4 relative"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-[#0078d4] mb-1">
                          What this demonstrates
                        </p>
                        <h5 className="text-white text-sm mb-2">
                          {selectedCourse.title}
                        </h5>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {selectedCourse.demonstrates}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedCourseIndex(null)}
                        className="shrink-0 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#0078d4]/50 transition-all"
                        aria-label="Close coursework details"
                      >
                        Close
                      </button>
                    </div>

                    {/* subtle accent bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0078d4] to-cyan-500 opacity-70" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
