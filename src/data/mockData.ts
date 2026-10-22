import { Room, GuestReview, TouristAttraction, GalleryPhoto, FaqItem, BookingSubmission } from '../types/guestHouse';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'standard-haven',
    name: 'The Standard Haven',
    tagline: 'Cozy, peaceful boutique retreat at exceptional value',
    priceGhs: 100,
    capacity: 2,
    bedType: 'Queen Sized Bed',
    sizeSqFt: '240 sq.ft',
    roomNumber: 'Room 101',
    description: 'An inviting, air-conditioned sanctuary designed for solo travelers, business visits, or couples seeking comfort at exceptional value in Ghana Cedis.',
    fullDetails: 'Furnished with high-thread-count cotton linens, ergonomic study desk, silent air-conditioning, private en-suite bathroom with refreshing rainfall shower, wardrobe, and rapid fiber-optic Wi-Fi.',
    amenities: [
      'High-Speed Fiber Wi-Fi',
      'Silent Air Conditioning & Ceiling Fan',
      'Private En-suite Shower & Vanity',
      'Work Desk & Charging Ports',
      'Daily Housekeeping',
      '24/7 Front Desk Support',
      'Standby Generator Backup'
    ],
    mainImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'
    ],
    isAvailable: true,
    statusNote: 'Ready for Guest Check-in',
    phone: '+233 24 880 5934',
    phoneExt: 'Ext 101',
    email: 'standard@iddicogh.com',
    bookedDates: []
  },
  {
    id: 'deluxe-suite',
    name: 'The Deluxe Executive Suite',
    tagline: 'Spacious luxury, private breezy veranda & elevated amenities',
    priceGhs: 170,
    capacity: 3,
    bedType: 'King Luxury Orthopedic Bed',
    sizeSqFt: '380 sq.ft',
    roomNumber: 'Room 201',
    description: 'Our premier suite featuring a scenic veranda overlooking the tropical relaxation grounds, spacious living lounge, and deluxe en-suite bath.',
    fullDetails: 'Indulge in extra space with an expansive king-size bed, private breezy veranda with outdoor seating, sofa lounge, wardrobe, 43" Smart TV with streaming, and 24/7 front desk concierge support.',
    amenities: [
      'Private Veranda with Tropical Garden View',
      'King Luxury Orthopedic Bed',
      'High-Speed Fiber Wi-Fi (Ultra Fast)',
      'Spacious Wardrobe & Luggage Storage',
      'Lounge Sofa & Coffee Table',
      'Smart 43" HD TV with Streaming',
      '24/7 Priority Front Desk Concierge',
      'Standby Generator Backup'
    ],
    mainImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'
    ],
    isAvailable: true,
    statusNote: 'Ready for Guest Check-in',
    phone: '+233 24 880 5934',
    phoneExt: 'Ext 201',
    email: 'executive@iddicogh.com',
    bookedDates: []
  }
];

// Production state: Starts with zero bookings until guests reserve online
export const INITIAL_BOOKINGS: BookingSubmission[] = [];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    name: 'Dr. Kwame Boateng',
    origin: 'Kumasi, Ghana',
    rating: 5,
    date: 'October 14, 2026',
    roomType: 'The Deluxe Executive Suite',
    comment: 'Iddico Guest House was an unexpected gem! The private veranda on the Deluxe Executive Suite at Ghs 170 was worth every cedi. The 24/7 staff helped me arrange an early morning ride, and the standby generator meant zero power interruptions.',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Sarah Jenkins',
    origin: 'Bristol, UK',
    rating: 5,
    date: 'October 8, 2026',
    roomType: 'The Standard Haven',
    comment: 'Warmest Ghanaian hospitality! At Ghs 100 per night, the Standard Haven was immaculate, air conditioned, and quiet. The laundry service returned my clothes crisp and fresh within 4 hours. Super fast Wi-Fi too.',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Emmanuel Darko',
    origin: 'Accra, Ghana',
    rating: 5,
    date: 'September 29, 2026',
    roomType: 'The Deluxe Executive Suite',
    comment: 'The relaxation garden is so peaceful for evening chats in the cool coastal breeze. Booking directly with Paystack & MTN MoMo took less than 2 minutes. We will definitely be returning!',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Esi Annan-Smith',
    origin: 'Takoradi, Ghana',
    rating: 4,
    date: 'September 19, 2026',
    roomType: 'The Standard Haven',
    comment: 'Clean linens, strong water pressure, and polite front desk security. Very easy access to local beaches and market tours. Outstanding value for money.',
    verified: true
  }
];

export const TOURIST_ATTRACTIONS: TouristAttraction[] = [
  {
    id: 'att-1',
    name: 'Kokrobite & Labadi Beach Fronts',
    category: 'Beach & Coastal',
    distance: '18 km / 25 mins',
    travelTime: '25 min drive',
    description: 'Vibrant golden sand coastlines featuring live highlife drumming, fresh coconut vendors, seafood grills, and safe swimming stretches.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    tips: 'Best visited on weekend afternoons for live cultural music or early mornings for serene seaside meditation.'
  },
  {
    id: 'att-2',
    name: 'Kwame Nkrumah Memorial Park & Mausoleum',
    category: 'Heritage',
    distance: '14 km / 30 mins',
    travelTime: '30 min drive',
    description: 'A world-class architectural landmark honoring Ghana’s first president, surrounded by reflective pools, statues, museum relics, and lush gardens.',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1000&q=80',
    tips: 'Open daily. Guided historic tours are available on-site and front desk can book transport for you.'
  },
  {
    id: 'att-3',
    name: 'Aburi Botanical Gardens & Craft Village',
    category: 'Nature',
    distance: '38 km / 45 mins',
    travelTime: '45 min scenic drive',
    description: 'Nestled in the misty Akwapim hills, renowned for centuries-old royal palms, medicinal botanicals, bird watching, and woodcarving artisans.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
    tips: 'A refreshing cooler mountain breeze. Great spot for photography and buying genuine Ghanaian kente & woodcrafts.'
  },
  {
    id: 'att-4',
    name: 'Makola & Accra Arts Centre Craft Market',
    category: 'Culture & Crafts',
    distance: '16 km / 35 mins',
    travelTime: '35 min drive',
    description: 'The energetic heartbeat of local commerce, filled with authentic hand-woven Kente cloth, beadwork, brass jewelry, and aromatic spices.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    tips: 'Our 24/7 front desk can recommend trusted artisan booths and arrange reliable private taxi escorts.'
  },
  {
    id: 'att-5',
    name: 'Cape Coast & Elmina Castles (Day Tour)',
    category: 'Heritage',
    distance: '135 km / Day Excursion',
    travelTime: '2.5 hrs scenic ride',
    description: 'UNESCO World Heritage monuments steeped in profound transatlantic history, coupled with Kakum National Park’s famous rainforest canopy walkway.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    tips: 'Iddico Guest House arranges early morning weekend excursion packages with curated transport.'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-1',
    title: 'The Deluxe Executive Suite (Ghs 170)',
    category: 'rooms',
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
    alt: 'Deluxe Executive Suite King Bed with warm ambient lighting'
  },
  {
    id: 'g-2',
    title: 'The Standard Haven (Ghs 100)',
    category: 'rooms',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    alt: 'Standard Haven clean cozy bedroom with queen bed'
  },
  {
    id: 'g-3',
    title: 'Tropical Relaxation Garden & Terrace',
    category: 'relaxation',
    url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80',
    alt: 'Outdoor relaxation garden with tropical greenery and pergola'
  },
  {
    id: 'g-4',
    title: '24/7 Front Desk & Welcoming Reception',
    category: 'amenities',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    alt: 'Modern boutique hotel reception and concierge'
  },
  {
    id: 'g-5',
    title: 'Executive En-Suite Bath & Rainfall Shower',
    category: 'rooms',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    alt: 'Sparkling clean en-suite shower and vanity'
  },
  {
    id: 'g-6',
    title: 'Courtyard Seating & Evening Lounge',
    category: 'relaxation',
    url: 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=1000&q=80',
    alt: 'Serene courtyard lounge with comfortable patio chairs'
  },
  {
    id: 'g-7',
    title: 'Garden Pavilion & Flowering Palms',
    category: 'relaxation',
    url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
    alt: 'Lush tropical garden grounds with peaceful seating'
  },
  {
    id: 'g-8',
    title: 'Fresh Laundry & Ironing Care',
    category: 'amenities',
    url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1000&q=80',
    alt: 'Clean folded linens and professional laundry service'
  },
  {
    id: 'g-9',
    title: 'Nearby Scenic Beach Sunset',
    category: 'attractions',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    alt: 'Palm lined Ghanaian coastline during golden hour'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'Booking & Payment',
    question: 'How do I pay in Ghana Cedis? Are Paystack and Mobile Money (MoMo) accepted?',
    answer: 'Yes! We feature direct Paystack online payments for instant credit/debit card processing and Mobile Money (MTN MoMo, Telecel Cash, AT Money). You can complete checkout securely online or send directly to our verified merchant line (+233 24 880 5934) with instant booking confirmation. We also accept payment on arrival at our 24/7 reception desk.'
  },
  {
    category: 'Rooms & Stay',
    question: 'What are the exact rates and differences between the two room types?',
    answer: 'Iddico Guest House features exactly two dedicated room types: The Standard Haven at Ghs 100 per night (ideal for 1-2 guests with Queen bed, en-suite bathroom with shower, silent AC, and work desk), and The Deluxe Executive Suite at Ghs 170 per night (larger room with King bed, private breezy veranda, 43" Smart TV, and living sofa lounge).'
  },
  {
    category: 'Services & Amenities',
    question: 'Do you have reliable electricity during power cuts (Dumsor)?',
    answer: 'Absolutely. We operate an automatic standby diesel generator paired with an uninterrupted inverter system, ensuring your air conditioning, lights, and Wi-Fi stay on 24/7 without fail.'
  },
  {
    category: 'Services & Amenities',
    question: 'Is high-speed Wi-Fi provided in all rooms and the relaxation area?',
    answer: 'Yes, complimentary high-speed fiber-optic Wi-Fi covers both guest rooms, our reception lounge, and the outdoor tropical relaxation garden.'
  },
  {
    category: 'Rooms & Stay',
    question: 'What are the check-in and check-out times?',
    answer: 'Standard check-in begins at 2:00 PM (14:00 GMT), and check-out is by 11:00 AM (11:00 GMT). Early check-in or late check-out is readily accommodated subject to room availability; simply contact our 24/7 front desk.'
  },
  {
    category: 'Services & Amenities',
    question: 'How does the laundry service work?',
    answer: 'Our professional in-house laundry and pressing service is available daily. Drop your garments by 9:00 AM, and they will be washed, neatly pressed, and returned to your room by afternoon for an affordable fee.'
  },
  {
    category: 'Location & Tours',
    question: 'Can Iddico Guest House arrange airport transfers or local tours?',
    answer: 'Yes! We offer Kotoka International Airport (ACC) pickup and drop-off, as well as curated day trips to Kakum Canopy Walk, Cape Coast Castle, Kwame Nkrumah Memorial Park, and Aburi Gardens.'
  }
];
