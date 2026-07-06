import React, { useState, useEffect } from "react";
import { Calendar, Clock, Sparkles, CheckCircle, XCircle, Trash2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Appointment } from "../types";
import { getAppointments, updateAppointmentStatus } from "../dataSync";
import { auth } from "../firebase";

interface CustomerDashboardProps {
  onNavigateToBooking: () => void;
}

export default function CustomerDashboard({ onNavigateToBooking }: CustomerDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserAppointments() {
      const user = auth.currentUser;
      if (user) {
        try {
          const data = await getAppointments(user.uid);
          setAppointments(data);
        } catch (err) {
          console.error("Error loading user bookings:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    loadUserAppointments();
  }, []);

  const handleCancel = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel this grooming reservation?")) {
      try {
        await updateAppointmentStatus(id, "cancelled");
        // Update local state
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "cancelled" } : a));
      } catch (err) {
        console.error("Failed to cancel reservation:", err);
      }
    }
  };

  const user = auth.currentUser;

  return (
    <div className="max-w-4xl mx-auto font-sans" id="customer-dashboard-view">
      <div className="bg-white rounded-[16px] border border-forest/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-10 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-forest/10 pb-6 mb-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold block mb-1">Your Sanctuary Portal</span>
            <h2 className="font-serif text-2xl md:text-3xl text-forest font-medium">
              Hello, {user?.displayName || user?.email?.split("@")[0] || "Pet Parent"}
            </h2>
            <p className="text-xs text-charcoal/60 mt-0.5 font-light">Manage your upcoming luxury salon reservations and companion profiles.</p>
          </div>
          <button
            onClick={onNavigateToBooking}
            className="bg-gold hover:bg-gold-light text-forest font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-[4px] shadow-sm transition-all shrink-0 cursor-pointer"
          >
            New Reservation
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-forest/20 rounded-[16px] bg-[#F8F5EF]/50">
            <Calendar className="w-10 h-10 text-gold/40 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-forest font-medium">No Reservations Yet</h3>
            <p className="text-sm text-charcoal/60 max-w-sm mx-auto mt-1 mb-6 font-light">You do not have any scheduled appointments. Give your pet the premium treatment they deserve.</p>
            <button
              onClick={onNavigateToBooking}
              className="bg-forest text-[#F8F5EF] font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded-[4px] shadow-sm cursor-pointer hover:bg-forest/90"
            >
              Book First Appointment
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <h3 className="font-serif text-lg text-forest font-semibold border-b border-forest/5 pb-2">Appointment History</h3>
            {appointments.map((appt) => (
              <div 
                key={appt.id} 
                className="border border-forest/10 rounded-[16px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all bg-[#F8F5EF]/30"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="w-12 h-12 rounded-[4px] bg-forest/10 flex items-center justify-center text-gold shrink-0 border border-gold/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] font-semibold text-gold tracking-widest uppercase">{appt.id}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-[4px] border ${
                        appt.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        appt.status === "confirmed" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        appt.status === "completed" ? "bg-green-50 text-green-700 border-green-200" :
                        "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                    <h4 className="font-serif text-base text-forest font-semibold mt-1">{appt.serviceName}</h4>
                    <p className="text-xs text-charcoal/60 mt-0.5 font-sans font-light">
                      For <strong className="text-forest capitalize">{appt.petBreed} ({appt.petType})</strong> &bull; Weight: {appt.petWeight} lbs
                    </p>
                    {appt.specialNotes && (
                      <p className="text-xs text-charcoal/50 italic mt-1.5 font-sans font-light">" {appt.specialNotes} "</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between border-t border-forest/10 pt-4 md:border-t-0 md:pt-0 shrink-0">
                  <div className="font-sans text-xs">
                    <div className="flex items-center gap-1 font-semibold text-forest">
                      <Calendar className="w-3.5 h-3.5 text-gold" /> {appt.date}
                    </div>
                    <div className="flex items-center gap-1 text-charcoal/60 mt-1 font-light">
                      <Clock className="w-3.5 h-3.5 text-gold" /> {appt.timeSlot}
                    </div>
                    <div className="text-[10px] text-charcoal/40 uppercase tracking-widest mt-1 font-bold">Stylist: {appt.groomerName}</div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-forest font-bold text-lg">₹{appt.servicePrice}</span>
                    {appt.status !== "completed" && appt.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancel(appt.id)}
                        className="text-red-500 hover:text-white border border-red-200 bg-red-50 hover:bg-red-500 px-3 py-1.5 rounded-[4px] text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
                      >
                        Cancel Spot
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
