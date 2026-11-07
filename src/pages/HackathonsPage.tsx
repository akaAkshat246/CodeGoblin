import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Search,
  Check,
  CreditCard,
  QrCode,
  ShieldCheck,
  X,
  Lock,
  ArrowRight,
  ExternalLink,
  Zap,
  Trophy,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { HackathonEvent } from '../types';
import { SEOHead } from '../components/SEOHead';

export const HackathonsPage: React.FC = () => {
  const { hackathons, registerForWorkshopWithPayment, currentUser, navigateTo } = useApp();
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Checkout Modal State
  const [checkoutEvent, setCheckoutEvent] = useState<HackathonEvent | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Digital Ticket Pass Modal State
  const [ticketEvent, setTicketEvent] = useState<HackathonEvent | null>(null);

  const filteredEvents = hackathons.filter((e) => {
    const matchesType =
      filterType === 'All'
        ? true
        : filterType === 'Workshops'
        ? e.type === 'Workshop'
        : filterType === 'Hackathons'
        ? e.type === 'Hackathon'
        : e.type === 'Code Jam';

    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const handleOpenRegistration = (evt: HackathonEvent) => {
    if (evt.priceInr && evt.priceInr > 0) {
      setCheckoutEvent(evt);
    } else {
      registerForWorkshopWithPayment(evt.id, false, 0);
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#8B5CF6', '#A3E635', '#F5F3FF']
      });
    }
  };

  const handleSimulatedPayment = () => {
    if (!checkoutEvent) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      registerForWorkshopWithPayment(checkoutEvent.id, true, checkoutEvent.priceInr || 0);
      const bookedEvent = checkoutEvent;
      setCheckoutEvent(null);
      setTicketEvent(bookedEvent);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#A3E635', '#8B5CF6']
      });
    }, 1000);
  };

  const downloadCalendarICS = (evt: HackathonEvent) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CodeGoblins//Events//EN
BEGIN:VEVENT
SUMMARY:${evt.title}
DESCRIPTION:${evt.description}
URL:${evt.officialUrl}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${evt.title.replace(/\s+/g, '_')}.ics`;
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
      <SEOHead
        title="Events & Workshops"
        description="Join premier student hackathons, sprint challenges, and hands-on vibe coding masterclasses."
        canonicalPath="/events"
        pageId="events_hub"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-5 h-5 text-lime-400" />
            <span>Events &amp; Workshops</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Discover hackathons, masterclasses, and sprint challenges.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => navigateTo('build_win')}
            className="px-3.5 py-2 rounded-xl bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/30 text-xs font-semibold text-lime-400 transition flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-lime-400" />
            <span>Build &amp; Win Circuit</span>
          </button>
          <button
            onClick={() => navigateTo('squads')}
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-200 transition flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span>Assemble Squad</span>
          </button>
        </div>
      </div>

      {/* ABES Event Nexus: Build & Win Circuit Hero Capsule */}
      <div
        onClick={() => navigateTo('build_win')}
        className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#171526] via-[#111118] to-[#121A16] border border-lime-400/20 hover:border-lime-400/50 transition cursor-pointer group shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-lime-400/10 border border-lime-400/30 text-lime-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-lime-400/15 text-lime-400 uppercase tracking-wider">
                Official Competitive Framework
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                19 Societies • ₹5,00,000+ Prizes
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-lime-400 transition">
              Build. Compete. Win. — The Innovation Circuit
            </h2>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Explore the structured engineering sprint lifecycle: dedicated hardware labs, national stage defense in the 1,200-seat auditorium, and seed grant incubation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <span className="text-xs font-bold text-lime-400 group-hover:underline flex items-center gap-1">
            <span>Explore Circuit</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#111118] border border-white/[0.06] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium self-start sm:self-auto">
          {['All', 'Workshops', 'Hackathons', 'Code Jams'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterType === type
                  ? 'bg-white/[0.08] text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.map((evt) => {
          const isRegistered = currentUser ? evt.registeredUserIds.includes(currentUser.id) : false;
          const isPaid = !!evt.priceInr && evt.priceInr > 0;

          return (
            <div
              key={evt.id}
              className="p-5 rounded-xl bg-[#111118] border border-white/[0.06] hover:border-white/[0.12] transition flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              {/* Event Info */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-300">
                    {evt.type}
                  </span>
                  <span className="text-zinc-400 font-medium">{evt.organizer}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400 font-mono">{evt.format}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="font-mono text-amber-400 font-medium">{evt.prizePool}</span>
                </div>

                <h3 className="text-base font-bold text-white">{evt.title}</h3>

                {evt.instructorName && (
                  <p className="text-xs text-zinc-400">
                    Led by <span className="text-zinc-200 font-medium">{evt.instructorName}</span> ({evt.instructorRole})
                  </p>
                )}

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 max-w-2xl">
                  {evt.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 pt-1">
                  <span>
                    Starts: {new Date(evt.startDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                  <span>•</span>
                  <span>{evt.teamSize}</span>
                  <span>•</span>
                  <span>{evt.registeredUserIds.length} registered</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row md:flex-col items-center md:items-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.04]">
                {isRegistered ? (
                  <>
                    <button
                      onClick={() => setTicketEvent(evt)}
                      className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View Pass</span>
                    </button>
                    <button
                      onClick={() => downloadCalendarICS(evt)}
                      className="text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                    >
                      <span>.ics file</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleOpenRegistration(evt)}
                    className="px-4 py-2 rounded-xl bg-[#A3E635] hover:bg-[#bef264] text-[#09090F] text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{isPaid ? `Book Seat (₹${evt.priceInr})` : 'Register Free'}</span>
                  </button>
                )}

                <button
                  onClick={() => navigateTo('squads')}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs text-zinc-300 font-medium transition"
                >
                  Find Squad
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Checkout Modal */}
      {checkoutEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111118] border border-white/10 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Seat Reservation</h3>
                <span className="text-[10px] text-zinc-400 font-mono">Secure Simulated Checkout</span>
              </div>
              <button
                onClick={() => setCheckoutEvent(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <h4 className="text-xs font-bold text-white">{checkoutEvent.title}</h4>
              <div className="flex justify-between items-center pt-2 text-xs">
                <span className="text-zinc-400">Workshop Ticket</span>
                <span className="text-sm font-bold font-mono text-[#A3E635]">₹{checkoutEvent.priceInr}.00</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-zinc-400">Payment Option</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition ${
                    paymentMethod === 'upi'
                      ? 'border-[#A3E635]/40 bg-[#A3E635]/10 text-[#A3E635]'
                      : 'border-white/[0.06] bg-white/[0.02] text-zinc-400'
                  }`}
                >
                  UPI / QR
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition ${
                    paymentMethod === 'card'
                      ? 'border-[#A3E635]/40 bg-[#A3E635]/10 text-[#A3E635]'
                      : 'border-white/[0.06] bg-white/[0.02] text-zinc-400'
                  }`}
                >
                  Card
                </button>
              </div>
            </div>

            <button
              disabled={isProcessingPayment}
              onClick={handleSimulatedPayment}
              className="w-full py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#bef264] text-[#09090F] text-xs font-bold flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Confirm (₹{checkoutEvent.priceInr})</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Digital Pass Modal */}
      {ticketEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111118] border border-white/10 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-center animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setTicketEvent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#A3E635]/15 text-[#A3E635]">
                Official Pass
              </span>
              <h3 className="text-base font-bold text-white mt-2">
                {ticketEvent.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Attendee: <span className="text-white font-medium">{currentUser?.displayName}</span>
              </p>
            </div>

            {/* QR Box */}
            <div className="p-4 bg-white rounded-xl w-40 h-40 mx-auto flex flex-col items-center justify-center">
              <QrCode className="w-24 h-24 text-black" />
              <span className="text-[8px] font-mono text-black font-semibold mt-1">
                CG-PASS-{ticketEvent.id.toUpperCase()}
              </span>
            </div>

            <p className="text-[11px] font-mono text-zinc-400">
              Starts: {new Date(ticketEvent.startDate).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>

            <button
              onClick={() => downloadCalendarICS(ticketEvent)}
              className="w-full py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-white flex items-center justify-center gap-2 transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Download iCal (.ics)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
