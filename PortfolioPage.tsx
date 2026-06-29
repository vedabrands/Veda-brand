import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingConnectButton from "@/components/FloatingConnectButton";
import FloatingBlobs from "@/components/FloatingBlobs";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const categories = ["All", "Branding", "Web Design", "Marketing", "E-Commerce"];

const items = [
  { id: 1, image: "/images/portfolio-1.jpg", title: "Aurora Fashion", category: "Web Design", client: "Aurora Couture", results: { traffic: "+150%", sales: "+85%" } },
  { id: 2, image: "/images/portfolio-2.jpg", title: "Oak & Earth Restaurant", category: "Branding", client: "Oak & Earth", results: { awareness: "+200%", bookings: "+120%" } },
  { id: 3, image: "/images/portfolio-3.jpg", title: "Skyline Residences", category: "Web Design", client: "Skyline Realty", results: { leads: "+300%", inquiries: "+180%" } },
  { id: 4, image: "/images/portfolio-4.jpg", title: "Chrono Watches", category: "E-Commerce", client: "Chrono Luxury", results: { revenue: "+220%", conversion: "+95%" } },
  { id: 5, image: "/images/portfolio-5.jpg", title: "Hexagon Tech", category: "Branding", client: "Hexagon Inc", results: { reach: "+400%", engagement: "+250%" } },
  { id: 6, image: "/images/portfolio-6.jpg", title: "Aurora Beauty", category: "Marketing", client: "Aurora Cosmetics", results: { followers: "+500K", sales: "+180%" } },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);

  const filtered = activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FloatingBlobs />

      <main className="relative z-10 pt-24">
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Portfolio</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A1D26] mt-3 mb-4">Our Work</h1>
                <p className="text-[#6B7280] max-w-xl mx-auto">Explore our latest projects and see the results we've delivered</p>
              </div>
            </ScrollReveal>

            {/* Filters */}
            <ScrollReveal delay={0.1}>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === cat
                        ? "bg-[#4F8CFF] text-white shadow-lg shadow-[#4F8CFF]/25"
                        : "glass-button text-[#6B7280] hover:text-[#1A1D26]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ScrollReveal delay={i * 0.08}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="glass-card overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                            <div className="flex items-center gap-2 text-white text-sm font-medium">
                              <ExternalLink className="w-4 h-4" />
                              View Project
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <span className="text-xs text-[#4F8CFF] font-medium">{item.category}</span>
                          <h3 className="font-semibold text-[#1A1D26] mt-1">{item.title}</h3>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 overflow-hidden rounded-t-3xl">
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <span className="text-xs text-[#4F8CFF] font-medium">{selectedItem.category}</span>
                <h2 className="text-2xl font-bold text-[#1A1D26] mt-1 mb-2">{selectedItem.title}</h2>
                <p className="text-sm text-[#6B7280] mb-4">Client: {selectedItem.client}</p>
                <h3 className="font-semibold text-[#1A1D26] mb-3">Results</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedItem.results).map(([key, value]) => (
                    <div key={key} className="bg-[#F8F9FA] rounded-xl p-4 text-center">
                      <p className="text-xl font-bold text-[#4F8CFF]">{value}</p>
                      <p className="text-xs text-[#6B7280] capitalize">{key}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingConnectButton />
    </div>
  );
}
