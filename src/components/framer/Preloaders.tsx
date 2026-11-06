import React, { useEffect, useRef } from 'react';

// ========================================================
// 1. MATRIX PRELOADER (Digital rain code effect)
// ========================================================
export interface MatrixPreloadProps {
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
  className?: string;
  label?: string;
}

export const MatrixPreload: React.FC<MatrixPreloadProps> = ({
  width = 280,
  height = 140,
  color = '#A3E635',
  speed = 33,
  className = '',
  label = 'DECRYPTING CLAN DATA...',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = '01CODEGOBLINZX<>/;{}=+*#&$!@';
    const fontSize = 11;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(10, 10, 16, 0.25)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [width, height, color, speed]);

  return (
    <div className={`relative flex flex-col items-center justify-center p-3 rounded-2xl bg-[#09090f] border border-lime-400/20 overflow-hidden shadow-[0_0_30px_rgba(163,230,53,0.15)] ${className}`}>
      <canvas ref={canvasRef} width={width} height={height} className="rounded-xl" />
      {label && (
        <span className="mt-2.5 font-mono text-[10px] tracking-widest text-lime-400 font-bold animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
};

// ========================================================
// 2. BLOOP PRELOADER (Morphing bouncing bloop)
// ========================================================
export interface BloopPreloaderProps {
  size?: number;
  color?: string;
  className?: string;
  label?: string;
}

export const BloopPreloader: React.FC<BloopPreloaderProps> = ({
  size = 56,
  color = '#A3E635',
  className = '',
  label = 'Loading...',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Bloop rings */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ backgroundColor: color }}
        />
        <div
          className="relative w-3/4 h-3/4 rounded-full shadow-[0_0_20px_currentColor] animate-bounce"
          style={{
            backgroundColor: color,
            color,
            animationDuration: '0.8s',
          }}
        />
      </div>
      {label && (
        <span className="font-mono text-[11px] text-zinc-400 tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};

// ========================================================
// 3. BUBBLE CLUSTER LOADER (Orbiting clustered bubbles)
// ========================================================
export interface BubbleClusterLoaderProps {
  size?: number;
  className?: string;
  label?: string;
}

export const BubbleClusterLoader: React.FC<BubbleClusterLoaderProps> = ({
  size = 64,
  className = '',
  label = 'Syncing Guild Nodes...',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="relative animate-spin" style={{ width: size, height: size, animationDuration: '3s' }}>
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-lime-400 shadow-[0_0_12px_#A3E635]" />
        <span className="absolute bottom-1 right-2 w-3.5 h-3.5 rounded-full bg-purple-500 shadow-[0_0_12px_#A855F7]" />
        <span className="absolute bottom-1 left-2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#06B6D4]" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 animate-pulse" />
      </div>
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
          {label}
        </span>
      )}
    </div>
  );
};

// ========================================================
// 4. LIQUID LOADER (Swirling viscous fluid loader)
// ========================================================
export interface LiquidLoaderProps {
  size?: number;
  className?: string;
  label?: string;
}

export const LiquidLoader: React.FC<LiquidLoaderProps> = ({
  size = 54,
  className = '',
  label = 'Brewing Potion...',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-2.5 ${className}`}>
      <div
        className="relative rounded-full overflow-hidden border-2 border-lime-400/30 p-1 bg-black/40 shadow-[0_0_20px_rgba(163,230,53,0.2)]"
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-t from-lime-400/40 via-purple-500/30 to-transparent animate-pulse" />
        <div
          className="absolute inset-0 bg-lime-400/20 blur-md rounded-full animate-spin"
          style={{ animationDuration: '4s' }}
        />
      </div>
      {label && (
        <span className="font-mono text-[10px] tracking-wider text-lime-400 font-semibold">
          {label}
        </span>
      )}
    </div>
  );
};

