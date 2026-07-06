import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, AlertCircle, Sparkles } from "lucide-react";
import PageHeader from "./PageHeader";

export default function ContactView() {
  const [formData, setFormData] = useState({ name: "", email: "", petBreed: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setFormData({ name: "", email: "", petBreed: "", message: "" });
    }
  };

  return (
    <div id="contact-view-container">
      <PageHeader
        title="Contact Our Atelier"
        subtitle="Reserve a private styling slot or send inquiries directly to our Beverly Hills salon concierge."
        breadcrumbs={["Home", "Contact"]}
      />

      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 font-sans">
        {/* Contact details */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-2">Concierge Desk</span>
            <h2 className="font-serif text-2xl md:text-3xl text-forest font-medium">We would love to host your companion.</h2>
            <p className="text-xs text-charcoal/60 mt-2 leading-relaxed font-light">
              For immediate assistance or same-day appointment requests, please call or WhatsApp our concierge desk directly.
            </p>
          </div>

          <div className="flex flex-col gap-5 text-sm">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-gold border border-gold/15 shrink-0">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="font-semibold text-forest">Phone Booking</h4>
                <p className="text-charcoal/70 text-xs mt-0.5">+1 (555) 738-4766</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-gold border border-gold/15 shrink-0">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="font-semibold text-forest">Email Inquiries</h4>
                <p className="text-charcoal/70 text-xs mt-0.5">concierge@lateliergrooming.com</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-gold border border-gold/15 shrink-0">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="font-semibold text-forest">Atelier Address</h4>
                <p className="text-charcoal/70 text-xs mt-0.5">452 Primrose Lane, Suite B, Beverly Hills, CA 90210</p>
              </div>
            </div>
          </div>

          {/* Parking and Emergency Info card */}
          <div className="bg-[#F8F5EF] border border-forest/10 rounded-[16px] p-6 flex flex-col gap-3 font-sans text-xs shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h4 className="font-serif text-sm text-forest font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-gold" /> Parking & Concierge Notes
            </h4>
            <p className="text-charcoal/70 leading-relaxed font-light">
              We offer complimentary 2-hour underground valet parking for all pet parents. Enter the courtyard garage directly from Primrose Lane.
            </p>
            <p className="text-red-700 font-semibold leading-relaxed flex items-center gap-1">
              <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0" /> Same-day urgent request? Reach us on WhatsApp for live chat support.
            </p>
            <a
              href="https://wa.me/15557384766"
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-green-700 hover:bg-green-800 text-white font-sans font-semibold text-[10px] uppercase tracking-widest text-center py-2.5 rounded-[4px] mt-2 transition-colors cursor-pointer"
            >
              Start WhatsApp Live Chat
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-[16px] border border-forest/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-10">
          <h3 className="font-serif text-xl text-forest font-semibold mb-6 border-b border-forest/10 pb-3">Send Inquiries</h3>
          
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-forest/10 rounded-[4px] flex items-center justify-center mx-auto mb-4 text-gold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg text-forest font-semibold">Message Received</h4>
              <p className="text-xs text-charcoal/60 mt-1 max-w-xs mx-auto font-light">Thank you. Our salon host will respond to your email within 1 business hour.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-forest">
              <div className="flex flex-col gap-1.5">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adhnan Sahil"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label>Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label>Pet Companion Breed</label>
                <input
                  type="text"
                  placeholder="e.g. Samoyed, Persian Cat"
                  value={formData.petBreed}
                  onChange={(e) => setFormData(prev => ({ ...prev, petBreed: e.target.value }))}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label>Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your styling goals..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal normal-case font-sans placeholder-charcoal/30"
                />
              </div>

              <button
                type="submit"
                className="bg-forest hover:bg-forest/90 text-[#F8F5EF] font-sans font-semibold text-xs uppercase tracking-widest py-3.5 rounded-[4px] shadow-sm mt-2 transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Google Maps Embed Location */}
      <section className="h-96 w-full border-t border-gold/15 relative overflow-hidden" id="maps-embed-section">
        {/* Google Maps standard premium Beverly Hills coordinates embed */}
        <iframe
          title="L'Atelier Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.1584347710323!2d-118.4028086847844!3d34.06892112497676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04fdff8d4b%3A0x1db7d3f443cfbf90!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1657283457102!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer"
          id="google-map-iframe"
        ></iframe>
      </section>
    </div>
  );
}
