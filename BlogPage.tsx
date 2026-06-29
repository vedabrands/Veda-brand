import { useState } from "react";
import { Link } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingConnectButton from "@/components/FloatingConnectButton";
import FloatingBlobs from "@/components/FloatingBlobs";
import ScrollReveal from "@/components/ScrollReveal";
import { Search, Clock, ArrowRight } from "lucide-react";

const categories = ["All", "Branding", "Marketing", "Design", "SEO", "Business"];

const posts = [
  { slug: "power-of-branding", title: "The Power of Branding: Why Your Brand Matters More Than Ever", excerpt: "Discover how strategic branding can transform your business and create lasting connections with your audience.", category: "Branding", image: "/images/blog-1.jpg", date: "Dec 15, 2025", readTime: "5 min read" },
  { slug: "social-media-growth", title: "Social Media Growth Strategies That Actually Work in 2026", excerpt: "Learn proven tactics to grow your social media presence and engage your audience effectively.", category: "Marketing", image: "/images/blog-2.jpg", date: "Dec 10, 2025", readTime: "7 min read" },
  { slug: "ui-ux-trends", title: "Top UI/UX Design Trends to Watch in 2026", excerpt: "Stay ahead of the curve with these emerging design trends that are shaping the digital landscape.", category: "Design", image: "/images/blog-3.jpg", date: "Dec 5, 2025", readTime: "6 min read" },
  { slug: "seo-guide", title: "Complete SEO Guide for Indian Businesses", excerpt: "A comprehensive guide to improving your search rankings and driving organic traffic to your website.", category: "SEO", image: "/images/blog-4.jpg", date: "Nov 28, 2025", readTime: "10 min read" },
  { slug: "brand-strategy", title: "Building a Brand Strategy from Scratch", excerpt: "A step-by-step approach to creating a brand strategy that aligns with your business goals.", category: "Branding", image: "/images/blog-1.jpg", date: "Nov 20, 2025", readTime: "8 min read" },
  { slug: "digital-marketing-roi", title: "Maximizing ROI from Digital Marketing Campaigns", excerpt: "Learn how to measure and optimize your digital marketing efforts for maximum return on investment.", category: "Marketing", image: "/images/blog-2.jpg", date: "Nov 15, 2025", readTime: "6 min read" },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = posts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navigation />
      <FloatingBlobs />

      <main className="relative z-10 pt-24">
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Blog</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A1D26] mt-3 mb-4">Latest Insights</h1>
                <p className="text-[#6B7280] max-w-xl mx-auto">Stay updated with the latest trends and strategies</p>
              </div>
            </ScrollReveal>

            {/* Search & Filter */}
            <ScrollReveal delay={0.1}>
              <div className="max-w-2xl mx-auto mb-10">
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="glass-input pl-12"
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat
                          ? "bg-[#4F8CFF] text-white"
                          : "glass-button text-[#6B7280]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.08}>
                  <Link to={`/blog/${post.slug}`} className="glass-card overflow-hidden block group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-block px-3 py-1 bg-[#4F8CFF]/10 text-[#4F8CFF] text-xs font-medium rounded-full mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-semibold text-[#1A1D26] mb-2 line-clamp-2 group-hover:text-[#4F8CFF] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-[#9CA3AF]">No articles found</div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingConnectButton />
    </div>
  );
}
