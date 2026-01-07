import { motion } from "motion/react";
import { useState } from "react";
import { Linkedin, Github, Mail, Terminal, X } from "lucide-react";

export function Footer() {
  const [showTerminal, setShowTerminal] = useState(false);

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/hamzafareed", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/hamzafareed01", label: "GitHub" },
    { icon: Mail, href: "mailto:hamzafareed8k@gmail.com", label: "Email" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="relative border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#0078d4] to-cyan-400 bg-clip-text text-transparent mb-3">
                Hamza Syed
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Building reliable, scalable solutions with modern technologies. 
                Always learning, always growing.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block text-gray-400 hover:text-[#0078d4] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white mb-4">Connect</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl glass hover:border-[#0078d4] transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 hover:text-[#0078d4] transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Hamza Syed. All rights reserved.
            </p>

            {/* Easter Egg - Terminal Icon */}
            <motion.button
              onClick={() => setShowTerminal(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group p-2 rounded-lg hover:bg-white/5 transition-all"
              aria-label="Open terminal"
            >
              <Terminal className="w-4 h-4 text-gray-600 group-hover:text-[#0078d4] transition-colors" />
            </motion.button>
          </div>
        </div>
      </footer>

      {/* Terminal Modal (Easter Egg) */}
      {showTerminal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowTerminal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#1a1d2e] rounded-2xl overflow-hidden border border-[#0078d4]/30 shadow-2xl shadow-[#0078d4]/20"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between bg-[#252836] px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-sm">terminal</span>
              <button
                onClick={() => setShowTerminal(false)}
                className="p-1 rounded hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm">
              <div className="space-y-2">
                <div>
                  <span className="text-[#0078d4]">hamza@portfolio</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-gray-500">$ </span>
                  <span className="text-white">whoami</span>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-300 pl-4"
                >
                  Building the future, one commit at a time. 🚀
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <span className="text-[#0078d4]">hamza@portfolio</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-gray-500">$ </span>
                  <span className="text-white">cat motivation.txt</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-gray-300 pl-4"
                >
                  "Code is like humor. When you have to explain it, it's bad." - Cory House
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="pt-4"
                >
                  <span className="text-[#0078d4]">hamza@portfolio</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-gray-500">$ </span>
                  <span className="text-white">git remote -v</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-gray-300 pl-4"
                >
                  <a
                    href="https://github.com/hamzafareed01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0078d4] hover:underline"
                  >
                    github.com/hamzafareed01
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="pt-4"
                >
                  <span className="text-[#0078d4]">hamza@portfolio</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-gray-500">$ </span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-[#0078d4] ml-1"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
