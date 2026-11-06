import React, { useState, useEffect } from 'react';

export interface TypingLoopTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorChar?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
  highlightClassName?: string;
}

export const TypingLoopText: React.FC<TypingLoopTextProps> = ({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 1800,
  cursorChar = '▋',
  className = '',
  prefix = '',
  suffix = '',
  highlightClassName = 'text-lime-400',
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing & deleting loop
  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing word, pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`inline-flex items-center font-mono ${className}`}>
      {prefix && <span className="mr-2 text-zinc-400 font-sans">{prefix}</span>}
      <span className={highlightClassName}>{text}</span>
      <span
        className={`ml-1 text-lime-400 font-bold transition-opacity duration-100 ${
          cursorVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {cursorChar}
      </span>
      {suffix && <span className="ml-2 text-zinc-400 font-sans">{suffix}</span>}
    </span>
  );
};

