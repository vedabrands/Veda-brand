import { motion } from "framer-motion";
import { TrendingUp, Users, Lightbulb, Headphones } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const reasons = [
  { icon: TrendingUp, title: "Proven Results", desc: "500+ brands transformed with measurable growth", color: "#4F8CFF" },
  { icon: Users, title: "Expert Team", desc: "Industry veterans with 10+ years experience", color: "#10B981" },
  { icon: Lightbulb, title: "Custom Strategies", desc: "Tailored solutions for every business", color: "#F59E0B" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here when you need us", color: "#8B5CF6" },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1D26] mt-3">Why Choose Aarav Fashion</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card p-6 text-center h-full"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${item.color}10` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1D26] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6B7280]">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
