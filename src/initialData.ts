import { Service, BlogPost, GalleryItem, Testimonial, TeamMember } from "./types";

export const initialServices: Service[] = [
  {
    id: "dog-grooming-signature",
    name: "Signature Dog Grooming",
    description: "Our signature styling treatment designed for your dog's breed standard or custom styling preference. Relaxing, meticulous, and fully tailored.",
    duration: "90 min",
    price: 3500,
    category: "dog",
    benefits: [
      "Double-warm organic botanic bath",
      "Stress-free hand blow-dry & fluff",
      "Full coat clip & precision scissoring",
      "Sanitary trim & paw pad maintenance",
      "Nail trim, filing, and ear cleaning"
    ],
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cat-grooming-luxe",
    name: "Luxe Cat Grooming",
    description: "An ultra-gentle, low-sensory grooming experience for felines. Focuses on relaxation, coat health, and minimizing stress.",
    duration: "75 min",
    price: 4200,
    category: "cat",
    benefits: [
      "Gentle foaming dry-bath or warm rinse",
      "Meticulous combing & de-matting treatment",
      "Nail capping or trimming",
      "Eyes & ears gentle hygiene refresh",
      "Soothe-mist coat conditioning spray"
    ],
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "spa-package-botanical",
    name: "Botanical Luxury Spa Package",
    description: "The ultimate pet indulgence. Uses bespoke organic essential oil blends, thermal wraps, and advanced therapeutic skincare.",
    duration: "120 min",
    price: 6000,
    category: "spa",
    benefits: [
      "Blueberry & coconut facial scrub",
      "Warm mineral mud bath treatment",
      "Paw massage with lavender-shea butter balm",
      "Ultrasonic teeth brushing & plaque refresh",
      "Aromatherapy conditioning and silk coat finish"
    ],
    image: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "bath-blow-dry-essential",
    name: "Essential Bath & Blow Dry",
    description: "Ideal for intermediate maintenance between major style cuts. Keeps the coat deeply cleansed, de-shedded, and refreshed.",
    duration: "45 min",
    price: 2000,
    category: "dog",
    benefits: [
      "Hydro-surge premium therapeutic bath",
      "De-shedding brushing & high-velocity blow dry",
      "Nail trimming & ear cleaning",
      "Gourmet paw-perfume finish"
    ],
    image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "breed-styling-master",
    name: "Master Class Breed Styling",
    description: "Precision hand-scissoring and advanced styling tailored strictly to AKC breed standards, executed by our master stylists.",
    duration: "120 min",
    price: 5000,
    category: "dog",
    benefits: [
      "Custom anatomical assessment",
      "Precision hand-scissoring & texturizing",
      "Show-quality coat definition and balance",
      "Gentle skin-calming therapy"
    ],
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "teeth-cleaning-hygiene",
    name: "Advanced Teeth & Oral Care",
    description: "Non-anesthetic cosmetic dental cleaning to control plaque, tartar, and promote excellent pet breath hygiene.",
    duration: "30 min",
    price: 1500,
    category: "spa",
    benefits: [
      "Enzymatic gel brushing",
      "Manual surface plaque scraping",
      "Soothing gum treatment",
      "Breath refresher mist"
    ],
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "t1",
    clientName: "Eleanor Vance",
    petName: "Milo",
    petBreed: "Samoyed",
    rating: 5,
    text: "The absolute pinnacle of pet care. Milo has high anxiety, but the quiet, modern luxury of this salon completely changed his outlook. He came home looking like a cloud and perfectly calm.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    date: "2026-06-25"
  },
  {
    id: "t2",
    clientName: "Marcus Sterling",
    petName: "Winston",
    petBreed: "French Bulldog",
    rating: 5,
    text: "They treat Winston with the care of a five-star hotel concierge. The botanical facial scrub and paw massages are incredible. Truly a luxury service that is worth every single rupee.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    date: "2026-07-01"
  },
  {
    id: "t3",
    clientName: "Sofia Alvarez",
    petName: "Cleo",
    petBreed: "Persian Cat",
    rating: 5,
    text: "Finding a salon that specializes in high-quality cat grooming without chaotic noise was impossible until now. Cleo's coat has never felt softer or looked more magnificent.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    date: "2026-07-04"
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Importance of Regular Grooming for High-Anxiety Pets",
    summary: "Discover how luxury grooming in a calm, noise-controlled environment can radically reduce your pet's sensory overload and improve behavioral wellness.",
    content: `Regular grooming is about far more than maintaining your dog or cat’s visual elegance. For pets prone to anxiety, sensory overload in standard, chaotic salon environments can create lasting fear. 

### Why Sensory Environments Matter
Traditional grooming salons often feature multiple loud blow-dryers, barking dogs, ringing phones, and cramped cages. This high-decibel clutter triggers the flight-or-fight response in sensitive animals. 

Our luxury salon is designed with:
1. **Acoustic Dampening Walls**: Minimizing loud background reverberations.
2. **One-on-One Sessions**: Zero overlapping appointments to ensure dedicated attention.
3. **Gentle Desensitization**: Soft classical music and custom canine aromatherapy.

### Health Benefits Beyond Styling
- **Skin Assessment**: Early detection of subtle hot spots, ticks, or cysts.
- **Cardiovascular Calm**: Meticulous brushing improves circulation and reduces physical tension.
- **Nail Health**: Properly aligned, trimmed nails alleviate spinal strain and hip misalignment.

Consistent, low-stress professional sessions help recondition your pet to view grooming as a therapeutic, soothing massage rather than a stressful event.`,
    category: "Wellness",
    author: "Dr. Clara Rose, DVM",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
    date: "2026-06-15",
    readTime: "4 min read",
    featured: true
  },
  {
    id: "blog-2",
    title: "Demystifying Modern Canine & Feline Coat Nutrition",
    summary: "A professional guide on how premium omega fatty acids, proper hydration, and specific botanical products synthesize to create show-quality radiance.",
    content: `A truly radiant, soft coat starts from within, but is finalized and polished on the outside. Understanding the science behind coat structure and follicle hydration is critical for any pet parent.

### The Role of Essential Fatty Acids
Omega-3 and Omega-6 fatty acids act as the natural structural cement for coat follicles. Without adequate concentrations in their diet, coats quickly become brittle, prone to severe matting, and lose their natural shine.

### Topical Re-Hydration
Standard commercial pet shampoos often utilize harsh synthetic detergents that strip away the skin's natural sebum barrier. 
At our luxury salon, we use strictly pH-balanced botanical infusions containing:
- **Colloidal Oatmeal**: Deeply calms localized skin irritation.
- **Aloe Vera Juice**: Binds water molecules directly to dry hair shafts.
- **Shea Butter**: Locks in natural oils to prevent future dust attraction and tangling.

By combining premium nutritional wellness with non-stripping topicals, your pet enjoys a healthier skin barrier and a breathtakingly soft coat.`,
    category: "Nutrition",
    author: "Elena Rostov, Master Groomer",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
    date: "2026-06-28",
    readTime: "5 min read",
    featured: false
  },
  {
    id: "blog-3",
    title: "Seasonal Haircuts: AKC Breed Standards vs. Practical Comfort",
    summary: "Exploring how to balance elegant heritage breed clips with practical, hot-weather thermal relief for your beloved companion.",
    content: `When the temperature shifts, we are frequently asked if dogs should receive short 'teddy-bear' cuts or if we should adhere strictly to AKC heritage profiles. Here is the expert consensus.

### The Double-Coat Myth
Many pet owners believe shaving a double-coated breed (like a Husky, Golden Retriever, or Pomeranian) helps them stay cool in summer. In reality, the top guard hairs protect from sunburn and act as an insulating barrier against heat. Shaving a double-coat can permanently damage the undercoat structure.

### Elegant Alternatives
Instead of shaving, our master groomers recommend:
1. **Undercoat Blow-Outs**: Meticulously removing dead undercoat hair while leaving the protective top guard hairs intact.
2. **Splay-Trimming**: Sculpting around the paw pads, ears, and sanitary regions for cooling airflow.
3. **Anatomical Profiling**: Hand-scissoring the silhouette to reduce weight while preserving insulation.

Consult with your stylist to find a profile that respects both your pet's physical comfort and their natural beauty.`,
    category: "Styling",
    author: "Julian Thorne, Stylist Specialist",
    image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=800",
    date: "2026-07-02",
    readTime: "3 min read",
    featured: false
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "g1",
    title: "Elegant Afghan Hound Groom",
    category: "haircuts",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
    date: "2026-06-20"
  },
  {
    id: "g2",
    title: "Fluffy Pomeranian Styling",
    category: "dogs",
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800",
    date: "2026-06-24"
  },
  {
    id: "g3",
    title: "Sleek Persian Cat Grooming",
    category: "cats",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
    date: "2026-06-27"
  },
  {
    id: "g4",
    title: "Luxury Botanical Treatment",
    category: "spa",
    imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800",
    date: "2026-06-30"
  },
  {
    id: "g5",
    title: "Samoyed Cloud Blow-dry",
    category: "before_after",
    imageUrl: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=800",
    date: "2026-07-02"
  },
  {
    id: "g6",
    title: "Modern Minimalist Salon Floor",
    category: "salon",
    imageUrl: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800",
    date: "2026-07-05"
  }
];

export const initialTeam: TeamMember[] = [
  {
    id: "team-1",
    name: "Elena Rostov",
    role: "Founder & Master Stylist",
    bio: "Over 12 years of luxury grooming experience. Specialize in hand-scissoring, breed profiles, and calming high-anxiety canine companions.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    certifications: ["IPG Master Groomer Certification", "Canine Esthetician", "Pet CPR & First Aid"]
  },
  {
    id: "team-2",
    name: "Julian Thorne",
    role: "Senior Feline Grooming Specialist",
    bio: "Focused purely on cat behavior and stress-free handling. Expert in double-coat maintenance and lion cuts.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    certifications: ["National Certified Feline Groomer (NCFG)", "Low Stress Handling Certified"]
  },
  {
    id: "team-3",
    name: "Clara Rose, DVM",
    role: "Wellness Advisor",
    bio: "Consults on all health-focused spa packages and custom botanical recipes to treat severe skin irritation safely.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=400",
    certifications: ["Doctor of Veterinary Medicine (Cornell University)", "Holistic Pet Association"]
  }
];
