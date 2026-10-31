import { describe, it, expect } from 'vitest';

/**
 * Formula used in CodeGoblins Clan Engine:
 * Level = Math.floor(Math.sqrt(XP / 60)) + 1;
 * XP to reach level L = Math.pow(L - 1, 2) * 60;
 */
export const calculateLevel = (xp: number): number => {
  if (xp < 0) return 1;
  return Math.floor(Math.sqrt(xp / 60)) + 1;
};

export const getNextLevelThreshold = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 60;
};

describe('CodeGoblins Gamification & XP Math Engine', () => {
  it('should initialize novice cadets at Level 1 with 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
    expect(calculateLevel(59)).toBe(1);
  });

  it('should promote to Level 2 at exactly 60 XP', () => {
    expect(calculateLevel(60)).toBe(2);
    expect(calculateLevel(239)).toBe(2);
  });

  it('should follow quadratic progression for intermediate goblin ranks', () => {
    expect(calculateLevel(240)).toBe(3); // 2^2 * 60 = 240
    expect(calculateLevel(540)).toBe(4); // 3^2 * 60 = 540
    expect(calculateLevel(960)).toBe(5); // 4^2 * 60 = 960
  });

  it('should calculate accurate next level XP thresholds', () => {
    expect(getNextLevelThreshold(1)).toBe(60);
    expect(getNextLevelThreshold(2)).toBe(240);
    expect(getNextLevelThreshold(3)).toBe(540);
  });

  it('should handle negative XP gracefully without sub-zero levels', () => {
    expect(calculateLevel(-100)).toBe(1);
  });
});

