import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Linkedin, Github, Send, CheckCircle, Phone, MapPin } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use Web3Forms API to send email
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '5f0a7cde-0d03-4519-8114-60acb23ee79e',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Contact from ${formData.name}`,
          from_name: 'Portfolio Contact Form',
          to_email: 'hamzafareed8k@gmail.com',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success("Message sent successfully!");
        
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Failed to send message. Please try emailing directly.");
      console.error('Form submission error:', error);
    }
  };

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/hamzafareed", color: "from-blue-500 to-cyan-500" },
    { icon: Github, label: "GitHub", href: "https://github.com/hamzafareed01", color: "from-purple-500 to-pink-500" },
    { icon: Mail, label: "Email", href: "mailto:hamzafareed8k@gmail.com", color: "from-emerald-500 to-teal-500" },
  ];

  const contactInfo = [
    { icon: Mail, label: "hamzafareed8k@gmail.com", href: "mailto:hamzafareed8k@gmail.com" },
    { icon: Phone, label: "872-568-6819", href: "tel:872-568-6819" },
    { icon: MapPin, label: "Chicago, IL", href: null },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Globe grid effect */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0078d4] to-transparent"
              style={{ top: `${i * 5}%` }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#0078d4] to-transparent"
              style={{ left: `${i * 5}%` }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0078d4] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-4">Let's Build Something Reliable</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Whether you're looking for a developer, have a project in mind, or just want to connect—I'd love to hear from you.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Get in Touch and Connect side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl text-white mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="p-3 rounded-xl bg-[#0078d4]/10 border border-[#0078d4]/30 group-hover:bg-[#0078d4]/20 transition-colors">
                        <info.icon className="w-5 h-5 text-[#0078d4]" />
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {info.label}
                        </a>
                      ) : (
                        <span className="text-gray-300">{info.label}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl text-white mb-6">Connect</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative p-4 rounded-2xl glass hover:border-[#0078d4] transition-all duration-300"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
                      <social.icon className="w-6 h-6 text-gray-400 group-hover:text-[#0078d4] transition-colors relative z-10" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="p-6 rounded-2xl glass border-[#0078d4]/30"
            >
              <p className="text-gray-400 text-sm leading-relaxed">
                <span className="text-[#0078d4]">Open to opportunities:</span> Full-time roles, 
                freelance projects, and collaborations in software engineering, full-stack development, 
                and DevOps. Currently based in Chicago, IL.
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <form onSubmit={handleSubmit} className="relative glass rounded-2xl p-8">
              {isSuccess && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 z-10 bg-[#1a1d2e] rounded-2xl flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="inline-flex p-6 rounded-full bg-[#0078d4]/20 mb-4"
                    >
                      <CheckCircle className="w-16 h-16 text-[#0078d4]" />
                    </motion.div>
                    <h3 className="text-2xl text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">I'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#252836] border border-white/10 text-white placeholder-gray-500 focus:border-[#0078d4] focus:outline-none focus:ring-2 focus:ring-[#0078d4]/20 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#252836] border border-white/10 text-white placeholder-gray-500 focus:border-[#0078d4] focus:outline-none focus:ring-2 focus:ring-[#0078d4]/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-[#252836] border border-white/10 text-white placeholder-gray-500 focus:border-[#0078d4] focus:outline-none focus:ring-2 focus:ring-[#0078d4]/20 transition-all resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full px-8 py-4 bg-[#0078d4] hover:bg-[#0078d4]/90 text-white rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0078d4]/50 hover:shadow-[#0078d4]/70 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}