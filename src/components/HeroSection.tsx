import React from 'react';
import { Sparkles, Calendar, ShieldCheck, Wifi, Clock, Waves, ArrowDown } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface HeroSectionProps {
  onExploreRooms: () => void;
  onOpenCalendar: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreRooms, onOpenCalendar }) => {
  return (
    <div id="hero" className="relative bg-stone-950 text-white overflow-hidden">
      {/* Background Image with Warm Tropical Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80"
          alt="Iddico Guest House Ghana"
          className="w-full h-full object-cover object-center brightness-35 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        
        {/* Top Hospitality Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Warm Akwaaba Welcome · Boutique Stay in Ghana</span>
        </div>

        {/* Hero Headings */}
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.15] mb-4">
            Relax in Tranquility at <br />
            <span className="text-amber-400 font-serif italic">Iddico Guest House</span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg sm:leading-relaxed mb-8 max-w-2xl font-light">
            Enjoy two thoughtfully designed boutique guest rooms with modern conveniences, silent air conditioning, 
            rapid fiber Wi-Fi, and 24/7 dedicated service. Transparent rates in <strong className="text-amber-300 font-semibold">Ghana Cedis</strong> with seamless Mobile Money & Card booking.
          </p>

          {/* Quick Room Snapshot badges */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-10">
            <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs sm:text-sm text-stone-300">Room 1: The Standard Room · <strong>GH₵ 100</strong>/night</span>
            </div>

            <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="text-xs sm:text-sm text-stone-300">Room 2: The Deluxe Executive Room · <strong>GH₵ 170</strong>/night</span>
            </div>

            <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm text-stone-300">24/7 Desk & Standby Generator</span>
            </div>
          </div>
        </div>

        {/* Integrated Search and Filter Bar */}
        <div className="max-w-4xl mt-2 mb-8">
          <SearchBar />
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl text-xs sm:text-sm text-stone-300">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-900/50 border border-stone-800/80">
            <Wifi className="w-4 h-4 text-amber-400 shrink-0" />
            <span>High-Speed Fiber Wi-Fi</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-900/50 border border-stone-800/80">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>24/7 Front Desk Help</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-900/50 border border-stone-800/80">
            <Waves className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Tropical Relaxation Garden</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-900/50 border border-stone-800/80">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Standby Generator Backup</span>
          </div>
        </div>

        {/* Down anchor */}
        <div className="mt-10 flex items-center justify-start">
          <button
            onClick={onExploreRooms}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>Explore Rooms & Real-Time Availability</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
