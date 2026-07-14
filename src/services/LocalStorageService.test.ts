// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import LocalStorageService from './LocalStorageService';
import type { SymptomResult } from '../types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('LocalStorageService', () => {
  beforeEach(async () => {
    localStorageMock.clear();
    vi.clearAllMocks();

    // Ensure crypto is available in the jsdom environment
    if (!window.crypto?.subtle) {
      const { webcrypto } = await import('crypto');
      Object.defineProperty(window, 'crypto', { value: webcrypto, configurable: true });
    }
  });

  afterEach(() => {
    // Reset singleton internal state to prevent cross-test key leakage
    (LocalStorageService as unknown as { keyPromise: null }).keyPromise = null;
  });

  const dummyResult: SymptomResult = {
    summary: 'Summary',
    possibleConditions: [],
    severity: 1,
    recommendations: [],
    requiresAttention: false,
    disclaimer: 'Disclaimer',
    diet: { recommendedFoods: [], foodsToAvoid: [], hydration: '' },
    medications: { recommended: [], supplements: [], precautions: '' }
  };

  it('should encrypt and save a symptom check, then decrypt and retrieve it', async () => {
    await LocalStorageService.saveSymptomCheck('headache', dummyResult);

    // Ensure it's encrypted in localStorage
    const rawStorage = localStorageMock.getItem('symptom_checker_history');
    expect(rawStorage).toBeTruthy();
    expect(rawStorage).not.toContain('headache'); // Should not be plain text

    // Ensure we can retrieve it correctly
    const history = await LocalStorageService.getSymptomHistory();
    expect(history).toHaveLength(1);
    expect(history[0].symptoms).toBe('headache');
    expect(history[0].result.summary).toBe('Summary');
  });

  it('should generate a new key and clear old data if no key is found', async () => {
    await LocalStorageService.saveSymptomCheck('fever', dummyResult);
    expect(await LocalStorageService.getSymptomHistory()).toHaveLength(1);

    // Clear the key from localStorage
    localStorageMock.clear();
    (LocalStorageService as unknown as { keyPromise: null }).keyPromise = null;

    // Next access should generate a new key and clear old encrypted data
    const history = await LocalStorageService.getSymptomHistory();
    expect(history).toHaveLength(0);
  });

  it('should successfully delete a symptom check by ID', async () => {
    await LocalStorageService.saveSymptomCheck('cough', dummyResult);
    const history = await LocalStorageService.getSymptomHistory();
    const id = history[0].id;

    const deleted = await LocalStorageService.deleteSymptomCheckById(id);
    expect(deleted).toBe(true);

    const historyAfter = await LocalStorageService.getSymptomHistory();
    expect(historyAfter).toHaveLength(0);
  });
});
