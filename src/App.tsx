import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Service, BlogPost, GalleryItem, Testimonial, TeamMember } from "./types";
import { 
  getServices, getBlogPosts, getGallery, getTestimonials, getTeamMembers 
} from "./dataSync";

// Sub-components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ServicesView from "./components/ServicesView";
import GalleryView from "./components/GalleryView";
import ContactView from "./components/ContactView";
import AppointmentBooking from "./components/AppointmentBooking";
import AdminDashboard from "./components/AdminDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import AuthView from "./components/AuthView";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  
  // Data lists
  const [services, setServices] = useState<Service[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  // Aux state
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    // 1. Listen for auth state shifts
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email === "adhnansahil21@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    // 2. Load and seed all data from Firestore
    async function loadSalonData() {
      try {
        const [svcs, bgs, gal, tst, tm] = await Promise.all([
          getServices(),
          getBlogPosts(),
          getGallery(),
          getTestimonials(),
          getTeamMembers()
        ]);
        setServices(svcs);
        setBlogs(bgs);
        setGallery(gal);
        setTestimonials(tst);
        setTeam(tm);
      } catch (error) {
        console.error("Failed to fetch initial salon database:", error);
      } finally {
        setDataLoading(false);
      }
    }

    loadSalonData();

    return () => unsubscribe();
  }, []);

  const handleBookNow = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setCurrentPage("book");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthSuccess = () => {
    // Navigate back to home or admin depending on who logged in
    const user = auth.currentUser;
    if (user && user.email === "adhnansahil21@gmail.com") {
      setCurrentPage("admin");
    } else {
      setCurrentPage("dashboard");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-cream-light text-charcoal selection:bg-gold selection:text-forest">
      {/* Dynamic Sticky Header Navigation */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onBookNow={() => handleBookNow()} 
        isAdmin={isAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {dataLoading ? (
          <div className="flex items-center justify-center min-h-screen bg-forest">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
              <span className="font-serif text-white tracking-widest text-xs uppercase font-semibold">L'Atelier Mumbai</span>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {currentPage === "home" && (
              <HomeView 
                services={services} 
                blogs={blogs} 
                testimonials={testimonials}
                onNavigate={setCurrentPage} 
                onBookNow={handleBookNow} 
              />
            )}
            
            {currentPage === "about" && (
              <AboutView 
                team={team} 
                onNavigate={setCurrentPage} 
              />
            )}

            {currentPage === "services" && (
              <ServicesView 
                services={services} 
                onBookNow={handleBookNow} 
              />
            )}

            {currentPage === "gallery" && (
              <GalleryView 
                gallery={gallery} 
              />
            )}

            {currentPage === "contact" && <ContactView />}

            {currentPage === "book" && (
              <div className="pt-36 pb-24 max-w-7xl mx-auto px-6">
                <AppointmentBooking 
                  initialServiceId={bookingServiceId} 
                  onSuccess={() => {
                    // Handled internally, but trigger refresh if necessary
                  }}
                  onNavigate={setCurrentPage}
                />
              </div>
            )}

            {currentPage === "login" && (
              <div className="pt-36 pb-24 max-w-7xl mx-auto px-6">
                <AuthView 
                  onSuccess={handleAuthSuccess} 
                  onNavigate={setCurrentPage} 
                />
              </div>
            )}

            {currentPage === "dashboard" && (
              <div className="pt-36 pb-24 max-w-7xl mx-auto px-6">
                <CustomerDashboard 
                  onNavigateToBooking={() => handleBookNow()} 
                />
              </div>
            )}

            {currentPage === "admin" && (
              <div className="pt-36 pb-24">
                <AdminDashboard />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Luxury Footer */}
      <Footer 
        setCurrentPage={setCurrentPage} 
        onBookNow={() => handleBookNow()} 
      />
    </div>
  );
}
