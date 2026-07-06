import React, { useState } from "react";
import { ArrowRight, Star, Shield, Sparkles, Heart, Award, ChevronRight } from "lucide-react";
import { Service, BlogPost, Testimonial } from "../types";

interface HomeViewProps {
  services: Service[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  onNavigate: (page: string) => void;
  onBookNow: (serviceId?: string) => void;
}

function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is your salon's vaccination policy?",
      a: "For the absolute safety of all pet companions, we require up-to-date proof of Rabies, DHPP, and Bordetella vaccinations for canines. Cats must have FVRCP. You may upload documents when confirming your booking, or have your veterinary clinic email records to us directly prior to your appointment."
    },
    {
      q: "How long does a luxury grooming treatment typically take?",
      a: "Our private one-on-one sessions typically take between 1.5 to 2 hours. This dedicated duration ensures your companion is never rushed. Unlike traditional salons, we do not utilize cages, so furballs enjoy continuous physical care from start to finish and can be retrieved immediately."
    },
    {
      q: "Do you specialize in caring for senior pets or pets with medical conditions?",
      a: "Yes. Our master stylists are certified in gentle handling and elderly pet support. We utilize specialized ergonomic belly bands, orthopedic padding, and warm-water therapy to alleviate arthritis strain during bathing. Please detail any conditions in your Companion Profile so we can prepare specialized gear."
    },
    {
      q: "What is your reservation cancellation and rescheduling policy?",
      a: "Because we reserve the entire salon exclusively for one client per session, we request at least 24 hours notice for any rescheduling or cancellations. If you cancel with less than 24 hours notice, a ₹1,500 short-notice fee may apply to respect our groomers' dedicated time."
    },
    {
      q: "What grooming age do you recommend for puppies and kittens?",
      a: "We recommend scheduling their first visit around 12 to 16 weeks of age, once they have received their second set of puppy vaccinations. Their first 'Puppy Intro' treatment is entirely sensory-focused, acclimating them gently to warm water, blow dryers, and paw handling with lots of positive reinforcement."
    },
    {
      q: "What payment methods do you accept at the salon?",
      a: "We accept all major credit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, UPI, and contactless tap payments. Booking confirmation deposits are settled securely online, and final treatment balances can be paid at the salon concierge desk."
    }
  ];

  return (
    <div className="flex flex-col gap-4 font-sans max-w-3xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="bg-white border border-forest/5 rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300"
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none bg-transparent"
              id={`faq-btn-${idx}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                <span className="font-serif font-semibold text-base text-forest leading-snug">{faq.q}</span>
              </div>
              <span className="text-gold font-mono text-lg shrink-0">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-1 border-t border-forest/5 text-sm text-charcoal/70 leading-relaxed font-light">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function HomeView({ services, blogs, testimonials, onNavigate, onBookNow }: HomeViewProps) {
  // Trust values
  const trustItems = [
    { value: "4.9/5", label: "Google Rating", desc: "180+ Client Reviews" },
    { value: "12+", label: "Certified Master Groomers", desc: "IPG & NCFG Standards" },
    { value: "100%", label: "Organic Safe Products", desc: "Sulfate-free & Vegan" },
    { value: "15k+", label: "Happy Paws Hosted", desc: "Since 2018 in Mumbai" }
  ];

  return (
    <div id="home-view-container">
      {/* 1. LUXURY HERO SECTION */}
      <section className="relative min-h-[90vh] bg-[#F8F5EF] flex items-center justify-center pt-28 pb-20 overflow-hidden" id="hero-section">
        {/* Subtle decorative background circles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full border border-gold/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full border border-gold/15 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
          {/* Hero text content */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col gap-6">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="inline-block px-3 py-1 border border-gold text-gold text-[10px] uppercase tracking-[0.2em] font-semibold rounded-[2px] mb-2">
                Bespoke Pet Care
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-forest font-light tracking-tight leading-[1.15]">
              Luxury Grooming for Pets That Deserve <span className="italic text-gold">the Best</span>.
            </h1>

            <p className="font-sans text-charcoal/80 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Experience L'Atelier, a sanctuary of calm where master stylists provide sophisticated grooming tailored to your pet's unique breed, personality, and physical alignment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start font-sans mt-4">
              <button
                onClick={() => onBookNow()}
                className="bg-forest hover:bg-gold text-cream hover:text-forest font-semibold text-xs uppercase tracking-widest py-4 px-8 rounded-[4px] shadow-sm transition-all cursor-pointer"
              >
                Book Treatment
              </button>
              <button
                onClick={() => onNavigate("services")}
                className="border border-forest/30 hover:border-gold hover:text-gold text-forest font-semibold text-xs uppercase tracking-widest py-4 px-8 rounded-[4px] transition-all cursor-pointer bg-transparent"
              >
                View Services
              </button>
            </div>

            {/* Google review and trust summary */}
            <div className="flex items-center gap-3 justify-center lg:justify-start mt-4 font-sans text-xs text-charcoal/60">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="font-semibold tracking-wider">4.9 Stars on Google Maps &bull; 180+ Reviews</span>
            </div>
          </div>

          {/* Hero Premium Image (Arched dome layout) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-t-[240px] rounded-b-none overflow-hidden border border-gold/30 shadow-xl bg-forest/5">
              <img
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600"
                alt="Professionally groomed pet"
                className="w-full h-full object-cover"
              />
              {/* Ambient tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#F8F5EF]/95 backdrop-blur-md border border-gold/25 rounded-[4px] p-4 flex items-center justify-between shadow-md">
                <div className="font-sans">
                  <span className="block text-[9px] tracking-widest text-gold uppercase font-bold">Featured Guest</span>
                  <span className="block font-serif text-sm text-forest font-semibold mt-0.5">Winston, French Bulldog</span>
                </div>
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES / BAR SECTION */}
      <section className="bg-white py-14 border-y border-forest/10" id="trust-badges-section">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center font-sans">
              <div className="trust-val font-serif text-3xl lg:text-4xl text-forest font-bold tracking-tight">
                {item.value}
              </div>
              <div className="trust-label text-[10px] text-gold uppercase tracking-widest font-bold mt-1.5">
                {item.label}
              </div>
              <div className="text-[11px] text-charcoal/50 font-light mt-0.5">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED SERVICES CARDS */}
      <section className="py-24 max-w-7xl mx-auto px-8 md:px-16" id="featured-services-section">
        <div className="text-center mb-16 flex flex-col gap-3">
          <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans font-bold">Our Offerings</span>
          <h2 className="font-serif text-3xl md:text-4xl text-forest font-medium">Bespoke Treatments & Therapies</h2>
          <p className="font-sans text-charcoal/60 text-sm max-w-lg mx-auto leading-relaxed">
            Every service features botanical double-baths, blow-drys, custom scissoring, and organic finishing sprays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => (
            <div key={service.id} className="bg-white border border-forest/5 rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  <span className="absolute top-4 right-4 bg-forest text-gold text-xs font-bold px-3 py-1.5 rounded-[4px] border border-gold/25 font-sans shadow-sm">
                    Starting at ₹{service.price}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="font-serif font-semibold text-lg text-forest">{service.name}</h3>
                  <p className="font-sans text-charcoal/70 text-sm leading-relaxed font-light">{service.description}</p>
                </div>
              </div>
              <div className="p-6 border-t border-forest/5 flex justify-between items-center bg-[#F8F5EF]/30">
                <span className="font-mono text-[10px] text-charcoal/50 uppercase font-semibold">{service.duration}</span>
                <button
                  onClick={() => onBookNow(service.id)}
                  className="text-gold hover:text-forest text-xs uppercase tracking-widest font-semibold font-sans flex items-center gap-1 transition-all focus:outline-none cursor-pointer"
                >
                  Book Treatment <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate("services")}
            className="border-b-2 border-gold text-forest hover:text-gold text-xs uppercase tracking-widest font-semibold pb-1.5 transition-all focus:outline-none cursor-pointer"
          >
            Explore All Services
          </button>
        </div>
      </section>

      {/* 4. WHY CHOOSE US & HOW IT WORKS */}
      <section className="bg-[#F8F5EF] py-24 border-y border-forest/10" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text block */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans font-bold">The Atelier Difference</span>
            <h2 className="font-serif text-3xl md:text-4xl text-forest font-medium">Sensory-Friendly Care, Built on Mutual Trust</h2>
            <p className="font-sans text-charcoal/70 text-sm leading-relaxed font-light">
              We understand that pet salons can frequently feel like loud, high-stress assembly lines. L'Atelier was founded to replace this paradigm with one-on-one sanctuary grooming.
            </p>

            <div className="flex flex-col gap-5 font-sans text-sm mt-2">
              {[
                { title: "One-on-One Dedicated Care", desc: "No stacked cages or waiting lines. Your pet enjoys the exclusive focus of their dedicated master stylist." },
                { title: "Bespoke Aromatherapy & Music", desc: "Custom therapeutic essential oils and soft acoustic dampening maintain physical and behavioral calm." },
                { title: "Transparent Health Checkups", desc: "A detailed veterinary-certified skin, coat, and alignment assessment after every session." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-forest text-gold flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest text-base">{item.title}</h4>
                    <p className="text-charcoal/60 text-xs mt-0.5 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graphics block (Arched look too!) */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-t-[200px] rounded-b-none overflow-hidden border border-gold/20 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=700"
                alt="Quiet salon environment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-8 md:px-16 bg-white" id="testimonials-section">
        <div className="text-center mb-16 flex flex-col gap-3">
          <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans font-bold">Patron Stories</span>
          <h2 className="font-serif text-3xl md:text-4xl text-forest font-medium">Loved by Discerning Companions</h2>
          <p className="font-sans text-charcoal/60 text-sm max-w-lg mx-auto leading-relaxed">
            Read experience narratives from our distinguished clientele regarding our low-sensory sanctuary care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.id} className="bg-[#F8F5EF]/40 border border-forest/5 p-8 rounded-[16px] flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col gap-4">
                <div className="flex text-gold gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-sans text-charcoal/80 text-sm leading-relaxed font-light italic">
                  "{t.text}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-forest/5">
                <img src={t.image} alt={t.clientName} className="w-11 h-11 rounded-full object-cover border border-gold/30" />
                <div className="font-sans text-xs">
                  <h4 className="font-semibold text-forest text-sm leading-tight">{t.clientName}</h4>
                  <p className="text-charcoal/50 mt-0.5 font-light">Parent of <strong className="text-forest capitalize">{t.petName}</strong> ({t.petBreed})</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-24 bg-[#F8F5EF] border-t border-forest/10" id="faq-section">
        <div className="max-w-4xl mx-auto px-8 md:px-16">
          <div className="text-center mb-16 flex flex-col gap-3">
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans font-bold">Common Queries</span>
            <h2 className="font-serif text-3xl md:text-4xl text-forest font-medium">Transparent Protocols</h2>
            <p className="font-sans text-charcoal/60 text-sm max-w-lg mx-auto leading-relaxed">
              Transparent protocols on our safety requirements, sanitization, and specialized pet handling.
            </p>
          </div>

          <FAQAccordion />
        </div>
      </section>

      {/* 5. CALL TO ACTION PRE-FOOTER */}
      <section className="bg-forest text-white py-24 relative overflow-hidden text-center" id="home-cta-section">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-50px] right-20 w-80 h-80 rounded-full border border-gold/30 blur-2xl"></div>
          <div className="absolute bottom-[-50px] left-20 w-80 h-80 rounded-full border border-gold/20 blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-8 md:px-16 relative z-10 flex flex-col gap-6 items-center">
          <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold">Elevate Their Care</span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight max-w-2xl font-light">Ready to Treat Your Pet to the Five-Star Standard?</h2>
          <p className="font-sans text-white/70 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed">
            Our luxury grooming reservations are highly coveted. Book your preferred date today and let our master stylists craft absolute elegance.
          </p>
          <button
            onClick={() => onBookNow()}
            className="bg-gold hover:bg-gold-light text-forest font-sans font-semibold text-xs uppercase tracking-widest py-4 px-10 rounded-[4px] shadow-md mt-4 transition-all"
          >
            Schedule Atelier Visit
          </button>
        </div>
      </section>
    </div>
  );
}
