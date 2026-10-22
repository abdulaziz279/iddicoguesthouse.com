import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/mockData';
import { GalleryPhoto } from '../types/guestHouse';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Filter } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'rooms', label: 'Rooms (Ghs 100 & 170)' },
    { id: 'relaxation', label: 'Relaxation Garden & Grounds' },
    { id: 'amenities', label: 'Amenities & Front Desk' },
    { id: 'attractions', label: 'Nearby Attractions' }
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter(photo => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredPhotos.length - 1 : lightboxIndex - 1);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredPhotos.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-stone-100 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
            Visual Tour
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 mb-4">
            Iddico Photo Gallery
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Take a visual walk through our peaceful grounds, immaculately maintained rooms, 
            tropical relaxation garden, and nearby coastal landscapes.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map(cat => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-stone-200"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500 text-stone-950 uppercase tracking-wider mb-1 inline-block">
                    {photo.category}
                  </span>
                  <h4 className="font-display text-base font-bold text-white leading-tight">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                    {photo.alt}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={handleCloseLightbox}
          >
            {/* Top Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white z-10 transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white z-10 transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white z-10 transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & Caption Container */}
            <div 
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].alt}
                className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="font-display text-xl font-bold text-amber-300">
                  {filteredPhotos[lightboxIndex].title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 max-w-xl">
                  {filteredPhotos[lightboxIndex].alt}
                </p>
                <div className="text-[11px] text-stone-400 mt-1">
                  Photo {lightboxIndex + 1} of {filteredPhotos.length}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
