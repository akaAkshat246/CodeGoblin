import React, { useState } from 'react';
import {
  Trophy,
  Zap,
  Flame,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Layers,
  Award,
  Sparkles,
  Cpu,
  Users,
  Radio,
  HelpCircle,
  Check,
  X,
  Code2,
  Rocket,
  Compass,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';

interface HallOfFameProject {
  title: string;
  club: string;
  year: string;
  award: string;
  description: string;
  lead: string;
  techStack: string[];
}

export const BuildWinPage: React.FC = () => {
  const { navigateTo, hackathons } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [copiedRuleId, setCopiedRuleId] = useState<number | null>(null);

  const circuitPhases = [
    {
      num: '01',
      title: 'Build',
      tagline: 'Ship Real-World Engineering',
      desc: 'Hackathons and competitions at ABES Event Nexus & CodeGoblins are engineered strictly for builders. Whether you are assembling autonomous combat robots in the mechatronics labs, training deep learning neural nets on high-performance GPUs, designing spatial XR apps for Meta Quest, or writing high-throughput distributed systems in Go & Rust — here you build products that solve actual industry and societal challenges.',
      highlights: [
        '24/7 dedicated campus labs & high-speed gigabit low-latency connectivity',
        'Hardware prototyping inventory (ESP32, Arduino, LiDAR sensors, Raspberry Pi)',
        'Cloud credits & API access from GDG, ACM & IEEE student chapters',
        'Direct architectural mentorship from senior fellows, alumni, and faculty leads'
      ],
      icon: Cpu,
      badgeColor: 'bg-lime-400/15 text-lime-400 border border-lime-400/30',
      img: '/assets/campus/coding-lab-mentorship.jpg'
    },
    {
      num: '02',
      title: 'Compete',
      tagline: 'Test Your Mettle on the National Circuit',
      desc: 'Pitch, defend, and present your innovations in front of esteemed faculty panels, venture capitalists, unicorn startup founders, and technical architects from leading tech giants. Experience intense 24-hour, 36-hour, and multi-round hackathon sprints with teams from top colleges across Delhi NCR and India.',
      highlights: [
        'Multi-track hackathon categories for beginners to elite systems coders',
        'Live stage demos in the 1,200-seater college auditorium',
        'Rigorous code reviews, static security checks & algorithmic performance benchmarks',
        'Blind judging and transparent metrics with real-time leaderboard audits'
      ],
      icon: Flame,
      badgeColor: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
      img: '/assets/campus/cyberquest-auditorium.jpg'
    },
    {
      num: '03',
      title: 'Win',
      tagline: 'Claim Prizes, Grants & Career Trajectory',
      desc: 'Top podium finishers take home cash prize pools, incubation grants from the ABES E-Cell, angel investor intros, direct placement interview fast-tracks, trophies, and official AKTU Activity Point accreditation recognized across all state engineering colleges.',
      highlights: [
        '₹5,00,000+ in annual prize pools, bounties, and travel stipends',
        'Seed funding & incubation support from the ABES Startup & Innovation Cell',
        'Direct interview fast-tracks & high-impact engineering internship offers',
        'Officially stamped Certificate of Excellence with cryptographic QR verification'
      ],
      icon: Trophy,
      badgeColor: 'bg-amber-400/15 text-amber-300 border border-amber-400/30',
      img: '/assets/campus/club-team-outdoors.jpg'
    }
  ];

  const arenaHighlights = [
    {
      category: 'Hackathon Arena',
      title: 'Multi-Track Hackfest Sprints',
      desc: '24-hour sprint sessions with live jury pitching, software architecture reviews, and multi-tier algorithmic rounds.',
      img: '/assets/campus/campus-hack-collage.jpg',
      badge: 'Arena Sprints',
      badgeColor: 'bg-lime-400/20 text-lime-400 border-lime-400/30'
    },
    {
      category: 'Cultural Pulse',
      title: 'Outdoor Courtyard Street Theatre',
      desc: 'High-energy street plays, societal awareness campaigns, and musical showcases bringing campus open spaces to life.',
      img: '/assets/campus/nukkad-natak-courtyard.jpg',
      badge: 'Cultural Synergy',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    {
      category: 'Society Leaders',
      title: 'Student Leadership & Organizers',
      desc: 'Over 19 specialized societies managed by dedicated student convenors, technical leads, and creative designers.',
      img: '/assets/campus/club-team-outdoors.jpg',
      badge: '19 Societies',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30'
    }
  ];

  const hallOfFame: HallOfFameProject[] = [
    {
      title: 'AgroSense Autonomous Rover',
      club: 'Drone & Robotics Society',
      year: '2026',
      award: '1st Prize · National Robowars & AgTech',
      description: 'Solar-powered autonomous rover using computer vision and soil spectral analysis to detect crop pests with 96% accuracy.',
      lead: 'Vikramaditya Roy & Team',
      techStack: ['PyTorch', 'ROS2', 'ESP32', 'Edge Impulse', 'OpenCV']
    },
    {
      title: 'NeuroShield CTF Cyberdefense',
      club: 'ACM & GDG Society',
      year: '2026',
      award: 'Winner · Delhi NCR Hackfest',
      description: 'Zero-trust API anomaly detection system leveraging WebAssembly and eBPF kernel instrumentation with sub-millisecond overhead.',
      lead: 'Aarav Gupta, Pranav Joshi',
      techStack: ['Rust', 'eBPF', 'WebAssembly', 'Go', 'Prometheus']
    },
    {
      title: 'HoloLearn Spatial Biology',
      club: 'Arcade AR/VR Society',
      year: '2025',
      award: 'Best XR Hack · Meta Innovation Grant',
      description: 'Interactive spatial anatomy simulation for Meta Quest enabling surgical precision rehearsal for biomedical students.',
      lead: 'Siddharth Saxena & Team',
      techStack: ['Unity', 'C#', 'OpenXR', 'Meta SDK', 'Blender']
    },
    {
      title: 'KisanVyapar Decentralized Mandi',
      club: 'E-Cell & GFG Society',
      year: '2025',
      award: 'Best Social Impact · ₹1,00,000 Seed Grant',
      description: 'Peer-to-peer agricultural marketplace eliminating middleman commission for western UP farmers with vernacular voice UI.',
      lead: 'Akshat Mittal & Team',
      techStack: ['Next.js', 'Solidity', 'FastAPI', 'Whisper AI', 'PostgreSQL']
    }
  ];

  const faqs = [
    {
      q: 'Who is eligible to participate in the Build & Win Circuit?',
      a: 'All enrolled undergraduate and postgraduate students from ABES Engineering College and accredited engineering institutions across India are eligible. Inter-branch and inter-year squads are encouraged.'
    },
    {
      q: 'How do team sizes and squad formations work?',
      a: 'Teams typically range between 2 to 4 members. You can assemble a multi-disciplinary squad (Coder, Designer, Leader, System Specialist) using our in-app Teams & Squads tool.'
    },
    {
      q: 'Can our team borrow hardware components for hardware hackathons?',
      a: 'Yes. The ABES Mechatronics and IoT Society labs maintain an extensive inventory of ESP32, Arduino boards, Raspberry Pis, LiDAR sensors, motor drivers, and cameras that can be checked out during the sprint.'
    },
    {
      q: 'Who retains the Intellectual Property (IP) of projects built?',
      a: '100% of the Intellectual Property belongs exclusively to the student builders. Selected innovative projects may receive non-dilutive incubation grants from the ABES E-Cell to file patents.'
    },
    {
      q: 'How are prizes distributed and certificates verified?',
      a: 'Cash prizes are wired directly to winners within 7 business days post-adjudication. Every attendee and podium finisher receives an official digitally verifiable certificate featuring a cryptographic QR verification hash.'
    }
  ];

  const filteredHallOfFame = hallOfFame.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.club.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const handleTriggerCheer = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A3E635', '#8B5CF6', '#F59E0B']
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10 animate-in fade-in duration-200">
      <SEOHead
        title="Build & Win Circuit — ABES Event Nexus & CodeGoblins"
        description="The premier competitive hackathon and innovation framework. Ship real-world engineering, compete on the national circuit, and claim podium prizes."
        canonicalPath="/build-win"
        pageId="build_win"
      />

      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('hackathons')}
            className="text-xs font-mono text-zinc-400 hover:text-white transition flex items-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>Events &amp; Workshops</span>
          </button>
          <span className="text-zinc-600 text-xs">/</span>
          <span className="text-xs font-mono text-lime-400 font-semibold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-lime-400" />
            <span>Build &amp; Win Circuit</span>
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => navigateTo('hackathons')}
            className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-zinc-300 transition"
          >
            Live Schedule ({hackathons.length})
          </button>
          <button
            onClick={() => navigateTo('squads')}
            className="px-3 py-1.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold transition flex items-center gap-1 shadow-sm"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Find Squad</span>
          </button>
        </div>
      </div>

      {/* Hero Banner: The Crucible of Student Innovation */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#12111F] via-[#0D0D15] to-[#121A16] border border-white/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/25 text-lime-400 text-xs font-mono uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5 animate-pulse text-lime-400" />
            <span>The Crucible of Student Innovation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display">
            Build. Compete.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-300 to-amber-300">
              Win.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            At ABES Engineering College &amp; the CodeGoblins Clan, true engineering prowess is forged in the fire of competition. Explore how our 19 specialized societies and technical guilds provide the ultimate launchpad to turn student ambition into real-world technological triumphs.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                handleTriggerCheer();
                navigateTo('hackathons');
              }}
              className="px-5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs sm:text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-lime-400/20"
            >
              <Trophy className="w-4 h-4 text-black" />
              <span>Explore Live Competitions</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsFaqModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs sm:text-sm font-semibold text-white transition flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-zinc-400" />
              <span>Circuit Rules &amp; FAQs</span>
            </button>
          </div>
        </div>
      </section>

      {/* The Competitive Framework: 3 Phases */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20 inline-block">
            The Competitive Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            How the Circuit Empowers Builders
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            A structured, multi-tier lifecycle designed to transition classroom theory into industry-grade engineering and venture-backed startup creation.
          </p>
        </div>

        <div className="space-y-8 pt-4">
          {circuitPhases.map((phase, idx) => {
            const isReversed = idx % 2 === 1;
            const PhaseIcon = phase.icon;

            return (
              <div
                key={phase.num}
                className={`grid gap-6 lg:gap-10 lg:grid-cols-2 items-center p-6 sm:p-8 rounded-3xl bg-[#111118] border border-white/[0.08] hover:border-white/[0.15] transition shadow-xl ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Text Content */}
                <div className={`space-y-4 ${isReversed ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${phase.badgeColor}`}>
                      Phase {phase.num}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
                      {phase.tagline}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
                    <PhaseIcon className="w-5 h-5 text-lime-400" />
                    <span>{phase.title}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {phase.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    {phase.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photo Stage */}
                <div className={`relative ${isReversed ? 'lg:col-start-1' : ''}`}>
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl group bg-[#09090F]">
                    <img
                      src={phase.img}
                      alt={phase.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090F]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-400 font-semibold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        <PhaseIcon className="w-3.5 h-3.5" />
                        <span>{phase.title} Stage Verified</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 bg-black/40 px-2 py-1 rounded">
                        ABES Campus
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campus Arena & Creative Synergy */}
      <section className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-lime-400/10 text-lime-400 border border-lime-400/20 inline-block">
            Campus Arena &amp; Creative Synergy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Where Engineering Meets Creative Expression
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            From packed auditorium keynotes and high-intensity hackathon sprint labs to cultural street plays across open campus courtyards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {arenaHighlights.map((card, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-[#111118] border border-white/[0.08] hover:border-lime-400/40 transition overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-[#09090F]">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent" />
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-1">
                    {card.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-lime-400 transition">
                    {card.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono text-[11px]">ABES Society Network</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-lime-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Campus Hall of Fame */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/[0.06]">
          <div>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20 inline-block mb-1">
              Campus Hall of Fame
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Recent Podium Finishes &amp; Standout Hacks
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Real student projects developed during Nexus competitions that won national accolades, incubation grants, and venture backing.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs font-mono self-start sm:self-auto">
            {['All', 'Robotics', 'ACM', 'AR/VR', 'E-Cell'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedCategory === cat
                    ? 'bg-lime-400 text-black font-bold'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHallOfFame.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-[#111118] border border-white/[0.08] hover:border-lime-400/40 transition space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-lime-400/15 text-lime-400 border border-lime-400/30">
                    {proj.award}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {proj.club} • {proj.year}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white">
                  {proj.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.05]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">
                  Led by: <strong className="text-white font-semibold">{proj.lead}</strong>
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Winner</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Championship Call to Action Banner */}
      <section className="relative rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#111118] to-lime-950/30 border border-lime-400/25 p-8 sm:p-10 text-center space-y-5 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-lime-400/10 border border-lime-400/30 text-lime-400 flex items-center justify-center mx-auto shadow-lg shadow-lime-400/10">
          <Trophy className="w-7 h-7" />
        </div>

        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Ready to Claim the Next Championship?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Join thousands of student innovators across ABES Engineering College &amp; the CodeGoblins Clan. Register for an upcoming sprint, assemble your squad, and build the future.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          <button
            onClick={() => {
              handleTriggerCheer();
              navigateTo('hackathons');
            }}
            className="px-6 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs sm:text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-lime-400/20"
          >
            <span>Browse Active Events →</span>
          </button>
          <button
            onClick={() => navigateTo('squads')}
            className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs sm:text-sm font-semibold text-white transition flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-zinc-400" />
            <span>Assemble Squad</span>
          </button>
        </div>
      </section>

      {/* Interactive Rules & FAQ Modal */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111118] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[85vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-lime-400" />
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Circuit Governance &amp; Competition FAQs
                </h3>
              </div>
              <button
                onClick={() => setIsFaqModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-zinc-300">
              {faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                >
                  <h4 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-lime-400/10 text-lime-400 flex items-center justify-center font-mono text-[10px] shrink-0">
                      {fIdx + 1}
                    </span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-zinc-400 pl-7 text-xs">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500">
                Official ABES Event Nexus &amp; CodeGoblins Standard
              </span>
              <button
                onClick={() => setIsFaqModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold transition"
              >
                Close Guidelines
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
