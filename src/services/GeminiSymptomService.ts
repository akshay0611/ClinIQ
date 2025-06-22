import { SymptomResult } from '../types';

interface GeminiResponse {
  possibleConditions: {
    name: string;
    probability: number;
    description: string;
  }[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  recommendations: string[];
  requiresAttention: boolean;
  disclaimer: string;
  diet: {
    recommendedFoods: string[];
    foodsToAvoid: string[];
    hydration: string;
  };
  medications: {
    recommended: string[];
    supplements: string[];
    precautions: string;
  };
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

class GeminiSymptomService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Analyze symptoms using Gemini API
   * @param symptoms User-described symptoms
   * @returns Structured analysis result
   */
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
      {
        "possibleConditions": [
          {
            "name": "Condition name",
            "probability": 0.80, // decimal between 0-1
            "description": "Brief explanation of this condition and how it relates to symptoms"
          }
        ],
        "urgencyLevel": "low", // one of: "low", "medium", "high", "emergency"
        "recommendations": [
          "Recommendation 1",
          "Recommendation 2"
        ],
        "requiresAttention": true/false, // whether medical attention is recommended
        "disclaimer": "Important medical disclaimer",
        "diet": {
          "recommendedFoods": [
            "Food item 1",
            "Food item 2"
          ],
          "foodsToAvoid": [
            "Food item 1",
            "Food item 2"
          ],
          "hydration": "Specific hydration recommendations"
        },
        "medications": {
          "recommended": [
            "Medication 1",
            "Medication 2"
          ],
          "supplements": [
            "Supplement 1",
            "Supplement 2"
          ],
          "precautions": "Important medication precautions"
        }
      }
      
      Important guidelines:
      1. List 3-5 possible conditions that match the symptoms, sorted by probability
      2. Be accurate but avoid causing unnecessary alarm
      3. Include a strong medical disclaimer
      4. For emergency conditions (difficulty breathing, chest pain, stroke symptoms, etc.), always set urgencyLevel to "emergency"
      5. Provide specific dietary recommendations based on the symptoms
      6. List relevant medications and supplements, but always emphasize consulting a doctor first
      7. Only return the JSON response, no other text
    `;
  }

  /**
   * Make the API call to Gemini
   */
  private async callGeminiAPI(prompt: string) {
    const url = `${GEMINI_API_URL}?key=${this.apiKey}`;
    
    // Updated payload structure for gemini-pro model
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048
      }
    };

    // error handling for missing API key
    if (!this.apiKey) {
      throw new Error('Gemini API key is missing. Please provide a valid API key.');
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
      
     
      try {
       
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('Could not find JSON in response');
        }
        
        return JSON.parse(jsonMatch[0]) as GeminiResponse;
      } catch (e) {
        console.error('Failed to parse Gemini response:', e);
        throw new Error('Invalid response format from symptom analysis');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  
  private processGeminiResponse(geminiResponse: GeminiResponse, originalSymptoms: string): SymptomResult {
    
    const severityMap: Record<string, number> = {
      'low': 1,
      'medium': 2,
      'high': 3,
      'emergency': 4
    };
    
   
    return {
      summary: this.generateSummary(geminiResponse, originalSymptoms),
      possibleConditions: geminiResponse.possibleConditions.map(condition => ({
        name: condition.name,
        probability: condition.probability * 100, 
        description: condition.description
      })),
      severity: severityMap[geminiResponse.urgencyLevel] || 1,
      recommendations: geminiResponse.recommendations,
      requiresAttention: geminiResponse.requiresAttention,
      disclaimer: geminiResponse.disclaimer,
      diet: geminiResponse.diet,
      medications: geminiResponse.medications
    };
  }

  
  private generateSummary(response: GeminiResponse, originalSymptoms: string): string {
    const topCondition = response.possibleConditions[0]?.name || 'the described symptoms';
    const urgencyText = this.getUrgencyText(response.urgencyLevel);
    
    return `Based on your symptoms (${originalSymptoms.substring(0, 50)}${originalSymptoms.length > 50 ? '...' : ''}), 
    the analysis suggests ${topCondition} as the most likely condition. ${urgencyText}`;
  }

 
  private getUrgencyText(urgencyLevel: string): string {
    switch (urgencyLevel) {
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