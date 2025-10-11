
import { SymptomResult } from '../types';
import { z } from 'zod';

// Define schema for Gemini API response using zod
const GeminiResponseSchema = z.object({
  possibleConditions: z.array(z.object({
    name: z.string(),
    probability: z.number().min(0).max(1),
    description: z.string()
  })),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'emergency']),
  recommendations: z.array(z.string()),
  requiresAttention: z.boolean(),
  disclaimer: z.string(),
  diet: z.object({
    recommendedFoods: z.array(z.string()),
    foodsToAvoid: z.array(z.string()),
    hydration: z.string()
  }),
  medications: z.object({
    recommended: z.array(z.string()),
    supplements: z.array(z.string()),
    precautions: z.string()
  })
});

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

class GeminiSymptomService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeSymptoms(symptoms: string): Promise<SymptomResult> {
    try {
      const prompt = this.buildAnalysisPrompt(symptoms);
      const response = await this.callGeminiAPI(prompt);
      return this.processGeminiResponse(response, symptoms);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      throw new Error('Failed to analyze symptoms. Please try again later.');
    }
  }

  private buildAnalysisPrompt(symptoms: string): string {
    return `
      You are a medical symptom analysis assistant. Based on the following symptoms, provide a structured analysis.
      User symptoms: "${symptoms}"
      Provide your response in the following JSON format:
      {...}
      Important guidelines:
      1. List 3-5 possible conditions that match the symptoms, sorted by probability
      2. Be accurate but avoid causing unnecessary alarm
      3. Include a strong medical disclaimer
      4. For emergency conditions, always set urgencyLevel to "emergency"
      5. Provide specific dietary recommendations
      6. List relevant medications and supplements, but emphasize consulting a doctor
      7. Only return the JSON response, no other text
    `;
  }

  private async callGeminiAPI(prompt: string) {
    const url = `${GEMINI_API_URL}?key=${this.apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048
      }
    };

    if (!this.apiKey) {
      throw new Error('Gemini API key is missing. Please provide a valid API key.');
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Gemini API error response:', errorData);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResponse) {
        throw new Error('Unexpected response format from Gemini API');
      }

      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not find JSON in response');
      }

      const parsed = GeminiResponseSchema.safeParse(JSON.parse(jsonMatch[0]));
      if (!parsed.success) {
        console.error('Validation failed:', parsed.error.format());
        throw new Error('Invalid Gemini response format');
      }

      return parsed.data;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  private processGeminiResponse(response: z.infer<typeof GeminiResponseSchema>, originalSymptoms: string): SymptomResult {
    const severityMap: Record<string, number> = {
      'low': 1,
      'medium': 2,
      'high': 3,
      'emergency': 4
    };

    return {
      summary: this.generateSummary(response, originalSymptoms),
      possibleConditions: response.possibleConditions.map(c => ({
        name: c.name,
        probability: c.probability * 100,
        description: c.description
      })),
      severity: severityMap[response.urgencyLevel] || 1,
      recommendations: response.recommendations,
      requiresAttention: response.requiresAttention,
      disclaimer: response.disclaimer,
      diet: response.diet,
      medications: response.medications
    };
  }

  private generateSummary(response: z.infer<typeof GeminiResponseSchema>, originalSymptoms: string): string {
    const topCondition = response.possibleConditions[0]?.name || 'the described symptoms';
    const urgencyText = this.getUrgencyText(response.urgencyLevel);
    const preview = originalSymptoms.length > 50 ? originalSymptoms.substring(0, 50) + '...' : originalSymptoms;
    return `Based on your symptoms (${preview}), the analysis suggests ${topCondition} as the most likely condition. ${urgencyText}`;
  }

  private getUrgencyText(level: string): string {
    switch (level) {
      case 'emergency':
        return 'This appears to be a medical emergency. Seek immediate medical attention.';
      case 'high':
        return 'This requires prompt medical attention. Contact your healthcare provider as soon as possible.';
      case 'medium':
        return 'Medical consultation is recommended to properly evaluate these symptoms.';
      case 'low':
      default:
        return 'The symptoms appear to be mild. Monitor your condition and consult a doctor if they worsen.';
    }
  }
}

export default GeminiSymptomService;
