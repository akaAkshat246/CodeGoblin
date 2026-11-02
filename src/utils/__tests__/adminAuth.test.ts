import { describe, it, expect } from 'vitest';
import {
  isAdminEmail,
  getAdminClearance,
  AUTHORIZED_ADMIN_CREDENTIALS,
  AUTHORIZED_ADMIN_DOMAINS
} from '../adminAuth';

describe('CodeGoblins Admin Security & Special Mail Verification', () => {
  it('should verify official founder mail IDs', () => {
    expect(isAdminEmail('akshat.vats@codegoblins.dev')).toBe(true);
    expect(isAdminEmail('akshat@codegoblins.in')).toBe(true);
    expect(isAdminEmail('akshat.kumar@codegoblins.dev')).toBe(true);
    expect(isAdminEmail('akshat.kumar@codegoblins.in')).toBe(true);
  });

  it('should verify domain-level wildcard admin emails', () => {
    expect(isAdminEmail('operations@codegoblins.in')).toBe(true);
    expect(isAdminEmail('security@codegoblins.dev')).toBe(true);
    expect(isAdminEmail('bot@admin.codegoblins.in')).toBe(true);
  });

  it('should reject unauthorized public emails', () => {
    expect(isAdminEmail('random_student@gmail.com')).toBe(false);
    expect(isAdminEmail('hacker@darkweb.org')).toBe(false);
    expect(isAdminEmail(null)).toBe(false);
    expect(isAdminEmail('')).toBe(false);
  });

  it('should return Omega Level clearance for founders', () => {
    const vatsClearance = getAdminClearance('akshat.vats@codegoblins.dev');
    expect(vatsClearance.isAdmin).toBe(true);
    expect(vatsClearance.tier).toBe('Founder');
    expect(vatsClearance.clearanceLevel).toContain('Omega Level');

    const kumarClearance = getAdminClearance('akshat.kumar@codegoblins.in');
    expect(kumarClearance.isAdmin).toBe(true);
    expect(kumarClearance.tier).toBe('Founder');
  });

  it('should return Level 0 for non-admins', () => {
    const guestClearance = getAdminClearance('student@college.edu');
    expect(guestClearance.isAdmin).toBe(false);
    expect(guestClearance.tier).toBe('Member');
  });
});

