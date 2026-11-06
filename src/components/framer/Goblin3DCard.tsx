import React, { useState, useRef } from 'react';
import { Sparkles, Rotate3d, ShieldCheck, Zap, Swords, Flame, Eye } from 'lucide-react';

export interface Goblin3DCardProps {
  id: number;
  name: string;
  roleTitle: string;
  image: string;
  quote?: string;
  badge?: string;
  primaryColor?: string;
  stats?: {
    code: number;
    grit: number;
    speed: number;
    vision: number;
    team: number;
  };
  className?: string;
  interactive?: boolean;
}

export const Goblin3DCard: React.FC<Goblin3DCardProps> = ({
  id,
  name,
  roleTitle,
  image,
  quote = 'Talk is cheap. Show me the code.',
  badge = 'CLASS V',
  primaryColor = '#A3E635',
  stats = {
    code: 92,
    grit: 88,
    speed: 95,
    vision: 85,
    team: 90,
  },
  className = '',
  interactive = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt limits: -14 to +14 degrees
    const rY = ((x - centerX) / centerX) * 14;
    const rX = ((centerY - y) / centerY) * 14;

    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.65,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY + (isFlipped ? 180 : 0)}deg) scale3d(${
            isHovered ? 1.04 : 1
          }, ${isHovered ? 1.04 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full max-w-sm aspect-[4/5] rounded-3xl bg-[#0d0d16] border border-white/10 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer group"
      >
        {/* ================= CARD FRONT ================= */}
        <div
          className={`absolute inset-0 p-4 rounded-3xl overflow-hidden flex flex-col justify-between ${
            isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(1px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Layer 0: 3D Volumetric Ambient Stage Glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${primaryColor}28 0%, transparent 70%)`,
              transform: 'translateZ(-20px)',
            }}
          />

          {/* Layer 1: Holographic Specular Glare Foil */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-30"
            style={{
              opacity: glarePos.opacity,
              background: `linear-gradient(${rotY * 10 + 115}deg, transparent 20%, rgba(255,255,255,0.25) 45%, rgba(163,230,53,0.3) 50%, rgba(168,85,247,0.3) 55%, transparent 80%)`,
              transform: 'translateZ(55px)',
            }}
          />

          {/* Header Strip */}
          <div
            className="relative z-20 flex items-center justify-between text-xs transition-transform duration-200"
            style={{ transform: 'translateZ(25px)' }}
          >
            <div className="flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-xl bg-black/60 border border-white/10 text-zinc-300 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
              <span>GOBLIN #0{id}</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-lg border font-mono"
                style={{
                  color: primaryColor,
                  borderColor: `${primaryColor}40`,
                  backgroundColor: `${primaryColor}15`,
                }}
              >
                {badge}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
                title="Inspect 3D RPG Attributes"
              >
                <Rotate3d className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Character Stage & 3D Pop-out Hero */}
          <div
            className="relative flex-1 flex items-center justify-center my-2"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 3D Dynamic Floor Shadow */}
            <div
              className="absolute bottom-4 w-44 h-10 rounded-full bg-black/75 blur-md pointer-events-none transition-transform duration-200"
              style={{
                transform: `translateZ(-10px) scale(${isHovered ? 1.15 : 1})`,
              }}
            />

            {/* The 3D Goblin Character Pop-Out */}
            <div
              className="relative z-20 w-4/5 h-4/5 max-h-56 transition-transform duration-200 ease-out"
              style={{
                transform: isHovered
                  ? 'translateZ(50px) scale(1.14)'
                  : 'translateZ(20px) scale(1)',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.85))',
              }}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-contain rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Footer Info Strip */}
          <div
            className="relative z-20 p-3.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10"
            style={{ transform: 'translateZ(30px)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">{name}</h3>
                <p className="text-xs font-semibold mt-0.5" style={{ color: primaryColor }}>
                  {roleTitle}
                </p>
              </div>
              <span className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 group-hover:text-white transition-colors">
                <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              </span>
            </div>
          </div>
        </div>

        {/* ================= CARD BACK (3D RPG ATTRIBUTES) ================= */}
        <div
          className={`absolute inset-0 p-5 rounded-3xl overflow-hidden flex flex-col justify-between bg-[#0e0e18] border border-white/15 ${
            isFlipped ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          style={{
            transform: 'rotateY(180deg) translateZ(1px)',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                Clan Classification
              </span>
              <h4 className="text-sm font-bold text-white">{name}</h4>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors text-xs flex items-center gap-1 font-mono"
            >
              <Rotate3d className="w-3.5 h-3.5 text-lime-400" /> Back
            </button>
          </div>

          {/* 3D RPG Stat Bars */}
          <div className="space-y-2.5 my-auto">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
              Combat & Coding Matrix
            </span>

            {[
              { label: 'Architecture', val: stats.code, icon: Zap },
              { label: 'Hackathon Grit', val: stats.grit, icon: Flame },
              { label: 'Shipping Speed', val: stats.speed, icon: Swords },
              { label: 'Clan Leadership', val: stats.team, icon: ShieldCheck },
              { label: 'Future Vision', val: stats.vision, icon: Eye },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-zinc-500" />
                      <span>{stat.label}</span>
                    </span>
                    <span className="font-mono text-zinc-200 font-bold">{stat.val}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${stat.val}%`,
                        backgroundColor: primaryColor,
                        boxShadow: `0 0 10px ${primaryColor}80`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clan Motto */}
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-center">
            <p className="text-xs italic text-zinc-300">"{quote}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};
