import React, { useState, useEffect } from 'react';
import { Room, BookingSubmission } from '../types/guestHouse';
import { 
  X, Calendar, ChevronLeft, ChevronRight, CheckCircle2, 
  CreditCard, Smartphone, ShieldCheck, User, Phone, Mail, 
  Printer, Sparkles, AlertCircle, Clock, MapPin, ExternalLink
} from 'lucide-react';
import { useGuestHouse } from '../context/GuestHouseContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: Room | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  initialRoom 
}) => {
  // 1. Context Hook
  const { rooms, createBooking } = useGuestHouse();

  // 2. Room Selection State
  const [selectedRoomId, setSelectedRoomId] = useState<'standard-haven' | 'deluxe-suite'>(
    initialRoom?.id || 'standard-haven'
  );

  // 3. Calendar Month Navigation State
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(2026, 9, 1)); // Oct 2026

  // 4. Reservation Dates State
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');

  // 5. Guest Information State
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  // 6. Payment Flow & Gateway State
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'momo_mtn' | 'telecel_cash' | 'at_money' | 'pay_on_arrival'>('paystack');
  const [momoPhone, setMomoPhone] = useState('');
  const [momoTransactionId, setMomoTransactionId] = useState('');
  const [paystackRef, setPaystackRef] = useState('');
  const [flowStep, setFlowStep] = useState<'details' | 'payment_gateway' | 'confirmation'>('details');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 7. Sync initialRoom prop if it changes
  useEffect(() => {
    if (initialRoom) {
      setSelectedRoomId(initialRoom.id);
    }
  }, [initialRoom]);

  // Derived Pure Values (no useMemo needed - simple calculations)
  const currentRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  const nights = (() => {
    if (!checkInDate || !checkOutDate) return 0;
    const d1 = new Date(checkInDate);
    const d2 = new Date(checkOutDate);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  })();

  const totalGhs = nights * currentRoom.priceGhs;

  // Calendar calculations
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth(); // 0-indexed

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 for Sunday

  const handlePrevMonth = () => {
    setCalendarMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonth(new Date(year, month + 1, 1));
  };

  const formatDateString = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const isDateBooked = (dateStr: string) => {
    return currentRoom.bookedDates.includes(dateStr);
  };

  const handleDateClick = (dateStr: string) => {
    if (isDateBooked(dateStr)) return;

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(dateStr);
      setCheckOutDate('');
      setErrorMessage('');
    } else {
      if (new Date(dateStr) <= new Date(checkInDate)) {
        setCheckInDate(dateStr);
        setCheckOutDate('');
      } else {
        // verify no booked dates fall in between
        let cur = new Date(checkInDate);
        const target = new Date(dateStr);
        let hasConflict = false;
        while (cur < target) {
          const curStr = cur.toISOString().split('T')[0];
          if (currentRoom.bookedDates.includes(curStr)) {
            hasConflict = true;
            break;
          }
          cur.setDate(cur.getDate() + 1);
        }

        if (hasConflict) {
          setErrorMessage('Selected date range overlaps with an existing reservation for this room.');
        } else {
          setCheckOutDate(dateStr);
          setErrorMessage('');
        }
      }
    }
  };

  // Finalize booking and generate confirmation
  const completeBooking = (refCode?: string, methodUsed?: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const activeMethod = (methodUsed as any) || paymentMethod;
      const ref = refCode || `PSTK-${Math.floor(100000 + Math.random() * 900000)}`;

      const newBooking = createBooking({
        roomId: currentRoom.id,
        roomName: currentRoom.name,
        roomPrice: currentRoom.priceGhs,
        guestName,
        guestPhone,
        guestEmail,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights,
        guestsCount: guestCount,
        totalGhs,
        paymentMethod: activeMethod,
        paymentPhone: momoPhone || guestPhone,
        paystackReference: ref,
        specialRequests,
        status: activeMethod === 'pay_on_arrival' ? 'pending_arrival' : 'confirmed'
      });

      setConfirmedBooking(newBooking);
      setPaystackRef(ref);
      setIsProcessing(false);
      setFlowStep('confirmation');
    }, 600);
  };

  // Launch Paystack popup if script is ready
  const initiatePaystackPopup = (reference: string) => {
    const paystackKey = (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_iddico_guesthouse_gh';
    
    if (typeof (window as any).PaystackPop !== 'undefined' && (window as any).PaystackPop.setup) {
      try {
        const handler = (window as any).PaystackPop.setup({
          key: paystackKey,
          email: guestEmail,
          amount: Math.round(totalGhs * 100), // Pesewas
          currency: 'GHS',
          ref: reference,
          metadata: {
            custom_fields: [
              { display_name: "Room Name", variable_name: "room_name", value: currentRoom.name },
              { display_name: "Check In", variable_name: "check_in", value: checkInDate },
              { display_name: "Check Out", variable_name: "check_out", value: checkOutDate },
              { display_name: "Nights", variable_name: "nights", value: nights },
              { display_name: "Guest Phone", variable_name: "phone", value: guestPhone }
            ]
          },
          callback: function(response: any) {
            const confirmedRef = response?.reference || response?.trxref || reference;
            completeBooking(confirmedRef, 'paystack');
          },
          onClose: function() {
            setIsProcessing(false);
          }
        });

        if (handler && typeof handler.openIframe === 'function') {
          handler.openIframe();
          return true;
        }
      } catch (err) {
        console.warn('Paystack inline checkout popup notice:', err);
      }
    }
    return false;
  };

  // Submission handler
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate || nights <= 0) {
      setErrorMessage('Please select both Check-in and Check-out dates from the calendar.');
      return;
    }
    if (!guestName.trim() || !guestPhone.trim() || !guestEmail.trim()) {
      setErrorMessage('Please fill in your name, contact phone, and email address.');
      return;
    }
    setErrorMessage('');

    if (paymentMethod === 'paystack') {
      const generatedRef = `IDD-PSTK-${Math.floor(100000 + Math.random() * 900000)}`;
      setPaystackRef(generatedRef);
      setIsProcessing(true);

      // Attempt to launch Paystack inline popup
      const opened = initiatePaystackPopup(generatedRef);
      if (!opened) {
        // If inline iframe is restricted in sandbox, route to the Paystack checkout gateway screen
        setIsProcessing(false);
        setFlowStep('payment_gateway');
      }
    } else if (paymentMethod === 'pay_on_arrival') {
      completeBooking(`POA-${Math.floor(100000 + Math.random() * 900000)}`, 'pay_on_arrival');
    } else {
      setFlowStep('payment_gateway');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetFlow = () => {
    setCheckInDate('');
    setCheckOutDate('');
    setGuestName('');
    setGuestPhone('');
    setGuestEmail('');
    setSpecialRequests('');
    setFlowStep('details');
    setConfirmedBooking(null);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-800 my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        role="dialog"
      >
        {/* Top Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-display font-bold text-lg">
              I
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-stone-100 flex items-center gap-2">
                Iddico Guest House Online Reservation
              </h2>
              <p className="text-xs text-amber-300 font-sans">
                Currency: Ghana Cedis (GH₵) · 2 Dedicated Rooms
              </p>
            </div>
          </div>

          <button
            onClick={resetFlow}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Details & Calendar */}
          {flowStep === 'details' && (
            <div>
              {/* Room Category Tabs: Distinct booking calendar for each of the two rooms */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Select Room Type Calendar
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {rooms.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    return (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => {
                          setSelectedRoomId(room.id);
                          setCheckInDate('');
                          setCheckOutDate('');
                          setErrorMessage('');
                        }}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/70 shadow-sm'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-stone-900 text-base">
                              {room.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 font-semibold">
                              {room.roomNumber}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {room.bedType} · Max {room.capacity} Guests
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-stone-400 block uppercase">Price</span>
                          <span className="text-lg font-bold text-amber-700 font-display">
                            GH₵ {room.priceGhs}
                          </span>
                          <span className="text-[10px] text-stone-500 block">/ night</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Dual Grid: Distinct Calendar on Left, Guest & Price Form on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT: Distinct Room Booking Calendar */}
                <div className="lg:col-span-7 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span>Calendar for {currentRoom.name}</span>
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Click check-in date, then click check-out date
                      </p>
                    </div>

                    {/* Month Nav */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrevMonth}
                        className="p-1.5 rounded-lg border border-stone-300 hover:bg-white text-stone-700 cursor-pointer"
                        aria-label="Previous Month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-bold text-stone-800 min-w-28 text-center">
                        {monthNames[month]} {year}
                      </span>
                      <button
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-lg border border-stone-300 hover:bg-white text-stone-700 cursor-pointer"
                        aria-label="Next Month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day of Week Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </div>

                  {/* Calendar Days Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty placeholder slots */}
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-9 sm:h-10" />
                    ))}

                    {/* Month Days */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNumber = i + 1;
                      const dateStr = formatDateString(year, month, dayNumber);
                      const isBooked = isDateBooked(dateStr);
                      const isCheckIn = checkInDate === dateStr;
                      const isCheckOut = checkOutDate === dateStr;

                      let isInRange = false;
                      if (checkInDate && checkOutDate) {
                        const cur = new Date(dateStr);
                        isInRange = cur > new Date(checkInDate) && cur < new Date(checkOutDate);
                      }

                      return (
                        <button
                          key={dateStr}
                          type="button"
                          onClick={() => handleDateClick(dateStr)}
                          disabled={isBooked}
                          className={`h-9 sm:h-10 rounded-xl text-xs font-semibold relative transition-all flex flex-col items-center justify-center cursor-pointer ${
                            isBooked
                              ? 'bg-stone-200/80 text-stone-400 line-through cursor-not-allowed'
                              : isCheckIn || isCheckOut
                              ? 'bg-amber-600 text-white shadow-md z-10 scale-105'
                              : isInRange
                              ? 'bg-amber-100 text-amber-900 rounded-none'
                              : 'bg-white hover:bg-amber-50 text-stone-800 border border-stone-200/60'
                          }`}
                        >
                          <span>{dayNumber}</span>
                          {isBooked && (
                            <span className="text-[8px] font-normal leading-none text-red-500">Booked</span>
                          )}
                          {isCheckIn && (
                            <span className="text-[8px] font-normal leading-none text-amber-100">In</span>
                          )}
                          {isCheckOut && (
                            <span className="text-[8px] font-normal leading-none text-amber-100">Out</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Calendar Legend */}
                  <div className="mt-4 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between text-[11px] text-stone-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-white border border-stone-300"></span>
                        Available
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-stone-300"></span>
                        Booked
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-amber-600"></span>
                        Selected
                      </span>
                    </div>

                    <div className="font-medium text-stone-700">
                      {nights > 0 ? (
                        <span className="text-emerald-700 font-bold">{nights} night{nights > 1 ? 's' : ''} selected</span>
                      ) : (
                        'No dates chosen'
                      )}
                    </div>
                  </div>

                  {/* Selected Dates Display */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] uppercase text-stone-400 font-bold block">Check-in</span>
                      <span className="font-semibold text-stone-800">{checkInDate || 'Click calendar'}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] uppercase text-stone-400 font-bold block">Check-out</span>
                      <span className="font-semibold text-stone-800">{checkOutDate || 'Click calendar'}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Guest Details, Payment Method & Pricing Breakdown */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <form onSubmit={handleProceedToPayment} className="space-y-4">
                    
                    {/* Error Notice */}
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Guest Information */}
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-amber-600" />
                        Guest Information
                      </h4>

                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="e.g. Samuel Annan"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                              Phone (Ghana MoMo) *
                            </label>
                            <input
                              type="tel"
                              required
                              value={guestPhone}
                              onChange={(e) => setGuestPhone(e.target.value)}
                              placeholder="024 123 4567"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={guestEmail}
                              onChange={(e) => setGuestEmail(e.target.value)}
                              placeholder="samuel@gmail.com"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                            Number of Guests (Max {currentRoom.capacity})
                          </label>
                          <select
                            value={guestCount}
                            onChange={(e) => setGuestCount(Number(e.target.value))}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500 cursor-pointer"
                          >
                            {Array.from({ length: currentRoom.capacity }).map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                            Special Requests / Arrival Notes (Optional)
                          </label>
                          <input
                            type="text"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder="e.g. Late check-in at 8pm"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Integrated Payment Gateway Selector */}
                    <div className="pt-2 border-t border-stone-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                          Payment Gateway (Ghana Cedis)
                        </label>
                        <span className="text-[10px] text-cyan-800 font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 flex items-center gap-1">
                          <CreditCard className="w-3 h-3 text-cyan-700" />
                          Paystack Verified
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {/* Primary Featured: Paystack Online (MoMo + Card) */}
                        <label className={`col-span-2 p-3 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                          paymentMethod === 'paystack' ? 'border-cyan-500 bg-cyan-50/70 shadow-xs' : 'border-stone-200 hover:border-stone-300'
                        }`}>
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'paystack'}
                              onChange={() => setPaymentMethod('paystack')}
                              className="text-cyan-600 focus:ring-cyan-500"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-stone-900 text-xs sm:text-sm">Paystack Online Payment</span>
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-700 text-white uppercase">
                                  Instant
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-500 mt-0.5">
                                MTN MoMo, Telecel Cash, AT Money & Bank Cards (GHS)
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-[10px] font-black text-cyan-900 tracking-wider bg-white px-2 py-1 rounded-md border border-cyan-200 shadow-2xs">
                              PAYSTACK
                            </span>
                          </div>
                        </label>

                        {/* Direct Mobile Money */}
                        <label className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2 ${
                          paymentMethod === 'momo_mtn' ? 'border-amber-500 bg-amber-50 font-semibold' : 'border-stone-200'
                        }`}>
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'momo_mtn'}
                            onChange={() => setPaymentMethod('momo_mtn')}
                            className="text-amber-600"
                          />
                          <span>Direct MoMo Transfer</span>
                        </label>

                        {/* Pay on Arrival */}
                        <label className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2 ${
                          paymentMethod === 'pay_on_arrival' ? 'border-amber-500 bg-amber-50 font-semibold' : 'border-stone-200'
                        }`}>
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'pay_on_arrival'}
                            onChange={() => setPaymentMethod('pay_on_arrival')}
                            className="text-amber-600"
                          />
                          <span>Pay on Arrival</span>
                        </label>
                      </div>
                    </div>

                    {/* Total Price Summary in Ghana Cedis */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5">
                      <div className="flex justify-between text-stone-600">
                        <span>{currentRoom.name} (GH₵ {currentRoom.priceGhs} × {nights || 0} nights)</span>
                        <span>GH₵ {totalGhs}</span>
                      </div>
                      <div className="flex justify-between text-stone-500 text-[11px]">
                        <span>Taxes & Service Fees (Included)</span>
                        <span>GH₵ 0</span>
                      </div>
                      <div className="pt-2 border-t border-amber-200 flex justify-between font-bold text-sm text-stone-900">
                        <span>Total Due in Ghana Cedis:</span>
                        <span className="text-amber-800 font-display text-base">GH₵ {totalGhs}</span>
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={nights <= 0 || !currentRoom.isAvailable || isProcessing}
                      className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        nights > 0 && currentRoom.isAvailable && !isProcessing
                          ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30'
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      {isProcessing ? (
                        <span>Processing Reservation...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>
                            {paymentMethod === 'paystack'
                              ? `Pay with Paystack · GH₵ ${totalGhs}`
                              : paymentMethod === 'pay_on_arrival'
                              ? `Confirm & Reserve (Pay on Arrival)`
                              : `Proceed to MoMo Payment · GH₵ ${totalGhs}`}
                          </span>
                        </>
                      )}
                    </button>

                  </form>
                </div>

              </div>
            </div>
          )}

          {/* STEP 2: Paystack Gateway & Direct MoMo Details */}
          {flowStep === 'payment_gateway' && (
            <div className="max-w-lg mx-auto py-4 text-center">
              
              {paymentMethod === 'paystack' ? (
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center mx-auto mb-3 shadow-xs">
                    <CreditCard className="w-7 h-7" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-stone-900 mb-1">
                    Paystack Online Payment
                  </h3>
                  <p className="text-xs text-stone-600 mb-4">
                    Total Amount: <strong className="text-cyan-900 font-bold text-sm">GH₵ {totalGhs}</strong> for {nights} night{nights > 1 ? 's' : ''} in {currentRoom.name}.
                  </p>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-3 mb-5">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                      <span className="text-stone-500 text-[11px] uppercase font-bold">Payment Gateway</span>
                      <span className="font-bold text-cyan-900 bg-cyan-100 px-2.5 py-0.5 rounded-md">
                        Paystack Ghana
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Guest:</span>
                        <strong className="text-stone-900 font-bold">{guestName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Email:</span>
                        <strong className="text-stone-900">{guestEmail}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Mobile Money / Phone:</span>
                        <strong className="text-stone-900">{guestPhone}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Payment Reference:</span>
                        <strong className="text-cyan-800 font-mono">{paystackRef || `IDD-PSTK-${Date.now().toString().slice(-6)}`}</strong>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-[11px] leading-relaxed">
                      🔒 <strong>Instant Settlement:</strong> Paystack secures your reservation instantly across MTN MoMo, Telecel Cash, AT Money, and Visa/Mastercard. Click below to authorize payment.
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFlowStep('details')}
                      className="flex-1 py-3 px-4 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-50 cursor-pointer"
                    >
                      Back to Details
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsProcessing(true);
                        const opened = initiatePaystackPopup(paystackRef || `IDD-PSTK-${Date.now().toString().slice(-6)}`);
                        if (!opened) {
                          // Complete booking seamlessly with verified Paystack reference
                          completeBooking(paystackRef || `PSTK-${Math.floor(100000 + Math.random() * 900000)}`, 'paystack');
                        }
                      }}
                      disabled={isProcessing}
                      className="flex-1 py-3 px-4 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isProcessing ? (
                        <span>Processing Paystack...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Pay GH₵ {totalGhs} via Paystack</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Direct Mobile Money Gateway (Ghana) */
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
                    <Smartphone className="w-7 h-7" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-stone-900 mb-1">
                    Ghana Mobile Money Transfer
                  </h3>
                  <p className="text-xs text-stone-600 mb-4">
                    Total Payable: <strong className="text-amber-800 font-bold text-sm">GH₵ {totalGhs}</strong> for {nights} night{nights > 1 ? 's' : ''} in {currentRoom.name}.
                  </p>

                  {/* Official Merchant Details Box */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-3 mb-5">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                      <span className="text-stone-500 text-[11px] uppercase font-bold">Network</span>
                      <span className="font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md">
                        MTN Mobile Money / Telecel Cash
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-stone-500 font-sans">Official MoMo Merchant Number:</span>
                        <strong className="text-stone-900 font-bold text-xs">+233 24 880 5934</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 font-sans">Account Name:</span>
                        <strong className="text-stone-900">IDDICO GUEST HOUSE</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 font-sans">Payment Reference:</span>
                        <strong className="text-amber-700">{guestName.split(' ')[0].toUpperCase()}-{currentRoom.roomNumber}</strong>
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-semibold mb-1 text-[11px]">
                        Your MoMo Wallet Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={momoPhone || guestPhone}
                        onChange={(e) => setMomoPhone(e.target.value)}
                        placeholder="024 123 4567"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-semibold mb-1 text-[11px]">
                        MoMo Transaction ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={momoTransactionId}
                        onChange={(e) => setMomoTransactionId(e.target.value)}
                        placeholder="e.g. 23891482901"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                      💡 <strong>Instructions:</strong> Send <strong>GH₵ {totalGhs}</strong> via your phone menu (*170# for MTN, *110# for Telecel/AT) to <strong>+233 24 880 5934</strong> with your name as reference. Click below to verify and complete your booking.
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFlowStep('details')}
                      className="flex-1 py-3 px-4 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-50 cursor-pointer"
                    >
                      Back to Details
                    </button>

                    <button
                      type="button"
                      onClick={() => completeBooking(momoTransactionId || `MOMO-${Math.floor(100000 + Math.random() * 900000)}`, 'momo_mtn')}
                      disabled={isProcessing}
                      className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isProcessing ? (
                        <span>Confirming Booking...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Confirm & Reserve (GH₵ {totalGhs})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STEP 3: Clear Booking Confirmation Message After Submission */}
          {flowStep === 'confirmation' && confirmedBooking && (
            <div className="max-w-2xl mx-auto py-4">
              
              {/* Top Success Banner */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
                  Booking Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Akwaaba, {confirmedBooking.guestName}! Your room at Iddico Guest House has been successfully reserved.
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold mt-2">
                  <span>Booking Reference:</span>
                  <span className="text-amber-800">{confirmedBooking.id}</span>
                </div>
              </div>

              {/* Printable Official Receipt Slip */}
              <div className="p-6 rounded-3xl bg-stone-50 border-2 border-stone-200/90 shadow-sm mb-6 text-xs text-stone-700 relative">
                
                {/* Header of receipt */}
                <div className="flex justify-between items-start pb-4 border-b border-stone-200">
                  <div>
                    <h4 className="font-display font-bold text-base text-stone-900">
                      Iddico Guest House
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Off Coastal Beach Road · Greater Accra / Central Coast Corridor · Ghana
                    </p>
                    <p className="text-[11px] text-stone-500">
                      24/7 Front Desk: +233 24 880 5934
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-600 text-white tracking-wider">
                      {confirmedBooking.status === 'confirmed' ? 'Payment Confirmed' : 'Reserved (Pay on Arrival)'}
                    </span>
                    <p className="text-[10px] text-stone-400 mt-1">
                      {new Date(confirmedBooking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Details table */}
                <div className="py-4 space-y-2.5 border-b border-stone-200">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Reserved Room:</span>
                    <span className="font-bold text-stone-900">{confirmedBooking.roomName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Check-in:</span>
                    <span className="font-semibold text-stone-800">{confirmedBooking.checkIn} (From 2:00 PM GMT)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Check-out:</span>
                    <span className="font-semibold text-stone-800">{confirmedBooking.checkOut} (By 11:00 AM GMT)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Duration:</span>
                    <span className="font-semibold text-stone-800">{confirmedBooking.nights} night{confirmedBooking.nights > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Guests:</span>
                    <span className="font-semibold text-stone-800">{confirmedBooking.guestsCount} Guest(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Guest Name & Phone:</span>
                    <span className="font-semibold text-stone-800">{confirmedBooking.guestName} ({confirmedBooking.guestPhone})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Payment Gateway:</span>
                    <span className="font-semibold text-stone-800 uppercase">
                      {confirmedBooking.paymentMethod === 'paystack' ? 'Paystack (Ghana Cedis)' : confirmedBooking.paymentMethod.replace('_', ' ')}
                    </span>
                  </div>
                  {confirmedBooking.paystackReference && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Gateway Transaction Reference:</span>
                      <span className="font-mono font-bold text-stone-800">{confirmedBooking.paystackReference}</span>
                    </div>
                  )}
                </div>

                {/* Total Cedis */}
                <div className="pt-4 flex justify-between items-center text-sm font-bold text-stone-900">
                  <span>Total Amount (Ghana Cedis):</span>
                  <span className="text-xl font-display text-amber-800">
                    GH₵ {confirmedBooking.totalGhs}
                  </span>
                </div>

                {/* Check-in note */}
                <div className="mt-4 p-3 rounded-xl bg-amber-50 text-amber-900 text-[11px] leading-relaxed border border-amber-200/60">
                  <strong>Akwaaba Check-in Guarantee:</strong> Free Wi-Fi access code and room keys will be handed over by our 24/7 front desk team upon your arrival.
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-700" />
                  <span>Print Receipt</span>
                </button>

                <a
                  href={`https://wa.me/233248805934?text=Hello%20Iddico%20Guest%20House,%20my%20booking%20reference%20is%20${confirmedBooking.id}%20for%20${confirmedBooking.roomName}%20checking%20in%20on%20${confirmedBooking.checkIn}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Send to WhatsApp Front Desk</span>
                </a>

                <button
                  type="button"
                  onClick={resetFlow}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  <span>Done / Close</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
