// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AppointmentValidationService } from './AppointmentValidationService';

describe('AppointmentValidationService', () => {
  // Use a fixed "now" so time-sensitive assertions are deterministic.
  // Wednesday, 15 Jan 2025 10:00:00 local time
  const FIXED_NOW = new Date(2025, 0, 15, 10, 0, 0);

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── Happy path ──────────────────────────────────────────────────────

  it('should accept a valid future appointment during working hours on an available day', () => {
    // Thursday 16 Jan 2025 at 10:00 AM — doctor available on Thursday
    const date = new Date(2025, 0, 16);
    const result = AppointmentValidationService.validateAppointment(
      date,
      '10:00 AM',
      ['Thursday', 'Friday']
    );

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should accept an appointment at the start of working hours (9:00 AM)', () => {
    const date = new Date(2025, 0, 16); // Thursday
    const result = AppointmentValidationService.validateAppointment(
      date,
      '9:00 AM',
      ['Thursday']
    );

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should accept an appointment at 4:00 PM (within working hours)', () => {
    const date = new Date(2025, 0, 16); // Thursday
    const result = AppointmentValidationService.validateAppointment(
      date,
      '4:00 PM',
      ['Thursday']
    );

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  // ── Past-date rejection ─────────────────────────────────────────────

  it('should reject an appointment in the past', () => {
    // Monday 13 Jan 2025 — before our fixed "now" of 15 Jan
    const date = new Date(2025, 0, 13);
    const result = AppointmentValidationService.validateAppointment(
      date,
      '10:00 AM',
      ['Monday']
    );

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Cannot book an appointment in the past.');
  });

  it('should reject an appointment earlier today that has already passed', () => {
    // Same day (Wed 15 Jan) at 9:00 AM — "now" is 10:00 AM
    const date = new Date(2025, 0, 15);
    const result = AppointmentValidationService.validateAppointment(
      date,
      '9:00 AM',
      ['Wednesday']
    );

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Cannot book an appointment in the past.');
  });

  // ── Outside working hours ───────────────────────────────────────────

  it('should reject an appointment before 9 AM', () => {
    const date = new Date(2025, 0, 16); // Thursday
    const result = AppointmentValidationService.validateAppointment(
      date,
      '7:00 AM',
      ['Thursday']
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('working hours'))).toBe(true);
  });

  it('should reject an appointment at 5:00 PM (>= 17:00)', () => {
    const date = new Date(2025, 0, 16); // Thursday
    const result = AppointmentValidationService.validateAppointment(
      date,
      '5:00 PM',
      ['Thursday']
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('working hours'))).toBe(true);
  });

  it('should reject an appointment at 8:00 PM (evening)', () => {
    const date = new Date(2025, 0, 16); // Thursday
    const result = AppointmentValidationService.validateAppointment(
      date,
      '8:00 PM',
      ['Thursday']
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('working hours'))).toBe(true);
  });

  // ── Doctor availability ─────────────────────────────────────────────

  it('should reject an appointment on a day the doctor is not available', () => {
    // Thursday 16 Jan — doctor only works Mon/Wed
    const date = new Date(2025, 0, 16);
    const result = AppointmentValidationService.validateAppointment(
      date,
      '10:00 AM',
      ['Monday', 'Wednesday']
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('not available'))).toBe(true);
  });

  // ── Invalid time format ─────────────────────────────────────────────

  it('should reject an invalid time format', () => {
    const date = new Date(2025, 0, 16);
    const result = AppointmentValidationService.validateAppointment(
      date,
      'invalid-time',
      ['Thursday']
    );

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Invalid time format selected.');
  });

  it('should reject 24-hour format time strings', () => {
    const date = new Date(2025, 0, 16);
    const result = AppointmentValidationService.validateAppointment(
      date,
      '14:00',
      ['Thursday']
    );

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Invalid time format selected.');
  });

  // ── Multiple errors ─────────────────────────────────────────────────

  it('should return multiple errors when several validations fail', () => {
    // Past date + wrong day + outside hours
    const date = new Date(2025, 0, 13); // Monday 13 Jan (past)
    const result = AppointmentValidationService.validateAppointment(
      date,
      '7:00 AM', // before 9 AM
      ['Friday']  // doctor not available on Monday
    );

    expect(result.isValid).toBe(false);
    // Should have at least 3 errors: past, unavailable, outside hours
    expect(result.errors.length).toBeGreaterThanOrEqual(3);
  });

  // ── Edge cases ──────────────────────────────────────────────────────

  it('should handle 12:00 PM correctly (noon is within working hours)', () => {
    const date = new Date(2025, 0, 16); // Thursday
    const result = AppointmentValidationService.validateAppointment(
      date,
      '12:00 PM',
      ['Thursday']
    );

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should handle 12:00 AM correctly (midnight — outside working hours)', () => {
    const date = new Date(2025, 0, 16); // Thursday
    const result = AppointmentValidationService.validateAppointment(
      date,
      '12:00 AM',
      ['Thursday']
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('working hours'))).toBe(true);
  });
});
