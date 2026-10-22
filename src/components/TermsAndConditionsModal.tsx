import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useGuestHouse } from '../context/GuestHouseContext';

export const TermsAndConditionsModal: React.FC = () => {
  const { isTermsOpen, setIsTermsOpen } = useGuestHouse();

  if (!isTermsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-800 my-auto animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-stone-100">
                Terms & Conditions & Guest Policies
              </h2>
              <p className="text-xs text-amber-300 font-sans">
                Iddico Guest House · Legal Compliance & Stay Agreement
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTermsOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-stone-600 leading-relaxed">
          
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            <strong>Welcome to Iddico Guest House.</strong> By reserving a room, completing a Mobile Money transaction, or checking into our premises, you agree to comply with and be bound by the following policies designed to ensure safety, mutual peace, and legal compliance under the laws of the Republic of Ghana.
          </div>

          {/* Section 1 */}
          <div>
            <h4 className="font-display font-bold text-base text-stone-900 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center font-bold">1</span>
              Check-In, Check-Out & Identification
            </h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Check-in Time:</strong> From 2:00 PM (14:00 GMT). Early check-in can be requested subject to room availability.</li>
              <li><strong>Check-out Time:</strong> By 11:00 AM (11:00 GMT). Late check-out past 12:00 PM may incur an additional half-day fee.</li>
              <li><strong>Guest Identification:</strong> In compliance with Ghana Tourism Authority regulations, all adult guests must present a valid government-issued photo ID (Ghana Card, Passport, or Driver’s License) upon arrival.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="font-display font-bold text-base text-stone-900 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center font-bold">2</span>
              Room Rates & Currency Regulations
            </h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>All published prices are strictly in <strong>Ghana Cedis (GH₵)</strong>: The Standard Haven at <strong>GH₵ 100 per night</strong> and The Deluxe Executive Suite at <strong>GH₵ 170 per night</strong>.</li>
              <li>Rates include VAT, National Health Insurance Levy (NHIL), and Ghana Tourism Development Levy where applicable.</li>
              <li>No arbitrary hidden surcharges are added for standard Wi-Fi, electricity, or generator backup runtime.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="font-display font-bold text-base text-stone-900 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center font-bold">3</span>
              Payment Terms & Mobile Money Gateway
            </h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Accepted payment gateways include <strong>MTN Mobile Money (MoMo)</strong>, <strong>Telecel Cash</strong>, <strong>AT Money</strong>, Visa/Mastercard, or verified Ghanaian Cedi cash at our 24/7 reception desk.</li>
              <li>For "Pay on Arrival" reservations, the booking is held until 6:00 PM on the arrival date unless prior late arrival notice is provided via WhatsApp or telephone.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h4 className="font-display font-bold text-base text-stone-900 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center font-bold">4</span>
              Cancellation & Refund Policy
            </h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Free Cancellation:</strong> You may cancel or modify your reservation up to 24 hours prior to 2:00 PM on the scheduled arrival date for a full refund back to your original payment method / MoMo wallet.</li>
              <li>Cancellations within 24 hours or no-shows may incur a charge equivalent to the first night's stay.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h4 className="font-display font-bold text-base text-stone-900 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center font-bold">5</span>
              House Rules, Safety & Conduct
            </h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Non-Smoking Policy:</strong> Both guest rooms are 100% strictly non-smoking. Designated outdoor smoking areas are available in parts of the garden.</li>
              <li><strong>Quiet Hours:</strong> Between 10:00 PM (22:00 GMT) and 7:00 AM (07:00 GMT) to preserve the peaceful ambiance for all guests.</li>
              <li><strong>Room Capacity:</strong> Standard Haven accommodates a maximum of 2 guests; Deluxe Executive Suite accommodates up to 3 guests. Additional unregistered overnight occupants are not permitted.</li>
              <li><strong>Valuables:</strong> Management provides secure premises with 24/7 front desk personnel and security lighting. However, guests are advised to safeguard precious personal belongings.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h4 className="font-display font-bold text-base text-stone-900 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center font-bold">6</span>
              Data Protection & Privacy
            </h4>
            <p>
              Guest personal records, phone numbers, and reservation history are held in strict confidence in compliance with the Ghana Data Protection Act 2012 (Act 843) and are never sold or shared with unauthorized commercial entities.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-stone-500">
            For policy inquiries: info@iddicogh.com · 24/7 Front Desk: +233 24 880 5934
          </span>
          <button
            onClick={() => setIsTermsOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer"
          >
            I Acknowledge & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
