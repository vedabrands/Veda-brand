import { useParams, Link, useNavigate } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingConnectButton from "@/components/FloatingConnectButton";
import FloatingBlobs from "@/components/FloatingBlobs";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

const posts: Record<string, { title: string; content: string; category: string; image: string; date: string; readTime: string }> = {
  "power-of-branding": {
    title: "The Power of Branding: Why Your Brand Matters More Than Ever",
    content: `In today's competitive marketplace, branding is not just about having a catchy logo or a memorable tagline. It's about creating a comprehensive identity that resonates with your target audience and sets you apart from competitors.

A strong brand builds trust, establishes credibility, and creates emotional connections with customers. When people recognize and trust your brand, they're more likely to choose your products or services over alternatives.

At Aarav Fashion, we believe that every business deserves a brand that truly represents its values and vision. Our approach combines strategic thinking with creative excellence to deliver brands that not only look great but also drive business results.

Key elements of powerful branding include consistent visual identity, clear messaging, authentic storytelling, and delivering on promises. When these elements align, magic happens - customers become advocates, and your business grows organically.`,
    category: "Branding",
    image: "/images/blog-1.jpg",
    date: "Dec 15, 2025",
    readTime: "5 min read",
  },
  "social-media-growth": {
    title: "Social Media Growth Strategies That Actually Work in 2026",
    content: `Social media continues to evolve at a rapid pace. What worked yesterday might not work today. In 2026, successful social media growth requires a strategic, data-driven approach combined with authentic content creation.

The key to social media success is understanding your audience deeply. What content resonates with them? When are they most active? What platforms do they prefer? Answering these questions forms the foundation of an effective strategy.

Consistency is crucial. Regular posting, engaging with followers, and staying true to your brand voice helps build a loyal community. But consistency doesn't mean posting for the sake of it - every piece of content should add value.

Video content continues to dominate across all platforms. Short-form videos, live streaming, and interactive content are powerful tools for engagement. Invest in quality video production to stand out in crowded feeds.`,
    category: "Marketing",
    image: "/images/blog-2.jpg",
    date: "Dec 10, 2025",
    readTime: "7 min read",
  },
  "ui-ux-trends": {
    title: "Top UI/UX Design Trends to Watch in 2026",
    content: `The world of UI/UX design is constantly evolving, with new trends emerging each year. As we move into 2026, several key trends are shaping how designers approach digital experiences.

Glassmorphism and neumorphism continue to influence modern interfaces, creating depth and visual interest while maintaining usability. These design approaches work particularly well when combined with subtle animations and transitions.

Dark mode has become a standard feature rather than an option. Users expect the choice, and designing for both light and dark themes requires careful consideration of contrast, color, and readability.

Micro-interactions add delight to user experiences. From button hover states to loading animations, these small details make a big difference in how users perceive your product.`,
    category: "Design",
    image: "/images/blog-3.jpg",
    date: "Dec 5, 2025",
    readTime: "6 min read",
  },
  "seo-guide": {
    title: "Complete SEO Guide for Indian Businesses",
    content: `Search Engine Optimization remains one of the most cost-effective ways to drive qualified traffic to your website. For Indian businesses, local SEO strategies are particularly important.

Start with thorough keyword research. Understand what your target audience is searching for and create content that answers their questions. Tools like Google Keyword Planner, SEMrush, and Ahrefs can help identify valuable keywords.

On-page optimization includes title tags, meta descriptions, header tags, and content optimization. Every page should target specific keywords while providing genuine value to readers.

Technical SEO ensures search engines can crawl and index your site effectively. Site speed, mobile responsiveness, structured data, and XML sitemaps are foundational elements.`,
    category: "SEO",
    image: "/images/blog-4.jpg",
    date: "Nov 28, 2025",
    readTime: "10 min read",
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? posts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A1D26] mb-4">Article not found</h1>
          <Link to="/blog" className="text-[#4F8CFF] hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FloatingBlobs />

      <main className="relative z-10 pt-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1D26] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <span className="inline-block px-3 py-1 bg-[#4F8CFF]/10 text-[#4F8CFF] text-xs font-medium rounded-full mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1D26] mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[#9CA3AF] mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <div className="glass-card overflow-hidden rounded-2xl mb-8">
            <img src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-[#6B7280] leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
      <FloatingConnectButton />
    </div>
  );
}
