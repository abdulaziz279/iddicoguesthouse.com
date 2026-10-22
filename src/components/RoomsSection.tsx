import React from 'react';
import { useGuestHouse } from '../context/GuestHouseContext';
import { RoomCard } from './RoomCard';
import { Room } from '../types/guestHouse';
import { BedDouble, Sparkles, Filter, Calendar } from 'lucide-react';

interface RoomsSectionProps {
  onOpenBooking: (room: Room) => void;
  onOpenCalendarManager: () => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ 
  onOpenBooking, 
  onOpenCalendarManager 
}) => {
  const { rooms, activeFilterAmenity, searchQuery, filterGuests } = useGuestHouse();

  // Filter logic based on search bar, guests, and amenity
  const filteredRooms = rooms.filter(room => {
    // Capacity filter
    if (room.capacity < filterGuests) return false;

    // Amenity filter
    if (activeFilterAmenity !== 'All') {
      const match = room.amenities.some(a => 
        a.toLowerCase().includes(activeFilterAmenity.toLowerCase())
      );
      if (!match) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = room.name.toLowerCase().includes(q);
      const matchDesc = room.description.toLowerCase().includes(q);
      const matchAmenities = room.amenities.some(a => a.toLowerCase().includes(q));
      const matchPrice = room.priceGhs.toString().includes(q);
      const matchBed = room.bedType.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchAmenities && !matchPrice && !matchBed) {
        return false;
      }
    }

    return true;
  });

  return (
    <section id="rooms" className="py-16 sm:py-24 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
              <BedDouble className="w-3.5 h-3.5 text-amber-700" />
              Boutique Accommodations
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
              Our 2 Signature Rooms
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Transparent rates in Ghana Cedis. Each room features its own distinct calendar and direct availability toggle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCalendarManager}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Full Availability Schedule</span>
            </button>
          </div>
        </div>

        {/* Rooms Grid */}
        {filteredRooms.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 shadow-xs">
            <h3 className="font-display font-bold text-lg text-stone-900 mb-1">
              No rooms match your active filters
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              We have exactly two dedicated room types (The Standard Room at GH₵ 100 and The Deluxe Executive Room at GH₵ 170). Try clearing your search or amenity filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onOpenBooking={onOpenBooking}
                onOpenCalendarManager={onOpenCalendarManager}
              />
            ))}
          </div>
        )}

        {/* Inclusions summary strip */}
        <div className="mt-12 p-6 rounded-3xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold shrink-0">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <span className="font-bold block text-sm">Every Booking Includes at Iddico Guest House:</span>
              <span className="text-amber-800">Free High-Speed Wi-Fi · 24/7 Front Desk · Standby Generator · Tropical Garden Access · Secure Gated Parking</span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-display font-bold text-base text-amber-900">Honest Rates in GH₵</span>
            <span className="block text-[11px] text-amber-700">No hidden booking fees</span>
          </div>
        </div>

      </div>
    </section>
  );
};
