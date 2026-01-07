import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faCode, faLaptopCode, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  speed: number; // used for twinkle
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  tail: { x: number; y: number }[];
}

interface IconMeteor {
  id: number;
  icon: any;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
}

interface StarfieldBackgroundProps {
  reduceMotion?: boolean;
}

export function StarfieldBackground({
  reduceMotion = false,
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const starsRef = useRef<Star[]>([]);
  const cometsRef = useRef<Comet[]>([]);
  const viewportRef = useRef({ w: 0, h: 0, dpr: 1 });
  
  const [iconMeteors, setIconMeteors] = useState<IconMeteor[]>([]);
  const meteorIdRef = useRef(0);
  
  const icons = [faCodeBranch, faCode, faLaptopCode, faNetworkWired];
  
  // Spawn icon meteors every ~5 seconds
  useEffect(() => {
    if (reduceMotion) return;
    
    const spawnMeteor = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Spawn 3 meteors at once with different positions and speeds
      const newMeteors: IconMeteor[] = [];
      
      for (let i = 0; i < 3; i++) {
        const side = Math.floor(Math.random() * 2);
        // Vary the starting positions more
        const startX = side === 0 
          ? Math.random() * w 
          : w + 50;
        const startY = side === 0 
          ? -50 
          : Math.random() * h * 0.7; // Increased range for more variety
        
        // Random speed variation between meteors (speed range: 2-8 pixels per frame)
        const speedMultiplier = Math.random() * 2 + 1; // 1x to 3x
        
        const newMeteor: IconMeteor = {
          id: meteorIdRef.current++,
          icon: icons[Math.floor(Math.random() * icons.length)],
          x: startX,
          y: startY,
          vx: -(Math.random() * 4 + 2) * speedMultiplier,
          vy: (Math.random() * 4 + 2) * speedMultiplier,
          rotation: Math.random() * 360,
        };
        
        newMeteors.push(newMeteor);
        
        // Remove after animation completes (adjust time based on speed)
        const animationDuration = 3000 / speedMultiplier;
        setTimeout(() => {
          setIconMeteors(prev => prev.filter(m => m.id !== newMeteor.id));
        }, animationDuration);
      }
      
      setIconMeteors(prev => [...prev, ...newMeteors]);
    };
    
    const interval = setInterval(spawnMeteor, 5000);
    // Spawn immediately
    setTimeout(spawnMeteor, 1000);
    
    return () => clearInterval(interval);
  }, [reduceMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      viewportRef.current = { w, h, dpr };

      // CSS size
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Backing store (HiDPI)
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      // Draw in CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initStars();
    };

    const initStars = () => {
      const { w, h } = viewportRef.current;
      const starCount = Math.min(
        300,
        Math.floor((w * h) / 5000),
      );

      starsRef.current = Array.from(
        { length: starCount },
        () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 4,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 0.05 + 0.01,
        }),
      );

      // reset comets on resize so tails don’t look “cut”
      cometsRef.current = [];
    };

    const createComet = () => {
      if (reduceMotion) return;
      if (Math.random() < 0.995) return; // rare

      const { w, h } = viewportRef.current;

      const side = Math.floor(Math.random() * 2);
      const startX = side === 0 ? Math.random() * w : w + 30;
      const startY = side === 0 ? -30 : Math.random() * h * 0.5;

      cometsRef.current.push({
        x: startX,
        y: startY,
        vx: -(Math.random() * 3 + 2),
        vy: Math.random() * 3 + 2,
        life: 0,
        maxLife: 100,
        tail: [],
      });
    };

    const updateComets = () => {
      const { w, h } = viewportRef.current;

      if (reduceMotion) {
        cometsRef.current = [];
        return;
      }

      cometsRef.current = cometsRef.current.filter((comet) => {
        comet.x += comet.vx;
        comet.y += comet.vy;
        comet.life++;

        comet.tail.push({ x: comet.x, y: comet.y });
        if (comet.tail.length > 20) comet.tail.shift();

        return (
          comet.life < comet.maxLife &&
          comet.x > -80 &&
          comet.y < h + 80
        );
      });
    };

    const drawComets = () => {
      if (reduceMotion) return;

      cometsRef.current.forEach((comet) => {
        // Tail
        ctx.beginPath();
        for (let i = 0; i < comet.tail.length; i++) {
          const t = comet.tail[i];
          const alpha =
            (i / comet.tail.length) *
            0.8 *
            (1 - comet.life / comet.maxLife);

          ctx.strokeStyle = `rgba(0, 120, 212, ${alpha})`;
          ctx.lineWidth = 2;

          if (i === 0) ctx.moveTo(t.x, t.y);
          else ctx.lineTo(t.x, t.y);
        }
        ctx.stroke();

        // Head glow
        const headAlpha = 1 - comet.life / comet.maxLife;
        const gradient = ctx.createRadialGradient(
          comet.x,
          comet.y,
          0,
          comet.x,
          comet.y,
          6,
        );
        gradient.addColorStop(
          0,
          `rgba(0, 120, 212, ${headAlpha})`,
        );
        gradient.addColorStop(1, "rgba(0, 120, 212, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      const { w, h } = viewportRef.current;

      // Background fill (don’t rely on CSS)
      ctx.fillStyle = "#050507";
      ctx.fillRect(0, 0, w, h);

      // Stars
      starsRef.current.forEach((star) => {
        if (!reduceMotion) {
          star.opacity += star.speed;
          if (star.opacity > 1 || star.opacity < 0.3)
            star.speed = -star.speed;
        }

        const a = Math.max(0, Math.min(1, star.opacity));
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Rare azure stars
        if (star.z > 3.5) {
          ctx.fillStyle = `rgba(0, 120, 212, ${a * 0.6})`;
          ctx.beginPath();
          ctx.arc(
            star.x,
            star.y,
            star.size * 1.2,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      });

      // Comets
      createComet();
      updateComets();
      drawComets();

      rafRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "#050507" }}
        aria-hidden="true"
      />
      
      {/* Icon Meteors */}
      {iconMeteors.map((meteor) => {
        const translateX = meteor.vx * 100;
        const translateY = meteor.vy * 100;
        
        return (
          <div
            key={meteor.id}
            className="fixed z-[1] pointer-events-none animate-iconMeteor"
            style={{
              left: `${meteor.x}px`,
              top: `${meteor.y}px`,
              transform: `translate(0, 0) rotate(${meteor.rotation}deg)`,
              transition: 'transform 3s linear, opacity 3s linear',
            }}
            ref={(el) => {
              if (el && !(meteor as any).animated) {
                (meteor as any).animated = true;
                setTimeout(() => {
                  el.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${meteor.rotation}deg)`;
                }, 10);
              }
            }}
          >
            <FontAwesomeIcon
              icon={meteor.icon}
              className="text-white text-2xl"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.6))',
              }}
            />
          </div>
        );
      })}
    </>
  );
}