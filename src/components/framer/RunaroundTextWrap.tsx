import React from 'react';

export interface RunaroundTextWrapProps {
  imageSrc?: string;
  imageAlt?: string;
  avatarElement?: React.ReactNode;
  shapeSize?: number;
  shapeMargin?: number;
  floatPosition?: 'left' | 'right';
  title?: string;
  paragraphs: string[];
  className?: string;
}

export const RunaroundTextWrap: React.FC<RunaroundTextWrapProps> = ({
  imageSrc,
  imageAlt = 'Goblin Avatar',
  avatarElement,
  shapeSize = 140,
  shapeMargin = 20,
  floatPosition = 'left',
  title,
  paragraphs,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[#111119] border border-white/10 p-6 sm:p-8 ${className}`}>
      {/* Floated circular shape that text contours around */}
      <div
        style={{
          width: shapeSize,
          height: shapeSize,
          shapeOutside: 'circle(50%)',
          clipPath: 'circle(50%)',
          margin: floatPosition === 'left' ? `0 ${shapeMargin}px ${shapeMargin}px 0` : `0 0 ${shapeMargin}px ${shapeMargin}px`,
          float: floatPosition,
        }}
        className="relative group rounded-full p-1 bg-gradient-to-tr from-lime-400 via-emerald-400 to-purple-500 shadow-[0_0_30px_rgba(163,230,53,0.3)] select-none shrink-0"
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
          {avatarElement ? (
            avatarElement
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <span className="text-3xl">👺</span>
          )}
        </div>
      </div>

      {title && (
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h3>
      )}

      <div className="space-y-3 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      <div className="clear-both" />
    </div>
  );
};
