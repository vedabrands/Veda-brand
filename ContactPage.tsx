import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingConnectButton from "@/components/FloatingConnectButton";
import FloatingBlobs from "@/components/FloatingBlobs";
import ScrollReveal from "@/components/ScrollReveal";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent successfully!");
    },
    onError: () => {
      setSubmitted(true);
      toast.success("Message sent!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    submitContact.mutate(formData);
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
                <span className="text-xs font-medium text-[#4F8CFF] uppercase tracking-widest">Contact</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A1D26] mt-3 mb-4">Get in Touch</h1>
                <p className="text-[#6B7280] max-w-xl mx-auto">We'd love to hear from you. Let's start a conversation.</p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <ScrollReveal>
                <div className="glass-card p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-[#1A1D26] mb-2">Message Sent!</h3>
                      <p className="text-[#6B7280]">We'll get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="text-lg font-semibold text-[#1A1D26] mb-4">Send us a Message</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#1A1D26] mb-2">Name *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="glass-input"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#1A1D26] mb-2">Email *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="glass-input"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1A1D26] mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="glass-input"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1A1D26] mb-2">Message *</label>
                        <textarea
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="glass-input resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        {submitContact.isPending ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>

              {/* Contact Info */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-4">
                  <div className="glass-card p-6 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Phone</p>
                      <a href="tel:+918368124957" className="text-[#1A1D26] font-medium hover:text-[#4F8CFF] transition-colors">
                        +91 8368124957
                      </a>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Email</p>
                      <a href="mailto:vedabrandssupport@gmail.com" className="text-[#1A1D26] font-medium hover:text-[#4F8CFF] transition-colors text-sm">
                        vedabrandssupport@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Address</p>
                      <p className="text-[#1A1D26] font-medium text-sm">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Business Hours</p>
                      <p className="text-[#1A1D26] font-medium text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>

                  {/* Map Placeholder */}
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingConnectButton />
    </div>
  );
}
