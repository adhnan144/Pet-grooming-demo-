import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Shield, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onBookNow: () => void;
  isAdmin: boolean;
}

export default function Navbar({ currentPage, setCurrentPage, onBookNow, isAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentPage("home");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center ${
          isScrolled
            ? "bg-forest/90 backdrop-blur-[10px] shadow-sm border-b border-forest/10"
            : "bg-[#F8F5EF]/90 backdrop-blur-[10px] border-b border-forest/5"
        }`}
      >
        <div className="max-w-7xl w-full mx-auto px-8 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
            id="nav-logo"
          >
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-forest group-hover:border-gold transition-all duration-300">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div className="text-left">
              <span className={`block font-serif text-xl tracking-wider font-bold transition-colors duration-300 ${
                isScrolled ? "text-white group-hover:text-gold" : "text-forest group-hover:text-gold"
              }`}>
                L'ATELIER
              </span>
              <span className={`block text-[9px] tracking-[0.25em] font-sans font-semibold uppercase ${
                isScrolled ? "text-gold/80" : "text-gold"
              }`}>
                PET GROOMING
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer focus:outline-none ${
                  currentPage === item.id
                    ? "text-gold"
                    : isScrolled
                      ? "text-white/80 hover:text-white"
                      : "text-forest/80 hover:text-forest"
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={() => handleNavClick("admin")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-gold/40 text-gold text-xs font-semibold uppercase tracking-wider bg-gold/10 hover:bg-gold hover:text-forest transition-all duration-300 cursor-pointer focus:outline-none ${
                  currentPage === "admin" ? "bg-gold text-forest" : ""
                }`}
                id="nav-admin-btn"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </button>
            )}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick("dashboard")}
                  className={`flex items-center gap-1.5 text-sm font-sans focus:outline-none cursor-pointer ${
                    isScrolled ? "text-white/80 hover:text-white" : "text-forest/80 hover:text-forest"
                  }`}
                  title="My Dashboard"
                >
                  <User className="w-4 h-4 text-gold" />
                  <span className="max-w-[100px] truncate">{user.email.split("@")[0]}</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className={`p-1.5 rounded-[4px] border hover:border-red-400 hover:text-red-400 transition-colors cursor-pointer ${
                    isScrolled ? "border-white/20 text-white/60" : "border-forest/20 text-forest/60"
                  }`}
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick("login")}
                className={`text-xs font-sans font-semibold uppercase tracking-wider py-2 px-4 border rounded-[4px] hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer ${
                  isScrolled ? "text-white/80 border-white/20" : "text-forest/80 border-forest/25"
                }`}
              >
                Sign In
              </button>
            )}

            <button
              onClick={onBookNow}
              className="bg-forest text-cream hover:bg-gold hover:text-forest font-sans font-semibold text-xs uppercase tracking-widest py-3 px-6 rounded-[4px] shadow-sm transition-all duration-300 focus:outline-none cursor-pointer"
              id="nav-book-now"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-[4px] border transition-colors focus:outline-none cursor-pointer ${
              isScrolled ? "border-white/20 text-white hover:text-gold" : "border-forest/20 text-forest hover:text-gold"
            }`}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-forest pt-24 px-6 pb-8 flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item, idx) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-serif text-2xl tracking-wide py-1 focus:outline-none ${
                    currentPage === item.id ? "text-gold font-medium" : "text-white/80"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              {isAdmin && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.04 }}
                  onClick={() => handleNavClick("admin")}
                  className={`flex items-center gap-2 text-left font-serif text-2xl tracking-wide py-1 text-gold/95 focus:outline-none`}
                >
                  <Shield className="w-6 h-6" />
                  Admin Dashboard
                </motion.button>
              )}
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-8 mt-8">
              {user ? (
                <div className="flex items-center justify-between text-white/90 mb-4">
                  <button
                    onClick={() => handleNavClick("dashboard")}
                    className="flex items-center gap-2 font-sans text-lg focus:outline-none"
                  >
                    <User className="w-5 h-5 text-gold" />
                    <span>{user.email}</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="text-red-400 flex items-center gap-1 text-sm focus:outline-none"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick("login")}
                  className="w-full text-center py-3 rounded-full border border-white/20 text-white font-sans font-medium hover:border-gold transition-colors"
                >
                  Sign In
                </button>
              )}

              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookNow();
                }}
                className="w-full bg-gold text-forest font-sans font-semibold text-sm uppercase tracking-wider py-4 rounded-full text-center shadow-lg hover:bg-gold-light transition-all"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
