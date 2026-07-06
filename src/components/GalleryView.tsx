import React, { useState } from "react";
import { X, Search, ZoomIn } from "lucide-react";
import { GalleryItem } from "../types";
import PageHeader from "./PageHeader";

interface GalleryViewProps {
  gallery: GalleryItem[];
}

export default function GalleryView({ gallery }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filters = [
    { id: "all", label: "All Photos" },
    { id: "dogs", label: "Dogs" },
    { id: "cats", label: "Cats" },
    { id: "before_after", label: "Before & After" },
    { id: "spa", label: "Spa Treatments" },
    { id: "haircuts", label: "Styling Clips" },
    { id: "salon", label: "The Atelier" }
  ];

  const filteredItems = gallery.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  return (
    <div id="gallery-view-container">
      <PageHeader
        title="The Atelier Gallery"
        subtitle="Meticulous scissoring, breed styling, and sensory spa moments captured inside our quiet Beverly Hills sanctuary."
        breadcrumbs={["Home", "Gallery"]}
      />

      {/* Filter Tabs */}
      <section className="py-12 max-w-7xl mx-auto px-8 md:px-16 flex flex-wrap justify-center gap-2 border-b border-forest/10 font-sans text-xs font-bold uppercase tracking-widest">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`py-2.5 px-5 rounded-[4px] border cursor-pointer transition-all focus:outline-none ${
              activeFilter === filter.id
                ? "bg-forest text-[#F8F5EF] border-forest shadow-sm"
                : "border-forest/15 text-charcoal/60 hover:border-gold hover:text-forest bg-transparent"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </section>

      {/* Masonry Grid */}
      <section className="py-24 max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-[#F8F5EF] border border-forest/5 rounded-[16px] overflow-hidden aspect-[4/3] relative group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-forest/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <span className="text-gold text-[10px] font-bold uppercase tracking-[0.25em] font-sans">
                  {item.category.replace("_", " ")}
                </span>
                <div className="flex justify-between items-center w-full font-sans text-white">
                  <div>
                    <h3 className="font-serif text-lg font-semibold leading-tight">{item.title}</h3>
                    <span className="text-[10px] text-white/50 block mt-1">{item.date}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gold bg-white/5 shrink-0">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-forest/95 backdrop-blur-md flex items-center justify-center p-6"
          id="gallery-lightbox-modal"
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 p-2 rounded-[4px] border border-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl w-full flex flex-col gap-4 font-sans text-white text-center">
            <div className="rounded-[16px] overflow-hidden border border-gold/20 max-h-[70vh] flex items-center justify-center bg-forest">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
            <div>
              <span className="text-gold text-xs uppercase tracking-widest font-semibold">
                {selectedItem.category.replace("_", " ")}
              </span>
              <h3 className="font-serif text-xl font-medium mt-1">{selectedItem.title}</h3>
              <span className="text-xs text-white/50 block mt-1">{selectedItem.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
