import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Image,
  Tag,
  Star,
  HelpCircle,
  Newspaper,
  Mail,
  MessageCircle,
  LogOut,
  Shield,
} from "lucide-react";

const navLinks = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/services", label: "Services", icon: Briefcase },
  { to: "/portfolio", label: "Portfolio", icon: Image },
  { to: "/pricing", label: "Pricing", icon: Tag },
  { to: "/reviews", label: "Reviews", icon: Star },
  { to: "/faq", label: "FAQs", icon: HelpCircle },
  { to: "/blog", label: "Blog", icon: Newspaper },
  { to: "/contact", label: "Contact", icon: Mail },
  { to: "/connect", label: "Connect", icon: MessageCircle },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const isAdminPage = location.pathname.startsWith("/admin");
  if (isAdminPage) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            : "bg-white/50 backdrop-blur-lg"
        }`}
        style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/home"
              className="flex items-center gap-2 text-[#1A1D26] font-semibold text-lg tracking-tight"
            >
              <div className="w-8 h-8 rounded-lg bg-[#4F8CFF] flex items-center justify-center">
                <span className="text-white font-bold text-sm">AF</span>
              </div>
              Aarav Fashion
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-[#1A1D26]" />
              ) : (
                <Menu className="w-5 h-5 text-[#1A1D26]" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center justify-center h-full gap-1 pt-16">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 px-6 py-3 text-[#1A1D26] text-2xl font-medium hover:text-[#4F8CFF] transition-colors duration-200 hover:translate-x-2 transform"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-6 h-6" />
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              {localStorage.getItem("adminToken") && (
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                >
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 px-6 py-3 text-[#4F8CFF] text-2xl font-medium hover:translate-x-2 transform"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="w-6 h-6" />
                    Admin Dashboard
                  </Link>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3, delay: (navLinks.length + 1) * 0.05 }}
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-6 py-3 text-[#EF4444] text-2xl font-medium hover:translate-x-2 transform"
                >
                  <LogOut className="w-6 h-6" />
                  Logout
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
