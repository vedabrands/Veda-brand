import { Link } from "react-router";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import FloatingBlobs from "@/components/FloatingBlobs";

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden flex items-center justify-center">
      <FloatingBlobs />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center px-4"
      >
        <div className="glass-card p-12 max-w-md mx-auto">
          <h1 className="text-8xl font-extrabold text-[#4F8CFF] mb-4">404</h1>
          <h2 className="text-2xl font-bold text-[#1A1D26] mb-3">Page Not Found</h2>
          <p className="text-[#6B7280] mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/home"
              className="btn-primary flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="glass-button px-6 py-3.5 flex items-center gap-2 text-sm font-medium text-[#1A1D26]"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
