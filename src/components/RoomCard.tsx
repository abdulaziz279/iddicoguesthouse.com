import React, { useState } from 'react';
import { Room } from '../types/guestHouse';
import { 
  Users, BedDouble, Maximize2, Wifi, Wind, ShieldCheck, 
  Calendar, Phone, Mail, Check, AlertCircle, Sparkles, ChevronRight,
  Tv, Coffee
} from 'lucide-react';
import { useGuestHouse } from '../context/GuestHouseContext';

interface RoomCardProps {
  room: Room;
  onOpenBooking: (room: Room) => void;
  onOpenCalendarManager: () => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ 
  room, 
  onOpenBooking,
  onOpenCalendarManager 
}) => {
  const { toggleRoomAvailability } = useGuestHouse();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isRoomOne = room.id === 'standard-haven';

  return (
    <div 
      className={`bg-white rounded-3xl border shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
        room.isAvailable ? 'border-amber-200/80' : 'border-stone-300 opacity-95'
      }`}
    >
      {/* Top Media Gallery Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100 group">
        <img
          src={room.gallery[activeImageIndex] || room.mainImage}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Room Category & Room Number Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-900/90 text-amber-300 backdrop-blur-md border border-amber-600/40">
            {room.roomNumber}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-stone-900 backdrop-blur-md shadow-xs">
            {isRoomOne ? 'Standard Room' : 'Deluxe Executive Room'}
          </span>
        </div>

        {/* Real-time Status Badge */}
        <div className="absolute top-4 right-4">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-md ${
            room.isAvailable 
              ? 'bg-emerald-500/90 text-white border border-emerald-300/40' 
              : 'bg-red-600/90 text-white border border-red-300/40'
          }`}>
            <span className={`w-2 h-2 rounded-full ${room.isAvailable ? 'bg-white animate-pulse' : 'bg-stone-300'}`} />
            {room.isAvailable ? 'Available Now' : 'Occupied / Closed'}
          </div>
        </div>

        {/* Thumbnail Selector Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {room.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'border-amber-400 scale-105 shadow-md' : 'border-white/60 opacity-70 hover:opacity-100'
                }`}
                aria-label={`View photo ${idx + 1} of ${room.name}`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="text-right text-white">
            <span className="text-xs uppercase tracking-wider text-amber-200 font-semibold block">Rate in Ghana Cedis</span>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white drop-shadow-xs">
              GH₵ {room.priceGhs}
              <span className="text-xs font-normal text-stone-200 font-sans ml-1">/ night</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7">
        
        {/* Availability Toggle Switch */}
        <div className="mb-5 p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${room.isAvailable ? 'bg-emerald-500' : 'bg-stone-400'}`} />
            <div>
              <div className="text-xs font-bold text-stone-800">
                Simple Room Availability Toggle
              </div>
              <div className="text-[11px] text-stone-500">
                {room.isAvailable ? 'Marked as Available for Booking' : 'Marked as Occupied or In Maintenance'}
              </div>
            </div>
          </div>

          <button
            onClick={() => toggleRoomAvailability(room.id)}
            role="switch"
            aria-checked={room.isAvailable}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              room.isAvailable ? 'bg-emerald-600' : 'bg-stone-300'
            }`}
            title="Click to toggle availability status for this room"
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                room.isAvailable ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Room Titles */}
        <div className="mb-4">
          <h3 className="font-display text-2xl font-bold text-stone-900 mb-1">
            {room.name}
          </h3>
          <p className="text-xs font-medium text-amber-800">
            {room.tagline}
          </p>
        </div>

        {/* Short & Rich Description */}
        <p className="text-stone-600 text-sm leading-relaxed mb-5">
          {room.description}
        </p>

        {/* Key Metrics specs */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-amber-50/50 rounded-xl border border-amber-100 text-stone-700 text-xs mb-5">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Max {room.capacity} Guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="truncate">{room.bedType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{room.sizeSqFt}</span>
          </div>
        </div>

        {/* Amenities Highlights */}
        <div className="mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2.5">
            Room Amenities & Inclusions
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
            {room.amenities.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Room Contact info */}
        <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-700 gap-2.5 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-600">Rooms Direct Desk Line: </span>
              <a 
                href="tel:+233248805934" 
                className="font-bold text-stone-950 hover:text-amber-700 transition-colors underline decoration-amber-400 decoration-2 underline-offset-2"
                title={`Call ${room.name} direct desk line: +233 24 880 5934`}
              >
                +233 24 880 5934
              </a>
              <span className="text-stone-500 font-mono text-[11px] ml-1.5">({room.phoneExt})</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-stone-600 sm:text-right">
            <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <a href={`mailto:${room.email}`} className="hover:text-amber-800 transition-colors">
              {room.email}
            </a>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onOpenBooking(room)}
            disabled={!room.isAvailable}
            className={`flex-1 py-3.5 px-5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              room.isAvailable
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 hover:scale-[1.01]'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{room.isAvailable ? `Book ${room.name} (GH₵ ${room.priceGhs})` : 'Room Currently Unavailable'}</span>
            {room.isAvailable && <ChevronRight className="w-4 h-4 ml-1" />}
          </button>

          <button
            onClick={onOpenCalendarManager}
            className="py-3 px-4 rounded-2xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            title="Inspect calendar view for reserved dates"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>View Calendar</span>
          </button>
        </div>

        {/* Upcoming booked note */}
        <div className="mt-3 text-center text-[11px] text-stone-400">
          Distinct Room Calendar · {room.bookedDates.length} upcoming reserved dates recorded
        </div>

      </div>
    </div>
  );
};
