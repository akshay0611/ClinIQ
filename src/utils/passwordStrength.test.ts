import { describe, it, expect } from 'vitest';
import { getPasswordStrength } from './passwordStrength';

describe('getPasswordStrength', () => {
  it('returns score 0 and empty stats when password is empty', () => {
    const result = getPasswordStrength('');
    expect(result.score).toBe(0);
    expect(result.label).toBe('Weak');
    expect(result.percentage).toBe(0);
  });

  it('rates simple short password as Weak', () => {
    const result = getPasswordStrength('pass');
    expect(result.label).toBe('Weak');
    expect(result.percentage).toBe(25);
    expect(result.hasMinLength).toBe(false);
  });

  it('rates password with length and uppercase as Fair', () => {
    const result = getPasswordStrength('Password');
    expect(result.hasMinLength).toBe(true);
    expect(result.hasUppercase).toBe(true);
    expect(result.label).toBe('Fair');
    expect(result.percentage).toBe(50);
  });

  it('rates password with length, uppercase, and number as Strong', () => {
    const result = getPasswordStrength('Password123');
    expect(result.hasMinLength).toBe(true);
    expect(result.hasUppercase).toBe(true);
    expect(result.hasNumber).toBe(true);
    expect(result.label).toBe('Strong');
    expect(result.percentage).toBe(75);
  });

  it('rates password satisfying all criteria as Very Strong', () => {
    const result = getPasswordStrength('Password123!');
    expect(result.hasMinLength).toBe(true);
    expect(result.hasUppercase).toBe(true);
    expect(result.hasNumber).toBe(true);
    expect(result.hasSpecial).toBe(true);
    expect(result.label).toBe('Very Strong');
    expect(result.percentage).toBe(100);
  });
});
