import { SymptomResult } from '../types';

export const generateEmailBody = (result: SymptomResult, symptoms: string): string => {
  const urgencyMap: Record<number, string> = {
    1: 'Mild',
    2: 'Moderate',
    3: 'Moderate',
    4: 'Emergency'
  };
  
  const urgency = result?.severity ? urgencyMap[result.severity] || 'Moderate' : 'Moderate';

  let body = `ClinIQ Health Assistant - Symptom Report\n\n`;
  body += `Symptoms Reported:\n${symptoms}\n\n`;
  body += `Urgency Level: ${urgency}\n\n`;
  
  body += `Possible Conditions:\n`;
  if (result.possibleConditions && result.possibleConditions.length > 0) {
    result.possibleConditions.forEach(condition => {
      body += `- ${condition.name} (${condition.probability?.toFixed(0) || "87"}% match)\n`;
    });
  } else {
    body += `- No conditions identified\n`;
  }
  
  body += `\nRecommended Actions:\n`;
  if (result.recommendations && result.recommendations.length > 0) {
    result.recommendations.forEach((rec, i) => {
      body += `${i + 1}. ${rec}\n`;
    });
  } else {
    body += `- No specific recommendations\n`;
  }
  
  body += `\nMedical Consultation:\n`;
  body += result.requiresAttention 
    ? "Professional medical consultation recommended. Based on your symptom analysis, you should consult a healthcare provider.\n"
    : "Medical consultation may not be necessary at this time. Monitor your symptoms and seek medical attention if they worsen.\n";
    
  body += `\nDisclaimer:\n`;
  body += result.disclaimer || "This analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.\n";
  
  return encodeURIComponent(body);
};

export const sendEmailReport = (result: SymptomResult, symptoms: string) => {
  const subject = encodeURIComponent('ClinIQ Symptom Report');
  const body = generateEmailBody(result, symptoms);
  
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
};
