import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingBlobs from "@/components/FloatingBlobs";
import ScrollReveal from "@/components/ScrollReveal";
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ConnectPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navigation />
      <FloatingBlobs />

      <main className="relative z-10 pt-24">
        <section className="section-padding">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Connect</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A1D26] mt-3 mb-4">Let's Connect</h1>
                <p className="text-[#6B7280] max-w-xl mx-auto">Multiple ways to reach us</p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Methods */}
              <ScrollReveal>
                <div className="space-y-4">
                  <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Phone</p>
                      <a href="tel:+918368124957" className="text-lg font-semibold text-[#1A1D26] hover:text-[#4F8CFF] transition-colors">
                        +91 8368124957
                      </a>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Email</p>
                      <a href="mailto:vedabrandssupport@gmail.com" className="text-sm font-semibold text-[#1A1D26] hover:text-[#4F8CFF] transition-colors">
                        vedabrandssupport@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Location</p>
                      <p className="text-[#1A1D26] font-medium">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Business Hours</p>
                      <p className="text-[#1A1D26] font-medium">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/918368124957"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-6 flex items-center gap-4 block hover:shadow-glow transition-shadow border-green-400/20"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">WhatsApp</p>
                      <p className="text-[#1A1D26] font-medium">Chat on WhatsApp</p>
                    </div>
                  </a>

                  <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
                      <Instagram className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Instagram</p>
                      <p className="text-[#9CA3AF] font-medium">Coming Soon</p>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="glass-card overflow-hidden h-48">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160991893!2d72.74109846497266!3d19.08219783906142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(20%)" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps"
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Support Form */}
              <ScrollReveal delay={0.2}>
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold text-[#1A1D26] mb-2">Support Form</h3>
                  <p className="text-sm text-[#6B7280] mb-6">Have a question? Send us a message.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#1A1D26] mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-input"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1A1D26] mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="glass-input"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1A1D26] mb-2">Message</label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="glass-input resize-none"
                        placeholder="How can we help?"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
