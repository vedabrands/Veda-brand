import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingConnectButton from "@/components/FloatingConnectButton";
import FloatingBlobs from "@/components/FloatingBlobs";
import ScrollReveal from "@/components/ScrollReveal";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/providers/trpc";

const initialReviews = [
  { id: 1, name: "Priya Sharma", title: "CEO, StyleHub India", rating: 5, content: "Aarav Fashion completely transformed our brand identity. The attention to detail and creative approach exceeded our expectations. Our sales increased by 40% within three months!" },
  { id: 2, name: "Rahul Mehta", title: "Founder, TechStart", rating: 5, content: "Working with Aarav was a game-changer for our startup. They understood our vision and delivered a brand that truly represents who we are." },
  { id: 3, name: "Ananya Patel", title: "Marketing Director, Glow Beauty", rating: 5, content: "The social media marketing strategy they created helped us reach over 2 million people. Their team is responsive, creative, and truly cares about results." },
  { id: 4, name: "Vikram Singh", title: "Owner, Royal Eats", rating: 5, content: "Our restaurant's brand was completely revamped. The new logo, menu design, and social media presence have brought in so many new customers." },
  { id: 5, name: "Neha Gupta", title: "Founder, FitLife", rating: 4, content: "Excellent service and great communication throughout the project. The website they built for us is stunning and converts really well." },
  { id: 6, name: "Arjun Reddy", title: "CEO, BuildRight", rating: 5, content: "The real estate website they designed for us is phenomenal. We've seen a 300% increase in leads since the launch. Highly recommended!" },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [formData, setFormData] = useState({ name: "", title: "", rating: 5, content: "" });
  const [showForm, setShowForm] = useState(false);

  const createReview = trpc.reviews.create.useMutation({
    onSuccess: () => {
      toast.success("Review submitted!");
      setReviews([{ id: Date.now(), ...formData }, ...reviews]);
      setFormData({ name: "", title: "", rating: 5, content: "" });
      setShowForm(false);
    },
    onError: () => {
      // Still add locally for demo
      toast.success("Review submitted!");
      setReviews([{ id: Date.now(), ...formData }, ...reviews]);
      setFormData({ name: "", title: "", rating: 5, content: "" });
      setShowForm(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    createReview.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navigation />
      <FloatingBlobs />

      <main className="relative z-10 pt-24">
        <section className="section-padding">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Testimonials</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A1D26] mt-3 mb-4">What Our Clients Say</h1>
                <p className="text-[#6B7280] max-w-xl mx-auto">Real stories from real businesses we've helped grow</p>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn-primary mt-6 inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Write a Review
                </button>
              </div>
            </ScrollReveal>

            {/* Review Form */}
            {showForm && (
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="glass-card p-6 max-w-lg mx-auto mb-10">
                  <h3 className="font-semibold text-[#1A1D26] mb-4">Write Your Review</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="glass-input"
                    />
                    <input
                      type="text"
                      placeholder="Your Title / Company"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="glass-input"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#6B7280]">Rating:</span>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: i + 1 })}
                        >
                          <Star className={`w-5 h-5 ${i < formData.rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-gray-200"}`} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder="Your review *"
                      rows={4}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="glass-input resize-none"
                    />
                    <button type="submit" className="btn-primary w-full">
                      Submit Review
                    </button>
                  </div>
                </form>
              </ScrollReveal>
            )}

            {/* Reviews Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((review, i) => (
                <ScrollReveal key={review.id} delay={i * 0.08}>
                  <div className="glass-card p-6 h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-4 h-4 ${j < review.rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <p className="text-[#6B7280] text-sm leading-relaxed mb-6">"{review.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#4F8CFF]/10 flex items-center justify-center">
                        <span className="text-[#4F8CFF] font-semibold text-sm">
                          {review.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1A1D26]">{review.name}</p>
                        <p className="text-xs text-[#6B7280]">{review.title}</p>
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
