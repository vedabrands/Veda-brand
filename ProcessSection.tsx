import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  { icon: Search, title: "Discover", desc: "We dive deep into understanding your brand, audience, and goals.", color: "#4F8CFF" },
  { icon: Lightbulb, title: "Strategize", desc: "Craft a tailored roadmap aligned with your business objectives.", color: "#8B5CF6" },
  { icon: Rocket, title: "Create", desc: "Design and develop stunning assets that bring your vision to life.", color: "#10B981" },
  { icon: TrendingUp, title: "Grow", desc: "Launch, monitor, and optimize for continuous growth and success.", color: "#F59E0B" },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1D26] mt-3">Our Process</h2>
            <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
              A proven methodology that delivers results
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.title} delay={i * 0.15}>
                <div className="relative text-center">
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: `${step.color}10` }}
                  >
                    <Icon className="w-9 h-9" style={{ color: step.color }} />
                  </div>
                  <div className="text-4xl font-extrabold text-gray-100 absolute -top-2 left-1/2 -translate-x-1/2 -z-10">
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1D26] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6B7280]">{step.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
