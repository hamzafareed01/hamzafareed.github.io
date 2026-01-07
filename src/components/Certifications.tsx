import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Award, X, ExternalLink } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  relevance: string;
  color: string;
  badgeImage?: string;
  verifyUrl?: string;
}

export function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const certifications: Certification[] = [
    {
      name: "AZ-204: Azure Developer Associate",
      issuer: "Microsoft",
      relevance: "Proves proficiency in developing cloud applications, implementing Azure services, and building scalable serverless solutions.",
      color: "from-blue-500 to-cyan-500",
      badgeImage: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg",
      verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/HamzaSyed/2252DD48BF94ACE4?sharingId=DA64B10CAD0369F4"
    },
    {
      name: "AZ-400: DevOps Engineer Expert",
      issuer: "Microsoft",
      relevance: "Essential for implementing CI/CD pipelines, infrastructure as code, and automated testing strategies. Validates expertise in Azure DevOps tools and practices.",
      color: "from-purple-500 to-pink-500",
      badgeImage: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-expert-badge.svg",
      verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/HamzaSyed/94702B2AE22F9EC1?sharingId=DA64B10CAD0369F4"
    },
    {
      name: "AZ-104: Azure Administrator Associate",
      issuer: "Microsoft",
      relevance: "Validates skills in managing Azure resources, implementing security, and optimizing cloud infrastructure for performance and cost.",
      color: "from-emerald-500 to-teal-500",
      badgeImage: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg",
      verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/HamzaSyed/6CB1F6BCE0417168?sharingId=DA64B10CAD0369F4"
    },
    {
      name: "WordPress Web Developer",
      issuer: "Udemy",
      relevance: "Demonstrates full-stack web development capabilities, theme/plugin customization, and delivering client solutions on the world's leading CMS.",
      color: "from-amber-500 to-orange-500",
      verifyUrl: "https://www.udemy.com/certificate/UC-a3e9c45e-f6db-49bd-b1ee-d9f12b428e6a/"
    }
  ];

  return (
    <>
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Certifications</h2>
            <p className="text-gray-400 text-lg">Industry-recognized credentials validating expertise</p>
          </motion.div>

          <div ref={ref} className="relative overflow-hidden rounded-2xl glass p-8">
            {/* Marquee container */}
            <div className="flex gap-6 overflow-hidden">
              <motion.div
                animate={{
                  x: [0, -1500],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex gap-6 flex-shrink-0"
              >
                {[...certifications, ...certifications].map((cert, index) => (
                  <CertBadge
                    key={index}
                    cert={cert}
                    onClick={() => setSelectedCert(cert)}
                    delay={index * 0.1}
                    isInView={isInView}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Detail Modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg glass rounded-3xl p-8"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className={`h-2 rounded-full bg-gradient-to-r ${selectedCert.color} mb-6`} />
            
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${selectedCert.color}`}>
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl text-white mb-1">{selectedCert.name}</h3>
                <p className="text-[#0078d4]">{selectedCert.issuer}</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-white mb-3">Why it matters</h4>
              <p className="text-gray-400 leading-relaxed">{selectedCert.relevance}</p>
            </div>

            {selectedCert.verifyUrl && (
              <div className="mt-6">
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#0078d4] hover:text-cyan-500 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Verify Credential
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function CertBadge({ cert, onClick, delay, isInView }: {
  cert: Certification;
  onClick: () => void;
  delay: number;
  isInView: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative flex-shrink-0 w-72 rounded-2xl glass p-6 hover:border-[#0078d4] transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
      
      <div className="relative z-10">
        {/* Badge Image or Icon Fallback */}
        <div className="flex items-center justify-center mb-4">
          {cert.badgeImage && !imageError ? (
            <img
              src={cert.badgeImage}
              alt={`${cert.name} badge`}
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(0, 120, 212, 0.3))'
              }}
              onError={() => setImageError(true)}
            />
          ) : cert.issuer === "Udemy" ? (
            <svg
              className="w-16 h-16 md:w-20 md:h-20"
              viewBox="0 0 200 200"
              fill="none"
            >
              <rect width="200" height="200" rx="12" fill="#A435F0"/>
              <path d="M60 80 L60 130 L75 130 L75 95 L90 130 L105 130 L105 80 L90 80 L90 115 L75 80 Z M120 80 L120 130 L150 130 C160 130 165 125 165 115 L165 95 C165 85 160 80 150 80 Z M135 95 L150 95 L150 115 L135 115 Z" fill="white"/>
            </svg>
          ) : (
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${cert.color}`}>
              <Award className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        <h4 className="text-white mb-1">{cert.name}</h4>
        <p className="text-sm text-gray-400">{cert.issuer}</p>
        
        {/* Verify chip on hover */}
        {cert.verifyUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            whileHover={{ opacity: 1, height: 'auto' }}
            className="mt-2 flex items-center gap-1 text-xs text-[#0078d4]"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Verify</span>
          </motion.div>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0078d4] to-cyan-500 rounded-b-2xl"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}