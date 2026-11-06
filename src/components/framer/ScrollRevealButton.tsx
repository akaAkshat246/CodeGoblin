import React, { useState } from 'react';
import { Download, Check, Loader2 } from 'lucide-react';

export interface ScrollRevealButtonProps {
  label?: string;
  downloadingLabel?: string;
  completedLabel?: string;
  onDownload?: () => Promise<void> | void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScrollRevealButton: React.FC<ScrollRevealButtonProps> = ({
  label = 'Download Blueprint',
  downloadingLabel = 'Forging Download...',
  completedLabel = 'Ready in Cache!',
  onDownload,
  className = '',
  size = 'md',
}) => {
  const [status, setStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);

  const handleClick = async () => {
    if (status !== 'idle') return;

    setStatus('downloading');
    setProgress(0);

    const stepInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(stepInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 120);

    try {
      if (onDownload) {
        await onDownload();
      } else {
        // Mock download latency
        await new Promise((res) => setTimeout(res, 1000));
      }
      clearInterval(stepInterval);
      setProgress(100);
      setStatus('completed');
      setTimeout(() => {
        setStatus('idle');
        setProgress(0);
      }, 3000);
    } catch {
      clearInterval(stepInterval);
      setStatus('idle');
      setProgress(0);
    }
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs rounded-lg',
    md: 'h-10 px-4 text-sm rounded-xl',
    lg: 'h-12 px-6 text-base rounded-2xl',
  };

  return (
    <button
      onClick={handleClick}
      disabled={status === 'downloading'}
      className={`group relative overflow-hidden font-medium border transition-all duration-300 active:scale-[0.98] select-none flex items-center justify-center gap-2 ${
        sizeClasses[size]
      } ${
        status === 'completed'
          ? 'bg-lime-500/20 text-lime-300 border-lime-400/40 shadow-[0_0_20px_rgba(163,230,53,0.3)]'
          : 'bg-[#181824] hover:bg-[#202030] text-zinc-100 border-white/15 hover:border-lime-400/40 shadow-md'
      } ${className}`}
    >
      {/* Background progress fill bar */}
      {status === 'downloading' && (
        <span
          className="absolute inset-y-0 left-0 bg-lime-400/20 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      )}

      {/* Button content based on status */}
      <span className="relative z-10 flex items-center gap-2">
        {status === 'idle' && (
          <>
            <Download className="w-4 h-4 text-lime-400 transition-transform group-hover:-translate-y-0.5" />
            <span>{label}</span>
          </>
        )}

        {status === 'downloading' && (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-lime-400" />
            <span>{downloadingLabel} {progress}%</span>
          </>
        )}

        {status === 'completed' && (
          <>
            <Check className="w-4 h-4 text-lime-400 animate-in zoom-in-75 duration-200" />
            <span>{completedLabel}</span>
          </>
        )}
      </span>
    </button>
  );
};

