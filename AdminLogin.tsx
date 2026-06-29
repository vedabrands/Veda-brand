import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";
import FloatingBlobs from "@/components/FloatingBlobs";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const adminLogin = trpc.customAuth.adminLogin.useMutation({
    onSuccess: (data) => {
      if (data.success && data.token) {
        localStorage.setItem("adminToken", data.token);
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials");
        toast.error("Invalid credentials");
      }
    },
    onError: () => {
      setError("Login failed");
      toast.error("Login failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    adminLogin.mutate({ email, password });
  };

  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden flex items-center justify-center px-4">
      <FloatingBlobs />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1D26] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <div className="glass-card p-8 md:p-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#4F8CFF]/10 flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#4F8CFF]" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#1A1D26] text-center mb-2">
            Admin Login
          </h1>
          <p className="text-[#6B7280] text-sm text-center mb-8">
            Secure access to your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1A1D26] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aaravfashion.com"
                className="glass-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1D26] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="glass-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#EF4444] text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={adminLogin.isPending}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {adminLogin.isPending ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
