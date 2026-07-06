import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Calendar, Clock, Sparkles, AlertCircle, CheckCircle, ArrowRight, Star, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Service, Appointment, TeamMember } from "../types";
import { getServices, getTeamMembers, createAppointment } from "../dataSync";
import { auth } from "../firebase";

interface AppointmentBookingProps {
  initialServiceId?: string;
  onSuccess: () => void;
  onNavigate: (page: string) => void;
}

export default function AppointmentBooking({ initialServiceId, onSuccess, onNavigate }: AppointmentBookingProps) {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [groomers, setGroomers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Booking details state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [petType, setPetType] = useState<"dog" | "cat" | "other" | "">("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState<number | "">("");
  const [petWeight, setPetWeight] = useState<number | "">("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedGroomer, setSelectedGroomer] = useState<TeamMember | "any">("any");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // Success state
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesData, groomersData] = await Promise.all([
          getServices(),
          getTeamMembers()
        ]);
        setServices(servicesData);
        setGroomers(groomersData);

        // Auto-select initial service if passed in
        if (initialServiceId) {
          const service = servicesData.find(s => s.id === initialServiceId);
          if (service) {
            setSelectedService(service);
            setPetType(service.category as any);
          }
        }

        // Auto-fill logged in user info
        const user = auth.currentUser;
        if (user) {
          setClientEmail(user.email || "");
          setClientName(user.displayName || user.email?.split("@")[0] || "");
        }
      } catch (err) {
        console.error("Error loading booking details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [initialServiceId]);

  // Handle steps navigation
  const nextStep = () => {
    if (validateStep()) {
      setError("");
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setError("");
    setStep(prev => prev - 1);
  };

  const validateStep = (): boolean => {
    if (step === 1) {
      if (!petType) {
        setError("Please choose your pet type to begin.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!petBreed.trim()) {
        setError("Please specify the breed.");
        return false;
      }
      if (petAge === "" || Number(petAge) < 0) {
        setError("Please specify a valid age.");
        return false;
      }
      if (petWeight === "" || Number(petWeight) <= 0) {
        setError("Please specify a valid weight.");
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!selectedService) {
        setError("Please select a grooming service.");
        return false;
      }
      return true;
    }
    if (step === 4) {
      if (!selectedGroomer) {
        setError("Please select a groomer preference.");
        return false;
      }
      return true;
    }
    if (step === 5) {
      if (!selectedDate) {
        setError("Please select a valid date.");
        return false;
      }
      // Check date isn't in past
      const today = new Date().toISOString().split("T")[0];
      if (selectedDate < today) {
        setError("You cannot select a date in the past.");
        return false;
      }
      return true;
    }
    if (step === 6) {
      if (!selectedTimeSlot) {
        setError("Please choose an available time slot.");
        return false;
      }
      // Client contact check in step 6 before confirming
      if (!clientName.trim()) {
        setError("Please provide your name.");
        return false;
      }
      if (!clientEmail.trim() || !clientEmail.includes("@")) {
        setError("Please provide a valid email address.");
        return false;
      }
      if (!clientPhone.trim() || clientPhone.length < 7) {
        setError("Please provide a valid contact phone number.");
        return false;
      }
      return true;
    }
    return true;
  };

  // Submit appointment booking
  const handleBookingConfirm = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError("");

    try {
      const user = auth.currentUser;
      const groomerNameObj = selectedGroomer === "any" ? "Any Available Master Stylist" : selectedGroomer.name;
      const groomerIdVal = selectedGroomer === "any" ? "any" : selectedGroomer.id;

      const newApp: Appointment = {
        id: "apt-" + Math.random().toString(36).substring(2, 9),
        userId: user ? user.uid : "guest",
        clientName,
        clientEmail,
        clientPhone,
        petType,
        petBreed,
        petAge: Number(petAge),
        petWeight: Number(petWeight),
        specialNotes,
        medicalConditions,
        serviceId: selectedService!.id,
        serviceName: selectedService!.name,
        servicePrice: selectedService!.price,
        groomerId: groomerIdVal,
        groomerName: groomerNameObj,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        status: "pending",
        createdAt: new Date().toISOString(),
        paymentStatus: "unpaid"
      };

      await createAppointment(newApp);
      setConfirmedAppointment(newApp);
      setIsSuccess(true);
    } catch (err) {
      console.error("Booking error:", err);
      setError("An error occurred while confirming your booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Elegant static calendar day list for selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const isSunday = nextDay.getDay() === 0;
      if (!isSunday) { // Salon is closed Sundays
        dates.push(nextDay);
      }
    }
    return dates;
  };

  const datesToBook = generateDates();

  const timeSlots = [
    "08:30 AM",
    "10:00 AM",
    "11:30 AM",
    "01:30 PM",
    "03:00 PM",
    "04:30 PM"
  ];

  if (loading && services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (isSuccess && confirmedAppointment) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-white rounded-[16px] border border-forest/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden p-8 md:p-12 text-center"
        id="booking-success-view"
      >
        <div className="w-16 h-16 bg-forest/10 rounded-[4px] flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-gold" />
        </div>
        <span className="text-xs uppercase tracking-widest font-bold text-gold font-sans block mb-2">Reservation Secured</span>
        <h2 className="font-serif text-3xl md:text-4xl text-forest font-medium mb-4">Your Salon Spot is Requested</h2>
        <p className="font-sans text-charcoal/70 text-sm max-w-lg mx-auto mb-8 leading-relaxed font-light">
          Thank you, <strong className="text-forest font-semibold">{confirmedAppointment.clientName}</strong>! 
          We have sent a notification to <span className="text-forest font-semibold underline">{confirmedAppointment.clientEmail}</span>. 
          Our atelier concierge will confirm your slot within 2 hours.
        </p>

        {/* Appointment Details summary card */}
        <div className="bg-[#F8F5EF] rounded-[16px] p-6 text-left border border-forest/10 mb-8 max-w-md mx-auto font-sans text-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <h3 className="font-serif text-base text-forest mb-4 font-semibold border-b border-forest/10 pb-2">Salon Confirmation Summary</h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between">
              <span className="text-charcoal/60">Reference ID:</span>
              <span className="font-mono text-xs font-semibold uppercase">{confirmedAppointment.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/60">Pet Companion:</span>
              <span className="text-forest font-semibold capitalize">{confirmedAppointment.petBreed} ({confirmedAppointment.petType})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/60">Service Requested:</span>
              <span className="text-forest font-semibold">{confirmedAppointment.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/60">Groomer Preference:</span>
              <span className="text-forest font-semibold">{confirmedAppointment.groomerName}</span>
            </div>
            <div className="flex justify-between border-t border-forest/10 pt-2.5 mt-1">
              <span className="text-charcoal/60 font-medium">Date & Time:</span>
              <span className="text-forest font-semibold">{confirmedAppointment.date} @ {confirmedAppointment.timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/60 font-medium">Starting Fee:</span>
              <span className="text-gold font-bold text-base">₹{confirmedAppointment.servicePrice}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate("dashboard")}
            className="bg-forest hover:bg-[#F8F5EF] hover:text-forest border border-forest text-[#F8F5EF] font-semibold tracking-wider font-sans text-sm py-3 px-8 rounded-[4px] shadow-sm transition-all cursor-pointer"
          >
            Go to My Dashboard
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="border border-forest/20 hover:border-gold hover:text-gold text-forest font-semibold tracking-wider font-sans text-sm py-3 px-8 rounded-[4px] transition-all cursor-pointer bg-transparent"
          >
            Return to Homepage
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" id="booking-wizard-container">
      {/* Steps Indicator Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-xs tracking-widest uppercase font-bold text-charcoal/50 mb-3 font-sans">
          <span>Step {step} of 6</span>
          <span className="text-gold">
            {step === 1 && "Choose Companion"}
            {step === 2 && "Companion Profile"}
            {step === 3 && "Select Service"}
            {step === 4 && "Master Stylist"}
            {step === 5 && "Reservation Date"}
            {step === 6 && "Reserve Slot"}
          </span>
        </div>
        <div className="w-full bg-[#F8F5EF] rounded-[4px] h-1.5 border border-forest/10">
          <div 
            className="bg-gold h-1.5 rounded-[4px] transition-all duration-500" 
            style={{ width: `${(step / 6) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-[4px] flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <span className="text-sm font-sans text-red-700">{error}</span>
        </div>
      )}

      {/* Main wizard forms */}
      <div className="bg-white rounded-[16px] border border-forest/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-10">
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div className="text-center md:text-left mb-2">
              <h2 className="font-serif text-2xl md:text-3xl text-forest font-medium mb-1">Choose Your Pet Companion</h2>
              <p className="font-sans text-sm text-charcoal/60 font-light">Let us know what kind of pet companion we will be hosting in our salon.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: "dog", label: "Canine (Dog)", icon: "🐶", desc: "For small, medium, large, and giant dog breeds." },
                { type: "cat", label: "Feline (Cat)", icon: "🐱", desc: "Sensory-sensitive customized styling for cats." },
                { type: "other", label: "Other Companion", icon: "🐹", desc: "For other exotic companion pets (rabbits, etc)." }
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setPetType(item.type as any)}
                  className={`border-2 p-6 rounded-[16px] flex flex-col items-center text-center gap-4 transition-all duration-300 cursor-pointer bg-transparent ${
                    petType === item.type 
                      ? "border-gold bg-[#F8F5EF] shadow-md scale-[1.01]" 
                      : "border-[#F8F5EF] hover:border-gold/40 hover:bg-[#F8F5EF]/50"
                  }`}
                >
                  <span className="text-4xl">{item.icon}</span>
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-forest">{item.label}</h3>
                    <p className="font-sans text-xs text-charcoal/60 mt-1 font-light">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div className="text-center md:text-left mb-2">
              <h2 className="font-serif text-2xl md:text-3xl text-forest font-medium mb-1">Companion Details</h2>
              <p className="font-sans text-sm text-charcoal/60 font-light">This allows our stylists to curate the exact tools and custom bath infusions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-forest">
                <label>Companion Breed *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Golden Retriever, Persian"
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30"
                />
              </div>
              <div className="flex flex-col gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-forest">
                <label>Companion Age (Years) *</label>
                <input
                  type="number"
                  required
                  min={0}
                  placeholder="e.g. 3"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30"
                />
              </div>
              <div className="flex flex-col gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-forest">
                <label>Companion Weight (lbs) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  placeholder="e.g. 25"
                  value={petWeight}
                  onChange={(e) => setPetWeight(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="flex flex-col gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-forest">
                <label>Special Styling Notes / Requests</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Cut around ears short, preserve coat on back, tail fluffy..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30 normal-case font-sans"
                />
              </div>
              <div className="flex flex-col gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-forest">
                <label className="text-red-700 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-red-600 stroke-red-600" /> Medical Conditions / Sensitivities
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Heart murmur, arthritis in rear hip, skin allergy to chamomile..."
                  value={medicalConditions}
                  onChange={(e) => setMedicalConditions(e.target.value)}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30 normal-case font-sans"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div className="text-center md:text-left mb-2">
              <h2 className="font-serif text-2xl md:text-3xl text-forest font-medium mb-1">Select Grooming Service</h2>
              <p className="font-sans text-sm text-charcoal/60 font-light">Select from our range of meticulously curated botanical and custom treatments.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto max-h-[450px] pr-2">
              {services
                .filter(s => s.category === "all" || s.category === "spa" || s.category === petType)
                .map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`border-2 p-5 rounded-[16px] flex text-left gap-4 cursor-pointer transition-all duration-300 bg-transparent ${
                      selectedService?.id === service.id
                        ? "border-gold bg-[#F8F5EF] shadow-md"
                        : "border-[#F8F5EF] hover:border-gold/40 hover:bg-[#F8F5EF]/50"
                    }`}
                  >
                    <img src={service.image} alt={service.name} className="w-20 h-20 rounded-[4px] object-cover shrink-0 my-auto border border-forest/10" />
                    <div className="flex flex-col justify-between h-full font-sans">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif font-semibold text-base text-forest leading-tight">{service.name}</h3>
                          <span className="text-gold font-bold text-sm shrink-0 ml-2">₹{service.price}</span>
                        </div>
                        <p className="text-xs text-charcoal/60 mt-1 line-clamp-2 leading-relaxed font-light">{service.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 font-mono text-[10px] text-charcoal/50 font-light">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-6">
            <div className="text-center md:text-left mb-2">
              <h2 className="font-serif text-2xl md:text-3xl text-forest font-medium mb-1">Select Master Stylist Preference</h2>
              <p className="font-sans text-sm text-charcoal/60 font-light">Choose a trusted certified stylist or select ANY available groomer for fastest booking.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => setSelectedGroomer("any")}
                className={`border-2 p-5 rounded-[16px] flex flex-col items-center text-center justify-center gap-3 cursor-pointer transition-all bg-transparent ${
                  selectedGroomer === "any"
                    ? "border-gold bg-[#F8F5EF] shadow-md scale-[1.01]"
                    : "border-[#F8F5EF] hover:border-gold/40 hover:bg-[#F8F5EF]/50"
                }`}
              >
                <div className="w-16 h-16 rounded-[4px] bg-forest flex items-center justify-center text-gold border border-gold/30">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-sm text-forest">Any Available</h3>
                  <span className="block text-[10px] text-gold uppercase tracking-wider mt-1 font-bold">Fastest Booking</span>
                </div>
              </button>

              {groomers.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGroomer(g)}
                  className={`border-2 p-4 rounded-[16px] flex flex-col items-center text-center gap-3 cursor-pointer transition-all bg-transparent ${
                    typeof selectedGroomer !== "string" && selectedGroomer.id === g.id
                      ? "border-gold bg-[#F8F5EF] shadow-md scale-[1.01]"
                      : "border-[#F8F5EF] hover:border-gold/40 hover:bg-[#F8F5EF]/50"
                  }`}
                >
                  <img src={g.image} alt={g.name} className="w-16 h-16 rounded-[4px] object-cover border border-forest/10" />
                  <div>
                    <h3 className="font-serif font-semibold text-sm text-forest leading-tight">{g.name}</h3>
                    <span className="block text-[10px] text-charcoal/50 mt-0.5 font-light">{g.role}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col gap-6">
            <div className="text-center md:text-left mb-2">
              <h2 className="font-serif text-2xl md:text-3xl text-forest font-medium mb-1">Select Reservation Date</h2>
              <p className="font-sans text-sm text-charcoal/60 font-light">Choose your desired grooming date. The salon is closed on Sundays.</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-h-[300px] overflow-y-auto pr-2">
              {datesToBook.map((dateObj) => {
                const dayStr = dateObj.toLocaleDateString("en-US", { weekday: "short" });
                const dayNum = dateObj.getDate();
                const monthStr = dateObj.toLocaleDateString("en-US", { month: "short" });
                const isoDateStr = dateObj.toISOString().split("T")[0];

                return (
                  <button
                    key={isoDateStr}
                    onClick={() => setSelectedDate(isoDateStr)}
                    className={`border-2 p-4 rounded-[16px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-all bg-transparent ${
                      selectedDate === isoDateStr
                        ? "border-gold bg-[#F8F5EF] shadow-md scale-[1.01]"
                        : "border-[#F8F5EF] hover:border-gold/40 hover:bg-[#F8F5EF]/50"
                    }`}
                  >
                    <span className="font-sans text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">{dayStr}</span>
                    <span className="font-serif text-xl font-bold text-forest">{dayNum}</span>
                    <span className="font-sans text-[10px] font-bold text-gold uppercase tracking-widest">{monthStr}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="flex flex-col gap-6">
            <div className="text-center md:text-left mb-2">
              <h2 className="font-serif text-2xl md:text-3xl text-forest font-medium mb-1">Select Time Slot & Provide Contact</h2>
              <p className="font-sans text-sm text-charcoal/60 font-light">Finalize your timeslot and let us know where to send booking updates.</p>
            </div>

            {/* Time slot picker */}
            <div className="flex flex-col gap-2 font-sans">
              <span className="text-sm font-bold uppercase tracking-widest text-forest flex items-center gap-1 mb-1">
                <Clock className="w-4 h-4 text-gold" /> Choose Your Time
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTimeSlot(time)}
                    className={`border py-3 rounded-[4px] font-sans text-xs font-bold cursor-pointer transition-all bg-transparent ${
                      selectedTimeSlot === time
                        ? "border-gold bg-forest text-gold shadow-md"
                        : "border-forest/10 bg-[#F8F5EF]/30 text-forest hover:border-gold/40 hover:bg-[#F8F5EF]/80"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Contact Info */}
            <div className="border-t border-forest/10 pt-6 mt-2 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-forest">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adhnan Sahil"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30"
                />
              </div>
              <div className="flex flex-col gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-forest">
                <label>Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. you@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30"
                />
              </div>
              <div className="flex flex-col gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-forest">
                <label>Your Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98200 12345"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#F8F5EF] border border-forest/10 rounded-[4px] px-4 py-3 focus:border-gold focus:outline-none focus:bg-white text-sm text-charcoal font-normal placeholder-charcoal/30"
                />
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between border-t border-forest/10 pt-6 mt-8 font-sans">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-forest hover:text-gold transition-colors focus:outline-none cursor-pointer bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < 6 ? (
            <button
              onClick={nextStep}
              className="bg-forest text-[#F8F5EF] hover:bg-forest/95 font-bold tracking-widest text-xs uppercase py-3.5 px-6 rounded-[4px] shadow-sm flex items-center gap-1 cursor-pointer"
            >
              Next Step <ChevronRight className="w-4 h-4 text-gold" />
            </button>
          ) : (
            <button
              onClick={handleBookingConfirm}
              className="bg-gold hover:bg-gold-light text-forest font-bold tracking-widest text-xs uppercase py-3.5 px-8 rounded-[4px] shadow-sm flex items-center gap-1 cursor-pointer"
              id="confirm-booking-btn"
            >
              Confirm Booking <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
