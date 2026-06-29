import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const tags = ["Brand Strategy", "Website Design", "Social Media Marketing", "Google SEO", "Digital Growth"];

const counters = [
  { value: 500, suffix: "+", label: "Brands Elevated" },
  { value: 50, suffix: "M+", label: "Reach Generated" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden flex items-center pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1D26] leading-[1.05] tracking-tight mb-6"
            >
              We Build Brands That{" "}
              <span className="text-[#4F8CFF]">People Remember.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  className="glass-button px-4 py-2 text-xs font-medium text-[#1A1D26]"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button
                onClick={() => navigate("/contact")}
                className="btn-primary flex items-center gap-2"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/portfolio")}
                className="glass-button px-6 py-3.5 flex items-center gap-2 text-sm font-medium text-[#1A1D26]"
              >
                <Play className="w-4 h-4" />
                View Our Work
              </button>
            </motion.div>

            {/* Counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="glass-card p-5 inline-flex flex-wrap gap-6 md:gap-8"
            >
              {counters.map((counter) => (
                <div key={counter.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-[#1A1D26]">
                    <AnimatedCounter end={counter.value} suffix={counter.suffix} />
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">{counter.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden lg:block relative h-[500px]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-72 h-80 glass-card overflow-hidden"
            >
              <img src="/images/portfolio-1.jpg" alt="" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-24 left-0 w-64 h-72 glass-card overflow-hidden"
            >
              <img src="/images/portfolio-2.jpg" alt="" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 right-12 w-60 h-64 glass-card overflow-hidden"
            >
              <img src="/images/portfolio-3.jpg" alt="" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
