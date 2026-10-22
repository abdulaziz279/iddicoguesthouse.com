import React from 'react';
import { Search, Filter, Users, Check, RotateCcw, Sparkles } from 'lucide-react';
import { useGuestHouse } from '../context/GuestHouseContext';

export const SearchBar: React.FC = () => {
  const {
    activeFilterAmenity,
    setActiveFilterAmenity,
    searchQuery,
    setSearchQuery,
    filterGuests,
    setFilterGuests,
    rooms
  } = useGuestHouse();

  const amenityOptions = [
    'All',
    'Free Wi-Fi',
    'Air Conditioning',
    'Veranda / Balcony',
    'Wardrobe & Storage',
    'Work Desk',
    '24/7 Front Desk'
  ];

  const handleReset = () => {
    setActiveFilterAmenity('All');
    setSearchQuery('');
    setFilterGuests(1);
  };

  const hasActiveFilters = activeFilterAmenity !== 'All' || searchQuery !== '' || filterGuests > 1;

  return (
    <div className="w-full bg-stone-900/90 backdrop-blur-md border border-amber-900/40 rounded-2xl shadow-xl p-4 sm:p-5 text-stone-100">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        
        {/* Keyword Search Input */}
        <div className="flex-1 relative">
          <label className="block text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-1">
            Search Rooms & Amenities
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Veranda, AC, King bed, Ghs 100, Wi-Fi..."
              className="w-full bg-stone-800/90 border border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Guests selector */}
        <div className="w-full sm:w-48">
          <label className="block text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            Guests
          </label>
          <select
            value={filterGuests}
            onChange={(e) => setFilterGuests(Number(e.target.value))}
            className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-hidden focus:border-amber-500 transition-colors cursor-pointer"
          >
            <option value={1}>1 Guest (Any room)</option>
            <option value={2}>2 Guests (Both rooms fit)</option>
            <option value={3}>3 Guests (Deluxe Suite fits)</option>
          </select>
        </div>

        {/* Reset button if active */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700 transition-colors cursor-pointer"
              title="Reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Amenity Filter Pills */}
      <div className="mt-3.5 pt-3 border-t border-stone-800 flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3 text-amber-400" />
          Filter:
        </span>
        {amenityOptions.map((amenity) => {
          const isSelected = activeFilterAmenity === amenity;
          return (
            <button
              key={amenity}
              onClick={() => setActiveFilterAmenity(amenity)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 shadow-xs font-semibold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700/60'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              {amenity}
            </button>
          );
        })}
      </div>
    </div>
  );
};
