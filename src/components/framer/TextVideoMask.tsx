import React, { useRef, useEffect } from 'react';

export interface TextVideoMaskProps {
  text: string;
  fontSize?: string;
  videoSrc?: string;
  className?: string;
  subtext?: string;
}

export const TextVideoMask: React.FC<TextVideoMaskProps> = ({
  text,
  fontSize = 'text-5xl sm:text-7xl md:text-8xl',
  videoSrc,
  className = '',
  subtext,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // If no videoSrc is provided, generate a mesmerising animated gradient shader canvas
  useEffect(() => {
    if (videoSrc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    let animId: number;

    const render = () => {
      step += 0.02;
      const width = canvas.width;
      const height = canvas.height;

      const grad = ctx.createLinearGradient(
        0,
        0,
        width * (0.5 + 0.5 * Math.cos(step)),
        height * (0.5 + 0.5 * Math.sin(step))
      );

      grad.addColorStop(0, '#A3E635'); // Lime
      grad.addColorStop(0.33, '#22c55e'); // Green
      grad.addColorStop(0.66, '#8B5CF6'); // Purple
      grad.addColorStop(1, '#06B6D4'); // Cyan

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [videoSrc]);

  return (
    <div className={`relative inline-block select-none ${className}`}>
      {videoSrc ? (
        <div className="relative overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src={videoSrc}
          />
          <h1
            className={`font-black uppercase tracking-tighter mix-blend-screen bg-black text-white ${fontSize}`}
          >
            {text}
          </h1>
        </div>
      ) : (
        <div className="relative">
          {/* Animated gradient canvas as background clip */}
          <canvas
            ref={canvasRef}
            width={400}
            height={120}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
          />
          <h1
            className={`font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-emerald-400 to-purple-400 animate-gradient-x ${fontSize}`}
            style={{
              backgroundImage:
                'linear-gradient(90deg, #A3E635 0%, #4ade80 25%, #a855f7 50%, #06b6d4 75%, #A3E635 100%)',
              backgroundSize: '200% auto',
              animation: 'shine 6s linear infinite',
            }}
          >
            {text}
          </h1>
        </div>
      )}
      {subtext && (
        <p className="mt-2 text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
          {subtext}
        </p>
      )}
    </div>
  );
};
