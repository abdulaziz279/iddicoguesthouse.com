export interface Room {
  id: 'standard-haven' | 'deluxe-suite';
  name: string;
  tagline: string;
  priceGhs: number; // 100 or 170
  capacity: number;
  bedType: string;
  sizeSqFt: string;
  description: string;
  fullDetails: string;
  amenities: string[];
  mainImage: string;
  gallery: string[];
  isAvailable: boolean; // simple availability toggle
  statusNote?: string;
  phone: string;
  phoneExt: string;
  email: string;
  roomNumber: string;
  bookedDates: string[]; // YYYY-MM-DD
}

export interface BookingSubmission {
  id: string;
  roomId: 'standard-haven' | 'deluxe-suite';
  roomName: string;
  roomPrice: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  guestsCount: number;
  totalGhs: number;
  paymentMethod: 'paystack' | 'momo_mtn' | 'telecel_cash' | 'at_money' | 'card' | 'pay_on_arrival';
  paymentPhone?: string;
  paystackReference?: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending_arrival';
  createdAt: string;
}

export interface GuestReview {
  id: string;
  name: string;
  origin: string; // e.g. "Kumasi, Ghana" or "London, UK"
  rating: number; // 1 - 5
  date: string;
  roomType: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface TouristAttraction {
  id: string;
  name: string;
  category: 'Heritage' | 'Beach & Coastal' | 'Nature' | 'Culture & Crafts';
  distance: string;
  travelTime: string;
  description: string;
  image: string;
  tips: string;
}

export interface AmenityHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'rooms' | 'relaxation' | 'attractions' | 'amenities';
  url: string;
  alt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Booking & Payment' | 'Rooms & Stay' | 'Services & Amenities' | 'Location & Tours';
}
