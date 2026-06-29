import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingConnectButton from "@/components/FloatingConnectButton";
import FloatingBlobs from "@/components/FloatingBlobs";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Share2, Search, Palette, Layout, TrendingUp, Monitor, BarChart3,
  ChevronDown, Check, ArrowRight, Code, ShoppingBag, FileText,
  Instagram, Twitter, MessageCircle, Facebook, Linkedin, Youtube,
  Layers, Sparkles, Target, Megaphone, Lightbulb, Handshake
} from "lucide-react";
import { useNavigate } from "react-router";

interface ServiceCategory {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  subservices: { icon: React.ElementType; title: string; desc: string; features: string[] }[];
}

const serviceCategories: ServiceCategory[] = [
  {
    icon: Globe,
    title: "Website Designing",
    desc: "Beautiful, functional websites that drive conversions",
    color: "#4F8CFF",
    subservices: [
      { icon: FileText, title: "Landing Pages", desc: "High-converting single-page websites", features: ["Conversion-focused design", "A/B testing ready", "Mobile-optimized", "Fast loading"] },
      { icon: Building, title: "Business Websites", desc: "Professional multi-page web presence", features: ["Custom design", "CMS integration", "SEO optimized", "Analytics setup"] },
      { icon: ShoppingBag, title: "E-Commerce Websites", desc: "Online stores that drive sales", features: ["Payment integration", "Inventory management", "User accounts", "Order tracking"] },
      { icon: Layers, title: "Portfolio Websites", desc: "Showcase your work beautifully", features: ["Gallery layouts", "Case study templates", "Contact forms", "Social integration"] },
    ],
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Build engaged communities across platforms",
    color: "#EC4899",
    subservices: [
      { icon: Instagram, title: "Instagram Marketing", desc: "Visual storytelling that engages", features: ["Content creation", "Story strategy", "Reels production", "Growth hacking"] },
      { icon: Twitter, title: "X Marketing", desc: "Real-time engagement and brand voice", features: ["Tweet strategy", "Thread creation", "Community building", "Trend leveraging"] },
      { icon: MessageCircle, title: "Telegram Marketing", desc: "Direct community engagement", features: ["Channel management", "Bot integration", "Community building", "Broadcast messaging"] },
      { icon: Facebook, title: "Facebook Marketing", desc: "Targeted reach and engagement", features: ["Page management", "Ad campaigns", "Group strategy", "Analytics"] },
      { icon: Linkedin, title: "LinkedIn Marketing", desc: "B2B professional networking", features: ["Profile optimization", "Content strategy", "Lead generation", "Company pages"] },
      { icon: Youtube, title: "YouTube Marketing", desc: "Video content that converts", features: ["Channel strategy", "Video SEO", "Thumbnail design", "Analytics"] },
    ],
  },
  {
    icon: Search,
    title: "Google SEO",
    desc: "Rank higher and get discovered",
    color: "#10B981",
    subservices: [
      { icon: Target, title: "Google Ranking", desc: "Climb to the top of search results", features: ["Keyword research", "On-page SEO", "Technical SEO", "Link building"] },
      { icon: FileText, title: "On-Page SEO", desc: "Optimize every page element", features: ["Meta optimization", "Content structure", "Internal linking", "Schema markup"] },
      { icon: Code, title: "Technical SEO", desc: "Flawless technical foundation", features: ["Site speed", "Mobile optimization", "Crawlability", "Index management"] },
      { icon: Lightbulb, title: "Content Strategy", desc: "Content that ranks and converts", features: ["Topic research", "Content calendar", "Blog writing", "Content audits"] },
    ],
  },
  {
    icon: Palette,
    title: "Brand Identity",
    desc: "Memorable brands that stand out",
    color: "#F59E0B",
    subservices: [
      { icon: Sparkles, title: "Logo Design", desc: "Unique logos that represent your brand", features: ["Multiple concepts", "Unlimited revisions", "All file formats", "Brand guidelines"] },
      { icon: FileText, title: "Brand Guidelines", desc: "Complete brand rulebook", features: ["Color palette", "Typography", "Usage rules", "Asset library"] },
      { icon: Palette, title: "Color Palette", desc: "Colors that evoke emotions", features: ["Psychology-based", "Accessibility tested", "Print & digital", "Variations"] },
      { icon: FileText, title: "Typography", desc: "Fonts that speak your brand", features: ["Font pairing", "Hierarchy system", "Web fonts", "Style guide"] },
    ],
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    desc: "Intuitive interfaces users love",
    color: "#8B5CF6",
    subservices: [
      { icon: Layout, title: "Wireframing", desc: "Blueprint for success", features: ["Low-fi sketches", "Hi-fi wireframes", "Interactive prototypes", "User flows"] },
      { icon: Layers, title: "Prototyping", desc: "Test before you build", features: ["Clickable prototypes", "Micro-interactions", "Animations", "User testing"] },
      { icon: Users, title: "User Research", desc: "Know your audience", features: ["Surveys", "Interviews", "Personas", "Journey mapping"] },
      { icon: Target, title: "Usability Testing", desc: "Validate your design", features: ["A/B testing", "Heatmaps", "Session recording", "Feedback analysis"] },
    ],
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    desc: "Data-driven campaigns with ROI",
    color: "#06B6D4",
    subservices: [
      { icon: Megaphone, title: "PPC Campaigns", desc: "Pay-per-click that performs", features: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Budget optimization"] },
      { icon: Target, title: "Conversion Optimization", desc: "Turn visitors into customers", features: ["Funnel analysis", "Landing page optimization", "CTA testing", "Form optimization"] },
      { icon: BarChart3, title: "Analytics", desc: "Data that drives decisions", features: ["Custom dashboards", "KPI tracking", "Attribution modeling", "Reporting"] },
      { icon: Layers, title: "A/B Testing", desc: "Prove what works best", features: ["Hypothesis creation", "Test design", "Statistical analysis", "Implementation"] },
    ],
  },
  {
    icon: Monitor,
    title: "Digital Branding",
    desc: "Consistent presence everywhere",
    color: "#EF4444",
    subservices: [
      { icon: Globe, title: "Online Presence", desc: "Be found everywhere", features: ["Directory listings", "Google Business", "Social profiles", "Review management"] },
      { icon: MessageCircle, title: "Reputation Management", desc: "Protect and enhance", features: ["Review monitoring", "Response strategy", "Crisis management", "Brand sentiment"] },
      { icon: FileText, title: "Content Marketing", desc: "Content that converts", features: ["Blog strategy", "Video content", "Infographics", "Email marketing"] },
    ],
  },
  {
    icon: Handshake,
    title: "Business Growth",
    desc: "Strategic growth consulting",
    color: "#84CC16",
    subservices: [
      { icon: Lightbulb, title: "Strategy", desc: "Roadmap to success", features: ["Market analysis", "Competitive research", "Growth planning", "KPI setting"] },
      { icon: Target, title: "Market Analysis", desc: "Know your market", features: ["Industry trends", "Competitor analysis", "Opportunity mapping", "Risk assessment"] },
      { icon: TrendingUp, title: "Growth Planning", desc: "Scale your business", features: ["Revenue modeling", "Channel strategy", "Partnership planning", "Expansion roadmap"] },
    ],
  },
];

// Helper icon component
function Building(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 22V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v20"/><path d="M6 8h12"/><path d="M6 12h12"/><path d="M6 16h12"/></svg>;
}

export default function ServicesPage() {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FloatingBlobs />

      <main className="relative z-10 pt-24">
        {/* Header */}
        <section className="section-padding pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Services</span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1A1D26] mt-3 mb-4">
                What We <span className="text-[#4F8CFF]">Do</span>
              </h1>
              <p className="text-[#6B7280] max-w-2xl mx-auto">
                Comprehensive branding solutions tailored for modern businesses
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Services Accordion */}
        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {serviceCategories.map((category, i) => {
              const Icon = category.icon;
              const isExpanded = expandedCategory === category.title;
              return (
                <ScrollReveal key={category.title} delay={i * 0.05}>
                  <div className="glass-card overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.title)}
                      className="w-full p-6 flex items-center gap-4 text-left"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${category.color}10` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: category.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#1A1D26]">{category.title}</h3>
                        <p className="text-sm text-[#6B7280]">{category.desc}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-[#9CA3AF]" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-gray-50">
                            <div className="grid sm:grid-cols-2 gap-4 mt-4">
                              {category.subservices.map((sub) => {
                                const SubIcon = sub.icon;
                                return (
                                  <div key={sub.title} className="p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                                    <div className="flex items-center gap-3 mb-3">
                                      <SubIcon className="w-5 h-5" style={{ color: category.color }} />
                                      <h4 className="font-medium text-[#1A1D26] text-sm">{sub.title}</h4>
                                    </div>
                                    <p className="text-xs text-[#6B7280] mb-3">{sub.desc}</p>
                                    <ul className="space-y-1.5">
                                      {sub.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-xs text-[#6B7280]">
                                          <Check className="w-3 h-3 text-[#10B981]" />
                                          {f}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                            <button
                              onClick={() => navigate("/contact")}
                              className="mt-4 text-sm font-medium text-[#4F8CFF] flex items-center gap-1 hover:gap-2 transition-all"
                            >
                              Get a Quote <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingConnectButton />
    </div>
  );
}
