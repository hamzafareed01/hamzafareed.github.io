import { motion, useMotionValue, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, FileText, X, Lock, Info } from "lucide-react";

interface Project {
  title: string;
  outcome: string;
  description: string;
  problem: string;
  approach: string;
  features: string[];
  tech: string[];
  learned: string;
  nextSteps: string[];
  color: string;
  locked?: boolean;
  status?: "In Progress" | "Coming Soon";
  currentStatus?: string;
  dataSources?: string;
  demoLink?: string;
  hideDemo?: boolean;
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Knight Escape Game",
      outcome: "Turn-based strategy game with robust OOP architecture",
      description: "A C++ chess-inspired escape game featuring strategic gameplay and comprehensive unit testing",
      problem: "Design an engaging turn-based game while demonstrating solid software engineering principles and data structure implementation",
      approach: "Built with object-oriented design patterns, utilizing custom data structures for game state management and implementing comprehensive unit tests for reliability",
      features: [
        "Turn-based movement system with strategic AI opponents",
        "Custom data structures for efficient game state tracking",
        "Comprehensive unit test suite ensuring code reliability",
        "Modular architecture for easy feature expansion"
      ],
      tech: ["C++", "OOP", "Data Structures", "Unit Testing", "Algorithms"],
      learned: "Deep dive into memory management, polymorphism, and test-driven development. Learned to balance game complexity with maintainable code architecture.",
      nextSteps: [
        "Implement difficulty levels with adaptive AI",
        "Add replay system for game analysis",
        "Create level editor for custom scenarios"
      ],
      color: "from-purple-500 to-pink-500",
      demoLink: "https://github.com/hamzafareed01/KnightGame-cpp"
    },
    {
      title: "School Management Portal",
      outcome: "Full-featured admin dashboard with payment integration",
      description: "Power Platform solution automating school operations with real-time dashboards and payment processing",
      problem: "School needed centralized system for managing students, staff, and finances with secure payment processing and real-time reporting",
      approach: "Leveraged Power Platform ecosystem with custom Azure Functions for payment processing, creating a low-code solution with enterprise-grade security",
      features: [
        "Real-time dashboards for enrollment and financial metrics",
        "PayPal integration via Azure Functions for tuition payments",
        "Secure data models with role-based access control",
        "Automated notifications for payment confirmations and deadlines"
      ],
      tech: ["Power Platform", "Power Apps", "Azure Functions", "PayPal API", "CDS/Dataverse", "Power BI"],
      learned: "Mastered serverless architecture and learned to bridge low-code platforms with custom integrations. Gained experience in secure payment processing and data compliance.",
      nextSteps: [
        "Add SMS notifications for urgent updates",
        "Implement predictive analytics for enrollment trends",
        "Create mobile app companion"
      ],
      color: "from-blue-500 to-cyan-500",
      hideDemo: true
    },
    {
      title: "Scrolling Platform Game",
      outcome: "Smooth 2D platformer with physics-based gameplay",
      description: "Python-based platformer featuring dynamic scrolling, collision detection, and engaging level design",
      problem: "Create an engaging 2D game demonstrating graphics programming, physics simulation, and maintainable game architecture",
      approach: "Built custom game engine with Pygame, implementing camera systems, collision detection algorithms, and organized code structure with comprehensive documentation",
      features: [
        "Smooth camera scrolling following player movement",
        "Pixel-perfect collision detection system",
        "Multiple level designs with varying difficulty",
        "Well-documented codebase for easy maintenance"
      ],
      tech: ["Python", "Pygame", "Game Physics", "Collision Detection", "Documentation"],
      learned: "Deepened understanding of game loops, state management, and performance optimization. Practiced writing clear documentation for complex systems.",
      nextSteps: [
        "Add enemy AI with pathfinding",
        "Implement power-ups and collectibles",
        "Create level editor with JSON export"
      ],
      color: "from-emerald-500 to-teal-500",
      demoLink: "https://github.com/hamzafareed01/Scrolling-Game-Python"
    },
    {
      title: "Hospital Price Transparency \"Truth Finder\"",
      outcome: "Prototype that validates hospital price transparency files and makes prices easier to compare",
      description: "Data validator and indexer for CMS-mandated hospital pricing files with comparison UI",
      problem: "Hospitals publish machine-readable pricing and shoppable services; it's messy and inconsistent (CMS requirement)",
      approach: "Build a validator and indexer for machine-readable files, then a UI to estimate/compare common services",
      features: [],
      tech: ["React", "API", "Postgres", "GitHub Actions", "Azure"],
      learned: "",
      nextSteps: [
        "Expand coverage to more hospitals",
        "Add compliance checks for CMS requirements",
        "Enhance compare UX with visual improvements"
      ],
      color: "from-orange-500 to-red-500",
      locked: true,
      status: "In Progress",
      currentStatus: "Schema validation prototype, ingestion pipeline, and UI wireframe completed",
      dataSources: "CMS Hospital Price Transparency"
    },
    {
      title: "FinTech \"Complaint Early-Warning Radar\" (CFPB)",
      outcome: "Ingests CFPB complaint data to detect trends and generate risk alerts",
      description: "Real-time consumer complaint monitoring system with trend detection and alerting",
      problem: "Consumer complaints are public data; financial teams need early warning signals for emerging issues",
      approach: "API ingestion → normalization → trend spike detection + topic clustering → configurable alert rules",
      features: [],
      tech: ["React", "API", "Postgres", "GitHub Actions", "Azure"],
      learned: "",
      nextSteps: [
        "Implement NLP clustering for complaint categorization",
        "Add alerting integrations (Slack, email, webhooks)",
        "Build historical trend analysis dashboard"
      ],
      color: "from-yellow-500 to-orange-500",
      locked: true,
      status: "In Progress",
      currentStatus: "Ingestion pipeline skeleton and dashboard layout designed",
      dataSources: "CFPB Consumer Complaint Database API"
    },
    {
      title: "Weather-to-City Ops \"Incident Command Dashboard\" (NWS + 311)",
      outcome: "Combines weather alerts with 311 service requests to support operational decision-making",
      description: "Operational intelligence platform correlating weather events with city service disruptions",
      problem: "Extreme weather events correlate with service disruptions; operations teams need unified visibility",
      approach: "NWS alerts/forecast feed + city 311 requests feed → operations dashboard with correlation analysis",
      features: [],
      tech: ["React", "API", "Postgres", "GitHub Actions", "Azure"],
      learned: "",
      nextSteps: [
        "Build correlation views showing weather impact on services",
        "Create incident timeline with automatic event detection",
        "Implement alert thresholds based on severity and volume"
      ],
      color: "from-cyan-500 to-blue-500",
      locked: true,
      status: "Coming Soon",
      currentStatus: "Planning phase and dataset mapping in progress",
      dataSources: "National Weather Service API + City 311 open data API (Socrata)"
    }
  ];

  return (
    <>
      <section id="projects" className="py-32 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0078d4] rounded-full opacity-10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-gray-400 text-lg">Solving real problems with elegant solutions</p>
          </motion.div>

          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isInView={isInView}
                onViewCaseStudy={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}

function ProjectCard({ project, index, isInView, onViewCaseStudy }: {
  project: Project;
  index: number;
  isInView: boolean;
  onViewCaseStudy: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative overflow-hidden rounded-2xl glass p-6 hover:border-[#0078d4] transition-all duration-300"
    >
      {/* Animated border beam */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color.includes('purple') ? '#a855f7' : project.color.includes('blue') ? '#0078d4' : '#10b981'}, transparent)`,
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Background noise texture */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        {/* Gradient header */}
        <div className={`h-2 rounded-full bg-gradient-to-r ${project.color} mb-6`} />

        {/* Locked badge */}
        {project.locked && (
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-yellow-500" />
            <span className={`px-2 py-1 rounded-full text-xs ${
              project.status === "Coming Soon" 
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
            }`}>
              {project.status}
            </span>
          </div>
        )}

        <h3 className="text-2xl text-white mb-3">{project.title}</h3>
        <p className="text-[#0078d4] mb-4 text-sm">{project.outcome}</p>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.locked ? (
            // Show "Planned stack" for locked projects
            <>
              <span className="text-xs text-gray-500 w-full mb-1">Planned stack:</span>
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#252836]/50 border border-white/5 text-xs text-gray-400"
                >
                  {tech}
                </span>
              ))}
            </>
          ) : (
            // Show regular tech stack for unlocked projects
            <>
              {project.tech.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#252836] border border-white/10 text-xs text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-3 py-1 rounded-full bg-[#252836] border border-white/10 text-xs text-gray-400">
                  +{project.tech.length - 3}
                </span>
              )}
            </>
          )}
        </div>

        {/* Action buttons */}
        {project.locked ? (
          // Locked project buttons
          <div className="space-y-3">
            <motion.button
              onClick={onViewCaseStudy}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 border border-yellow-500/30 hover:border-yellow-500/50 bg-yellow-500/5 text-yellow-200 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
            >
              <Lock className="w-4 h-4" />
              Case Study Locked (In Progress)
            </motion.button>
          </div>
        ) : (
          // Regular project buttons
          <div className="flex gap-3">
            {!project.hideDemo && (
              <motion.a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-2 bg-[#0078d4] hover:bg-[#0078d4]/90 text-white rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </motion.a>
            )}
            <motion.button
              onClick={onViewCaseStudy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-4 py-2 border border-white/10 hover:border-[#0078d4] text-white rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
            >
              <FileText className="w-4 h-4" />
              Case Study
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // If locked, show locked modal with high-level overview
  if (project.locked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl p-8 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Header with locked indicator */}
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-yellow-500" />
            <div>
              <div className={`px-3 py-1 rounded-full text-xs inline-block mb-3 ${
                project.status === "Coming Soon" 
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
              }`}>
                {project.status}
              </div>
            </div>
          </div>

          <div className={`h-2 rounded-full bg-gradient-to-r ${project.color} mb-8`} />
          <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-[#0078d4] mb-4">{project.outcome}</p>
          
          {/* Work in progress banner */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-200 font-medium mb-1">Work in Progress</p>
                <p className="text-yellow-300/80 text-sm">
                  High-level overview only. Full case study will be published upon project completion.
                </p>
              </div>
            </div>
          </div>

          {/* High-level sections */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl text-white mb-3">Problem</h3>
              <p className="text-gray-400 leading-relaxed">{project.problem}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl text-white mb-3">Approach</h3>
              <p className="text-gray-400 leading-relaxed">{project.approach}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl text-white mb-3">Current Status</h3>
              <p className="text-gray-400 leading-relaxed">{project.currentStatus}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl text-white mb-3">Next Steps</h3>
              <ul className="space-y-2">
                {project.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {project.dataSources && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-2xl text-white mb-3">Data Sources</h3>
                <p className="text-gray-400 leading-relaxed">{project.dataSources}</p>
              </motion.div>
            )}

            {/* Planned Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl text-white mb-3">Planned Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-[#0078d4]/10 border border-[#0078d4]/30 text-[#0078d4]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Regular unlocked project modal
  const sections = [
    { title: "Problem", content: project.problem },
    { title: "Approach", content: project.approach },
    { title: "What I Learned", content: project.learned },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl p-8 my-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Header */}
        <div className={`h-2 rounded-full bg-gradient-to-r ${project.color} mb-8`} />
        <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
        <p className="text-[#0078d4] mb-8">{project.outcome}</p>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl text-white mb-3">{section.title}</h3>
              <p className="text-gray-400 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl text-white mb-3">Key Features</h3>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0078d4] mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl text-white mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-[#0078d4]/10 border border-[#0078d4]/30 text-[#0078d4]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl text-white mb-3">Next Steps</h3>
            <ul className="space-y-2">
              {project.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}