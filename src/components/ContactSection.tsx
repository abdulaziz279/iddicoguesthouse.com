import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, 
  MessageCircle, ExternalLink, Sparkles, Navigation, Globe
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Get In Touch & Visit Us
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            Contact Info & Google Maps
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Have questions about room availability, directions, or transport from Kotoka International Airport? Reach out anytime—our front desk is active 24/7.
          </p>
        </div>

        {/* Dual Layout: Contact Form on Left, Contact Details & Google Maps on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Support Request Form */}
          <div className="lg:col-span-5 bg-stone-800/80 p-6 sm:p-8 rounded-3xl border border-stone-700 shadow-xl">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              Send a Direct Support Request
            </h3>
            <p className="text-xs text-stone-400 mb-6">
              Fill out this form and our 24/7 reception team will respond promptly via email or phone.
            </p>

            {isSubmitted ? (
              <div className="py-12 text-center text-emerald-400 space-y-3 bg-stone-900/60 p-6 rounded-2xl border border-emerald-500/30">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
                <h4 className="font-display font-bold text-lg text-white">Message Dispatched!</h4>
                <p className="text-xs text-stone-300">
                  Medaase! We have received your inquiry and our guest relation manager will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kwabena Asante"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="asante@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Phone Number (MoMo)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+233 24 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Subject / Inquiry Type</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-stone-100 focus:outline-hidden focus:border-amber-500 cursor-pointer"
                  >
                    <option value="General Inquiry">General Room Inquiry</option>
                    <option value="MoMo Payment">MoMo Payment or Pricing Question</option>
                    <option value="Airport Pickup">Airport Pickup / Transfer Request</option>
                    <option value="Tour Arrangement">Local Tourist Attraction Excursion</option>
                    <option value="Laundry Service">Laundry / Special Hospitality Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist your stay at Iddico Guest House?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}

            {/* Direct WhatsApp Callout */}
            <div className="mt-6 pt-5 border-t border-stone-700/80 flex items-center justify-between">
              <span className="text-xs text-stone-400">Prefer instant WhatsApp chat?</span>
              <a
                href="https://wa.me/233248805934"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat Now</span>
              </a>
            </div>
          </div>

          {/* Contact Details & Google Maps Integration */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Our Physical Location</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Off Coastal Beach Road, Near Palm Grove, Greater Accra / Central Coast Corridor, Ghana
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">24/7 Front Desk Hours</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Reception open 24 Hours / 7 Days a week. Night arrivals welcomed with advance booking.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Main Hotlines</h4>
                  <p className="text-xs text-stone-300 mt-0.5 font-mono">
                    <a href="tel:+233248805934" className="hover:text-amber-400 transition-colors">+233 24 880 5934 (24/7 Desk & MoMo)</a><br />
                    <a href="https://wa.me/233248805934" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">+233 24 880 5934 (WhatsApp Desk)</a>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Official Email Inquiries</h4>
                  <p className="text-xs text-stone-300 mt-0.5">
                    info@iddicogh.com<br />
                    reservations@iddicogh.com
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Integration Frame */}
            <div className="rounded-3xl overflow-hidden border border-stone-700 shadow-xl bg-stone-800">
              <div className="p-3.5 bg-stone-850 border-b border-stone-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-bold text-stone-200">Google Maps Live Location Pin</span>
                  <span className="text-stone-400 text-[11px]">· Accra-Coastal Corridor, Ghana</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Accra+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>

              {/* Map Embed Container */}
              <div className="relative h-64 sm:h-72 w-full bg-stone-900">
                <iframe
                  title="Iddico Guest House Google Maps Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Accra,%20Ghana&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full grayscale-[25%] contrast-110"
                />

                {/* Floating Map Overlay Pill */}
                <div className="absolute bottom-3 left-3 bg-stone-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-700 text-xs text-stone-200 shadow-lg flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
                  <div>
                    <span className="font-bold text-white block">Iddico Guest House Pin</span>
                    <span className="text-[10px] text-stone-400">Easy road access · Secure gated parking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="p-5 rounded-3xl bg-stone-800/80 border border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-white text-sm">
                  Connect on Social Media
                </h4>
                <p className="text-xs text-stone-400">
                  Follow daily guest stories, seasonal promos, and local Ghana travel guides.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href="https://wa.me/233248805934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-stone-700 hover:bg-pink-600 text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-stone-700 hover:bg-blue-600 text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-stone-700 hover:bg-stone-600 text-white transition-colors"
                  aria-label="X Twitter"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
