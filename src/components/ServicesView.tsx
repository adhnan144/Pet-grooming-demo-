import React, { useState } from "react";
import { Sparkles, Clock, Check, ArrowRight } from "lucide-react";
import { Service } from "../types";
import PageHeader from "./PageHeader";

interface ServicesViewProps {
  services: Service[];
  onBookNow: (serviceId: string) => void;
}

export default function ServicesView({ services, onBookNow }: ServicesViewProps) {
  const [activeTab, setActiveTab] = useState<"all" | "dog" | "cat" | "spa">("all");

  const categories = [
    { id: "all", label: "All Treatments" },
    { id: "dog", label: "Canine Care" },
    { id: "cat", label: "Feline Care" },
    { id: "spa", label: "Luxury Spa" }
  ];

  const filteredServices = services.filter((svc) => {
    if (activeTab === "all") return true;
    return svc.category === activeTab;
  });

  return (
    <div id="services-view-container">
      <PageHeader
        title="Bespoke Grooming Treatments"
        subtitle="Meticulous styling, natural skin therapy, and stress-free sensory environments tailored for dogs and cats."
        breadcrumbs={["Home", "Services"]}
      />

      {/* Categories filter tabs */}
      <section className="py-12 max-w-7xl mx-auto px-8 md:px-16 flex justify-center border-b border-forest/10 font-sans text-xs font-bold uppercase tracking-widest gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id as any)}
            className={`py-2 px-5 rounded-[4px] border cursor-pointer transition-all focus:outline-none ${
              activeTab === cat.id
                ? "bg-forest text-[#F8F5EF] border-forest shadow-sm"
                : "border-forest/15 text-charcoal/60 hover:border-gold hover:text-forest bg-transparent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-forest/5 rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-all duration-300 group"
            >
              {/* Service image block */}
              <div className="md:w-2/5 relative shrink-0 aspect-[4/3] md:aspect-auto">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <span className="absolute bottom-4 left-4 bg-forest text-gold text-xs font-bold px-3 py-1.5 rounded-[4px] border border-gold/25 shadow-sm">
                  From ₹{service.price}
                </span>
              </div>

              {/* Service text content block */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1 font-sans">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl text-forest font-semibold leading-tight">{service.name}</h3>
                    <span className="text-[9px] uppercase tracking-wider font-bold bg-[#F8F5EF] border border-gold/15 text-forest px-2 py-0.5 rounded-[2px] ml-2 shrink-0 capitalize">
                      {service.category}
                    </span>
                  </div>

                  <p className="text-xs text-charcoal/60 leading-relaxed mb-4 font-light">{service.description}</p>

                  {/* Service benefits list */}
                  <div className="flex flex-col gap-2 border-t border-forest/5 pt-4 mt-2">
                    <span className="block text-[9px] uppercase font-bold tracking-wider text-charcoal/40">Treatment Includes</span>
                    <div className="flex flex-col gap-1.5 text-xs">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span className="text-charcoal/80 font-medium text-[11px] leading-tight font-light">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer block with book button */}
                <div className="border-t border-forest/5 pt-5 mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-1 font-mono text-[10px] text-charcoal/50">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>{service.duration}</span>
                  </div>
                  <button
                    onClick={() => onBookNow(service.id)}
                    className="bg-forest hover:bg-gold hover:text-forest text-white font-sans font-semibold text-xs uppercase tracking-widest py-2.5 px-6 rounded-[4px] shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Reserve Now <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spa Package Callout */}
      <section className="bg-forest text-white py-24 relative overflow-hidden text-center">
        <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col gap-6 items-center">
          <Sparkles className="w-8 h-8 text-gold" />
          <h2 className="font-serif text-2xl md:text-4xl text-white font-medium max-w-xl mx-auto leading-tight">
            Curated Botanical & Anti-Allergenic Shampoos
          </h2>
          <p className="font-sans text-white/70 text-sm max-w-md mx-auto font-light leading-relaxed">
            We utilize strictly natural, certified organic, sulfate-free grooming topicals imported directly from France. Formulated to calm local skin inflammation and nourish deep coat roots.
          </p>
        </div>
      </section>
    </div>
  );
}
