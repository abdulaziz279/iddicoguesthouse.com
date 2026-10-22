import React, { useState, useEffect } from 'react';
import { Sparkles, X, CheckCircle2, Phone, Calendar, Heart } from 'lucide-react';

interface WelcomeModalProps {
  onExploreRooms: () => void;
  onOpenCalendar: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onExploreRooms, onOpenCalendar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('iddico_welcome_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('iddico_welcome_dismissed', 'true');
      } catch (e) {
        console.error(e);
      }
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-stone-50 rounded-2xl shadow-2xl border border-amber-200/80 overflow-hidden text-stone-800"
        role="dialog"
        aria-modal="true"
      >
        {/* Decorative Top Accent Banner */}
        <div className="relative h-28 bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 px-6 py-4 text-white flex flex-col justify-end overflow-hidden">
          <div className="absolute top-2 right-2">
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
              aria-label="Close welcome modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md uppercase tracking-wider text-amber-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              Akwaaba Hospitality
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-xs">
            Akwaaba! Welcome to Iddico
          </h2>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-stone-600 text-sm leading-relaxed mb-4">
            We are delighted to welcome you to <strong className="text-amber-800 font-semibold">Iddico Guest House</strong>, 
            your peaceful, serene haven nestled in Ghana. Enjoy reliable comfort at honest, transparent rates in <strong>Ghana Cedis (GH₵)</strong>.
          </p>

          {/* Key Value Cards */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-3">
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Room 1: Standard</div>
              <div className="text-lg font-bold text-stone-900 mt-0.5">GH₵ 100 <span className="text-xs font-normal text-stone-500">/ night</span></div>
              <p className="text-xs text-stone-600 mt-1">AC, Fiber Wi-Fi & Queen bed</p>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-3">
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Room 2: Deluxe Executive</div>
              <div className="text-lg font-bold text-stone-900 mt-0.5">GH₵ 170 <span className="text-xs font-normal text-stone-500">/ night</span></div>
              <p className="text-xs text-stone-600 mt-1">King bed, private veranda & sofa lounge</p>
            </div>
          </div>

          {/* Perks list */}
          <div className="space-y-2 mb-5 text-xs text-stone-700 bg-stone-100/80 p-3.5 rounded-xl border border-stone-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Tropical Relaxation Garden:</strong> Peaceful open-air grounds & breezy terrace</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Instant Paystack & Mobile Money (MoMo):</strong> MTN, Telecel, AT Cash & Cards accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>24/7 Front Desk & Standby Generator:</strong> Zero power interruptions</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => {
                handleClose();
                onExploreRooms();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm shadow-md transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              Explore Rooms & Book
            </button>
            <button
              onClick={() => {
                handleClose();
                onOpenCalendar();
              }}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium text-sm transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-700" />
              View Availability
            </button>
          </div>

          {/* Footer dismiss options */}
          <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-3.5 h-3.5 rounded-sm border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <span>Don't show this again</span>
            </label>
            <a
             href="https://wa.me/233248805934"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-medium"
            >
              <Phone className="w-3 h-3" />
              WhatsApp Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
