import React, { useState, useEffect } from 'react';
import { Home, Calendar, Phone, Menu, X, Sparkles, Image, Compass, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';
import { useGuestHouse } from '../context/GuestHouseContext';

interface NavbarProps {
  onScrollTo: (elementId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  const { rooms, setIsCalendarManagerOpen } = useGuestHouse();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollTo(id);
  };

  const allAvailable = rooms.every(r => r.isAvailable);
  const anyAvailable = rooms.some(r => r.isAvailable);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-stone-900/95 backdrop-blur-md shadow-lg py-2.5 border-b border-amber-900/30' : 'bg-stone-900 py-3.5 border-b border-stone-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Tag */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-md shadow-amber-900/30 font-display font-bold text-xl group-hover:scale-105 transition-transform">
              I
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors">
                  Iddico <span className="text-amber-400 font-serif italic">Guest House</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-700/50">
                  GHANA
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-light flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${allAvailable ? 'bg-emerald-400 animate-pulse' : anyAvailable ? 'bg-amber-400' : 'bg-red-400'}`}></span>
                {allAvailable ? 'Both Rooms Available' : anyAvailable ? '1 Room Available' : 'Rooms Reserved'} · GH₵ 100 & GH₵ 170
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-stone-300">
            <button 
              onClick={() => handleNavClick('rooms')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Rooms & Rates
            </button>
            <button 
              onClick={() => handleNavClick('about-amenities')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              About & Services
            </button>
            <button 
              onClick={() => handleNavClick('attractions')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Attractions
            </button>
            <button 
              onClick={() => handleNavClick('gallery')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Photo Gallery
            </button>
            <button 
              onClick={() => handleNavClick('reviews')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button 
              onClick={() => handleNavClick('faq')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              FAQs
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Contact & Map
            </button>
          </nav>

          {/* Quick Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsCalendarManagerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors cursor-pointer"
              title="View room availability and reservations calendar"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Availability Calendar</span>
            </button>

            <a
             href="https://wa.me/233248805934"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 transition-colors"
              title="Chat with 24/7 Front Desk on WhatsApp"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-0.5"></span>
              <span>24/7 MoMo Desk</span>
            </a>

            <button
              onClick={() => handleNavClick('rooms')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 shadow-md shadow-amber-900/40 transition-all cursor-pointer font-sans"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Book Online</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsCalendarManagerOpen(true)}
              className="p-2 rounded-lg bg-stone-800 text-amber-400 hover:bg-stone-700"
              aria-label="Open Calendar"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-800 pb-4 space-y-2 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCalendarManagerOpen(true);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-stone-800 text-amber-300 text-xs font-semibold"
              >
                <Calendar className="w-4 h-4" />
                Schedule Calendar
              </button>
              <a
                href="https://wa.me/233248805934"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Desk
              </a>
            </div>

            <div className="flex flex-col space-y-1 text-sm font-medium text-stone-300">
              <button
                onClick={() => handleNavClick('rooms')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-800 text-left cursor-pointer"
              >
                <Home className="w-4 h-4 text-amber-400" />
                <span>Our 2 Rooms & Rates (Ghs 100 & 170)</span>
              </button>
              <button
                onClick={() => handleNavClick('about-amenities')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-800 text-left cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Amenities & Services (Wi-Fi, 24/7 Desk, Laundry)</span>
              </button>
              <button
                onClick={() => handleNavClick('attractions')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-800 text-left cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Local Tourist Attractions</span>
              </button>
              <button
                onClick={() => handleNavClick('gallery')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-800 text-left cursor-pointer"
              >
                <Image className="w-4 h-4 text-amber-400" />
                <span>Photo Gallery</span>
              </button>
              <button
                onClick={() => handleNavClick('reviews')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-800 text-left cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Guest Reviews & Ratings</span>
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-800 text-left cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Frequently Asked Questions</span>
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-800 text-left cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Contact Info & Google Maps</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNavClick('rooms')}
                className="w-full py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-center text-sm shadow-md cursor-pointer"
              >
                Book Your Room Now
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
