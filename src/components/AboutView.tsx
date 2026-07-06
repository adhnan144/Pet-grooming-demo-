import React from "react";
import { Award, Shield, Sparkles, Check, CheckCircle2 } from "lucide-react";
import { TeamMember } from "../types";
import PageHeader from "./PageHeader";

interface AboutViewProps {
  team: TeamMember[];
  onNavigate: (page: string) => void;
}

export default function AboutView({ team, onNavigate }: AboutViewProps) {
  const credentials = [
    "International Professional Groomers (IPG) Master Certifications",
    "National Certified Feline Groomers Association Membership",
    "Holistic Pet Esthetics & Hydrotherapy Certifications",
    "Certified Low-Stress Handling & Animal Behavioral Calmness",
    "Veterinary Advisory Board for Safe Product Infusion",
    "Full Pet CPR and Emergency First Aid Safety Accreditation"
  ];

  return (
    <div id="about-view-container">
      <PageHeader 
        title="Our Story & Philosophy"
        subtitle="Crafting a serene grooming experience dedicated to exceptional styling and absolute emotional comfort."
        breadcrumbs={["Home", "About Us"]}
      />

      {/* Philosophy Section */}
      <section className="py-24 max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6">
          <span className="inline-block px-3 py-1 border border-gold text-gold text-[10px] uppercase tracking-[0.2em] font-semibold rounded-[2px] mb-4">
            Who We Are
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-forest font-medium mb-6">Born from a vision of kindness and elite craftsmanship.</h2>
          <div className="flex flex-col gap-4 font-sans text-charcoal/70 text-sm leading-relaxed font-light">
            <p>
              L'Atelier was founded in Beverly Hills by master stylist Elena Rostov with a single purpose: to completely dismantle the crowded, high-stress, noisy paradigm of traditional commercial pet salons.
            </p>
            <p>
              We believe grooming is an essential health practice—not a stressful cosmetic assembly line. Your companion is a sentient individual who deserves dedicated time, quiet ambient acoustic space, and pH-balanced organic skincare products that preserve their natural protective skin layer.
            </p>
            <p>
              Today, our certified team members care for every dog and cat with the meticulous professionalism, precision styling, and absolute tenderness of a five-star hotel.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 relative flex justify-center">
          <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-t-[200px] rounded-b-none overflow-hidden border border-gold/15 shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=700" 
              alt="Elite pet grooming" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline Values Section */}
      <section className="bg-[#F8F5EF] border-y border-forest/10 py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Values */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold mb-2 block font-medium">Accreditation</span>
            <h2 className="font-serif text-3xl text-forest font-medium mb-6">Our Strict Standards</h2>
            <p className="font-sans text-charcoal/70 text-sm mb-6 leading-relaxed font-light">
              Every groomer in our Beverly Hills atelier must satisfy rigorous certified training in pet behavior, skin biology, and low-stress handling methods.
            </p>
            <div className="flex flex-col gap-3 font-sans text-sm font-semibold text-forest">
              {credentials.map((cred, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-charcoal/85 text-xs font-medium leading-tight font-light">{cred}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline chart */}
          <div className="lg:col-span-7 bg-white rounded-[16px] border border-forest/5 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-sans text-sm">
            <h3 className="font-serif text-lg text-forest font-semibold mb-8">The Path to L'Atelier</h3>
            <div className="flex flex-col gap-8 relative border-l border-gold/25 pl-6 ml-2">
              {[
                { year: "2018", title: "The Sanctuary Vision", desc: "Elena Rostov establishes her private custom grooming practice, perfecting noise-controlled sensory methods for anxious felines." },
                { year: "2021", title: "Atelier Opening", desc: "We open our formal luxury studio in Beverly Hills, fully designed with custom acoustic insulation, private suites, and custom baths." },
                { year: "2024", title: "National Acclaim", desc: "Awarded 'Most Compassionate Salon' by Pet Wellness Coalition, setting the standard for premium, clean pet care." }
              ].map((milestone, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute top-1.5 left-[-31px] w-4 h-4 rounded-full bg-gold border-2 border-white"></div>
                  <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest">{milestone.year}</span>
                  <h4 className="font-serif text-base text-forest font-semibold mt-1">{milestone.title}</h4>
                  <p className="text-charcoal/60 text-xs mt-1 leading-relaxed font-light">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Groomers */}
      <section className="py-24 max-w-7xl mx-auto px-8 md:px-16" id="team-section">
        <div className="text-center mb-16 flex flex-col gap-3">
          <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans font-bold">Master Artisans</span>
          <h2 className="font-serif text-3xl md:text-4xl text-forest font-medium">Meet Our Elite Grooming Staff</h2>
          <p className="font-sans text-charcoal/60 text-sm max-w-lg mx-auto leading-relaxed">
            Our certified specialists treat your companions with five-star tenderness, matching their breed's anatomy and personality perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((g) => (
            <div key={g.id} className="bg-white border border-forest/5 rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden group hover:shadow-md transition-all duration-300 font-sans">
              <div className="relative aspect-square overflow-hidden bg-cream">
                <img src={g.image} alt={g.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="text-gold text-[10px] uppercase font-bold tracking-widest block mb-1">{g.role}</span>
                <h3 className="font-serif text-lg text-forest font-semibold">{g.name}</h3>
                <p className="text-charcoal/70 text-xs mt-2.5 leading-relaxed font-light">{g.bio}</p>
                
                {/* Certifications list */}
                <div className="border-t border-forest/5 pt-4 mt-4">
                  <span className="block text-[10px] text-charcoal/40 uppercase font-semibold tracking-wider mb-2">Qualifications</span>
                  <div className="flex flex-col gap-1.5 text-xs">
                    {g.certifications.map((cert, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 text-charcoal/85">
                        <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span className="font-medium text-[11px] font-light">{cert}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
