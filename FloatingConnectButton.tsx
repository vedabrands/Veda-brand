import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";

export default function FloatingConnectButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full z-50 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 4px 24px rgba(79,140,255,0.25), 0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <MessageCircle className="w-6 h-6 text-[#4F8CFF]" />
        <span className="absolute inset-0 rounded-full animate-ping bg-[#4F8CFF] opacity-20" style={{ animationDuration: "3s" }} />
      </motion.button>

      {/* Connect Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 overflow-y-auto"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9))",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#1A1D26]">Let's Connect</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                  >
                    <X className="w-5 h-5 text-[#1A1D26]" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Phone */}
                  <a
                    href="tel:+918368124957"
                    className="glass-card p-4 flex items-center gap-4 hover:shadow-glow cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Phone</p>
                      <p className="text-[#1A1D26] font-medium">+91 8368124957</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:vedabrandssupport@gmail.com"
                    className="glass-card p-4 flex items-center gap-4 hover:shadow-glow cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Email</p>
                      <p className="text-[#1A1D26] font-medium text-sm">vedabrandssupport@gmail.com</p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="glass-card p-4 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Location</p>
                      <p className="text-[#1A1D26] font-medium text-sm">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="glass-card p-4 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Business Hours</p>
                      <p className="text-[#1A1D26] font-medium text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/918368124957"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-4 flex items-center gap-4 hover:shadow-glow cursor-pointer border-green-400/30"
                  >
                    <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">WhatsApp</p>
                      <p className="text-[#1A1D26] font-medium text-sm">Chat on WhatsApp</p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <div className="glass-card p-4 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Instagram</p>
                      <p className="text-[#9CA3AF] font-medium text-sm">Coming Soon</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary block text-center mt-6 w-full"
                >
                  Send a Message
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
