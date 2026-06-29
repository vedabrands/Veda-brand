import { getDb } from "../api/queries/connection";
import { faqs, reviews, blogPosts, services, portfolioItems, pricingPlans, siteSettings, teamMembers } from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // Seed FAQs
  const faqData = [
    { question: "What services does Aarav Fashion offer?", answer: "We offer a comprehensive range of branding services including website design, social media marketing, Google SEO, brand identity design, UI/UX design, performance marketing, digital branding, and business growth consultation.", order: 1 },
    { question: "How long does a typical branding project take?", answer: "The timeline varies based on project scope. A basic branding package typically takes 2-4 weeks, while comprehensive brand overhauls can take 6-8 weeks.", order: 2 },
    { question: "What industries do you work with?", answer: "We work with businesses across all industries including fashion, food & beverage, real estate, technology, healthcare, education, e-commerce, and professional services.", order: 3 },
    { question: "Do you offer custom packages?", answer: "Absolutely! We create custom packages tailored to your specific needs, goals, and budget. Contact us for a personalized quote.", order: 4 },
    { question: "What is your revision policy?", answer: "We include unlimited revisions in all our packages because we want you to be 100% satisfied.", order: 5 },
    { question: "How do you measure campaign success?", answer: "We use data-driven analytics to track KPIs relevant to your goals. We provide detailed monthly reports showing progress and results.", order: 6 },
    { question: "Can you help with existing brand refresh?", answer: "Yes! We specialize in brand refreshes. We'll audit your current brand and recommend the best approach.", order: 7 },
    { question: "What makes Aarav Fashion different?", answer: "We combine strategic thinking with creative excellence. 10+ years of experience, 500+ brands, and we focus on measurable results.", order: 8 },
  ];
  await db.insert(faqs).values(faqData);
  console.log("FAQs seeded");

  // Seed Reviews
  const reviewData = [
    { name: "Priya Sharma", title: "CEO, StyleHub India", rating: 5, content: "Aarav Fashion completely transformed our brand identity. The attention to detail and creative approach exceeded our expectations. Our sales increased by 40% within three months!", pinned: true },
    { name: "Rahul Mehta", title: "Founder, TechStart", rating: 5, content: "Working with Aarav was a game-changer for our startup. They understood our vision and delivered a brand that truly represents who we are. Highly recommend!" },
    { name: "Ananya Patel", title: "Marketing Director, Glow Beauty", rating: 5, content: "The social media marketing strategy they created helped us reach over 2 million people. Their team is responsive, creative, and truly cares about results." },
    { name: "Vikram Singh", title: "Owner, Royal Eats", rating: 5, content: "Our restaurant's brand was completely revamped. The new logo, menu design, and social media presence have brought in so many new customers." },
    { name: "Neha Gupta", title: "Founder, FitLife", rating: 4, content: "Excellent service and great communication throughout the project. The website they built for us is stunning and converts really well." },
  ];
  await db.insert(reviews).values(reviewData);
  console.log("Reviews seeded");

  // Seed Blog Posts
  const blogData = [
    { title: "The Power of Branding: Why Your Brand Matters More Than Ever", slug: "power-of-branding", excerpt: "Discover how strategic branding can transform your business.", content: "In today's competitive marketplace, branding is not just about having a catchy logo...", category: "Branding", featured: true },
    { title: "Social Media Growth Strategies That Actually Work in 2026", slug: "social-media-growth", excerpt: "Learn proven tactics to grow your social media presence.", content: "Social media continues to evolve at a rapid pace...", category: "Marketing", featured: true },
    { title: "Top UI/UX Design Trends to Watch in 2026", slug: "ui-ux-trends", excerpt: "Stay ahead with these emerging design trends.", content: "The world of UI/UX design is constantly evolving...", category: "Design" },
    { title: "Complete SEO Guide for Indian Businesses", slug: "seo-guide", excerpt: "A comprehensive guide to improving your search rankings.", content: "Search Engine Optimization remains one of the most cost-effective ways...", category: "SEO" },
  ];
  await db.insert(blogPosts).values(blogData);
  console.log("Blog posts seeded");

  // Seed Services
  const serviceData = [
    { category: "Website", title: "Landing Pages", description: "High-converting single-page websites", icon: "FileText", features: '["Conversion-focused design","A/B testing ready","Mobile-optimized"]', benefits: '["Higher conversions","Better UX","Faster loading"]', process: '["Discovery","Design","Development","Launch"]' },
    { category: "Website", title: "Business Websites", description: "Professional multi-page web presence", icon: "Building", features: '["Custom design","CMS integration","SEO optimized"]', benefits: '["Professional image","Easy updates","Better visibility"]', process: '["Planning","Design","Development","Launch"]' },
    { category: "Website", title: "E-Commerce Websites", description: "Online stores that drive sales", icon: "ShoppingBag", features: '["Payment integration","Inventory management","User accounts"]', benefits: '["More sales","24/7 selling","Global reach"]', process: '["Strategy","Design","Development","Launch"]' },
    { category: "Social Media", title: "Instagram Marketing", description: "Visual storytelling that engages", icon: "Instagram", features: '["Content creation","Story strategy","Reels production"]', benefits: '["More followers","Higher engagement","Brand awareness"]', process: '["Audit","Strategy","Creation","Analysis"]' },
    { category: "SEO", title: "Google Ranking", description: "Climb to the top of search results", icon: "Target", features: '["Keyword research","On-page SEO","Technical SEO"]', benefits: '["More traffic","Better visibility","Higher credibility"]', process: '["Audit","Strategy","Implementation","Monitoring"]' },
    { category: "Branding", title: "Logo Design", description: "Unique logos that represent your brand", icon: "Sparkles", features: '["Multiple concepts","Unlimited revisions","All file formats"]', benefits: '["Brand recognition","Professional image","Memorable identity"]', process: '["Brief","Concepts","Refinement","Delivery"]' },
  ];
  await db.insert(services).values(serviceData);
  console.log("Services seeded");

  // Seed Portfolio Items
  const portfolioData = [
    { title: "Aurora Fashion", category: "Web Design", description: "Luxury fashion e-commerce website", imageUrl: "/images/portfolio-1.jpg", clientName: "Aurora Couture", results: '{"traffic":"+150%","sales":"+85%"}', featured: true },
    { title: "Oak & Earth Restaurant", category: "Branding", description: "Complete brand identity for restaurant", imageUrl: "/images/portfolio-2.jpg", clientName: "Oak & Earth", results: '{"awareness":"+200%","bookings":"+120%"}', featured: true },
    { title: "Skyline Residences", category: "Web Design", description: "Real estate listing platform", imageUrl: "/images/portfolio-3.jpg", clientName: "Skyline Realty", results: '{"leads":"+300%","inquiries":"+180%"}' },
    { title: "Chrono Watches", category: "E-Commerce", description: "Luxury watch e-commerce store", imageUrl: "/images/portfolio-4.jpg", clientName: "Chrono Luxury", results: '{"revenue":"+220%","conversion":"+95%"}' },
    { title: "Hexagon Tech", category: "Branding", description: "Tech startup brand identity", imageUrl: "/images/portfolio-5.jpg", clientName: "Hexagon Inc", results: '{"reach":"+400%","engagement":"+250%"}' },
    { title: "Aurora Beauty", category: "Marketing", description: "Beauty brand social media campaign", imageUrl: "/images/portfolio-6.jpg", clientName: "Aurora Cosmetics", results: '{"followers":"+500K","sales":"+180%"}' },
  ];
  await db.insert(portfolioItems).values(portfolioData);
  console.log("Portfolio items seeded");

  // Seed Pricing Plans
  const pricingData = [
    { title: "Starter", subtitle: "Perfect for small businesses", price: "9999", yearlyPrice: "8999", features: '["Basic Logo Design","Social Media Setup","2 Social Platforms","Monthly 5 Posts","Basic SEO","Email Support"]', highlighted: false },
    { title: "Professional", subtitle: "Most popular choice", price: "24999", yearlyPrice: "22499", features: '["Everything in Starter","Premium Logo + Brand Guidelines","4 Social Platforms","Daily Posts + Stories","Advanced SEO","Google Ads Management","Priority Support","Monthly Reports"]', highlighted: true },
    { title: "Enterprise", subtitle: "For large organizations", price: "0", yearlyPrice: "0", features: '["Everything in Professional","Complete Brand Overhaul","All Social Platforms","Unlimited Content","Dedicated Manager","24/7 Support","Custom Integrations","Strategy Sessions"]', highlighted: false, buttonText: "Contact Us" },
  ];
  await db.insert(pricingPlans).values(pricingData);
  console.log("Pricing plans seeded");

  // Seed Site Settings
  const settingsData = [
    { key: "phone", value: "+91 8368124957" },
    { key: "email", value: "vedabrandssupport@gmail.com" },
    { key: "address", value: "Mumbai, Maharashtra, India" },
    { key: "businessHours", value: "Mon - Sat: 9:00 AM - 7:00 PM" },
    { key: "whatsapp", value: "https://wa.me/918368124957" },
    { key: "heroTitle", value: "We Build Brands That People Remember." },
    { key: "heroSubtitle", value: "Brand Strategy | Website Design | Social Media Marketing | Google SEO | Digital Growth" },
  ];
  await db.insert(siteSettings).values(settingsData);
  console.log("Site settings seeded");

  // Seed Team Members
  const teamData = [
    { name: "Aarav Sharma", role: "Founder & CEO", bio: "Visionary leader with 15+ years in branding", order: 1 },
    { name: "Priya Patel", role: "Creative Director", bio: "Award-winning designer passionate about brand stories", order: 2 },
    { name: "Rohan Mehta", role: "Head of Marketing", bio: "Digital marketing expert driving growth for 500+ brands", order: 3 },
  ];
  await db.insert(teamMembers).values(teamData);
  console.log("Team members seeded");

  console.log("Seeding complete!");
}

seed().catch(console.error);
