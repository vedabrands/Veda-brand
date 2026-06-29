import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingConnectButton from "@/components/FloatingConnectButton";
import FloatingBlobs from "@/components/FloatingBlobs";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { question: "What services does Aarav Fashion offer?", answer: "We offer a comprehensive range of branding services including website design, social media marketing, Google SEO, brand identity design, UI/UX design, performance marketing, digital branding, and business growth consultation." },
  { question: "How long does a typical branding project take?", answer: "The timeline varies based on project scope. A basic branding package typically takes 2-4 weeks, while comprehensive brand overhauls can take 6-8 weeks. Website projects usually range from 4-12 weeks depending on complexity." },
  { question: "What industries do you work with?", answer: "We work with businesses across all industries including fashion, food & beverage, real estate, technology, healthcare, education, e-commerce, and professional services. Our diverse experience helps us bring fresh perspectives to every project." },
  { question: "Do you offer custom packages?", answer: "Absolutely! While we have standard packages, we understand every business is unique. We create custom packages tailored to your specific needs, goals, and budget. Contact us for a personalized quote." },
  { question: "What is your revision policy?", answer: "We include unlimited revisions in all our packages because we want you to be 100% satisfied. We work collaboratively throughout the project to ensure the final result exceeds your expectations." },
  { question: "How do you measure campaign success?", answer: "We use data-driven analytics to track key performance indicators (KPIs) relevant to your goals. This includes website traffic, conversion rates, engagement metrics, ROI, and more. We provide detailed monthly reports showing progress and results." },
  { question: "Can you help with existing brand refresh?", answer: "Yes, we specialize in brand refreshes! Whether you need a minor update or a complete rebrand, our team can help modernize your brand while maintaining the equity you've built. We'll audit your current brand and recommend the best approach." },
  { question: "What makes Aarav Fashion different?", answer: "We combine strategic thinking with creative excellence. Our team has 10+ years of experience, we've worked with 500+ brands, and we focus on measurable results. Plus, our personalized approach means you get dedicated attention throughout your project." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FloatingBlobs />

      <main className="relative z-10 pt-24">
        <section className="section-padding">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">FAQ</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A1D26] mt-3 mb-4">Frequently Asked Questions</h1>
                <p className="text-[#6B7280] max-w-xl mx-auto">Find answers to common questions about our services</p>
              </div>
            </ScrollReveal>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <ScrollReveal key={i} delay={i * 0.05}>
                    <div className="glass-card overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="w-full p-5 flex items-center justify-between text-left"
                      >
                        <span className="font-medium text-[#1A1D26] text-sm md:text-base pr-4">{faq.question}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-[#9CA3AF]" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 border-t border-gray-50 pt-4">
                              <p className="text-[#6B7280] text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingConnectButton />
    </div>
  );
}
