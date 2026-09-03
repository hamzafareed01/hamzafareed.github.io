import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreLoaderProps {
  onComplete: () => void;
  reduceMotion: boolean;
}

/* Terminal palette — inline styles are used throughout because this project
   ships a pre-compiled Tailwind stylesheet; new utility classes generate no CSS. */
const C = {
  shell: "#0f1319",
  chrome: "#171c24",
  line: "#2a313c",
  text: "#c9d1d9",
  bright: "#e6edf3",
  dim: "#6e7681",
  green: "#3fb950",
  blue: "#58a6ff",
  red: "#ff5f57",
  amber: "#febc2e",
};

const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", "Cascadia Code", "JetBrains Mono", Menlo, Consolas, monospace';

type LineKind = "comment" | "command" | "ok" | "done";

const lines: { kind: LineKind; text: string }[] = [
  { kind: "comment", text: "turning code into intuitive design" },
  { kind: "command", text: "deploy --env production" },
  { kind: "ok", text: "orchestrating containerized services" },
  { kind: "ok", text: "configuring cloud infrastructure" },
  { kind: "ok", text: "syncing distributed systems" },
  { kind: "ok", text: "optimizing performance metrics" },
  { kind: "done", text: "deployment successful" },
];

const SEGMENTS = 24;

export default function PreLoader({
  onComplete,
  reduceMotion,
}: PreLoaderProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [skipHover, setSkipHover] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      const skipTimer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 300);
      }, 800);
      return () => clearTimeout(skipTimer);
    }

    let typingTimer: ReturnType<typeof setTimeout>;

    if (currentLine < lines.length) {
      const fullText = lines[currentLine].text;
      let charIndex = 0;

      const typeNextChar = () => {
        if (charIndex <= fullText.length) {
          setTypedText(fullText.substring(0, charIndex));
          charIndex++;
          typingTimer = setTimeout(typeNextChar, 15);
        } else {
          typingTimer = setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
            setTypedText("");
          }, 160);
        }
      };

      typeNextChar();
    }

    return () => clearTimeout(typingTimer);
  }, [currentLine, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 1;
      });
    }, 47);

    return () => clearInterval(progressInterval);
  }, [reduceMotion, onComplete]);

  const filled = Math.round((progress / 100) * SEGMENTS);

  const dot = (color: string) => (
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: color,
        display: "inline-block",
      }}
    />
  );

  const prefix = (kind: LineKind) => {
    if (kind === "comment") return null;
    if (kind === "command")
      return (
        <span style={{ color: C.green, whiteSpace: "nowrap" }}>
          ~ <span style={{ color: C.blue }}>$</span>
        </span>
      );
    if (kind === "ok") return <span style={{ color: C.green }}>✓</span>;
    return <span style={{ color: C.blue }}>→</span>;
  };

  const bodyStyle = (kind: LineKind): React.CSSProperties => {
    if (kind === "comment")
      return { color: C.dim, fontStyle: "italic" };
    if (kind === "done") return { color: C.bright };
    return { color: C.text };
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              width: "100%",
              maxWidth: 580,
              background: C.shell,
              border: `1px solid ${C.line}`,
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 24px 60px -12px rgba(0,0,0,0.8)",
              fontFamily: MONO,
            }}
          >
            {/* Title bar */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                background: C.chrome,
                borderBottom: `1px solid ${C.line}`,
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                {dot(C.red)}
                {dot(C.amber)}
                {dot(C.green)}
              </div>

              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontSize: 12,
                  color: C.dim,
                  pointerEvents: "none",
                }}
              >
                hamza-syed@portfolio — zsh
              </span>

              <button
                onClick={() => {
                  setIsComplete(true);
                  onComplete();
                }}
                onMouseEnter={() => setSkipHover(true)}
                onMouseLeave={() => setSkipHover(false)}
                style={{
                  marginLeft: "auto",
                  position: "relative",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: MONO,
                  fontSize: 12,
                  color: skipHover ? C.text : C.dim,
                  transition: "color 150ms",
                }}
              >
                skip
              </button>
            </div>

            {/* Session */}
            <div style={{ padding: "18px 20px", fontSize: 13, lineHeight: 1.75 }}>
              <div style={{ minHeight: 196 }}>
                {lines.map((line, index) => {
                  if (index > currentLine) return null;
                  const isActive = index === currentLine;
                  const text = isActive ? typedText : line.text;

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                marginBottom: 2,
                      }}
                    >
                      {prefix(line.kind)}
                      <span style={bodyStyle(line.kind)}>
                        {line.kind === "comment" ? `# ${text}` : text}
                      </span>
                      {isActive && !reduceMotion && (
                        <motion.span
                          animate={{ opacity: [1, 1, 0, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            times: [0, 0.5, 0.5, 1],
                          }}
                          style={{
                            display: "inline-block",
                            width: "0.55em",
                            height: "1.05em",
                            background: C.text,
                            transform: "translateY(0.15em)",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: `1px solid ${C.line}`,
                  letterSpacing: "0.04em",
                }}
              >
                <span style={{ color: C.blue }}>
                  {"█".repeat(filled)}
                  <span style={{ color: C.line }}>
                    {"░".repeat(SEGMENTS - filled)}
                  </span>
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    color: C.dim,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(Math.round(progress)).padStart(3, "\u00A0")}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
