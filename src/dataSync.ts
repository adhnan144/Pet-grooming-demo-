import { collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { Service, BlogPost, GalleryItem, Testimonial, Appointment, TeamMember } from "./types";
import { initialServices, initialBlogPosts, initialGallery, initialTestimonials, initialTeam } from "./initialData";

// Firestore error handling as per firebase-integration skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Helper to seed a collection if it is empty
async function seedCollectionIfEmpty<T extends { id: string }>(
  collectionName: string,
  initialData: T[]
): Promise<T[]> {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      console.log(`Firestore collection is empty: ${collectionName}`);
      
      const currentUser = auth.currentUser;
      const isAdminUser = currentUser && currentUser.email === 'adhnansahil21@gmail.com';
      
      if (isAdminUser) {
        console.log(`Seeding Firestore collection: ${collectionName}`);
        for (const item of initialData) {
          const docRef = doc(db, collectionName, item.id);
          await setDoc(docRef, item);
        }
      } else {
        console.log(`Skipping seeding for collection ${collectionName} as current user is not admin.`);
      }
      return initialData;
    } else {
      const data: T[] = [];
      snapshot.forEach((doc) => {
        data.push(doc.data() as T);
      });
      return data;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, collectionName);
    return initialData;
  }
}

// 1. SERVICES
export async function getServices(): Promise<Service[]> {
  const services = await seedCollectionIfEmpty<Service>("services", initialServices);
  
  // Self-healing migration: If any service price is in USD (< 500), automatically migrate Firestore to INR
  if (services.some(s => s.price < 500)) {
    const currentUser = auth.currentUser;
    const isAdminUser = currentUser && currentUser.email === 'adhnansahil21@gmail.com';
    if (isAdminUser) {
      console.log("Migrating database services from USD to INR...");
      try {
        for (const item of initialServices) {
          const docRef = doc(db, "services", item.id);
          await setDoc(docRef, item);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, "services");
      }
    }
    return initialServices;
  }
  return services;
}

export async function saveService(service: Service): Promise<void> {
  try {
    const docRef = doc(db, "services", service.id);
    await setDoc(docRef, service);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `services/${service.id}`);
  }
}

export async function deleteService(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "services", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
  }
}

// 2. BLOG POSTS
export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await seedCollectionIfEmpty<BlogPost>("blogPosts", initialBlogPosts);
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  try {
    const docRef = doc(db, "blogPosts", post.id);
    await setDoc(docRef, post);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `blogPosts/${post.id}`);
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "blogPosts", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `blogPosts/${id}`);
  }
}

// 3. GALLERY
export async function getGallery(): Promise<GalleryItem[]> {
  return seedCollectionIfEmpty<GalleryItem>("gallery", initialGallery);
}

export async function saveGalleryItem(item: GalleryItem): Promise<void> {
  try {
    const docRef = doc(db, "gallery", item.id);
    await setDoc(docRef, item);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `gallery/${item.id}`);
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "gallery", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
  }
}

// 4. TESTIMONIALS
export async function getTestimonials(): Promise<Testimonial[]> {
  return seedCollectionIfEmpty<Testimonial>("testimonials", initialTestimonials);
}

export async function saveTestimonial(testimonial: Testimonial): Promise<void> {
  try {
    const docRef = doc(db, "testimonials", testimonial.id);
    await setDoc(docRef, testimonial);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `testimonials/${testimonial.id}`);
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "testimonials", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `testimonials/${id}`);
  }
}

// 5. TEAM MEMBERS
export async function getTeamMembers(): Promise<TeamMember[]> {
  return seedCollectionIfEmpty<TeamMember>("teamMembers", initialTeam);
}

export async function saveTeamMember(member: TeamMember): Promise<void> {
  try {
    const docRef = doc(db, "teamMembers", member.id);
    await setDoc(docRef, member);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `teamMembers/${member.id}`);
  }
}

export async function deleteTeamMember(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "teamMembers", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `teamMembers/${id}`);
  }
}

// 6. APPOINTMENTS
export async function getAppointments(userId?: string): Promise<Appointment[]> {
  try {
    const colRef = collection(db, "appointments");
    const snapshot = await getDocs(colRef);
    const data: Appointment[] = [];
    snapshot.forEach((doc) => {
      data.push(doc.data() as Appointment);
    });

    let filtered = data;
    if (userId && userId !== "admin") {
      filtered = data.filter((app) => app.userId === userId);
    }
    return filtered.sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return b.timeSlot.localeCompare(a.timeSlot);
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, "appointments");
    return [];
  }
}

export async function createAppointment(appointment: Appointment): Promise<void> {
  try {
    const docRef = doc(db, "appointments", appointment.id);
    await setDoc(docRef, appointment);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `appointments/${appointment.id}`);
  }
}

export async function updateAppointmentStatus(
  id: string,
  status: "pending" | "confirmed" | "completed" | "cancelled",
  paymentStatus?: "unpaid" | "paid"
): Promise<void> {
  try {
    const docRef = doc(db, "appointments", id);
    const updates: Record<string, any> = { status };
    if (paymentStatus) {
      updates.paymentStatus = paymentStatus;
    }
    await updateDoc(docRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `appointments/${id}`);
  }
}

export async function deleteAppointment(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "appointments", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `appointments/${id}`);
  }
}
