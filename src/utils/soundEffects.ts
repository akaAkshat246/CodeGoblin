// Modern Web Audio API synthesizer for tactile, micro-interaction edtech sound feedback
// Zero external mp3/wav files required, zero latency, lightweight.

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const isSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('codegoblins_sound_enabled');
  return stored !== 'false';
};

export const setSoundEnabled = (enabled: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('codegoblins_sound_enabled', enabled ? 'true' : 'false');
};

/**
 * Gentle major-third chime on completing quests, steps, or tasks
 */
export const playSuccessChime = (): void => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Note 1: E5 (659.25 Hz)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(659.25, now);
  gain1.gain.setValueAtTime(0.08, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.35);

  // Note 2: G#5 (830.61 Hz)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(830.61, now + 0.1);
  gain2.gain.setValueAtTime(0.08, now + 0.1);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.1);
  osc2.stop(now + 0.5);

  // Note 3: B5 (987.77 Hz)
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(987.77, now + 0.2);
  gain3.gain.setValueAtTime(0.1, now + 0.2);
  gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
  osc3.connect(gain3);
  gain3.connect(ctx.destination);
  osc3.start(now + 0.2);
  osc3.stop(now + 0.7);
};

/**
 * Tactile micro-tick on button click / tab switch
 */
export const playClickTick = (): void => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

  gain.gain.setValueAtTime(0.03, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
};

/**
 * Celebratory fanfare on leveling up or completing a streak
 */
export const playLevelUpFanfare = (): void => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const noteStart = now + idx * 0.12;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, noteStart);

    gain.gain.setValueAtTime(0.1, noteStart);
    gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteStart);
    osc.stop(noteStart + 0.4);
  });
};
