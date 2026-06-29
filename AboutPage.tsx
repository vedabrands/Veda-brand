import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingConnectButton from "@/components/FloatingConnectButton";
import FloatingBlobs from "@/components/FloatingBlobs";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Target, Eye, Heart, Award, Calendar, Users, Globe } from "lucide-react";

const stats = [
  { value: 10, suffix: "+", label: "Years Experience", icon: Calendar },
  { value: 500, suffix: "+", label: "Happy Clients", icon: Users },
  { value: 50, suffix: "M+", label: "Reach Generated", icon: Globe },
  { value: 25, suffix: "+", label: "Awards Won", icon: Award },
];

const values = [
  { icon: Target, title: "Our Mission", desc: "To transform businesses into unforgettable brands that stand out in the market.", color: "#4F8CFF" },
  { icon: Eye, title: "Our Vision", desc: "To be India's most trusted branding partner, known for creativity and results.", color: "#8B5CF6" },
  { icon: Heart, title: "Our Values", desc: "Creativity, Integrity, Excellence, and Innovation drive everything we do.", color: "#EC4899" },
];

const timeline = [
  { year: "2015", title: "Founded", desc: "Aarav Fashion started with a vision to transform how brands connect with audiences." },
  { year: "2017", title: "100th Client", desc: "Reached our milestone of 100 happy clients across India." },
  { year: "2019", title: "Digital Expansion", desc: "Launched our digital marketing division to offer full-service solutions." },
  { year: "2021", title: "Award Winning", desc: "Recognized as 'Best Branding Agency' by Industry Leaders Awards." },
  { year: "2023", title: "500+ Brands", desc: "Successfully transformed over 500 brands with measurable results." },
  { year: "2025", title: "Going Global", desc: "Expanding our services to international markets." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FloatingBlobs />

      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">About Us</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A1D26] mt-3 mb-6 leading-tight">
                  Crafting Brands That{" "}
                  <span className="text-[#4F8CFF]">Inspire & Convert</span>
                </h1>
                <p className="text-[#6B7280] leading-relaxed mb-6">
                  Aarav Fashion is a premium branding agency based in Mumbai, India. We specialize in transforming businesses into memorable brands through strategic design, cutting-edge web development, and results-driven digital marketing.
                </p>
                <p className="text-[#6B7280] leading-relaxed">
                  With over a decade of experience and 500+ successful projects, we've helped businesses across industries establish their brand presence, connect with their audience, and achieve sustainable growth.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="glass-card overflow-hidden rounded-3xl">
                  <img
                    src="/images/about-office.jpg"
                    alt="Our Office"
                    className="w-full h-80 md:h-96 object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <ScrollReveal key={stat.label} delay={i * 0.1}>
                    <div className="glass-card p-6 text-center">
                      <Icon className="w-6 h-6 text-[#4F8CFF] mx-auto mb-3" />
                      <p className="text-3xl font-bold text-[#1A1D26]">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-sm text-[#6B7280] mt-1">{stat.label}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission/Vision/Values */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Our DNA</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1D26] mt-3">What Drives Us</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={i * 0.15}>
                    <div className="glass-card p-8 text-center">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: item.color }} />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1A1D26] mb-3">{item.title}</h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-[#F8F9FA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Journey</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1D26] mt-3">Our Story</h2>
            </div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#4F8CFF]/20" />
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="hidden md:block flex-1" />
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#4F8CFF] -translate-x-1/2 mt-2 ring-4 ring-[#4F8CFF]/20" />
                    <div className="ml-10 md:ml-0 flex-1">
                      <div className="glass-card p-5">
                        <span className="text-sm font-bold text-[#4F8CFF]">{item.year}</span>
                        <h3 className="text-lg font-semibold text-[#1A1D26] mt-1 mb-2">{item.title}</h3>
                        <p className="text-sm text-[#6B7280]">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingConnectButton />
    </div>
  );
}
