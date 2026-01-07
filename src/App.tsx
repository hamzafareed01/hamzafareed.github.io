import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner@2.0.3";
import { ProfileSelector } from "./components/ProfileSelector";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { QuickStats } from "./components/QuickStats";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { StarfieldBackground } from "./components/StarfieldBackground";
import "./styles/globals.css";

type ProfileMode =
  | "recruiter"
  | "engineering"
  | "devops"
  | null;

export default function App() {
  const [showProfileSelector, setShowProfileSelector] =
    useState(true);
  const [profileMode, setProfileMode] =
    useState<ProfileMode>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Prefer-reduced-motion (and keep it live)
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const apply = () => setReduceMotion(mediaQuery.matches);
    apply();

    const handler = (e: MediaQueryListEvent) =>
      setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Force dark mode (your design assumes it)
    document.documentElement.classList.add("dark");

    return () =>
      mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    // Apply reduce motion class
    if (reduceMotion)
      document.documentElement.classList.add("reduce-motion");
    else
      document.documentElement.classList.remove(
        "reduce-motion",
      );
  }, [reduceMotion]);

  useEffect(() => {
    // Track active section on scroll
    const handleScroll = () => {
      const sections = [
        "home",
        "experience",
        "skills",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectProfile = (
    mode: "recruiter" | "engineering" | "devops",
  ) => {
    setProfileMode(mode);
    setTimeout(() => {
      setShowProfileSelector(false);
      
      // Scroll to Projects section when "DevOps + Engineering" mode is selected
      if (mode === "engineering") {
        setTimeout(() => {
          const projectsSection = document.getElementById("projects");
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 600); // Wait for content to render
      }
    }, 500);
  };

  const handleSkip = () => {
    setProfileMode("engineering");
    setShowProfileSelector(false);
  };

  const toggleReduceMotion = () => setReduceMotion((v) => !v);

  return (
    <div className="relative min-h-screen bg-[#050507] text-white overflow-x-hidden">
      <Toaster position="top-right" theme="dark" />

      {/* Background (always behind everything) */}
      <StarfieldBackground reduceMotion={reduceMotion} />

      {/* Everything above background */}
      <div className="relative z-[2]">
        <AnimatePresence mode="wait">
          {showProfileSelector ? (
            <ProfileSelector
              key="profile-selector"
              onSelectProfile={handleSelectProfile}
              onSkip={handleSkip}
              reduceMotion={reduceMotion}
              onToggleReduceMotion={toggleReduceMotion}
            />
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen"
            >
              <Navbar activeSection={activeSection} />

              <main>
                <Hero reduceMotion={reduceMotion} />
                <QuickStats />
                <Experience />
                {profileMode !== "devops" && <Skills reduceMotion={reduceMotion} />}
                {profileMode !== "devops" && <Projects />}
                <Education />
                <Certifications />
                <Contact />
              </main>

              <Footer />

              {profileMode && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="fixed bottom-24 md:bottom-8 right-8 z-30 px-4 py-2 glass rounded-full text-xs text-gray-400 hidden md:block"
                >
                  <span className="text-[#0078d4]">●</span>{" "}
                  {profileMode} mode
                </motion.div>
              )}

              <ScrollProgressBar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;
      const progress =
        totalHeight > 0
          ? (window.scrollY / totalHeight) * 100
          : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0078d4] to-cyan-500 z-50 origin-left"
      style={{ scaleX: scrollProgress / 100 }}
    />
  );
}