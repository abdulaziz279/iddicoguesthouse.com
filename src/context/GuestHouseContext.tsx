import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room, BookingSubmission, GuestReview } from '../types/guestHouse';
import { INITIAL_ROOMS, INITIAL_BOOKINGS, GUEST_REVIEWS } from '../data/mockData';

interface GuestHouseContextType {
  rooms: Room[];
  bookings: BookingSubmission[];
  reviews: GuestReview[];
  toggleRoomAvailability: (roomId: 'standard-haven' | 'deluxe-suite') => void;
  createBooking: (booking: Omit<BookingSubmission, 'id' | 'createdAt'>) => BookingSubmission;
  addReview: (review: Omit<GuestReview, 'id' | 'date' | 'verified'>) => void;
  selectedRoomForBooking: Room | null;
  setSelectedRoomForBooking: (room: Room | null) => void;
  isCalendarManagerOpen: boolean;
  setIsCalendarManagerOpen: (open: boolean) => void;
  isTermsOpen: boolean;
  setIsTermsOpen: (open: boolean) => void;
  activeFilterAmenity: string;
  setActiveFilterAmenity: (amenity: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterGuests: number;
  setFilterGuests: (count: number) => void;
}

const GuestHouseContext = createContext<GuestHouseContextType | undefined>(undefined);

export const GuestHouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem('iddico_prod_rooms_v5');
      if (saved) {
        const parsed: Room[] = JSON.parse(saved);
        return parsed.map((r) => ({
          ...r,
          phone: '+233 24 880 5934',
        }));
      }
      return INITIAL_ROOMS;
    } catch {
      return INITIAL_ROOMS;
    }
  });

  const [bookings, setBookings] = useState<BookingSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('iddico_prod_bookings_v4');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [reviews, setReviews] = useState<GuestReview[]>(() => {
    try {
      const saved = localStorage.getItem('iddico_prod_reviews_v4');
      return saved ? JSON.parse(saved) : GUEST_REVIEWS;
    } catch {
      return GUEST_REVIEWS;
    }
  });

  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [isCalendarManagerOpen, setIsCalendarManagerOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [activeFilterAmenity, setActiveFilterAmenity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGuests, setFilterGuests] = useState(1);

  useEffect(() => {
    try {
      localStorage.setItem('iddico_prod_rooms_v5', JSON.stringify(rooms));
    } catch (e) {
      console.error(e);
    }
  }, [rooms]);

  useEffect(() => {
    try {
      localStorage.setItem('iddico_prod_bookings_v4', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('iddico_prod_reviews_v4', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  const toggleRoomAvailability = (roomId: 'standard-haven' | 'deluxe-suite') => {
    setRooms(prevRooms =>
      prevRooms.map(room => {
        if (room.id === roomId) {
          const nextState = !room.isAvailable;
          return {
            ...room,
            isAvailable: nextState,
            statusNote: nextState ? 'Ready for Guest Check-in' : 'Currently Occupied / Offline'
          };
        }
        return room;
      })
    );
  };

  const createBooking = (bookingData: Omit<BookingSubmission, 'id' | 'createdAt'>): BookingSubmission => {
    const newId = `IDD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: BookingSubmission = {
      ...bookingData,
      id: newId,
      createdAt: new Date().toISOString()
    };

    const datesToAdd: string[] = [];
    const start = new Date(bookingData.checkIn);
    const end = new Date(bookingData.checkOut);
    const cur = new Date(start);
    while (cur < end) {
      datesToAdd.push(cur.toISOString().split('T')[0]);
      cur.setDate(cur.getDate() + 1);
    }

    setBookings(prev => [newBooking, ...prev]);

    setRooms(prev =>
      prev.map(r => {
        if (r.id === bookingData.roomId) {
          return {
            ...r,
            bookedDates: Array.from(new Set([...r.bookedDates, ...datesToAdd]))
          };
        }
        return r;
      })
    );

    return newBooking;
  };

  const addReview = (reviewData: Omit<GuestReview, 'id' | 'date' | 'verified'>) => {
    const newReview: GuestReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: true
    };
    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <GuestHouseContext.Provider
      value={{
        rooms,
        bookings,
        reviews,
        toggleRoomAvailability,
        createBooking,
        addReview,
        selectedRoomForBooking,
        setSelectedRoomForBooking,
        isCalendarManagerOpen,
        setIsCalendarManagerOpen,
        isTermsOpen,
        setIsTermsOpen,
        activeFilterAmenity,
        setActiveFilterAmenity,
        searchQuery,
        setSearchQuery,
        filterGuests,
        setFilterGuests
      }}
    >
      {children}
    </GuestHouseContext.Provider>
  );
};

export const useGuestHouse = () => {
  const context = useContext(GuestHouseContext);
  if (!context) {
    throw new Error('useGuestHouse must be used within a GuestHouseProvider');
  }
  return context;
};
