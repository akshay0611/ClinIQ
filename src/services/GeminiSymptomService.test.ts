import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import GeminiSymptomService from './GeminiSymptomService';

// Local type matching the Gemini API response shape
interface GeminiResponseShape {
  possibleConditions?: Array<{
    name: string;
    probability: number;
    description?: string;
  }>;
  urgencyLevel?: string;
  recommendations?: string[];
  requiresAttention?: boolean;
  disclaimer?: string;
  diet?: {
    recommendedFoods?: string[];
    foodsToAvoid?: string[];
    hydration?: string;
  };
  medications?: {
    recommended?: string[];
    supplements?: string[];
    precautions?: string;
  };
}

describe('GeminiSymptomService Schema Parsing', () => {
  let service: GeminiSymptomService;

  beforeEach(() => {
    service = new GeminiSymptomService('dummy-api-key');
    vi.spyOn(global, 'fetch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const validResponseTemplate: GeminiResponseShape = {
    possibleConditions: [
      {
        name: 'Common Cold',
        probability: 0.8,
        description: 'A viral infection of your nose and throat (upper respiratory tract).'
      }
    ],
    urgencyLevel: 'low',
    recommendations: ['Rest', 'Hydration'],
    requiresAttention: false,
    disclaimer: 'Not medical advice.',
    diet: {
      recommendedFoods: ['Soup'],
      foodsToAvoid: ['Dairy'],
      hydration: 'Drink plenty of water'
    },
    medications: {
      recommended: ['Paracetamol'],
      supplements: ['Vitamin C'],
      precautions: 'Do not exceed dose'
    }
  };

  const mockFetchResponse = (geminiResponse: GeminiResponseShape | null | undefined) => {
    const mockApiResponse = {
      candidates: [
        {
          content: {
            parts: [{ text: JSON.stringify(geminiResponse) }]
          }
        }
      ]
    };
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    } as Response);
  };

  it('should successfully parse a well-formed Gemini response', async () => {
    mockFetchResponse(validResponseTemplate);
    const result = await service.analyzeSymptoms('cough and runny nose');

    expect(result.possibleConditions).toHaveLength(1);
    expect(result.possibleConditions[0].probability).toBe(80); // 0.8 * 100
    expect(result.severity).toBe(1); // 'low' maps to 1
    expect(result.recommendations).toEqual(['Rest', 'Hydration']);
  });

  it('should throw an error if the response is completely empty or null', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFetchResponse(null);
    await expect(service.analyzeSymptoms('cough')).rejects.toThrowError('Failed to analyze symptoms');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error analyzing symptoms:',
      expect.objectContaining({ message: expect.stringMatching(/Invalid response format/) })
    );

    mockFetchResponse(undefined);
    await expect(service.analyzeSymptoms('cough')).rejects.toThrowError('Failed to analyze symptoms');
  });

  it('should throw an error if possibleConditions is missing or empty', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const emptyConditions = { ...validResponseTemplate, possibleConditions: [] };
    mockFetchResponse(emptyConditions);
    await expect(service.analyzeSymptoms('cough')).rejects.toThrowError('Failed to analyze symptoms');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error analyzing symptoms:',
      expect.objectContaining({ message: 'Symptom analysis did not return any possible conditions.' })
    );

    // Use destructuring to omit possibleConditions without any cast
    const { possibleConditions: _pc, ...noConditions } = validResponseTemplate;
    void _pc;
    mockFetchResponse(noConditions);
    await expect(service.analyzeSymptoms('cough')).rejects.toThrowError('Failed to analyze symptoms');
  });

  it('should throw an error if a condition entry is incomplete', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const incomplete = {
      ...validResponseTemplate,
      possibleConditions: [{ name: 'Incomplete', probability: 0.5 }] // missing description
    };
    mockFetchResponse(incomplete);
    await expect(service.analyzeSymptoms('cough')).rejects.toThrowError('Failed to analyze symptoms');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error analyzing symptoms:',
      expect.objectContaining({ message: 'Symptom analysis returned an incomplete condition entry.' })
    );
  });

  it('should normalize known urgency synonyms to severity levels', async () => {
    mockFetchResponse({ ...validResponseTemplate, urgencyLevel: 'severe' });
    const severeResult = await service.analyzeSymptoms('chest pain');
    expect(severeResult.severity).toBe(4);

    mockFetchResponse({ ...validResponseTemplate, urgencyLevel: 'moderate' });
    const moderateResult = await service.analyzeSymptoms('fever');
    expect(moderateResult.severity).toBe(2);
  });

  it('should throw an error for unrecognized urgency levels', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFetchResponse({ ...validResponseTemplate, urgencyLevel: 'super-urgent' });
    await expect(service.analyzeSymptoms('pain')).rejects.toThrowError('Failed to analyze symptoms');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error analyzing symptoms:',
      expect.objectContaining({ message: expect.stringMatching(/Unable to assess urgency from the analysis/) })
    );
  });
});
