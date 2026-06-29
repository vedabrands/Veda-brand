import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const items = [
  { image: "/images/portfolio-1.jpg", title: "Aurora Fashion", category: "Web Design" },
  { image: "/images/portfolio-2.jpg", title: "Oak & Earth Restaurant", category: "Branding" },
  { image: "/images/portfolio-3.jpg", title: "Skyline Residences", category: "Web Design" },
  { image: "/images/portfolio-4.jpg", title: "Chrono Watches", category: "E-Commerce" },
  { image: "/images/portfolio-5.jpg", title: "Hexagon Tech", category: "Branding" },
  { image: "/images/portfolio-6.jpg", title: "Aurora Beauty", category: "Marketing" },
];

export default function PortfolioPreview() {
  const navigate = useNavigate();

  return (
    <section className="section-padding bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1D26] mt-3">Our Work</h2>
            </div>
            <button
              onClick={() => navigate("/portfolio")}
              className="flex items-center gap-2 text-[#4F8CFF] font-medium text-sm hover:gap-3 transition-all"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card overflow-hidden cursor-pointer group"
                onClick={() => navigate("/portfolio")}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <div>
                      <span className="text-xs text-white/80 uppercase tracking-wider">{item.category}</span>
                      <h3 className="text-white font-semibold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
