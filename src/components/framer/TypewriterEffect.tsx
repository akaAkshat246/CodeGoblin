import React, { useState, useEffect } from 'react';

export interface TypewriterEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 40,
  delay = 200,
  cursor = true,
  onComplete,
  className = '',
  cursorClassName = 'text-lime-400',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const charTimer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(charTimer);
    } else {
      setIsDone(true);
      if (onComplete) onComplete();
    }
  }, [started, displayedText, text, speed, onComplete]);

  return (
    <span className={`inline font-mono ${className}`}>
      {displayedText}
      {cursor && !isDone && (
        <span className={`animate-pulse ml-0.5 font-bold ${cursorClassName}`}>_</span>
      )}
    </span>
  );
};

