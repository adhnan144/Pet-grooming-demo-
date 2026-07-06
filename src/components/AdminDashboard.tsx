import React, { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, Users, Settings, Plus, Trash2, Edit3, Check, X, 
  TrendingUp, IndianRupee, Clock, ShieldAlert, FileText, Image as ImageIcon, MessageSquare, Briefcase
} from "lucide-react";
import { motion } from "motion/react";
import { Service, BlogPost, GalleryItem, Testimonial, Appointment, TeamMember } from "../types";
import { 
  getServices, saveService, deleteService,
  getBlogPosts, saveBlogPost, deleteBlogPost,
  getGallery, saveGalleryItem, deleteGalleryItem,
  getTestimonials, saveTestimonial, deleteTestimonial,
  getTeamMembers, saveTeamMember, deleteTeamMember,
  getAppointments, updateAppointmentStatus, deleteAppointment
} from "../dataSync";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"appointments" | "services" | "blogs" | "gallery" | "testimonials" | "team">("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Form states for creating new items
  const [newService, setNewService] = useState<Partial<Service>>({ name: "", price: 0, description: "", duration: "60 min", category: "dog", benefits: [] });
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({ title: "", summary: "", content: "", category: "Wellness", author: "L'Atelier Staff" });
  const [newGallery, setNewGallery] = useState<Partial<GalleryItem>>({ title: "", category: "dogs", imageUrl: "" });
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({ clientName: "", petName: "", rating: 5, text: "", petBreed: "" });

  const [benefitInput, setBenefitInput] = useState("");

  useEffect(() => {
    async function loadAllData() {
      setLoading(true);
      try {
        const [appts, svcs, bgs, gal, tst, tm] = await Promise.all([
          getAppointments("admin"),
          getServices(),
          getBlogPosts(),
          getGallery(),
          getTestimonials(),
          getTeamMembers()
        ]);
        setAppointments(appts);
        setServices(svcs);
        setBlogs(bgs);
        setGallery(gal);
        setTestimonials(tst);
        setTeam(tm);
      } catch (err) {
        console.error("Error loading admin dashboard datasets:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAllData();
  }, [refreshTrigger]);

  // Actions
  const handleStatusUpdate = async (id: string, status: any, paymentStatus?: any) => {
    try {
      await updateAppointmentStatus(id, status, paymentStatus);
      setRefreshTrigger(p => p + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApptDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteAppointment(id);
        setRefreshTrigger(p => p + 1);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name || !newService.price) return;
    try {
      const svc: Service = {
        id: "svc-" + Math.random().toString(36).substring(2, 9),
        name: newService.name,
        description: newService.description || "",
        duration: newService.duration || "60 min",
        price: Number(newService.price),
        category: newService.category || "dog",
        benefits: newService.benefits || [],
        image: newService.image || "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800"
      };
      await saveService(svc);
      setNewService({ name: "", price: 0, description: "", duration: "60 min", category: "dog", benefits: [] });
      setRefreshTrigger(p => p + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleServiceDelete = async (id: string) => {
    if (window.confirm("Delete this service?")) {
      try {
        await deleteService(id);
        setRefreshTrigger(p => p + 1);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.summary) return;
    try {
      const bp: BlogPost = {
        id: "blog-" + Math.random().toString(36).substring(2, 9),
        title: newBlog.title,
        summary: newBlog.summary,
        content: newBlog.content || "",
        category: newBlog.category || "Wellness",
        author: newBlog.author || "L'Atelier Staff",
        image: newBlog.image || "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
        date: new Date().toISOString().split("T")[0],
        readTime: "4 min read",
        featured: false
      };
      await saveBlogPost(bp);
      setNewBlog({ title: "", summary: "", content: "", category: "Wellness", author: "L'Atelier Staff" });
      setRefreshTrigger(p => p + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlogDelete = async (id: string) => {
    if (window.confirm("Delete this post?")) {
      try {
        await deleteBlogPost(id);
        setRefreshTrigger(p => p + 1);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.imageUrl) return;
    try {
      const gi: GalleryItem = {
        id: "g-" + Math.random().toString(36).substring(2, 9),
        title: newGallery.title,
        category: newGallery.category || "dogs",
        imageUrl: newGallery.imageUrl,
        date: new Date().toISOString().split("T")[0]
      };
      await saveGalleryItem(gi);
      setNewGallery({ title: "", category: "dogs", imageUrl: "" });
      setRefreshTrigger(p => p + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGalleryDelete = async (id: string) => {
    if (window.confirm("Delete this gallery item?")) {
      try {
        await deleteGalleryItem(id);
        setRefreshTrigger(p => p + 1);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.clientName || !newTestimonial.text) return;
    try {
      const ts: Testimonial = {
        id: "t-" + Math.random().toString(36).substring(2, 9),
        clientName: newTestimonial.clientName,
        petName: newTestimonial.petName || "Companion",
        petBreed: newTestimonial.petBreed || "Unknown",
        rating: newTestimonial.rating || 5,
        text: newTestimonial.text,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        date: new Date().toISOString().split("T")[0]
      };
      await saveTestimonial(ts);
      setNewTestimonial({ clientName: "", petName: "", rating: 5, text: "", petBreed: "" });
      setRefreshTrigger(p => p + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTestimonialDelete = async (id: string) => {
    if (window.confirm("Delete this testimonial?")) {
      try {
        await deleteTestimonial(id);
        setRefreshTrigger(p => p + 1);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Metrics / Analytics calculations
  const totalRevenue = appointments
    .filter(a => a.status === "completed" || a.paymentStatus === "paid")
    .reduce((sum, a) => sum + a.servicePrice, 0);

  const pendingAppointmentsCount = appointments.filter(a => a.status === "pending").length;
  const activeClientsCount = Array.from(new Set(appointments.map(a => a.clientEmail))).length;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10" id="admin-dashboard-container">
      {/* Welcome & High-level Metrics */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 border-b border-forest/15 pb-8 font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-gold/25 border border-gold/40 text-gold text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-[4px]">Secure Console</span>
            <span className="text-xs text-charcoal/50">L'Atelier Mumbai</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-forest font-semibold">Atelier Admin Control</h1>
        </div>

        {/* Real-time stats */}
        <div className="grid grid-cols-3 gap-6 shrink-0 w-full md:w-auto">
          <div className="bg-white border border-forest/5 p-4 rounded-[16px] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <span className="text-xs text-charcoal/50 font-semibold">Revenue</span>
            <span className="text-xl font-bold text-forest mt-1 flex items-center gap-0.5">
              <IndianRupee className="w-4 h-4 text-gold shrink-0" /> {totalRevenue}
            </span>
          </div>
          <div className="bg-white border border-forest/5 p-4 rounded-[16px] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <span className="text-xs text-charcoal/50 font-semibold">Pending Spots</span>
            <span className="text-xl font-bold text-gold mt-1 flex items-center gap-1">
              <Clock className="w-4 h-4 shrink-0" /> {pendingAppointmentsCount}
            </span>
          </div>
          <div className="bg-white border border-forest/5 p-4 rounded-[16px] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <span className="text-xs text-charcoal/50 font-semibold">Unique Clients</span>
            <span className="text-xl font-bold text-forest mt-1 flex items-center gap-1">
              <Users className="w-4 h-4 text-gold shrink-0" /> {activeClientsCount}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Menu Navigation */}
      <div className="flex flex-wrap border-b border-forest/10 gap-2 mb-8 font-sans text-xs uppercase tracking-wider font-bold">
        {[
          { id: "appointments", label: "Appointments", icon: CalendarIcon },
          { id: "services", label: "Grooming Services", icon: Briefcase },
          { id: "blogs", label: "Atelier Blog", icon: FileText },
          { id: "gallery", label: "Masonry Gallery", icon: ImageIcon },
          { id: "testimonials", label: "Reviews", icon: MessageSquare }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-1.5 py-3 px-5 border-b-2 font-bold cursor-pointer transition-colors focus:outline-none bg-transparent ${
              activeTab === t.id
                ? "border-gold text-forest"
                : "border-transparent text-charcoal/50 hover:text-forest"
            }`}
          >
            <t.icon className="w-4 h-4 text-gold" />
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
        </div>
      ) : (
        <div className="min-h-[400px]">
          {/* APPOINTMENTS MANAGER */}
          {activeTab === "appointments" && (
            <div className="bg-white rounded-[16px] border border-forest/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden font-sans">
              <div className="p-6 border-b border-forest/10 flex justify-between items-center">
                <h2 className="font-serif text-lg text-forest font-semibold">Grooming Calendar Reservations</h2>
                <span className="text-xs text-charcoal/50">{appointments.length} Total Registered</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-charcoal border-collapse">
                  <thead className="bg-[#F8F5EF] text-xs text-charcoal/50 uppercase tracking-widest font-bold">
                    <tr>
                      <th className="p-4 border-b border-forest/10">Reference ID</th>
                      <th className="p-4 border-b border-forest/10">Client Details</th>
                      <th className="p-4 border-b border-forest/10">Companion Details</th>
                      <th className="p-4 border-b border-forest/10">Date & Slot</th>
                      <th className="p-4 border-b border-forest/10">Requested Service</th>
                      <th className="p-4 border-b border-forest/10">Status</th>
                      <th className="p-4 border-b border-forest/10 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-charcoal/50">No pet reservations found.</td>
                      </tr>
                    ) : (
                      appointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-[#F8F5EF]/50 transition-colors border-b border-forest/5">
                          <td className="p-4 font-mono text-xs font-semibold uppercase">{appt.id}</td>
                          <td className="p-4">
                            <div className="font-semibold text-forest">{appt.clientName}</div>
                            <div className="text-xs text-charcoal/50 font-light">{appt.clientEmail}</div>
                            <div className="text-xs text-charcoal/50 font-light">{appt.clientPhone}</div>
                          </td>
                          <td className="p-4">
                            <span className="capitalize font-bold text-[10px] tracking-wider bg-gold/10 text-forest border border-gold/15 px-2.5 py-0.5 rounded-[4px] inline-block mb-1">
                              {appt.petType}
                            </span>
                            <div className="text-sm font-semibold text-charcoal">{appt.petBreed}</div>
                            <div className="text-xs text-charcoal/60 font-light">{appt.petAge} Years &bull; {appt.petWeight} lbs</div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-forest">{appt.date}</div>
                            <div className="text-xs text-gold font-bold">{appt.timeSlot}</div>
                          </td>
                          <td className="p-4 font-light">
                            <div className="font-semibold text-forest font-sans">{appt.serviceName}</div>
                            <div className="text-xs text-gold font-bold">₹{appt.servicePrice}</div>
                            <div className="text-xs text-charcoal/40">Groomer: {appt.groomerName}</div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-[4px] border ${
                              appt.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              appt.status === "confirmed" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              appt.status === "completed" ? "bg-green-50 text-green-700 border-green-200" :
                              "bg-red-50 text-red-700 border-red-200"
                            }`}>
                              {appt.status}
                            </span>
                            <div className="mt-1">
                              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] ${
                                appt.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                              }`}>
                                {appt.paymentStatus}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {appt.status === "pending" && (
                                <button
                                  onClick={() => handleStatusUpdate(appt.id, "confirmed")}
                                  className="bg-forest text-white p-1.5 rounded-[4px] hover:bg-forest/90 cursor-pointer"
                                  title="Confirm Reservation"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {appt.status === "confirmed" && (
                                <button
                                  onClick={() => handleStatusUpdate(appt.id, "completed", "paid")}
                                  className="bg-green-600 text-white p-1.5 rounded-[4px] hover:bg-green-700 cursor-pointer"
                                  title="Complete Appointment"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {appt.status !== "cancelled" && appt.status !== "completed" && (
                                <button
                                  onClick={() => handleStatusUpdate(appt.id, "cancelled")}
                                  className="bg-amber-600 text-white p-1.5 rounded-[4px] hover:bg-amber-700 cursor-pointer"
                                  title="Cancel Appointment"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleApptDelete(appt.id)}
                                className="border border-red-200 text-red-500 p-1.5 rounded-[4px] hover:bg-red-50 cursor-pointer"
                                title="Delete"
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
          )}

          {/* GROOMING SERVICES MANAGER */}
          {activeTab === "services" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* List */}
              <div className="lg:col-span-2 bg-white rounded-[16px] border border-forest/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-sans">
                <h2 className="font-serif text-lg text-forest font-semibold mb-4 border-b border-forest/10 pb-2">Active Grooming Treatments</h2>
                <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {services.map((svc) => (
                    <div key={svc.id} className="border border-forest/10 rounded-[16px] p-4 flex gap-4 items-center justify-between bg-transparent">
                      <div className="flex gap-4 items-center">
                        <img src={svc.image} alt={svc.name} className="w-14 h-14 rounded-[4px] object-cover border border-forest/10" />
                        <div>
                          <h3 className="font-semibold text-forest text-sm leading-tight font-sans">{svc.name}</h3>
                          <span className="text-gold font-bold text-xs block mt-0.5">₹{svc.price} &bull; {svc.duration}</span>
                          <span className="text-[10px] text-charcoal/50 uppercase tracking-widest font-bold bg-[#F8F5EF] px-2.5 py-0.5 rounded-[4px] mt-1.5 inline-block border border-forest/5">
                            {svc.category}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleServiceDelete(svc.id)}
                        className="text-red-500 hover:text-white border border-red-100 bg-red-50 hover:bg-red-500 p-2 rounded-[4px] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add form */}
              <div className="bg-white rounded-[16px] border border-forest/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-sans">
                <h2 className="font-serif text-lg text-forest font-semibold mb-4 border-b border-forest/10 pb-2">Add New Treatment</h2>
                <form onSubmit={handleAddService} className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Service Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Imperial Breed Clip"
                      value={newService.name}
                      onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none placeholder-charcoal/30 text-charcoal font-normal"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Starting Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="3500"
                      value={newService.price || ""}
                      onChange={(e) => setNewService(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none text-charcoal font-normal"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Duration</label>
                    <input
                      type="text"
                      placeholder="60 min"
                      value={newService.duration}
                      onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none placeholder-charcoal/30 text-charcoal font-normal"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Category</label>
                    <select
                      value={newService.category}
                      onChange={(e) => setNewService(prev => ({ ...prev, category: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none text-charcoal font-normal"
                    >
                      <option value="dog">Dog Only</option>
                      <option value="cat">Cat Only</option>
                      <option value="spa">Luxury Spa</option>
                      <option value="all">Universal / All Pets</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Description</label>
                    <textarea
                      placeholder="Write brief description..."
                      value={newService.description}
                      onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal font-sans text-charcoal placeholder-charcoal/30"
                      rows={3}
                    />
                  </div>
                  <button type="submit" className="bg-forest hover:bg-[#F8F5EF] hover:text-forest border border-forest text-[#F8F5EF] font-bold p-3.5 rounded-[4px] mt-2 cursor-pointer shadow-sm transition-all tracking-widest text-xs uppercase">
                    Publish Service
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ATELIER BLOG JOURNAL MANAGER */}
          {activeTab === "blogs" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* List */}
              <div className="lg:col-span-2 bg-white rounded-[16px] border border-forest/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-sans">
                <h2 className="font-serif text-lg text-forest font-semibold mb-4 border-b border-forest/10 pb-2">Published Blog Articles</h2>
                <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {blogs.map((bg) => (
                    <div key={bg.id} className="border border-forest/10 rounded-[16px] p-4 flex gap-4 items-center justify-between bg-transparent">
                      <div className="flex gap-4 items-center">
                        <img src={bg.image} alt={bg.title} className="w-14 h-14 rounded-[4px] object-cover border border-forest/10" />
                        <div>
                          <h3 className="font-semibold text-forest text-sm leading-snug line-clamp-1 font-sans">{bg.title}</h3>
                          <span className="text-gold text-xs block mt-0.5">{bg.category} &bull; {bg.date} &bull; by {bg.author}</span>
                          <p className="text-xs text-charcoal/60 mt-1 line-clamp-1 normal-case font-normal">{bg.summary}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBlogDelete(bg.id)}
                        className="text-red-500 hover:text-white border border-red-100 bg-red-50 hover:bg-red-500 p-2 rounded-[4px] transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add form */}
              <div className="bg-white rounded-[16px] border border-forest/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-sans">
                <h2 className="font-serif text-lg text-forest font-semibold mb-4 border-b border-forest/10 pb-2">Compose Article</h2>
                <form onSubmit={handleAddBlog} className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Article Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Caring for Double Coats"
                      value={newBlog.title}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal text-charcoal placeholder-charcoal/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Category</label>
                    <input
                      type="text"
                      placeholder="e.g. Wellness, Grooming"
                      value={newBlog.category}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, category: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal text-charcoal placeholder-charcoal/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Short Summary</label>
                    <input
                      type="text"
                      required
                      placeholder="Short catchy summary sentence..."
                      value={newBlog.summary}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, summary: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal text-charcoal placeholder-charcoal/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Markdown Content</label>
                    <textarea
                      placeholder="### Header 1..."
                      value={newBlog.content}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, content: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal font-mono text-charcoal placeholder-charcoal/30"
                      rows={5}
                    />
                  </div>
                  <button type="submit" className="bg-forest hover:bg-[#F8F5EF] hover:text-forest border border-forest text-[#F8F5EF] font-bold p-3.5 rounded-[4px] mt-2 cursor-pointer shadow-sm transition-all tracking-widest text-xs uppercase">
                    Publish Article
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* GALLERY IMAGES MANAGER */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* List */}
              <div className="lg:col-span-2 bg-white rounded-[16px] border border-forest/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-sans">
                <h2 className="font-serif text-lg text-forest font-semibold mb-4 border-b border-forest/10 pb-2">Masonry Gallery Assets</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {gallery.map((gi) => (
                    <div key={gi.id} className="relative group rounded-[16px] overflow-hidden aspect-video border border-forest/10 bg-[#F8F5EF]">
                      <img src={gi.imageUrl} alt={gi.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-forest/80 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-3.5 transition-all">
                        <span className="text-[10px] uppercase font-bold text-gold tracking-widest">{gi.category}</span>
                        <div className="flex justify-between items-center w-full">
                          <span className="text-xs text-white font-semibold font-serif truncate max-w-[100px]">{gi.title}</span>
                          <button
                            onClick={() => handleGalleryDelete(gi.id)}
                            className="bg-red-500 text-white p-1 rounded-[4px] hover:bg-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add form */}
              <div className="bg-white rounded-[16px] border border-forest/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-sans">
                <h2 className="font-serif text-lg text-forest font-semibold mb-4 border-b border-forest/10 pb-2">Add Gallery Image</h2>
                <form onSubmit={handleAddGallery} className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Title / Pet breed</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samoyed Cloud Blow-dry"
                      value={newGallery.title}
                      onChange={(e) => setNewGallery(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal text-charcoal placeholder-charcoal/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Image URL</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. https://images.unsplash.com/..."
                      value={newGallery.imageUrl}
                      onChange={(e) => setNewGallery(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal text-charcoal placeholder-charcoal/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Filter Category</label>
                    <select
                      value={newGallery.category}
                      onChange={(e) => setNewGallery(prev => ({ ...prev, category: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none text-charcoal font-normal"
                    >
                      <option value="dogs">Dogs Only</option>
                      <option value="cats">Cats Only</option>
                      <option value="before_after">Before & After</option>
                      <option value="spa">Luxury Spa</option>
                      <option value="haircuts">Haircuts</option>
                      <option value="salon">Atelier Floor</option>
                    </select>
                  </div>
                  <button type="submit" className="bg-forest hover:bg-[#F8F5EF] hover:text-forest border border-forest text-[#F8F5EF] font-bold p-3.5 rounded-[4px] mt-2 cursor-pointer shadow-sm transition-all tracking-widest text-xs uppercase">
                    Publish Image
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TESTIMONIAL REVIEWS MANAGER */}
          {activeTab === "testimonials" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* List */}
              <div className="lg:col-span-2 bg-white rounded-[16px] border border-forest/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-sans">
                <h2 className="font-serif text-lg text-forest font-semibold mb-4 border-b border-forest/10 pb-2">Customer Reviews & Ratings</h2>
                <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {testimonials.map((ts) => (
                    <div key={ts.id} className="border border-forest/10 rounded-[16px] p-4 flex justify-between items-start gap-4 bg-transparent">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-forest text-sm font-sans">{ts.clientName}</h3>
                          <span className="text-xs text-charcoal/50">({ts.petName} - {ts.petBreed})</span>
                        </div>
                        <div className="text-gold flex mt-1 mb-1.5">
                          {[...Array(ts.rating)].map((_, idx) => (
                            <Check key={idx} className="w-3.5 h-3.5 fill-gold stroke-gold" />
                          ))}
                        </div>
                        <p className="text-xs text-charcoal/60 leading-relaxed font-normal normal-case font-sans">{ts.text}</p>
                      </div>
                      <button
                        onClick={() => handleTestimonialDelete(ts.id)}
                        className="text-red-500 hover:text-white border border-red-200 bg-red-50 hover:bg-red-500 p-2 rounded-[4px] transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add form */}
              <div className="bg-white rounded-[16px] border border-forest/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-sans">
                <h2 className="font-serif text-lg text-forest font-semibold mb-4 border-b border-forest/10 pb-2">Add Review</h2>
                <form onSubmit={handleAddTestimonial} className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Client Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={newTestimonial.clientName}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, clientName: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal text-charcoal placeholder-charcoal/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Pet Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Winston"
                      value={newTestimonial.petName}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, petName: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal text-charcoal placeholder-charcoal/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Pet Breed</label>
                    <input
                      type="text"
                      placeholder="e.g. French Bulldog"
                      value={newTestimonial.petBreed}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, petBreed: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal text-charcoal placeholder-charcoal/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Rating Score (1-5)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={5}
                      value={newTestimonial.rating}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, rating: Number(e.target.value) }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none text-charcoal font-normal"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-forest">Review Text</label>
                    <textarea
                      placeholder="Write review testimonial content..."
                      required
                      value={newTestimonial.text}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, text: e.target.value }))}
                      className="bg-[#F8F5EF] border border-forest/10 rounded-[4px] p-3 text-sm focus:outline-none normal-case font-normal text-charcoal placeholder-charcoal/30"
                      rows={3}
                    />
                  </div>
                  <button type="submit" className="bg-forest hover:bg-[#F8F5EF] hover:text-forest border border-forest text-[#F8F5EF] font-bold p-3.5 rounded-[4px] mt-2 cursor-pointer shadow-sm transition-all tracking-widest text-xs uppercase">
                    Publish Testimonial
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
