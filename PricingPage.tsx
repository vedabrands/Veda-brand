import { useState } from "react";
import { useNavigate } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingConnectButton from "@/components/FloatingConnectButton";
import FloatingBlobs from "@/components/FloatingBlobs";
import ScrollReveal from "@/components/ScrollReveal";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Starter",
    subtitle: "Perfect for small businesses",
    monthlyPrice: 9999,
    yearlyPrice: 8999,
    highlighted: false,
    features: ["Basic Logo Design", "Social Media Setup", "2 Social Platforms", "Monthly 5 Posts", "Basic SEO", "Email Support"],
    buttonText: "Get Started",
  },
  {
    title: "Professional",
    subtitle: "Most popular choice",
    monthlyPrice: 24999,
    yearlyPrice: 22499,
    highlighted: true,
    features: ["Everything in Starter", "Premium Logo + Brand Guidelines", "4 Social Platforms", "Daily Posts + Stories", "Advanced SEO", "Google Ads Management", "Priority Support", "Monthly Reports"],
    buttonText: "Get Started",
  },
  {
    title: "Enterprise",
    subtitle: "For large organizations",
    monthlyPrice: 0,
    yearlyPrice: 0,
    highlighted: false,
    features: ["Everything in Professional", "Complete Brand Overhaul", "All Social Platforms", "Unlimited Content", "Dedicated Manager", "24/7 Support", "Custom Integrations", "Strategy Sessions"],
    buttonText: "Contact Us",
  },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navigation />
      <FloatingBlobs />

      <main className="relative z-10 pt-24">
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Pricing</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A1D26] mt-3 mb-4">Investment Plans</h1>
                <p className="text-[#6B7280] max-w-xl mx-auto mb-8">Choose the perfect package for your brand</p>

                {/* Toggle */}
                <div className="inline-flex items-center gap-3 glass-card p-1.5">
                  <button
                    onClick={() => setIsYearly(false)}
                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${!isYearly ? "bg-[#4F8CFF] text-white" : "text-[#6B7280]"}`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsYearly(true)}
                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${isYearly ? "bg-[#4F8CFF] text-white" : "text-[#6B7280]"}`}
                  >
                    Yearly <span className="text-xs opacity-80">-10%</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <ScrollReveal key={plan.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className={`glass-card p-8 h-full flex flex-col ${
                      plan.highlighted ? "ring-2 ring-[#4F8CFF] shadow-glow relative" : ""
                    }`}
                  >
                    {plan.highlighted && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4F8CFF] text-white text-xs font-semibold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}

                    <h3 className="text-xl font-semibold text-[#1A1D26]">{plan.title}</h3>
                    <p className="text-sm text-[#6B7280] mt-1">{plan.subtitle}</p>

                    <div className="my-6">
                      {plan.monthlyPrice > 0 ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm text-[#6B7280]">Rs.</span>
                          <span className="text-4xl font-bold text-[#1A1D26]">
                            {(isYearly ? plan.yearlyPrice : plan.monthlyPrice).toLocaleString()}
                          </span>
                          <span className="text-sm text-[#6B7280]">/mo</span>
                        </div>
                      ) : (
                        <span className="text-4xl font-bold text-[#1A1D26]">Custom</span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-[#6B7280]">
                          <Check className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => navigate("/contact")}
                      className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all ${
                        plan.highlighted
                          ? "btn-primary"
                          : "glass-button text-[#1A1D26]"
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </motion.div>
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
