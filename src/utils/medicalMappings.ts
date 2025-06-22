import { SymptomResult } from '../types'; // Adjust path if your types file is elsewhere

export const conditionToSpecializationMap: Record<string, string[]> = {
  // Keywords (lowercase) and their associated specializations
  'headache': ['Neurology', 'Family Medicine', 'Internal Medicine'],
  'migraine': ['Neurology', 'Family Medicine'],
  'tension headache': ['Neurology', 'Family Medicine', 'Internal Medicine'],
  'sinus': ['ENT (Otolaryngology)', 'Family Medicine', 'Internal Medicine'],
  'cluster headache': ['Neurology'],
  'cold': ['Family Medicine', 'Internal Medicine'],
  'flu': ['Family Medicine', 'Internal Medicine'],
  'influenza': ['Family Medicine', 'Internal Medicine'],
  'fever': ['Family Medicine', 'Internal Medicine'],
  'cough': ['Pulmonology', 'Family Medicine', 'Internal Medicine'],
  'bronchitis': ['Pulmonology', 'Family Medicine', 'Internal Medicine'], 
  'pneumonia': ['Pulmonology', 'Internal Medicine', 'Emergency Medicine'],
  'chest pain': ['Cardiology', 'Emergency Medicine', 'Internal Medicine'],
  'heart': ['Cardiology', 'Internal Medicine'],
  'breathing': ['Pulmonology', 'Emergency Medicine', 'Internal Medicine'],
  'fatigue': ['Internal Medicine', 'Endocrinology', 'Family Medicine'],
  'anemia': ['Hematology', 'Internal Medicine', 'Family Medicine'],
  'thyroid': ['Endocrinology', 'Internal Medicine', 'Family Medicine'],
  'stomach': ['Gastroenterology', 'Internal Medicine', 'Family Medicine'],
  'gastro': ['Gastroenterology', 'Internal Medicine'],
  'skin': ['Dermatology', 'Family Medicine'],
  'rash': ['Dermatology', 'Allergy and Immunology', 'Family Medicine'],
  'allergy': ['Allergy and Immunology', 'Family Medicine'],
  'joint': ['Rheumatology', 'Orthopedics', 'Family Medicine'],
  'arthritis': ['Rheumatology', 'Family Medicine'],
  'back pain': ['Orthopedics', 'Neurology', 'Physical Medicine and Rehabilitation', 'Family Medicine'],
  'mental health': ['Psychiatry', 'Psychology', 'Family Medicine'],
  'anxiety': ['Psychiatry', 'Psychology', 'Family Medicine'],
  'depression': ['Psychiatry', 'Psychology', 'Family Medicine'],
  'diabetes': ['Endocrinology', 'Internal Medicine', 'Family Medicine'],
  'hypertension': ['Cardiology', 'Internal Medicine', 'Family Medicine'],
  'asthma': ['Pulmonology', 'Allergy and Immunology', 'Family Medicine'],
  'kidney stone': ['Urology', 'Nephrology', 'Emergency Medicine'],
  'menstrual disorder': ['Gynecology', 'Endocrinology', 'Family Medicine'],
  'vision loss': ['Ophthalmology', 'Neurology', 'Family Medicine'],
  'unexplained weight loss': ['Oncology', 'Endocrinology', 'Internal Medicine'],
  'urinary tract infection': ['Urology', 'Family Medicine', 'Internal Medicine'],
  'seizure': ['Neurology', 'Emergency Medicine'],
  // Add more mappings as needed.
};

export const getSpecializationsForConditions = (
  conditions: SymptomResult['possibleConditions'] = []
): string[] => {
  const relevantSpecializations = new Set<string>();
  const defaultGeneralSpecializations = ["Family Medicine", "Internal Medicine"];

  if (!conditions || conditions.length === 0) {
    return defaultGeneralSpecializations;
  }

  conditions.forEach(condition => {
    const conditionNameLower = condition.name.toLowerCase();
    // Try exact match for full condition name first
    if (conditionToSpecializationMap[conditionNameLower]) {
        conditionToSpecializationMap[conditionNameLower].forEach(spec => relevantSpecializations.add(spec));
    } else {
        // Then try keyword matches
        for (const keyword in conditionToSpecializationMap) {
          if (conditionNameLower.includes(keyword)) {
            conditionToSpecializationMap[keyword].forEach(spec => relevantSpecializations.add(spec));
          }
        }
    }
  });

  // Always include general practitioners as they are often the first point of contact
  // or if no specific specializations were found.
  defaultGeneralSpecializations.forEach(spec => relevantSpecializations.add(spec));

  // If, after checking conditions, no specific specializations were found,
  // or to ensure generalists are always an option.
  if (relevantSpecializations.size === 0) {
      return defaultGeneralSpecializations;
  }
  // Ensure at least a couple of general options if the list is too narrow
  if (relevantSpecializations.size < 2 && !relevantSpecializations.has("Family Medicine")) {
      relevantSpecializations.add("Family Medicine");
  }
  if (relevantSpecializations.size < 2 && !relevantSpecializations.has("Internal Medicine")) {
      relevantSpecializations.add("Internal Medicine");
  }

  return Array.from(relevantSpecializations);
};