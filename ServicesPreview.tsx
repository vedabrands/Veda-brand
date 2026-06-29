import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Globe, Share2, Search, Palette, Layout, TrendingUp, Monitor, BarChart3, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  { icon: Globe, title: "Website Designing", desc: "Stunning websites that convert visitors into customers", color: "#4F8CFF" },
  { icon: Share2, title: "Social Media Marketing", desc: "Build engaged communities across all platforms", color: "#EC4899" },
  { icon: Search, title: "Google SEO", desc: "Rank higher and get discovered by your audience", color: "#10B981" },
  { icon: Palette, title: "Brand Identity", desc: "Memorable logos and comprehensive brand guidelines", color: "#F59E0B" },
  { icon: Layout, title: "UI/UX Design", desc: "Intuitive interfaces that users love", color: "#8B5CF6" },
  { icon: TrendingUp, title: "Performance Marketing", desc: "Data-driven campaigns that deliver ROI", color: "#06B6D4" },
  { icon: Monitor, title: "Digital Branding", desc: "Consistent brand presence across all channels", color: "#EF4444" },
  { icon: BarChart3, title: "Business Growth", desc: "Strategic consultation for sustainable growth", color: "#84CC16" },
];

export default function ServicesPreview() {
  const navigate = useNavigate();

  return (
    <section className="section-padding bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1D26] mt-3">What We Do</h2>
            <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
              Comprehensive branding solutions for modern businesses
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="glass-card p-6 cursor-pointer h-full group"
                  onClick={() => navigate("/services")}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${service.color}10` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-base font-semibold text-[#1A1D26] mb-2">{service.title}</h3>
                  <p className="text-sm text-[#6B7280] mb-4">{service.desc}</p>
                  <div className="flex items-center gap-1 text-sm font-medium text-[#4F8CFF] opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
