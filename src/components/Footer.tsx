import React from 'react';
import { 
  Phone, Mail, MapPin, Calendar, Heart, ShieldCheck, 
  ExternalLink, Sparkles, MessageCircle, ArrowUp
} from 'lucide-react';
import { useGuestHouse } from '../context/GuestHouseContext';
import { Room } from '../types/guestHouse';

interface FooterProps {
  onScrollTo: (elementId: string) => void;
  onOpenBooking: (room: Room) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenBooking }) => {
  const { rooms, setIsTermsOpen, setIsCalendarManagerOpen } = useGuestHouse();

  const standardRoom = rooms.find(r => r.id === 'standard-haven') || rooms[0];
  const deluxeRoom = rooms.find(r => r.id === 'deluxe-suite') || rooms[1];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dedicated Two Room Cards Section inside Footer */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                Direct Room Directories
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Contact Info & Details for Each of Our Two Rooms
              </h3>
            </div>
            <button
              onClick={() => setIsCalendarManagerOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-900 border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Reservation Schedule</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room 1: The Standard Haven */}
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-900/40 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500 text-stone-950">
                      {standardRoom.roomNumber}
                    </span>
                    <h4 className="font-display font-bold text-white text-lg">
                      {standardRoom.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-bold text-amber-400 text-xl">GH₵ 100</span>
                    <span className="text-[10px] text-stone-400 block">/ night</span>
                  </div>
                </div>

                <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                  {standardRoom.description}
                </p>

                {/* Specific Room 1 Contact details */}
                <div className="space-y-1.5 text-xs text-stone-300 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800 mb-5">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Direct Desk Line: <a href="tel:+233248805934" className="font-bold text-amber-300 hover:underline">+233 24 880 5934</a></span>
                    <span className="text-stone-500 font-mono">({standardRoom.phoneExt})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Direct Inquiries: <a href={`mailto:${standardRoom.email}`} className="text-amber-300 hover:underline">{standardRoom.email}</a></span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-400 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Queen Bed · Silent AC · En-suite Shower & Vanity · Fiber Wi-Fi</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenBooking(standardRoom)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Standard Room (GH₵ 100)</span>
                </button>
                <a
                  href="https://wa.me/233248805934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 transition-colors"
                  title="WhatsApp about Room 101"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Room 2: The Deluxe Executive Suite */}
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-900/40 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500 text-stone-950">
                      {deluxeRoom.roomNumber}
                    </span>
                    <h4 className="font-display font-bold text-white text-lg">
                      {deluxeRoom.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-bold text-amber-400 text-xl">GH₵ 170</span>
                    <span className="text-[10px] text-stone-400 block">/ night</span>
                  </div>
                </div>

                <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                  {deluxeRoom.description}
                </p>

                {/* Specific Room 2 Contact details */}
                <div className="space-y-1.5 text-xs text-stone-300 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800 mb-5">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Direct Desk Line: <a href="tel:+233248805934" className="font-bold text-amber-300 hover:underline">+233 24 880 5934</a></span>
                    <span className="text-stone-500 font-mono">({deluxeRoom.phoneExt})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Direct Inquiries: <a href={`mailto:${deluxeRoom.email}`} className="text-amber-300 hover:underline">{deluxeRoom.email}</a></span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-400 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>King Luxury Bed · Private Veranda · Sofa Lounge · 43" Smart TV</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenBooking(deluxeRoom)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Deluxe Executive Room (GH₵ 170)</span>
                </button>
                <a
                  href="https://wa.me/233248805934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 transition-colors"
                  title="WhatsApp about Room 201"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* General Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-t border-stone-800 text-xs">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 font-bold font-display flex items-center justify-center text-base">
                I
              </div>
              <span className="font-display text-lg font-bold text-white">
                Iddico <span className="text-amber-400 italic">Guest House</span>
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Tranquil boutique accommodations in Ghana. High-speed Wi-Fi, 24/7 front desk, tropical relaxation garden, and standby power.
            </p>
            <div className="text-amber-300 font-semibold">
              Rates: GH₵ 100 & GH₵ 170 / night
            </div>
          </div>

          {/* Functional Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white text-xs mb-3">
              Explore & Book
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={() => onScrollTo('rooms')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Our 2 Rooms & Rates
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsCalendarManagerOpen(true)} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-amber-300 font-medium"
                >
                  Room Availability Calendar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('about-amenities')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Amenities & Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('attractions')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Local Tourist Attractions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('gallery')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Photo Gallery Tour
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('reviews')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Guest Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Compliance & Information */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white text-xs mb-3">
              Legal Compliance & Policies
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={() => setIsTermsOpen(true)} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsTermsOpen(true)} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Check-in / Check-out Policies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsTermsOpen(true)} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Cancellation & Refund Terms
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsTermsOpen(true)} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Ghana Data Protection Compliance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollTo('faq')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Common FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Central 24/7 Hotline */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white text-xs mb-3">
              24/7 Front Desk Hotline
            </h4>
            <div className="space-y-2 text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a href="tel:+233248805934" className="hover:text-amber-300 transition-colors">+233 24 880 5934 (24/7 Call & MoMo)</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>info@iddicogh.com</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Off Beach Road, Greater Accra / Central Coast, Ghana</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer text-xs"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Akwaaba Tag */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Iddico Guest House. All rights reserved. Registered in Ghana.
          </div>
          <div className="flex items-center gap-2 text-amber-400/80">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>Akwaaba Ghanaian Hospitality · Crafted with Care</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
