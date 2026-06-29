import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0">
        <div
          className="floating-blob w-[400px] h-[400px]"
          style={{
            background: "radial-gradient(circle, rgba(79,140,255,0.3) 0%, transparent 70%)",
            top: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1A1D26] mb-6">
            Ready to Grow Your Brand?
          </h2>
          <p className="text-lg text-[#6B7280] mb-10 max-w-2xl mx-auto">
            Let's create something amazing together. Book a free consultation and discover how we can transform your business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/contact")}
              className="btn-primary flex items-center gap-2 text-base px-8 py-4"
            >
              Book a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <a
              href="tel:+918368124957"
              className="glass-button flex items-center gap-2 px-8 py-4 text-base font-medium text-[#1A1D26]"
            >
              <Phone className="w-5 h-5 text-[#4F8CFF]" />
              Call Us Now
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
