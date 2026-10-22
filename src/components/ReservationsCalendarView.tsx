import React, { useState } from 'react';
import { 
  X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, 
  AlertCircle, Users, Phone, DollarSign, BedDouble, Filter, Plus
} from 'lucide-react';
import { useGuestHouse } from '../context/GuestHouseContext';
import { Room } from '../types/guestHouse';

interface ReservationsCalendarViewProps {
  isOpen: boolean;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
}

export const ReservationsCalendarView: React.FC<ReservationsCalendarViewProps> = ({
  isOpen,
  onClose,
  onBookRoom
}) => {
  const { rooms, bookings, toggleRoomAvailability } = useGuestHouse();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'standard-haven' | 'deluxe-suite'>('all');
  const [viewMonth, setViewMonth] = useState<Date>(new Date(2026, 9, 1)); // October 2026

  if (!isOpen) return null;

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const handlePrev = () => setViewMonth(new Date(year, month - 1, 1));
  const handleNext = () => setViewMonth(new Date(year, month + 1, 1));

  const standardRoom = rooms.find(r => r.id === 'standard-haven') || rooms[0];
  const deluxeRoom = rooms.find(r => r.id === 'deluxe-suite') || rooms[1];

  const filteredBookings = bookings.filter(b => {
    if (selectedFilter === 'all') return true;
    return b.roomId === selectedFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-800 my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <CalendarIcon className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-stone-100">
                Reservations & Room Availability Schedule
              </h2>
              <p className="text-xs text-amber-300 font-sans">
                Manage upcoming stays & real-time room availability status for Iddico Guest House
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Room Availability Quick Toggle Bar */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center justify-between">
              <span>Quick Room Availability Status Toggles</span>
              <span className="text-[11px] text-amber-800 font-normal">Changes apply live across the booking portal</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Room 1 */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-stone-900">Room 1: The Standard Room</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">GH₵ 100</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Status: <strong className={standardRoom.isAvailable ? 'text-emerald-700' : 'text-red-600'}>
                      {standardRoom.isAvailable ? 'Available for Guests' : 'Marked as Occupied'}
                    </strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRoomAvailability('standard-haven')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      standardRoom.isAvailable
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                        : 'bg-stone-300 text-stone-700 hover:bg-stone-400'
                    }`}
                  >
                    {standardRoom.isAvailable ? 'Toggle: Active' : 'Toggle: Closed'}
                  </button>
                </div>
              </div>

              {/* Room 2 */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-stone-900">Room 2: The Deluxe Executive Room</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">GH₵ 170</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Status: <strong className={deluxeRoom.isAvailable ? 'text-emerald-700' : 'text-red-600'}>
                      {deluxeRoom.isAvailable ? 'Available for Guests' : 'Marked as Occupied'}
                    </strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRoomAvailability('deluxe-suite')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      deluxeRoom.isAvailable
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                        : 'bg-stone-300 text-stone-700 hover:bg-stone-400'
                    }`}
                  >
                    {deluxeRoom.isAvailable ? 'Toggle: Active' : 'Toggle: Closed'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Month & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === 'all' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Rooms (2)
              </button>
              <button
                onClick={() => setSelectedFilter('standard-haven')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === 'standard-haven' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Room 1: Standard (GH₵ 100)
              </button>
              <button
                onClick={() => setSelectedFilter('deluxe-suite')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === 'deluxe-suite' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Room 2: Deluxe (GH₵ 170)
              </button>
            </div>

            {/* Month Navigator */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-stone-800 min-w-36 text-center">
                {monthNames[month]} {year}
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Visual Month Calendar View */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`cal-empty-${i}`} className="min-h-16 bg-transparent" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const mm = String(month + 1).padStart(2, '0');
                const dd = String(day).padStart(2, '0');
                const dateKey = `${year}-${mm}-${dd}`;

                const standardBooked = standardRoom.bookedDates.includes(dateKey);
                const deluxeBooked = deluxeRoom.bookedDates.includes(dateKey);

                return (
                  <div
                    key={dateKey}
                    className="min-h-16 p-1.5 rounded-xl bg-white border border-stone-200 flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-stone-700">{day}</span>

                    <div className="space-y-1 mt-1">
                      {(selectedFilter === 'all' || selectedFilter === 'standard-haven') && standardBooked && (
                        <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300 truncate">
                          Room 101 Booked
                        </div>
                      )}
                      {(selectedFilter === 'all' || selectedFilter === 'deluxe-suite') && deluxeBooked && (
                        <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 truncate">
                          Suite 201 Booked
                        </div>
                      )}
                      {!standardBooked && !deluxeBooked && (
                        <div className="text-[9px] text-stone-400 font-medium italic">
                          Available
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-600 justify-end">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-200 border border-amber-400"></span>
                Room 101: Standard Haven (GH₵ 100)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-400"></span>
                Room 201: Deluxe Executive (GH₵ 170)
              </span>
            </div>
          </div>

          {/* List of Upcoming Reservations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-base font-bold text-stone-900">
                Upcoming Guest Reservations ({filteredBookings.length})
              </h3>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-500">
                <CalendarIcon className="w-8 h-8 mx-auto text-stone-400 mb-2 opacity-60" />
                <p className="font-semibold text-stone-700">No active guest reservations recorded yet.</p>
                <p className="text-[11px] text-stone-500 mt-0.5">New bookings submitted through the online booking system will automatically populate here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBookings.map((b) => (
                  <div 
                    key={b.id}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{b.guestName}</span>
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-stone-200 text-stone-700">
                          {b.id}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                          {b.status === 'confirmed' ? 'Confirmed Stay' : 'Arrival Pending'}
                        </span>
                      </div>

                      <p className="text-stone-600">
                        <strong>{b.roomName}</strong> · {b.checkIn} to {b.checkOut} ({b.nights} nights)
                      </p>

                      <p className="text-stone-500">
                        Contact: {b.guestPhone} · {b.guestEmail} · {b.specialRequests || 'No special requests'}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
                      <span className="text-sm font-bold text-amber-800 font-display">
                        GH₵ {b.totalGhs}
                      </span>
                      <span className="text-[10px] text-stone-500 uppercase">
                        Via {b.paymentMethod.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-100 px-6 py-3 border-t border-stone-200 flex justify-between items-center text-xs">
          <span className="text-stone-500">
            Current system time: 2026-10-20 GMT
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-medium"
          >
            Close Calendar View
          </button>
        </div>

      </div>
    </div>
  );
};
