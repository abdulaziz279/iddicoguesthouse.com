import React, { useState, useMemo } from 'react';
import { useGuestHouse } from '../context/GuestHouseContext';
import { BookingSubmission } from '../types/guestHouse';
import {
  Lock, Unlock, KeyRound, Shield, Check, X, Search, Filter, Download,
  Trash2, Printer, Eye, EyeOff, RefreshCw, Calendar, Phone, Mail, User,
  CreditCard, Smartphone, CheckCircle2, Clock, AlertTriangle, ChevronDown,
  Plus, ExternalLink, BedDouble, LogOut, FileText, Sparkles, MessageCircle,
  Copy, DollarSign, Building
} from 'lucide-react';

const DEFAULT_ADMIN_PASSWORD = 'Admin-iddico123';
const AUTH_STORAGE_KEY = 'iddico_admin_auth_session';
const CUSTOM_PASSWORD_KEY = 'iddico_custom_admin_password';

export const AdminPortalModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    bookings,
    rooms,
    toggleRoomAvailability,
    updateBookingStatus,
    deleteBooking,
    clearAllBookings,
    addSampleBooking
  } = useGuestHouse();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccessNotice, setAuthSuccessNotice] = useState('');

  // Password Management State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roomFilter, setRoomFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'bookings' | 'rooms' | 'security'>('bookings');

  // Selected Booking for Invoice / Receipt view
  const [selectedBookingForReceipt, setSelectedBookingForReceipt] = useState<BookingSubmission | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Helper to get active master password
  const getStoredPassword = (): string => {
    try {
      return localStorage.getItem(CUSTOM_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
    } catch {
      return DEFAULT_ADMIN_PASSWORD;
    }
  };

  // Auth Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const activePassword = getStoredPassword();

    if (passwordInput === activePassword) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (err) {
        console.error(err);
      }
      setPasswordInput('');
      setAuthSuccessNotice('Access granted. Welcome to Iddico Admin Portal.');
      setTimeout(() => setAuthSuccessNotice(''), 2500);
    } else {
      setAuthError(`Incorrect password. Default master password is: ${DEFAULT_ADMIN_PASSWORD}`);
    }
  };

  // Quick fill default password helper
  const handleFillDefault = () => {
    setPasswordInput(DEFAULT_ADMIN_PASSWORD);
    setAuthError('');
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.error(err);
    }
    setPasswordInput('');
    setAuthError('');
  };

  // Change Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Passwords do not match. Please re-enter.' });
      return;
    }

    try {
      localStorage.setItem(CUSTOM_PASSWORD_KEY, newPassword);
      setPasswordMsg({ type: 'success', text: 'Password successfully updated! Keep your new password safe.' });
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setPasswordMsg({ type: 'error', text: 'Failed to save password into storage.' });
    }
  };

  // Reset Password to Default
  const handleResetPassword = () => {
    if (window.confirm(`Reset admin password to default (${DEFAULT_ADMIN_PASSWORD})?`)) {
      try {
        localStorage.removeItem(CUSTOM_PASSWORD_KEY);
        setPasswordMsg({ type: 'success', text: `Password successfully reset to default: ${DEFAULT_ADMIN_PASSWORD}` });
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      // Status filter
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;

      // Room filter
      if (roomFilter !== 'all' && b.roomId !== roomFilter) return false;

      // Payment filter
      if (paymentFilter !== 'all') {
        if (paymentFilter === 'paystack' && b.paymentMethod !== 'paystack') return false;
        if (paymentFilter === 'momo' && !b.paymentMethod.startsWith('momo_') && b.paymentMethod !== 'telecel_cash' && b.paymentMethod !== 'at_money') return false;
        if (paymentFilter === 'arrival' && b.paymentMethod !== 'pay_on_arrival') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = b.guestName.toLowerCase().includes(q);
        const matchId = b.id.toLowerCase().includes(q);
        const matchPhone = b.guestPhone.toLowerCase().includes(q);
        const matchEmail = b.guestEmail.toLowerCase().includes(q);
        const matchRef = (b.paystackReference || '').toLowerCase().includes(q);
        const matchRoom = b.roomName.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchPhone && !matchEmail && !matchRef && !matchRoom) {
          return false;
        }
      }

      return true;
    });
  }, [bookings, statusFilter, roomFilter, paymentFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.totalGhs : sum), 0);
    const paystackBookings = bookings.filter(b => b.paymentMethod === 'paystack');
    const paystackRevenue = paystackBookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.totalGhs : sum), 0);
    const standardCount = bookings.filter(b => b.roomId === 'standard-haven').length;
    const deluxeCount = bookings.filter(b => b.roomId === 'deluxe-suite').length;
    const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
    const pendingArrivalCount = bookings.filter(b => b.status === 'pending_arrival').length;

    return {
      totalBookings,
      totalRevenue,
      paystackRevenue,
      paystackCount: paystackBookings.length,
      standardCount,
      deluxeCount,
      confirmedCount,
      pendingArrivalCount
    };
  }, [bookings]);

  // CSV Export
  const handleExportCSV = () => {
    if (bookings.length === 0) {
      alert('There are no saved bookings to export.');
      return;
    }

    const headers = [
      'Booking ID',
      'Created Date',
      'Guest Name',
      'Guest Phone',
      'Guest Email',
      'Room ID',
      'Room Name',
      'Nightly Rate (GHS)',
      'Check In',
      'Check Out',
      'Nights',
      'Guests Count',
      'Total Amount (GHS)',
      'Payment Method',
      'Paystack Reference',
      'Payment Phone',
      'Status',
      'Special Requests'
    ];

    const rows = bookings.map(b => [
      `"${b.id}"`,
      `"${b.createdAt}"`,
      `"${b.guestName.replace(/"/g, '""')}"`,
      `"${b.guestPhone}"`,
      `"${b.guestEmail}"`,
      `"${b.roomId}"`,
      `"${b.roomName}"`,
      b.roomPrice,
      `"${b.checkIn}"`,
      `"${b.checkOut}"`,
      b.nights,
      b.guestsCount,
      b.totalGhs,
      `"${b.paymentMethod}"`,
      `"${b.paystackReference || ''}"`,
      `"${b.paymentPhone || ''}"`,
      `"${b.status}"`,
      `"${(b.specialRequests || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `iddico_guest_house_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print ledger
  const handlePrintLedger = () => {
    window.print();
  };

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl text-stone-100 my-8 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >

        {/* Modal Top Bar */}
        <div className="px-5 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-base sm:text-lg text-white">
                  Iddico Staff & Admin Portal
                </h2>
                {isAuthenticated ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-700/50">
                    <CheckCircle2 className="w-3 h-3" />
                    Ledger Unlocked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-700/50">
                    <Lock className="w-3 h-3" />
                    Password Protected
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-400">
                Online Bookings Repository, Paystack Settlements & Front Desk Records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors cursor-pointer"
                title="Lock admin portal and sign out of current session"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Lock Portal</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* ==============================================================
             PASSWORD LOGIN VIEW
             ============================================================== */
          <div className="p-6 sm:p-12 max-w-lg mx-auto w-full my-auto flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Management Authentication
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mb-6 leading-relaxed">
              Enter the staff master password to inspect, manage, and export all online guest bookings stored at Iddico Guest House.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                  Admin Master Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <KeyRound className="w-4 h-4 text-amber-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={e => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    placeholder="Enter password..."
                    autoFocus
                    required
                    className="w-full pl-10 pr-12 py-3 bg-stone-950 border border-stone-700 rounded-2xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {authSuccessNotice && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{authSuccessNotice}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Bookings Ledger</span>
              </button>

              {/* Default Credential helper pill */}
              <div className="pt-3 border-t border-stone-800 text-center">
                <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800/80 text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-left">
                    <span className="text-stone-400">Default Password:</span>
                    <code className="px-2 py-0.5 rounded bg-stone-800 text-amber-300 font-mono font-bold select-all">
                      {DEFAULT_ADMIN_PASSWORD}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDefault}
                    className="text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer shrink-0"
                  >
                    Auto-Fill
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* ==============================================================
             AUTHENTICATED ADMIN DASHBOARD VIEW
             ============================================================== */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Tabs & Quick Action Bar */}
            <div className="px-5 py-3 bg-stone-950/70 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'bookings'
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Online Bookings Ledger ({bookings.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('rooms')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'rooms'
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Room Inventory & Toggles</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'security'
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Password & Backup</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={addSampleBooking}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Generate a test booking to verify storage and ledger view"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Sample Booking</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Download all booking records as CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>

                <button
                  onClick={handlePrintLedger}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Print active ledger view"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-300" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="sm:hidden p-1.5 rounded-lg bg-stone-800 text-red-400 hover:bg-stone-700"
                  title="Lock portal"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

              {/* 1. BOOKINGS LEDGER TAB */}
              {activeTab === 'bookings' && (
                <>
                  {/* Revenue & Booking KPI Strip */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
                      <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
                        <span>Total Online Bookings</span>
                        <FileText className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-2xl font-display font-bold text-white">
                        {stats.totalBookings}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">
                        {stats.confirmedCount} confirmed · {stats.pendingArrivalCount} pay-on-arrival
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
                      <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
                        <span>Gross Revenue</span>
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-2xl font-display font-bold text-amber-400">
                        GH₵ {stats.totalRevenue.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-1">
                        GH₵ {stats.paystackRevenue.toLocaleString()} via Paystack
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
                      <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
                        <span>Standard Haven (GH₵ 100)</span>
                        <BedDouble className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-2xl font-display font-bold text-white">
                        {stats.standardCount}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">
                        Room 101 Bookings
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
                      <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
                        <span>Deluxe Suite (GH₵ 170)</span>
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-2xl font-display font-bold text-white">
                        {stats.deluxeCount}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">
                        Room 201 Bookings
                      </div>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search guest name, phone, email, booking reference ID, or Paystack ref..."
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-700/80 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-500"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {/* Room filter */}
                      <select
                        value={roomFilter}
                        onChange={e => setRoomFilter(e.target.value)}
                        className="px-3 py-2 bg-stone-900 border border-stone-700/80 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="all">All Rooms</option>
                        <option value="standard-haven">The Standard Haven (Ghs 100)</option>
                        <option value="deluxe-suite">The Deluxe Executive (Ghs 170)</option>
                      </select>

                      {/* Payment filter */}
                      <select
                        value={paymentFilter}
                        onChange={e => setPaymentFilter(e.target.value)}
                        className="px-3 py-2 bg-stone-900 border border-stone-700/80 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="all">All Payment Types</option>
                        <option value="paystack">Paystack Online Payments</option>
                        <option value="momo">Mobile Money (MoMo / Telecel)</option>
                        <option value="arrival">Pay on Arrival</option>
                      </select>

                      {/* Status filter */}
                      <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-stone-900 border border-stone-700/80 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="all">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending_arrival">Pending Arrival</option>
                        <option value="checked_in">Checked In</option>
                        <option value="completed">Completed Stay</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Bookings List / Ledger */}
                  {filteredBookings.length === 0 ? (
                    <div className="p-12 text-center bg-stone-950/40 rounded-3xl border border-stone-800/80">
                      <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center mx-auto mb-3 text-stone-400">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-base text-white mb-1">
                        {bookings.length === 0 ? 'No online bookings stored yet' : 'No bookings match active filters'}
                      </h4>
                      <p className="text-xs text-stone-400 max-w-md mx-auto mb-5 leading-relaxed">
                        {bookings.length === 0
                          ? 'When guests book and pay via Paystack, Mobile Money, or Pay-on-Arrival on the website, their details are automatically saved here with dates, payment references, and contact records.'
                          : 'Try modifying your search query or reset room/status filters to view other stored reservations.'}
                      </p>
                      {bookings.length === 0 && (
                        <button
                          onClick={addSampleBooking}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Generate Sample Booking</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {filteredBookings.map(b => (
                        <div
                          key={b.id}
                          className="p-4 sm:p-5 rounded-2xl bg-stone-950/90 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs"
                        >
                          {/* Left: ID, Guest & Room */}
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-stone-800 text-amber-300 text-xs border border-stone-700">
                                {b.id}
                              </span>
                              <button
                                onClick={() => handleCopy(b.id, `id-${b.id}`)}
                                className="text-stone-400 hover:text-stone-200 transition-colors"
                                title="Copy ID"
                              >
                                {copiedId === `id-${b.id}` ? (
                                  <span className="text-[10px] text-emerald-400 font-semibold">Copied!</span>
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <span className="text-stone-500">·</span>
                              <span className="text-stone-400 text-[11px]">
                                Booked {new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>

                              {/* Status Badge */}
                              <div className="ml-auto lg:ml-2">
                                <select
                                  value={b.status}
                                  onChange={e => updateBookingStatus(b.id, e.target.value as any)}
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-pointer focus:outline-none ${
                                    b.status === 'confirmed'
                                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                                      : b.status === 'pending_arrival'
                                      ? 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                                      : b.status === 'checked_in'
                                      ? 'bg-blue-950/80 text-blue-300 border-blue-700/60'
                                      : b.status === 'completed'
                                      ? 'bg-purple-950/80 text-purple-300 border-purple-700/60'
                                      : 'bg-red-950/80 text-red-300 border-red-800/60'
                                  }`}
                                >
                                  <option value="confirmed">Confirmed</option>
                                  <option value="pending_arrival">Pending Arrival</option>
                                  <option value="checked_in">Checked In</option>
                                  <option value="completed">Completed Stay</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                            </div>

                            {/* Guest Details & Room Name */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                                  {b.guestName.charAt(0)}
                                </div>
                                <span className="font-bold text-white text-sm">
                                  {b.guestName}
                                </span>
                                <span className="text-stone-400 text-[11px]">
                                  ({b.guestsCount} {b.guestsCount === 1 ? 'Guest' : 'Guests'})
                                </span>
                              </div>

                              <div className="flex items-center gap-3 text-stone-300 text-xs">
                                <a
                                  href={`tel:${b.guestPhone.replace(/\s+/g, '')}`}
                                  className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                                  title="Call guest"
                                >
                                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                                  <span>{b.guestPhone}</span>
                                </a>

                                <a
                                  href={`mailto:${b.guestEmail}`}
                                  className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                                  title="Email guest"
                                >
                                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                                  <span className="truncate max-w-[150px]">{b.guestEmail}</span>
                                </a>

                                <a
                                  href={`https://wa.me/${b.guestPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(b.guestName)},%20this%20is%20Iddico%20Guest%20House%20confirming%20your%20reservation%20${b.id}%20for%20${encodeURIComponent(b.roomName)}.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-md bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800"
                                  title="Message guest on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>

                            {/* Room and Dates Details */}
                            <div className="flex flex-wrap items-center gap-3 text-stone-300">
                              <span className="font-semibold text-amber-400">
                                {b.roomName}
                              </span>
                              <span className="text-stone-500">·</span>
                              <span className="flex items-center gap-1 text-stone-400">
                                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                                <strong className="text-stone-200">{b.checkIn}</strong> to <strong className="text-stone-200">{b.checkOut}</strong>
                                <span className="ml-1 px-1.5 py-0.2 rounded bg-stone-800 text-stone-300 text-[10px]">
                                  {b.nights} {b.nights === 1 ? 'Night' : 'Nights'}
                                </span>
                              </span>
                            </div>

                            {/* Special Requests if present */}
                            {b.specialRequests && (
                              <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 text-[11px] italic">
                                <span className="font-semibold text-stone-300 not-italic">Guest Note:</span> "{b.specialRequests}"
                              </div>
                            )}
                          </div>

                          {/* Right: Payment Details & Actions */}
                          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 w-full lg:w-auto shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-800">
                            <div className="text-left lg:text-right">
                              <span className="text-stone-400 text-[11px] block">Total Amount</span>
                              <span className="font-display font-bold text-lg text-amber-400">
                                GH₵ {b.totalGhs}
                              </span>
                              
                              {/* Payment badge */}
                              <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                                {b.paymentMethod === 'paystack' ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-semibold">
                                    <CreditCard className="w-3 h-3" />
                                    Paystack Paid
                                  </span>
                                ) : b.paymentMethod === 'pay_on_arrival' ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-800 font-semibold">
                                    <Clock className="w-3 h-3" />
                                    Pay at Desk
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800 font-semibold">
                                    <Smartphone className="w-3 h-3" />
                                    Mobile Money
                                  </span>
                                )}

                                {b.paystackReference && (
                                  <span 
                                    className="font-mono text-[10px] text-stone-400 truncate max-w-[120px] cursor-pointer hover:text-stone-200"
                                    onClick={() => handleCopy(b.paystackReference!, `ref-${b.id}`)}
                                    title="Click to copy Paystack Reference"
                                  >
                                    Ref: {b.paystackReference.substring(0, 10)}...
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedBookingForReceipt(b)}
                                className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                                title="View booking receipt"
                              >
                                <FileText className="w-3.5 h-3.5 text-amber-400" />
                                <span>Receipt</span>
                              </button>

                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete booking ${b.id} for ${b.guestName}? This will also release the reserved calendar dates.`)) {
                                    deleteBooking(b.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-red-950 text-stone-400 hover:text-red-400 transition-colors cursor-pointer"
                                title="Delete this booking"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* 2. ROOM INVENTORY & AVAILABILITY TOGGLES */}
              {activeTab === 'rooms' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white mb-1">
                      Our 2 Boutique Rooms - Live Availability Control
                    </h3>
                    <p className="text-xs text-stone-400">
                      Toggling room availability here updates the public website and booking calendar immediately in real time.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rooms.map(room => (
                      <div
                        key={room.id}
                        className="p-5 rounded-3xl bg-stone-950 border border-stone-800 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2.5 py-1 rounded-lg bg-stone-800 text-amber-300 font-mono text-xs font-bold">
                              {room.roomNumber}
                            </span>
                            <h4 className="font-display font-bold text-white text-base">
                              {room.name}
                            </h4>
                          </div>

                          <span className="font-display font-bold text-amber-400 text-base">
                            GH₵ {room.priceGhs} <span className="text-xs font-normal text-stone-400">/ night</span>
                          </span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white block">
                              Public Availability Status
                            </span>
                            <span className="text-[11px] text-stone-400">
                              {room.isAvailable ? 'Available for Online Booking' : 'Offline / Occupied / Maintenance'}
                            </span>
                          </div>

                          <button
                            onClick={() => toggleRoomAvailability(room.id)}
                            role="switch"
                            aria-checked={room.isAvailable}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                              room.isAvailable ? 'bg-emerald-600' : 'bg-stone-700'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                room.isAvailable ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Room contact desk */}
                        <div className="text-xs space-y-1 text-stone-400 pt-2 border-t border-stone-800">
                          <div className="flex items-center justify-between">
                            <span>Rooms Direct Desk Line:</span>
                            <span className="font-mono text-white font-bold">{room.phone} ({room.phoneExt})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Direct Email:</span>
                            <span className="text-amber-300">{room.email}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Reserved Dates in Ledger:</span>
                            <span className="text-stone-300">{room.bookedDates.length} days blocked</span>
                          </div>
                        </div>

                        {room.bookedDates.length > 0 && (
                          <div className="pt-2">
                            <span className="text-[11px] font-semibold text-stone-400 block mb-1.5">
                              Upcoming Blocked Dates:
                            </span>
                            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                              {room.bookedDates.map(date => (
                                <span
                                  key={date}
                                  className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] font-mono text-amber-300"
                                >
                                  {date}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. SECURITY & PASSWORD MANAGEMENT TAB */}
              {activeTab === 'security' && (
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="p-6 rounded-3xl bg-stone-950 border border-stone-800 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-base">
                          Update Admin Password
                        </h4>
                        <p className="text-xs text-stone-400">
                          Change master password used to authenticate header & footer admin access.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                          New Master Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          placeholder="Enter new master password (min 6 chars)..."
                          required
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter new password..."
                          required
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>

                      {passwordMsg && (
                        <div
                          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                            passwordMsg.type === 'success'
                              ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-200'
                              : 'bg-red-950/80 border border-red-800 text-red-200'
                          }`}
                        >
                          {passwordMsg.type === 'success' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                          )}
                          <span>{passwordMsg.text}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Save New Password
                        </button>
                        <button
                          type="button"
                          onClick={handleResetPassword}
                          className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Reset to Default
                        </button>
                      </div>
                    </form>

                    <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-[11px] text-stone-400">
                      <strong>System Default:</strong> <code className="text-amber-300 font-mono font-bold select-all">{DEFAULT_ADMIN_PASSWORD}</code>
                    </div>
                  </div>

                  {/* Danger Zone: Clear all bookings */}
                  <div className="p-6 rounded-3xl bg-red-950/20 border border-red-900/40 space-y-3">
                    <h4 className="font-display font-bold text-red-300 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      Danger Zone: Clear Bookings Repository
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      This will permanently erase all saved bookings and unblock all calendar reservation dates. Only use when resetting test data.
                    </p>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you ABSOLUTELY SURE you want to clear all online bookings and reset the room calendar? This action cannot be undone.')) {
                          clearAllBookings();
                          alert('All bookings have been cleared.');
                        }
                      }}
                      className="py-2 px-3.5 rounded-xl bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Clear All Bookings
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Status bar */}
            <div className="px-5 py-3 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Protected Admin Ledger · {bookings.length} reservations safely stored in local database</span>
              </div>
              <div className="flex items-center gap-4 text-stone-400">
                <span>Rooms Direct Desk: <a href="tel:+233248805934" className="text-amber-400 font-mono font-bold hover:underline">+233 24 880 5934</a></span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ==============================================================
          INDIVIDUAL BOOKING RECEIPT / INVOICE MODAL
          ============================================================== */}
      {selectedBookingForReceipt && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setSelectedBookingForReceipt(null)}
        >
          <div 
            className="w-full max-w-lg bg-white text-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBookingForReceipt(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-4 border-b border-stone-200">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                Official Booking Receipt
              </span>
              <h3 className="font-display font-bold text-xl text-stone-900 mt-2">
                Iddico Guest House
              </h3>
              <p className="text-xs text-stone-500">
                Greater Accra / Central Coast, Ghana · Tel: +233 24 880 5934
              </p>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Booking Reference:</span>
                <span className="font-mono font-bold text-stone-900">{selectedBookingForReceipt.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Guest Name:</span>
                <span className="font-bold text-stone-900">{selectedBookingForReceipt.guestName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Contact Phone:</span>
                <span className="font-bold text-stone-900">{selectedBookingForReceipt.guestPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Email Address:</span>
                <span className="text-stone-900">{selectedBookingForReceipt.guestEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Reserved Room:</span>
                <span className="font-bold text-stone-900">{selectedBookingForReceipt.roomName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Check-in / Check-out:</span>
                <span className="font-semibold text-stone-900">{selectedBookingForReceipt.checkIn} to {selectedBookingForReceipt.checkOut} ({selectedBookingForReceipt.nights} Nights)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Payment Channel:</span>
                <span className="capitalize font-semibold text-stone-900">{selectedBookingForReceipt.paymentMethod.replace('_', ' ')}</span>
              </div>
              {selectedBookingForReceipt.paystackReference && (
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Paystack Ref:</span>
                  <span className="font-mono text-stone-900">{selectedBookingForReceipt.paystackReference}</span>
                </div>
              )}
              <div className="flex justify-between py-2 text-sm font-bold border-t border-stone-200">
                <span className="text-stone-800">Total Amount Paid / Due:</span>
                <span className="text-amber-700 font-display text-base">GH₵ {selectedBookingForReceipt.totalGhs}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => setSelectedBookingForReceipt(null)}
                className="py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
