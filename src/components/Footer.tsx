import React, { useState } from "react";
import { Sparkles, Instagram, Facebook, Mail, Phone, MapPin, ArrowRight, Star } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
  onBookNow: () => void;
}

export default function Footer({ setCurrentPage, onBookNow }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mock Instagram images with premium aesthetic
  const instagramFeed = [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=150"
  ];

  return (
    <footer className="bg-forest text-white/85 border-t border-white/10 pt-20 pb-8 relative overflow-hidden" id="footer-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col gap-6">
            <button onClick={() => handleNavClick("home")} className="flex items-center gap-2 text-left self-start cursor-pointer focus:outline-none">
              <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center bg-forest">
                <Sparkles className="w-4.5 h-4.5 text-gold" />
              </div>
              <div>
                <span className="block font-serif text-lg tracking-wider font-semibold text-white">L'ATELIER</span>
                <span className="block text-[9px] tracking-[0.2em] font-sans text-gold/80 font-medium">PET GROOMING</span>
              </div>
            </button>
            <p className="text-white/70 text-sm leading-relaxed font-sans">
              A sensory-friendly, luxury pet grooming atelier crafting tailored grooming experiences for pets that deserve the very best.
            </p>
            {/* Google Reviews rating */}
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3.5 w-fit">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-gold" />
                ))}
              </div>
              <div className="text-xs font-sans">
                <span className="text-white font-semibold">4.9 / 5</span>
                <span className="text-white/60 block">180+ Google Reviews</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-gold font-sans">Discover</h3>
            <ul className="flex flex-col gap-3 font-sans text-sm">
              <li>
                <button onClick={() => handleNavClick("about")} className="hover:text-gold transition-colors text-left cursor-pointer">About the Atelier</button>
              </li>
              <li>
                <button onClick={() => handleNavClick("services")} className="hover:text-gold transition-colors text-left cursor-pointer">Premium Services</button>
              </li>
              <li>
                <button onClick={() => handleNavClick("gallery")} className="hover:text-gold transition-colors text-left cursor-pointer">The Gallery</button>
              </li>
              <li>
                <button onClick={() => handleNavClick("contact")} className="hover:text-gold transition-colors text-left cursor-pointer">Contact Us</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-gold font-sans">Atelier Hours</h3>
            <ul className="flex flex-col gap-3 font-sans text-sm text-white/70">
              <li className="flex justify-between border-b border-white/10 pb-1.5">
                <span>Monday - Friday</span>
                <span className="text-white font-medium">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-1.5">
                <span>Saturday</span>
                <span className="text-white font-medium">9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-1.5">
                <span>Sunday</span>
                <span className="text-gold font-semibold uppercase tracking-wider text-xs">By Request Only</span>
              </li>
            </ul>
            <div className="flex flex-col gap-2 mt-2 font-sans text-xs">
              <span className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="w-3.5 h-3.5 text-gold" /> +91 98200 12345
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold" /> Colaba Crescent, Colaba, Mumbai, MH
              </span>
            </div>
          </div>

          {/* Column 4: Newsletter & Instagram */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-gold font-sans">Atelier Journal</h3>
            <p className="text-sm text-white/70 font-sans">
              Subscribe to receive exclusive grooming advice and seasonal reservation windows.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-gold rounded-[4px] px-4 py-3 text-sm focus:outline-none placeholder-white/40 transition-all font-sans text-white"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-gold hover:bg-gold-light text-forest p-1.5 rounded-[4px] transition-all cursor-pointer"
                >
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
              {subscribed && (
                <span className="text-gold text-xs font-medium font-sans">Thank you! Welcome to L'Atelier Journal.</span>
              )}
            </form>

            {/* Instagram feed */}
            <div>
              <span className="block text-[11px] uppercase tracking-widest text-white/60 mb-2 font-semibold">Instagram Feed</span>
              <div className="grid grid-cols-6 gap-1.5">
                {instagramFeed.map((img, i) => (
                  <a key={i} href="#instagram" className="block relative group overflow-hidden rounded-md aspect-square border border-white/10">
                    <img src={img} alt="Instagram pet" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Instagram className="w-3.5 h-3.5 text-white" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & policies */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 font-sans text-xs text-white/50">
          <p className="order-2 md:order-1 text-center md:text-left">
            &copy; {new Date().getFullYear()} L'Atelier Pet Grooming. All rights reserved. Crafted for the absolute finest pets.
          </p>
          <div className="order-1 md:order-2 flex flex-wrap justify-center gap-6">
            <a href="#privacy" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#refund" className="hover:text-gold transition-colors">Refund Policy</a>
            <a href="#cookies" className="hover:text-gold transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
