import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  CreditCard,
  QrCode,
  ShieldCheck,
  Video,
  X,
  Lock,
  Download
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
        particleCount: 50,
        spread: 60,
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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#A3E635', '#8B5CF6', '#FBBF24']
      });
    }, 1200);
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <SEOHead
        title="Hackathons, Sprints & Live Workshops"
        description="Join premier student hackathons, sprint challenges, and hands-on vibe coding masterclasses with CodeGoblins. Form your squad and claim podiums."
        canonicalPath="/events"
        pageId="events_hub"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Trophy className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
              Events, Sprints & Workshops
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
            Discover premier hackathons, masterclass workshops, sprint challenges, and lock your digital passes.
          </p>
        </div>

        <button
          onClick={() => navigateTo('squads')}
          className="goblin-btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Users className="w-4 h-4" />
          <span>Find Teammates in Squads</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#11111B] border border-white/5">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8B5CF6] absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workshops or hackathons..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#171725] border border-white/5 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold">
          {['All', 'Workshops', 'Hackathons', 'Code Jams'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterType === type
                  ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/30'
                  : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.map((evt) => {
          const isRegistered = currentUser ? evt.registeredUserIds.includes(currentUser.id) : false;
          const isPaid = !!evt.priceInr && evt.priceInr > 0;

          return (
            <div
              key={evt.id}
              className="goblin-card p-6 sm:p-7 border-[#8B5CF6]/25 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden relative"
            >
              {/* Event Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
                <div className="w-full sm:w-44 h-32 rounded-2xl overflow-hidden shrink-0 relative ring-1 ring-white/10">
                  <img
                    src={evt.bannerImage}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#A3E635] text-[#09090F]">
                    {evt.type}
                  </span>
                  {isPaid ? (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B5CF6] text-white">
                      ₹{evt.priceInr}
                    </span>
                  ) : (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/80 text-white">
                      Free Pass
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[#A1A1B5] font-semibold">{evt.organizer}</span>
                    <span className="text-white/20">•</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400">
                      {evt.status}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-[#A3E635] font-mono font-bold">{evt.format}</span>
                    {evt.location && <span className="text-[#A1A1B5]">({evt.location})</span>}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#F5F3FF]">
                    {evt.title}
                  </h3>

                  {evt.instructorName && (
                    <p className="text-xs text-[#C084FC] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
                      <span>Led by {evt.instructorName} ({evt.instructorRole})</span>
                    </p>
                  )}

                  <p className="text-xs text-[#A1A1B5] leading-relaxed max-w-2xl line-clamp-2">
                    {evt.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A1A1B5] pt-1">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{evt.prizePool}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#C084FC]">
                      <Users className="w-3.5 h-3.5" />
                      <span>{evt.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>
                        {new Date(evt.startDate).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
                {isRegistered ? (
                  <>
                    <button
                      onClick={() => setTicketEvent(evt)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-500/25 transition"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>View Digital Pass</span>
                    </button>
                    <button
                      onClick={() => downloadCalendarICS(evt)}
                      className="px-4 py-1.5 rounded-lg text-[11px] font-semibold text-[#A1A1B5] hover:text-[#F5F3FF] flex items-center justify-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Add to Calendar (.ics)</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleOpenRegistration(evt)}
                    className="goblin-btn-green py-2.5 px-6 text-xs font-bold flex items-center justify-center gap-2 shadow-glow-green"
                  >
                    <Sparkles className="w-4 h-4 text-[#09090F]" />
                    <span>{isPaid ? `Book Seat (₹${evt.priceInr})` : 'Register Free'}</span>
                  </button>
                )}

                <button
                  onClick={() => navigateTo('squads')}
                  className="px-5 py-2.5 rounded-xl bg-[#171725] border border-white/10 hover:border-[#8B5CF6] text-xs font-semibold text-[#F5F3FF] flex items-center justify-center gap-2 transition"
                >
                  <Users className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Assemble Squad</span>
                </button>

                <a
                  href={evt.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center text-[11px] text-[#A855F7] hover:underline flex items-center justify-center gap-1 font-semibold pt-1"
                >
                  <span>Details / Syllabus</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Razorpay Checkout Modal */}
      {checkoutEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#11111B] border border-[#8B5CF6]/40 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 text-[#A855F7] flex items-center justify-center font-black">
                  ₹
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5F3FF]">Razorpay Checkout</h3>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> 256-bit Encrypted Session
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCheckoutEvent(null)}
                className="p-1 rounded-lg text-[#A1A1B5] hover:text-[#F5F3FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="p-4 rounded-2xl bg-[#171725] border border-white/5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#A1A1B5]">Masterclass Seat Reservation</span>
              <h4 className="text-sm font-bold text-[#F5F3FF]">{checkoutEvent.title}</h4>
              <div className="flex justify-between items-center pt-2 border-t border-white/5 text-xs">
                <span className="text-[#A1A1B5]">Workshop Ticket</span>
                <span className="text-base font-black text-[#A3E635]">₹{checkoutEvent.priceInr}.00</span>
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#A1A1B5]">Select Payment Method</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                    paymentMethod === 'upi'
                      ? 'border-[#A3E635] bg-[#A3E635]/10 text-[#A3E635]'
                      : 'border-white/5 bg-[#171725] text-[#A1A1B5]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#C084FC]'
                      : 'border-white/5 bg-[#171725] text-[#A1A1B5]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Debit / Card</span>
                </button>
              </div>

              {paymentMethod === 'upi' ? (
                <div className="p-3 bg-[#171725] rounded-xl text-center border border-white/5 space-y-1">
                  <p className="text-[11px] text-[#A1A1B5]">Simulated VPA Address</p>
                  <p className="font-mono text-xs font-bold text-[#F5F3FF]">
                    {currentUser?.username || 'cadet'}@okhdfcbank
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-[#171725] rounded-xl space-y-2 border border-white/5">
                  <input
                    type="text"
                    disabled
                    value="•••• •••• •••• 4242 (Test Card)"
                    className="w-full bg-black/30 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-[#A1A1B5] font-mono"
                  />
                </div>
              )}
            </div>

            {/* Checkout Action Button */}
            <button
              disabled={isProcessingPayment}
              onClick={handleSimulatedPayment}
              className="w-full goblin-btn-primary py-3 text-xs font-bold flex items-center justify-center gap-2"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying HMAC Signature...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{checkoutEvent.priceInr} & Confirm Registration</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Digital Pass / Ticket Modal */}
      {ticketEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#11111B] border border-[#A3E635]/40 rounded-3xl max-w-sm w-full p-6 space-y-6 shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setTicketEvent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#A1A1B5] hover:text-[#F5F3FF]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#A3E635]/20 text-[#A3E635] mx-auto flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#A3E635]/20 text-[#A3E635] uppercase">
                Official Clan Pass
              </span>
              <h3 className="text-lg font-black text-[#F5F3FF] mt-2 leading-snug">
                {ticketEvent.title}
              </h3>
              <p className="text-xs text-[#A1A1B5] mt-1">
                Attendee: <strong className="text-[#F5F3FF]">{currentUser?.displayName}</strong>
              </p>
            </div>

            {/* Simulated QR Code Canvas */}
            <div className="p-4 bg-white rounded-2xl w-44 h-44 mx-auto flex flex-col items-center justify-center shadow-lg">
              <div className="w-36 h-36 border-4 border-black border-dashed flex flex-col items-center justify-center text-black">
                <QrCode className="w-20 h-20" />
                <span className="text-[9px] font-mono font-bold mt-1">CG-PASS-{ticketEvent.id.toUpperCase()}</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#A1A1B5] space-y-1">
              <div>Starts: {new Date(ticketEvent.startDate).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
              <div>Access: Secure Video Live Link (Dispatched 1 hour prior)</div>
            </div>

            <button
              onClick={() => downloadCalendarICS(ticketEvent)}
              className="w-full goblin-btn-green py-2.5 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#09090F]" />
              <span>Download iCal (.ics) Calendar Pass</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
