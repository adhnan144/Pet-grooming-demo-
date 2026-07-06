export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  category: "dog" | "cat" | "spa" | "all" | string;
  benefits: string[];
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "dogs" | "cats" | "before_after" | "spa" | "haircuts" | "salon" | string;
  imageUrl: string;
  date: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  petName: string;
  petBreed: string;
  rating: number;
  text: string;
  image: string;
  date: string;
}

export interface Appointment {
  id: string;
  userId: string; // "guest" or auth uid
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  petType: "dog" | "cat" | "other" | string;
  petBreed: string;
  petAge: number;
  petWeight: number;
  specialNotes: string;
  medicalConditions: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  groomerId: string; // "any" or specific
  groomerName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  paymentStatus: "unpaid" | "paid";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  certifications: string[];
}
