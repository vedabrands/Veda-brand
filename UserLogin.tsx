import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { User, ArrowLeft } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";
import FloatingBlobs from "@/components/FloatingBlobs";

export default function UserLogin() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const register = trpc.customAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("userToken", data.token);
      toast.success(`Welcome, ${data.name}!`);
      navigate("/home");
    },
    onError: () => {
      toast.error("Registration failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please fill in all fields");
      return;
    }
    register.mutate({ name, email, role: "user" });
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
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1D26] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <div className="glass-card p-8 md:p-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 flex items-center justify-center">
              <User className="w-7 h-7 text-[#10B981]" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#1A1D26] text-center mb-2">
            Welcome!
          </h1>
          <p className="text-[#6B7280] text-sm text-center mb-8">
            Enter your details to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1A1D26] mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="glass-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1D26] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="glass-input"
              />
            </div>

            <button
              type="submit"
              disabled={register.isPending}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {register.isPending ? "Please wait..." : "Continue"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
