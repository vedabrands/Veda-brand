import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Star,
  Newspaper,
  Settings,
  LogOut,
  TrendingUp,
  Eye,
  UserCheck,
  UserCircle,
  MessageSquare,
  Briefcase,
  Image,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Save,
  Trash2,
  Pin,
} from "lucide-react";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "contacts", label: "Contacts", icon: Mail },
  { id: "blog", label: "Blog Posts", icon: Newspaper },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Check admin auth
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-30 bg-white border-r border-gray-100 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-[#4F8CFF] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">AF</span>
          </div>
          {isSidebarOpen && (
            <span className="font-semibold text-[#1A1D26] text-sm">Admin Panel</span>
          )}
        </div>

        <nav className="p-2 space-y-1 mt-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-[#4F8CFF]/10 text-[#4F8CFF]"
                    : "text-[#6B7280] hover:bg-gray-50 hover:text-[#1A1D26]"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-2 right-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#EF4444] hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && <DashboardTab key="dashboard" />}
            {activeTab === "users" && <UsersTab key="users" />}
            {activeTab === "reviews" && <ReviewsTab key="reviews" />}
            {activeTab === "contacts" && <ContactsTab key="contacts" />}
            {activeTab === "blog" && <BlogTab key="blog" />}
            {activeTab === "settings" && <SettingsTab key="settings" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* Dashboard Overview Tab */
function DashboardTab() {
  const { data: visitorCounts } = trpc.analytics.getVisitorCounts.useQuery();
  const { data: siteUsers } = trpc.customAuth.getSiteUsers.useQuery();
  const { data: reviewsData } = trpc.reviews.list.useQuery({ limit: 1 });
  const { data: contactsData } = trpc.contact.list.useQuery({ limit: 1 });

  const stats = [
    { label: "Today's Visitors", value: visitorCounts?.today || 0, icon: Eye, color: "#4F8CFF" },
    { label: "Total Users", value: siteUsers?.filter((u) => u.role === "user").length || 0, icon: UserCheck, color: "#10B981" },
    { label: "Total Guests", value: siteUsers?.filter((u) => u.role === "guest").length || 0, icon: UserCircle, color: "#F59E0B" },
    { label: "Reviews", value: reviewsData?.total || 0, icon: Star, color: "#8B5CF6" },
    { label: "Messages", value: contactsData?.total || 0, icon: MessageSquare, color: "#EC4899" },
    { label: "Total Visitors", value: visitorCounts?.total || 0, icon: TrendingUp, color: "#06B6D4" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-2xl font-bold text-[#1A1D26] mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}10` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1D26] mb-1">{stat.value}</p>
              <p className="text-sm text-[#6B7280]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1A1D26] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Manage Users", icon: Users, tab: "users" },
            { label: "View Reviews", icon: Star, tab: "reviews" },
            { label: "Contact Messages", icon: Mail, tab: "contacts" },
            { label: "Site Settings", icon: Settings, tab: "settings" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => {}}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#4F8CFF]/30 hover:bg-[#4F8CFF]/5 transition-all text-left"
              >
                <Icon className="w-5 h-5 text-[#4F8CFF]" />
                <span className="text-sm font-medium text-[#1A1D26]">{action.label}</span>
                <ChevronRight className="w-4 h-4 text-[#9CA3AF] ml-auto" />
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* Users Tab */
function UsersTab() {
  const { data: siteUsers, isLoading } = trpc.customAuth.getSiteUsers.useQuery();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-2xl font-bold text-[#1A1D26] mb-6">Registered Users</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">ID</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#9CA3AF]">Loading...</td>
                </tr>
              ) : siteUsers?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#9CA3AF]">No users yet</td>
                </tr>
              ) : (
                siteUsers?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm text-[#1A1D26]">#{user.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1A1D26]">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{user.email || "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === "user"
                          ? "bg-[#4F8CFF]/10 text-[#4F8CFF]"
                          : "bg-[#F59E0B]/10 text-[#F59E0B]"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9CA3AF]">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

/* Reviews Tab */
function ReviewsTab() {
  const utils = trpc.useUtils();
  const { data: reviewsData, isLoading } = trpc.reviews.list.useQuery({ limit: 50 });
  const deleteReview = trpc.reviews.delete.useMutation({
    onSuccess: () => {
      utils.reviews.list.invalidate();
      toast.success("Review deleted");
    },
  });
  const togglePin = trpc.reviews.togglePin.useMutation({
    onSuccess: () => {
      utils.reviews.list.invalidate();
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-2xl font-bold text-[#1A1D26] mb-6">Reviews Management</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Rating</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Content</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-[#9CA3AF]">Loading...</td></tr>
              ) : reviewsData?.items.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-[#9CA3AF]">No reviews yet</td></tr>
              ) : (
                reviewsData?.items.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm font-medium text-[#1A1D26]">{review.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280] max-w-xs truncate">{review.content}</td>
                    <td className="px-6 py-4">
                      {review.pinned ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#4F8CFF]/10 text-[#4F8CFF]">
                          <Pin className="w-3 h-3" /> Pinned
                        </span>
                      ) : (
                        <span className="text-xs text-[#9CA3AF]">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePin.mutate({ id: review.id })}
                          className="p-2 rounded-lg hover:bg-gray-100 text-[#6B7280] hover:text-[#4F8CFF]"
                        >
                          <Pin className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteReview.mutate({ id: review.id })}
                          className="p-2 rounded-lg hover:bg-red-50 text-[#6B7280] hover:text-[#EF4444]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

/* Contacts Tab */
function ContactsTab() {
  const utils = trpc.useUtils();
  const { data: contactsData, isLoading } = trpc.contact.list.useQuery({ limit: 50 });
  const markRead = trpc.contact.markRead.useMutation({
    onSuccess: () => utils.contact.list.invalidate(),
  });
  const deleteContact = trpc.contact.delete.useMutation({
    onSuccess: () => {
      utils.contact.list.invalidate();
      toast.success("Message deleted");
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-2xl font-bold text-[#1A1D26] mb-6">Contact Messages</h1>

      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 text-[#9CA3AF]">Loading...</div>
        ) : contactsData?.items.length === 0 ? (
          <div className="text-center py-8 text-[#9CA3AF]">No messages yet</div>
        ) : (
          contactsData?.items.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white rounded-2xl p-5 border shadow-sm ${
                contact.read ? "border-gray-100" : "border-[#4F8CFF]/30 bg-[#4F8CFF]/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-[#1A1D26]">{contact.name}</h3>
                    {!contact.read && (
                      <span className="w-2 h-2 rounded-full bg-[#4F8CFF]" />
                    )}
                  </div>
                  <p className="text-sm text-[#6B7280] mb-1">{contact.email}</p>
                  {contact.phone && <p className="text-sm text-[#6B7280] mb-2">{contact.phone}</p>}
                  <p className="text-sm text-[#1A1D26] mt-2">{contact.message}</p>
                  <p className="text-xs text-[#9CA3AF] mt-3">
                    {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {!contact.read && (
                    <button
                      onClick={() => markRead.mutate({ id: contact.id })}
                      className="p-2 rounded-lg hover:bg-gray-100 text-[#6B7280] hover:text-[#10B981]"
                      title="Mark as read"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteContact.mutate({ id: contact.id })}
                    className="p-2 rounded-lg hover:bg-red-50 text-[#6B7280] hover:text-[#EF4444]"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

/* Blog Tab */
function BlogTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-2xl font-bold text-[#1A1D26] mb-6">Blog Management</h1>
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
        <Newspaper className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
        <p className="text-[#6B7280]">Blog management coming soon. Use database to manage posts.</p>
      </div>
    </motion.div>
  );
}

/* Settings Tab */
function SettingsTab() {
  const utils = trpc.useUtils();
  const { data: settings } = trpc.settings.get.useQuery();
  const updateSetting = trpc.settings.update.useMutation({
    onSuccess: () => {
      utils.settings.get.invalidate();
      toast.success("Setting saved");
    },
  });

  const [formData, setFormData] = useState({
    phone: "+91 8368124957",
    email: "vedabrandssupport@gmail.com",
    address: "Mumbai, Maharashtra, India",
    businessHours: "Mon - Sat: 9:00 AM - 7:00 PM",
    whatsapp: "https://wa.me/918368124957",
    heroTitle: "We Build Brands That People Remember.",
    heroSubtitle: "Brand Strategy | Website Design | Social Media Marketing | Google SEO | Digital Growth",
  });

  useEffect(() => {
    if (settings) {
      setFormData((prev) => ({ ...prev, ...settings }));
    }
  }, [settings]);

  const handleSave = (key: string, value: string) => {
    updateSetting.mutate({ key, value });
  };

  const fields = [
    { key: "phone", label: "Phone Number", icon: Phone },
    { key: "email", label: "Email Address", icon: Mail },
    { key: "address", label: "Business Address", icon: MapPin },
    { key: "businessHours", label: "Business Hours", icon: Clock },
    { key: "whatsapp", label: "WhatsApp Link", icon: MessageSquare },
    { key: "heroTitle", label: "Hero Title", icon: Briefcase },
    { key: "heroSubtitle", label: "Hero Subtitle", icon: Settings },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-2xl font-bold text-[#1A1D26] mb-6">Site Settings</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.key} className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#4F8CFF]" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#1A1D26] mb-2">
                    {field.label}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData[field.key as keyof typeof formData] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="glass-input flex-1"
                    />
                    <button
                      onClick={() =>
                        handleSave(field.key, formData[field.key as keyof typeof formData] || "")
                      }
                      className="px-4 py-2 bg-[#4F8CFF] text-white rounded-xl text-sm font-medium hover:bg-[#7BA8FF] transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
