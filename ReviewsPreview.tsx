import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const reviews = [
  {
    name: "Priya Sharma",
    title: "CEO, StyleHub India",
    rating: 5,
    content: "Aarav Fashion completely transformed our brand identity. The attention to detail and creative approach exceeded our expectations. Our sales increased by 40% within three months!",
    initials: "PS",
    color: "#4F8CFF",
  },
  {
    name: "Rahul Mehta",
    title: "Founder, TechStart",
    rating: 5,
    content: "Working with Aarav was a game-changer for our startup. They understood our vision and delivered a brand that truly represents who we are. Highly recommend!",
    initials: "RM",
    color: "#10B981",
  },
  {
    name: "Ananya Patel",
    title: "Marketing Director, Glow Beauty",
    rating: 5,
    content: "The social media marketing strategy they created helped us reach over 2 million people. Their team is responsive, creative, and truly cares about results.",
    initials: "AP",
    color: "#F59E0B",
  },
];

export default function ReviewsPreview() {
  return (
    <section className="section-padding bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1D26] mt-3">What Our Clients Say</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card p-6 h-full flex flex-col"
              >
                <Quote className="w-8 h-8 text-[#4F8CFF]/20 mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < review.rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-[#6B7280] text-sm leading-relaxed flex-1 mb-6">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1D26]">{review.name}</p>
                    <p className="text-xs text-[#6B7280]">{review.title}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
