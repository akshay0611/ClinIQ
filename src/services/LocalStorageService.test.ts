// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import type { SymptomResult } from '../types';

// Mock localforage BEFORE importing LocalStorageService so the module uses the mock
vi.mock('localforage', () => {
  const store: Record<string, unknown> = {};
  return {
    default: {
      config: vi.fn(),
      getItem: vi.fn(async (key: string) => store[key] ?? null),
      setItem: vi.fn(async (key: string, value: unknown) => {
        store[key] = value;
      }),
      removeItem: vi.fn(async (key: string) => {
        delete store[key];
      }),
      clear: vi.fn(async () => {
        for (const key of Object.keys(store)) {
          delete store[key];
        }
      }),
    },
  };
});

import LocalStorageService from './LocalStorageService';
import localforage from 'localforage';

describe('LocalStorageService', () => {
  // Local in-memory store shared across mock implementations
  let store: Record<string, unknown> = {};

  beforeEach(async () => {
    store = {};
    vi.clearAllMocks();

    // Reattach mock implementations to the fresh store after clearAllMocks
    (localforage.getItem as ReturnType<typeof vi.fn>).mockImplementation(
      async (key: string) => store[key] ?? null
    );
    (localforage.setItem as ReturnType<typeof vi.fn>).mockImplementation(
      async (key: string, value: unknown) => {
        store[key] = value;
      }
    );
    (localforage.removeItem as ReturnType<typeof vi.fn>).mockImplementation(
      async (key: string) => {
        delete store[key];
      }
    );
    (localforage.clear as ReturnType<typeof vi.fn>).mockImplementation(async () => {
      store = {};
    });

    // Ensure Web Crypto API is available in the jsdom environment
    if (!window.crypto?.subtle) {
      const { webcrypto } = await import('crypto');
      Object.defineProperty(window, 'crypto', { value: webcrypto, configurable: true });
    }
  });

  afterEach(() => {
    // Reset singleton key to prevent cross-test state leakage
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

    // Verify localforage.setItem was called with an encrypted (non-plain-text) value
    const historyCall = (localforage.setItem as ReturnType<typeof vi.fn>).mock.calls.find(
      (call: unknown[]) => call[0] === 'symptom_checker_history'
    );
    expect(historyCall).toBeTruthy();
    const rawStored = historyCall?.[1] as string;
    expect(rawStored).toBeTruthy();
    expect(rawStored).not.toContain('headache');

    // Retrieve and verify decryption
    const history = await LocalStorageService.getSymptomHistory();
    expect(history).toHaveLength(1);
    expect(history[0].symptoms).toBe('headache');
    expect(history[0].result.summary).toBe('Summary');
  });

  it('should generate a new key and clear old data if no key is found', async () => {
    await LocalStorageService.saveSymptomCheck('fever', dummyResult);
    expect(await LocalStorageService.getSymptomHistory()).toHaveLength(1);

    // Simulate key loss by wiping the in-memory store
    store = {};
    (LocalStorageService as unknown as { keyPromise: null }).keyPromise = null;

    // Old encrypted data is unreadable with a new key, so history is empty
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
