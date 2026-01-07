import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface BiometricEyeHUDProps {
  reduceMotion: boolean;
}

type ScanState = "idle" | "scanning" | "verified";

export function BiometricEyeHUD({ reduceMotion }: BiometricEyeHUDProps) {
  const [systemReduceMotion, setSystemReduceMotion] = useState(false);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [2, -2]);
  const rotateY = useTransform(mouseX, [-100, 100], [-2, 2]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSystemReduceMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemReduceMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Calculate shouldReduceMotion early
  const shouldReduceMotion = reduceMotion || systemReduceMotion;

  // Detect mobile for particle optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer to pause when out of view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 3-state scan cycle: idle (0-4s) → scanning (4-7s) → verified (7-8s)
  useEffect(() => {
    if (shouldReduceMotion || !isVisible) return;

    const cycle = () => {
      setScanState("idle");
      
      const scanningTimeout = setTimeout(() => {
        setScanState("scanning");
      }, 4000);

      const verifiedTimeout = setTimeout(() => {
        setScanState("verified");
      }, 7000);

      const resetTimeout = setTimeout(() => {
        setScanState("idle");
      }, 8000);

      return () => {
        clearTimeout(scanningTimeout);
        clearTimeout(verifiedTimeout);
        clearTimeout(resetTimeout);
      };
    };

    cycle();
    const interval = setInterval(cycle, 8000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, isVisible]);

  // Glitch bursts during SCANNING state
  useEffect(() => {
    if (shouldReduceMotion || !isVisible || scanState !== "scanning") {
      setGlitchActive(false);
      return;
    }

    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150); // 120-200ms burst
    };

    // Random glitch bursts every 1-2.5s during scanning
    const scheduleNextGlitch = () => {
      const delay = 1000 + Math.random() * 1500;
      return setTimeout(triggerGlitch, delay);
    };

    let timeout = scheduleNextGlitch();
    const interval = setInterval(() => {
      timeout = scheduleNextGlitch();
    }, 2000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [shouldReduceMotion, isVisible, scanState]);

  // Mouse move handler for parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const particleCount = isMobile ? 8 : 15;

  // Dynamic animation speeds based on scan state
  const outerRingDuration = scanState === "scanning" ? 16 : 20; // 20% faster when scanning
  const innerRingDuration = scanState === "scanning" ? 24 : 30; // 20% faster when scanning
  const sweepOpacity = scanState === "scanning" ? 0.14 : 0.1;

  // State labels
  const getStateLabel = () => {
    if (scanState === "scanning") return "SCANNING...";
    if (scanState === "verified") return "VERIFIED";
    return "BIOMETRIC SCAN";
  };

  // Micro readout data
  const getReadoutData = () => {
    if (scanState === "idle") {
      return { id: "HS-2047", sig: "IDLE", match: "—", latency: "—" };
    } else if (scanState === "scanning") {
      return { id: "HS-2047", sig: "ACTIVE", match: "78%", latency: "42ms" };
    } else {
      return { id: "HS-2047", sig: "LOCKED", match: "100%", latency: "12ms" };
    }
  };

  const readoutData = getReadoutData();

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-[460px] mx-auto aspect-square"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={
        shouldReduceMotion
          ? {}
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
      }
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Noise texture for iris realism */}
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>

          {/* Glitch displacement filter - only applied during bursts */}
          <filter id="glitch">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" seed="2"/>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={glitchActive ? "8" : "0"} xChannelSelector="R" yChannelSelector="G"/>
          </filter>

          {/* Gradient definitions */}
          <radialGradient id="irisGradient">
            <stop offset="0%" stopColor="#0078d4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0078d4" stopOpacity="0.2" />
          </radialGradient>

          <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0078d4" stopOpacity="0" />
            <stop offset="30%" stopColor="#00d4ff" stopOpacity={sweepOpacity} />
            <stop offset="70%" stopColor="#00d4ff" stopOpacity={sweepOpacity} />
            <stop offset="100%" stopColor="#0078d4" stopOpacity="0" />
          </linearGradient>

          {/* Mask for iris texture */}
          <mask id="irisMask">
            <circle cx="200" cy="200" r="140" fill="white" />
          </mask>

          {/* Radial gradient for limbal ring */}
          <radialGradient id="limbalRing">
            <stop offset="92%" stopColor="#0078d4" stopOpacity="0" />
            <stop offset="96%" stopColor="#00d4ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0078d4" stopOpacity="0" />
          </radialGradient>

          {/* Hex grid pattern */}
          <pattern id="hexGrid" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
            <path d="M10 0 L15 8.66 L10 17.32 L5 8.66 Z" fill="none" stroke="#0078d4" strokeWidth="0.5" opacity="0.4"/>
          </pattern>
        </defs>

        {/* Background center circle */}
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="url(#irisGradient)"
          opacity="0.1"
        />

        {/* Hex-grid texture inside iris - cyberpunk detail */}
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="url(#hexGrid)"
          mask="url(#irisMask)"
          opacity="0.05"
        />

        {/* Noise texture for iris realism - very subtle */}
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="white"
          filter="url(#noise)"
          mask="url(#irisMask)"
          opacity="0.04"
        />

        {/* Scanlines - only during SCANNING state */}
        {scanState === "scanning" && !shouldReduceMotion && (
          <motion.g mask="url(#irisMask)">
            {[...Array(30)].map((_, i) => (
              <motion.line
                key={`scanline-${i}`}
                x1="60"
                x2="340"
                y1={70 + i * 9}
                y2={70 + i * 9}
                stroke="#00d4ff"
                strokeWidth="0.5"
                strokeOpacity="0.15"
                initial={{ y1: 70 + i * 9, y2: 70 + i * 9 }}
                animate={{
                  y1: [70 + i * 9, 80 + i * 9, 70 + i * 9],
                  y2: [70 + i * 9, 80 + i * 9, 70 + i * 9],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.05,
                }}
              />
            ))}
          </motion.g>
        )}

        {/* Limbal ring - outer bright edge for eye realism */}
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="url(#limbalRing)"
          opacity="0.6"
        />

        {/* Ultra-thin radial fibers for iris texture */}
        <motion.g
          animate={shouldReduceMotion || !isVisible ? {} : { rotate: 360 }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ originX: "200px", originY: "200px" }}
        >
          {[...Array(10)].map((_, i) => {
            const angle = (i * 36 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 30;
            const y1 = 200 + Math.sin(angle) * 30;
            const x2 = 200 + Math.cos(angle) * 135;
            const y2 = 200 + Math.sin(angle) * 135;
            
            return (
              <line
                key={`fiber-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#0078d4"
                strokeWidth="0.5"
                strokeOpacity="0.05"
              />
            );
          })}
        </motion.g>

        {/* Concentric rings - Iris structure */}
        {[110, 130, 150, 170].map((radius, index) => (
          <motion.circle
            key={`ring-${index}`}
            cx="200"
            cy="200"
            r={radius}
            fill="none"
            stroke="#0078d4"
            strokeWidth="1"
            strokeOpacity={0.3 - index * 0.05}
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              scanState === "verified" && index === 2
                ? {
                    pathLength: 1,
                    opacity: [0.25, 0.8, 0.25],
                  }
                : { pathLength: 1, opacity: 0.3 - index * 0.05 }
            }
            transition={
              scanState === "verified" && index === 2
                ? { duration: 0.6, ease: "easeOut" }
                : { duration: 1.5, delay: index * 0.1 }
            }
          />
        ))}

        {/* Outer segmented rotating ring - with glitch filter during bursts */}
        <motion.g
          animate={shouldReduceMotion || !isVisible ? {} : { rotate: 360 }}
          transition={{
            duration: outerRingDuration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ originX: "200px", originY: "200px" }}
          filter={glitchActive && scanState === "scanning" ? "url(#glitch)" : undefined}
        >
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 165;
            const y1 = 200 + Math.sin(angle) * 165;
            const x2 = 200 + Math.cos(angle) * 180;
            const y2 = 200 + Math.sin(angle) * 180;
            
            return (
              <line
                key={`segment-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#0078d4"
                strokeWidth="2"
                strokeOpacity="0.5"
                filter="url(#glow)"
              />
            );
          })}
        </motion.g>

        {/* Inner rotating technical ring */}
        <motion.g
          animate={shouldReduceMotion || !isVisible ? {} : { rotate: -360 }}
          transition={{
            duration: innerRingDuration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ originX: "200px", originY: "200px" }}
        >
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 90;
            const y1 = 200 + Math.sin(angle) * 90;
            const x2 = 200 + Math.cos(angle) * 100;
            const y2 = 200 + Math.sin(angle) * 100;
            
            return (
              <line
                key={`inner-segment-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#00d4ff"
                strokeWidth="1.5"
                strokeOpacity="0.6"
                filter="url(#glow)"
              />
            );
          })}
        </motion.g>

        {/* Arc segments - retina details */}
        {[0, 90, 180, 270].map((rotation, index) => (
          <motion.path
            key={`arc-${index}`}
            d="M 200 200 m -120, 0 a 120,120 0 0,1 60,-103.923"
            fill="none"
            stroke="#0078d4"
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray="5,5"
            filter="url(#glow)"
            transform={`rotate(${rotation} 200 200)`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: index * 0.2 }}
          />
        ))}

        {/* Radial retina sweep - rotating wedge highlight */}
        {!shouldReduceMotion && isVisible && (
          <motion.path
            d="M 200 200 L 200 50 A 150 150 0 0 1 265 73 Z"
            fill="url(#sweepGradient)"
            opacity={sweepOpacity}
            filter="url(#glow)"
            animate={{ rotate: 360 }}
            transition={{
              duration: scanState === "scanning" ? 2.4 : 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ originX: "200px", originY: "200px" }}
          />
        )}

        {/* Chromatic aberration - RGB split on hover + SCANNING */}
        {(isHovered || scanState === "scanning") && !shouldReduceMotion && (
          <>
            {/* Red channel offset */}
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="#ff0000"
              strokeWidth="1"
              strokeOpacity="0.08"
              transform="translate(-1, -1)"
            />
            {/* Green channel offset */}
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="#00ff00"
              strokeWidth="1"
              strokeOpacity="0.08"
              transform="translate(0, 0)"
            />
            {/* Blue channel offset */}
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="#0000ff"
              strokeWidth="1"
              strokeOpacity="0.08"
              transform="translate(1, 1)"
            />
          </>
        )}

        {/* Hover shimmer effect - single pass */}
        {isHovered && !shouldReduceMotion && (
          <motion.path
            d="M 200 200 L 200 50 A 150 150 0 0 1 265 73 Z"
            fill="url(#sweepGradient)"
            opacity="0.2"
            filter="url(#strongGlow)"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            style={{ originX: "200px", originY: "200px" }}
          />
        )}

        {/* VERIFIED lock-on reticle/crosshair */}
        {scanState === "verified" && !shouldReduceMotion && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Horizontal crosshair */}
            <line x1="120" y1="200" x2="280" y2="200" stroke="#00ff88" strokeWidth="2" opacity="0.8" filter="url(#strongGlow)" />
            {/* Vertical crosshair */}
            <line x1="200" y1="120" x2="200" y2="280" stroke="#00ff88" strokeWidth="2" opacity="0.8" filter="url(#strongGlow)" />
            {/* Corner reticle markers */}
            {[
              { x: 140, y: 140, r: 0 },
              { x: 260, y: 140, r: 90 },
              { x: 260, y: 260, r: 180 },
              { x: 140, y: 260, r: 270 },
            ].map((pos, i) => (
              <g key={`reticle-${i}`} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}>
                <line x1="0" y1="0" x2="12" y2="0" stroke="#00ff88" strokeWidth="2" opacity="0.8" />
                <line x1="0" y1="0" x2="0" y2="12" stroke="#00ff88" strokeWidth="2" opacity="0.8" />
              </g>
            ))}
          </motion.g>
        )}

        {/* Center pupil/core */}
        <circle
          cx="200"
          cy="200"
          r="25"
          fill="#0078d4"
          fillOpacity="0.2"
          filter="url(#strongGlow)"
        />
        
        <motion.circle
          cx="200"
          cy="200"
          r="15"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="2"
          strokeOpacity="0.8"
          filter="url(#strongGlow)"
          animate={
            shouldReduceMotion || !isVisible
              ? { strokeOpacity: 0.8 }
              : scanState === "verified"
              ? {
                  r: [15, 22, 15],
                  strokeOpacity: [0.8, 1, 0.8],
                }
              : isHovered
              ? {
                  r: [15, 18, 15],
                  strokeOpacity: [0.8, 1, 0.8],
                }
              : {
                  r: [15, 18, 15],
                  strokeOpacity: [0.8, 1, 0.8],
                }
          }
          transition={{
            duration: scanState === "verified" ? 0.6 : 2,
            repeat: scanState === "verified" ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles - reduced on mobile */}
        {[...Array(particleCount)].map((_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = 60 + Math.random() * 80;
          const cx = 200 + Math.cos(angle) * distance;
          const cy = 200 + Math.sin(angle) * distance;
          
          return (
            <motion.circle
              key={`particle-${i}`}
              cx={cx}
              cy={cy}
              r="1.5"
              fill="#0078d4"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={
                shouldReduceMotion || !isVisible
                  ? { opacity: 0.6 }
                  : {
                      opacity: [0.3, 0.8, 0.3],
                      r: [1.5, 2, 1.5],
                    }
              }
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}

        {/* Corner bracket indicators */}
        {[
          { x: 40, y: 40, rotation: 0 },
          { x: 360, y: 40, rotation: 90 },
          { x: 360, y: 360, rotation: 180 },
          { x: 40, y: 360, rotation: 270 },
        ].map((pos, i) => (
          <g key={`bracket-${i}`} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rotation})`}>
            <line x1="0" y1="0" x2="20" y2="0" stroke="#0078d4" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="#0078d4" strokeWidth="1.5" strokeOpacity="0.5" />
          </g>
        ))}

        {/* Small red/green accent dot - status indicator */}
        <motion.circle
          cx="200"
          cy="80"
          r="3"
          fill={scanState === "verified" ? "#00ff88" : "#ff4444"}
          filter="url(#strongGlow)"
          animate={
            shouldReduceMotion || !isVisible
              ? { opacity: 0.5 }
              : {
                  opacity: [0.5, 1, 0.5],
                }
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* HUD readout lines */}
        <line x1="220" y1="200" x2="280" y2="200" stroke="#0078d4" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="220" y1="210" x2="260" y2="210" stroke="#0078d4" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="220" y1="220" x2="270" y2="220" stroke="#0078d4" strokeWidth="1" strokeOpacity="0.3" />
      </svg>

      {/* Micro readouts - top right */}
      <div className="absolute top-4 right-4 text-[9px] font-mono tracking-wider text-[#0078d4]/70 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[#0078d4]/40">ID:</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={`id-${readoutData.id}`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="text-[#00d4ff]"
            >
              {readoutData.id}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#0078d4]/40">SIG:</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={`sig-${readoutData.sig}`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className={
                scanState === "verified"
                  ? "text-[#00ff88]"
                  : scanState === "scanning"
                  ? "text-[#00d4ff]"
                  : "text-[#0078d4]/70"
              }
            >
              {readoutData.sig}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#0078d4]/40">MATCH:</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={`match-${readoutData.match}`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className={scanState === "verified" ? "text-[#00ff88]" : "text-[#00d4ff]"}
            >
              {readoutData.match}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#0078d4]/40">LAT:</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={`latency-${readoutData.latency}`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="text-[#00d4ff]"
            >
              {readoutData.latency}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Text overlay - dynamic state label */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest"
        animate={{
          color:
            scanState === "verified"
              ? "#00ff88"
              : scanState === "scanning"
              ? "#00d4ff"
              : "rgba(0, 120, 212, 0.5)",
        }}
        transition={{ duration: 0.3 }}
      >
        {getStateLabel()}
      </motion.div>
    </motion.div>
  );
}
