import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Shield, User, UserCircle } from "lucide-react";
import FloatingBlobs from "@/components/FloatingBlobs";

const cards = [
  {
    icon: Shield,
    title: "Admin Dashboard",
    subtitle: "Manage your website",
    button: "Login as Admin",
    color: "#4F8CFF",
    path: "/admin/login",
    delay: 0,
  },
  {
    icon: User,
    title: "User",
    subtitle: "Personalized experience",
    button: "Continue as User",
    color: "#10B981",
    path: "/login/user",
    delay: 0.15,
  },
  {
    icon: UserCircle,
    title: "Guest",
    subtitle: "Quick browse",
    button: "Browse as Guest",
    color: "#F59E0B",
    path: "/login/guest",
    delay: 0.3,
  },
];

export default function EntryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden flex flex-col items-center justify-center px-4">
      <FloatingBlobs />

      {/* Particles overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * -6}s`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-12 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-[#4F8CFF] flex items-center justify-center shadow-lg shadow-[#4F8CFF]/30">
            <span className="text-white font-bold text-xl">AF</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1D26] tracking-tight">
          Aarav Fashion
        </h1>
        <p className="text-[#6B7280] mt-2 text-sm md:text-base">
          Premium Branding Agency
        </p>
      </motion.div>

      {/* Cards */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full max-w-4xl">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: card.delay, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="w-full max-w-[280px] md:w-[280px]"
            >
              <div
                className="glass-card p-8 flex flex-col items-center text-center cursor-pointer h-full"
                onClick={() => navigate(card.path)}
                style={{ minHeight: "320px" }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: card.color }} />
                </motion.div>

                <h3 className="text-xl font-semibold text-[#1A1D26] mb-2">
                  {card.title}
                </h3>
                <p className="text-[#6B7280] text-sm mb-6 flex-1">
                  {card.subtitle}
                </p>

                <button
                  className="w-full py-3 px-6 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                  style={{
                    backgroundColor: card.color,
                    boxShadow: `0 4px 16px ${card.color}40`,
                  }}
                >
                  {card.button}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 mt-12 text-[#9CA3AF] text-xs"
      >
        Choose your access level to continue
      </motion.p>
    </div>
  );
}
