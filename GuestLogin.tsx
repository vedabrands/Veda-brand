import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { UserCircle, ArrowLeft } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";
import FloatingBlobs from "@/components/FloatingBlobs";

export default function GuestLogin() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const register = trpc.customAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("userToken", data.token);
      toast.success(`Welcome, ${data.name}!`);
      navigate("/home");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter your name");
      return;
    }
    register.mutate({ name, role: "guest" });
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
            <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center">
              <UserCircle className="w-7 h-7 text-[#F59E0B]" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#1A1D26] text-center mb-2">
            Quick Access
          </h1>
          <p className="text-[#6B7280] text-sm text-center mb-8">
            Just your name to get started
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
                placeholder="Enter your name"
                className="glass-input"
              />
            </div>

            <button
              type="submit"
              disabled={register.isPending}
              className="w-full py-3.5 px-6 rounded-2xl font-semibold text-sm text-white transition-all duration-200 hover:shadow-lg active:scale-[0.98] flex items-center justify-center"
              style={{
                backgroundColor: "#F59E0B",
                boxShadow: "0 4px 16px rgba(245,158,11,0.3)",
              }}
            >
              {register.isPending ? "Please wait..." : "Start Browsing"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
