import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { Download, ArrowRight, Mail, Code, Linkedin, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { BiometricEyeHUD } from "./BiometricEyeHUD";

interface HeroProps {
  reduceMotion: boolean;
}

export function Hero({ reduceMotion }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [phraseIndex, setPhraseIndex] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const phrases = [
    "React + APIs",
    "CI/CD + Azure",
    "Performance + Reliability",
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = document.getElementById("home");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (!reduceMotion) {
      window.addEventListener("mousemove", handleMouseMove);
      return () =>
        window.removeEventListener(
          "mousemove",
          handleMouseMove,
        );
    }
  }, [mouseX, mouseY, reduceMotion]);

  // Rotating phrases effect
  useEffect(() => {
    if (reduceMotion) return; // Don't rotate if reduce motion is enabled

    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [reduceMotion, phrases.length]);

  const scrollToProjects = () => {
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 py-20 md:py-24"
    >
      {/* Subtle vignette overlay for readability - sits above starfield but below content */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(5, 5, 7, 0.3) 0%, rgba(5, 5, 7, 0.7) 100%)",
          }}
        />
      </div>

      {/* Azure glow blobs - keep for accent */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#0078d4] rounded-full opacity-10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Cursor glow effect */}
      {!reduceMotion && (
        <motion.div
          className="fixed w-96 h-96 rounded-full pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 120, 212, 0.15) 0%, transparent 70%)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      )}

      {/* Hero Content - 12-column grid with tighter spacing */}
      <div className="relative z-[2] w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Content - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 max-w-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-[#0078d4]/10 border border-[#0078d4]/30 text-[#0078d4] text-sm">
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
            >
              Hamza Syed
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-2 mb-4"
            >
              <span className="text-xl text-gray-300">
                Software Engineering
              </span>
              <span className="text-[#0078d4]">•</span>
              <span className="text-xl text-gray-300">
                Full-Stack
              </span>
              <span className="text-[#0078d4]">•</span>
              <span className="text-xl text-gray-300">
                Azure DevOps Engineer Certified
              </span>
            </motion.div>

            {/* Rotating phrases line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-2 mb-6 h-6"
            >
              <Code className="w-4 h-4 text-white/70 flex-shrink-0" />
              <div className="relative overflow-hidden text-[#0078d4] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-[#0078d4] inline-block"
                  >
                    {reduceMotion
                      ? phrases[0]
                      : phrases[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl"
            >
              CS senior at Roosevelt University focusing on
              Software Engineering with solid DevOps skills
              (Azure, GitHub Actions, CI/CD). Azure-certified;
              build and automate reliable services that reduce
              toil and speed up delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-[#0078d4] hover:bg-[#0078d4]/90 text-white rounded-full flex items-center gap-2 transition-all shadow-lg shadow-[#0078d4]/50 hover:shadow-[#0078d4]/70"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass hover:border-[#0078d4] text-white rounded-full flex items-center gap-2 transition-all"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/10 hover:border-[#0078d4] text-gray-300 hover:text-white rounded-full flex items-center gap-2 transition-all"
              >
                <Mail className="w-5 h-5" />
                Contact
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <p className="text-sm text-gray-500 mb-2">
                Based in
              </p>
              <div className="flex items-center gap-4">
                <p className="text-white">Chicago, IL</p>
                <div className="flex items-center gap-2">
                  <motion.a
                    href="https://www.linkedin.com/in/hamzafareed/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#0078d4]/20 border border-white/10 hover:border-[#0078d4] text-gray-400 hover:text-[#0078d4] transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/hamzafareed01"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#0078d4]/20 border border-white/10 hover:border-[#0078d4] text-gray-400 hover:text-[#0078d4] transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="https://medium.com/@hamzafareed4k"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#0078d4]/20 border border-white/10 hover:border-[#0078d4] text-gray-400 hover:text-[#0078d4] transition-all"
                    aria-label="Medium"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Biometric Eye HUD Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center lg:col-span-5"
          >
            <BiometricEyeHUD reduceMotion={reduceMotion} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#0078d4]/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-[#0078d4] rounded-full"
          />
        </motion.div>

        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[11px] uppercase tracking-[0.25em] text-gray-400/80"
        >
          Scroll Down
        </motion.p>
      </motion.div>
    </section>
  );
}