import React from 'react';
import { 
  Wifi, Clock, Waves, Shirt, CreditCard, ShieldCheck, 
  MapPin, Compass, Car, Sparkles, Coffee, Sun, HeartHandshake
} from 'lucide-react';
import { TOURIST_ATTRACTIONS } from '../data/mockData';

export const AboutSection: React.FC = () => {
  return (
    <div id="about-amenities" className="py-16 sm:py-24 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              About Iddico Guest House
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              An Authentic Ghanaian Haven of Rest & Serenity
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Founded on the cherished Ghanaian tradition of <strong>Akwaaba</strong> (Welcome), 
              Iddico Guest House was created to offer travelers, business professionals, and holidaymakers 
              a boutique retreat where tranquility meets modern efficiency.
            </p>

            <p className="text-stone-400 text-sm leading-relaxed">
              With intentionally only <strong>two dedicated room types</strong>—The Standard Room at <strong>GH₵ 100</strong> and The Deluxe Executive Room at <strong>GH₵ 170</strong>—we prioritize personalized attention, quiet privacy, and spotless hygiene. Whether you're staying for a weekend getaway or an extended business trip, our friendly team is here 24 hours a day to make you feel right at home.
            </p>

            {/* Quick Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/80">
                <HeartHandshake className="w-5 h-5 text-amber-400 mb-1" />
                <h4 className="font-bold text-stone-100 text-sm">Personalized Care</h4>
                <p className="text-xs text-stone-400 mt-0.5">Two curated rooms ensure dedicated, quiet attention.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/80">
                <Sun className="w-5 h-5 text-amber-400 mb-1" />
                <h4 className="font-bold text-stone-100 text-sm">Reliable Comfort</h4>
                <p className="text-xs text-stone-400 mt-0.5">Standby generator, constant water & fiber Wi-Fi.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
              <img
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80"
                alt="Iddico Guest House relaxation garden"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-stone-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    GH₵
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Direct Ghana Cedis Pricing</div>
                    <div className="text-[11px] text-stone-300">Room 1: GH₵ 100/night · Room 2: GH₵ 170/night</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Services Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Signature Amenities & Services
            </h3>
            <p className="text-xs sm:text-sm text-stone-400">
              Thoughtful services curated for maximum convenience, safety, and relaxation during your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Service 1: Free Wi-Fi */}
            <div className="p-6 rounded-3xl bg-stone-800/60 border border-stone-700 hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wifi className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">
                Free High-Speed Wi-Fi
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Reliable fiber-optic internet connection across both rooms, the lounge, and the outdoor terrace. Perfect for video conferencing, streaming, or remote work.
              </p>
            </div>

            {/* Service 2: 24/7 Front Desk */}
            <div className="p-6 rounded-3xl bg-stone-800/60 border border-stone-700 hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">
                24/7 Front Desk Support
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Our reception team is available day and night to assist with late arrivals, key handovers, luggage assistance, local taxi arrangements, and instant booking help.
              </p>
            </div>

            {/* Service 3: Relaxation Area */}
            <div className="p-6 rounded-3xl bg-stone-800/60 border border-stone-700 hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Waves className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">
                Tropical Relaxation Area
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                An open-air garden terrace with lush flora, shaded pergolas, and cozy seating. Unwind in the tranquil coastal ambiance, read a book, or enjoy cool evening breezes.
              </p>
            </div>

            {/* Service 4: Laundry & Payment */}
            <div className="p-6 rounded-3xl bg-stone-800/60 border border-stone-700 hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shirt className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">
                Laundry & Paystack Online Payments
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Same-day washing and crisp garment pressing, alongside an integrated Paystack payment gateway supporting MTN MoMo, Telecel Cash, AT Money, and Visa/Mastercard.
              </p>
            </div>

          </div>
        </div>

        {/* Local Tourist Attractions Section */}
        <div id="attractions" className="pt-8 border-t border-stone-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Explore Ghana
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Local Tourist Attractions Near Us
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Iddico Guest House serves as your ideal launchpad to explore rich coastal history, scenic nature reserves, and bustling craft artisan markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOURIST_ATTRACTIONS.map((attraction) => (
              <div
                key={attraction.id}
                className="rounded-3xl overflow-hidden bg-stone-800/70 border border-stone-700 flex flex-col hover:border-amber-500/40 transition-all shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-900/90 text-amber-300 backdrop-blur-md">
                      {attraction.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/75 text-stone-200 backdrop-blur-md flex items-center gap-1">
                      <Car className="w-3 h-3 text-amber-400" />
                      {attraction.travelTime}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-lg font-bold text-white mb-2">
                      {attraction.name}
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed mb-4">
                      {attraction.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-700/60">
                    <div className="text-[11px] text-amber-300 font-medium bg-amber-950/40 p-2.5 rounded-xl border border-amber-900/40">
                      💡 <strong>Guest Tip:</strong> {attraction.tips}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tour Arrangement Banner */}
          <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-amber-950/80 via-stone-800 to-amber-950/60 border border-amber-700/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base">
                  Need a Trusted Local Driver or Day Tour Excursion?
                </h4>
                <p className="text-xs text-stone-300 mt-0.5">
                  Our 24/7 front desk can arrange reliable private chauffeured cars for day excursions to Cape Coast, Kakum Canopy, or Aburi Gardens.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/233248805934?text=Hello%20Iddico%20Front%20Desk,%20I%20am%20interested%20in%20arranging%20a%20local%20tour"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 transition-all shadow-md"
            >
              Inquire with Front Desk
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
