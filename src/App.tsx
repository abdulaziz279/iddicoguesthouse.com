import React, { useState } from 'react';
import { GuestHouseProvider, useGuestHouse } from './context/GuestHouseContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoomsSection } from './components/RoomsSection';
import { AboutSection } from './components/AboutSection';
import { PhotoGallery } from './components/PhotoGallery';
import { GuestReviews } from './components/GuestReviews';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WelcomeModal } from './components/WelcomeModal';
import { BookingModal } from './components/BookingModal';
import { ReservationsCalendarView } from './components/ReservationsCalendarView';
import { TermsAndConditionsModal } from './components/TermsAndConditionsModal';
import { Room } from './types/guestHouse';

function MainAppContent() {
  const { 
    isCalendarManagerOpen, 
    setIsCalendarManagerOpen, 
    rooms 
  } = useGuestHouse();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  const handleOpenBooking = (room?: Room) => {
    setSelectedRoomForBooking(room || rooms[0]);
    setIsBookingModalOpen(true);
  };

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Welcome Message Pop-up upon entry to greet new guests */}
      <WelcomeModal
        onExploreRooms={() => handleScrollTo('rooms')}
        onOpenCalendar={() => setIsCalendarManagerOpen(true)}
      />

      {/* Responsive Navigation Header */}
      <Navbar onScrollTo={handleScrollTo} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Search Bar */}
        <HeroSection
          onExploreRooms={() => handleScrollTo('rooms')}
          onOpenCalendar={() => setIsCalendarManagerOpen(true)}
        />

        {/* The 2 Rooms Section with Availability Toggles & Distinct Calendars */}
        <RoomsSection
          onOpenBooking={handleOpenBooking}
          onOpenCalendarManager={() => setIsCalendarManagerOpen(true)}
        />

        {/* About Section, Signature Amenities (Wi-Fi, 24/7 Desk, Relaxation Garden, Laundry) & Tourist Attractions */}
        <AboutSection />

        {/* Filterable Photo Gallery with Lightbox */}
        <PhotoGallery />

        {/* Verified Guest Reviews & Review Submission Form */}
        <GuestReviews />

        {/* Frequently Asked Questions (FAQ) Section */}
        <FaqSection />

        {/* Contact Info, Google Maps Integration, Support Request Form & Social Links */}
        <ContactSection />
      </main>

      {/* Comprehensive Footer with Functional Links & Room-Specific Details */}
      <Footer
        onScrollTo={handleScrollTo}
        onOpenBooking={handleOpenBooking}
      />

      {/* Integrated Online Booking Modal with Distinct Calendars, MoMo Gateway & Confirmation Slip */}
      {isBookingModalOpen && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialRoom={selectedRoomForBooking}
        />
      )}

      {/* Calendar View to manage upcoming reservations and room availability status */}
      {isCalendarManagerOpen && (
        <ReservationsCalendarView
          isOpen={isCalendarManagerOpen}
          onClose={() => setIsCalendarManagerOpen(false)}
          onBookRoom={handleOpenBooking}
        />
      )}

      {/* Terms & Conditions Modal to Ensure Legal Compliance */}
      <TermsAndConditionsModal />

    </div>
  );
}

export default function App() {
  return (
    <GuestHouseProvider>
      <MainAppContent />
    </GuestHouseProvider>
  );
}
