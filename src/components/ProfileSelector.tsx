import { motion } from "motion/react";
import { Briefcase, Code, Cloud, Settings } from "lucide-react";
import profileImage from "figma:asset/4eb8688c5fe2d08bcad03c5ad6b36c1b479df620.png";

interface ProfileSelectorProps {
  onSelectProfile: (mode: 'recruiter' | 'engineering' | 'devops') => void;
  onSkip: () => void;
  reduceMotion: boolean;
  onToggleReduceMotion: () => void;
}

export function ProfileSelector({ onSelectProfile, onSkip, reduceMotion, onToggleReduceMotion }: ProfileSelectorProps) {
  const profiles = [
    {
      id: 'recruiter' as const,
      title: 'Recruiter Mode',
      subtitle: 'Quick Overview',
      description: 'Fast-paced highlights, key achievements, and impact metrics',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'engineering' as const,
      title: 'DevOps + Engineering',
      subtitle: 'Deep Dive',
      description: 'Projects, code samples, technical implementations, and architecture',
      icon: Code,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'devops' as const,
      title: 'Visitor Mode',
      subtitle: 'Overview',
      description: 'Professional overview with experience, education, and certifications',
      icon: Cloud,
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050507] overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0078d4] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src={profileImage} 
              alt="Hamza Syed"
              className="w-20 h-20 rounded-full border-2 border-[#0078d4] shadow-lg shadow-[#0078d4]/50"
            />
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Who's viewing?
              </h1>
              <p className="text-gray-400 mt-1">Choose your experience</p>
            </div>
          </div>
        </motion.div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {profiles.map((profile, index) => (
            <motion.button
              key={profile.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: reduceMotion ? 1 : 1.05, y: reduceMotion ? 0 : -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectProfile(profile.id)}
              className="group relative overflow-hidden rounded-3xl p-8 text-left transition-all duration-300 glass hover:border-[#0078d4]"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${profile.color} mb-6 relative`}>
                <profile.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-2">{profile.title}</h3>
                <p className="text-[#0078d4] mb-4">{profile.subtitle}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{profile.description}</p>
              </div>

              {/* Hover indicator */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0078d4] to-cyan-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Bottom Controls */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-8 text-sm"
        >
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-white transition-colors underline"
          >
            Skip animation
          </button>
          <button
            onClick={onToggleReduceMotion}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
            {reduceMotion ? 'Enable animations' : 'Reduce motion'}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}