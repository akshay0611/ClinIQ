import { Doctor, FAQ, SymptomResult } from '../types';

// FIX #68: Updated mock data structure to match SymptomResult type
export const getMockSymptomResult = (symptoms: string): SymptomResult => {
  const hasHeadache = symptoms.toLowerCase().includes('headache');
  const hasFever = symptoms.toLowerCase().includes('fever');
  const hasCough = symptoms.toLowerCase().includes('cough');
  const hasFatigue = symptoms.toLowerCase().includes('fatigue');
  
  let severity = 1;
  let urgency: 'mild' | 'moderate' | 'emergency' = 'mild';
  let summary = '';
  let requiresAttention = false;
  let possibleConditions: SymptomResult['possibleConditions'] = [];
  let recommendations: string[] = [];
  
  // Determine conditions and recommendations
  if (hasHeadache && hasFever) {
    severity = 2;
    urgency = 'moderate';
    summary = 'Your symptoms suggest a viral infection. Please consult a healthcare professional if symptoms persist.';
    requiresAttention = true;
    
    possibleConditions = [
      {
        name: "Common Cold",
        probability: 70,
        description: "A viral infection causing inflammation of the mucous membranes lining the respiratory passages."
      },
      {
        name: "Influenza",
        probability: 60,
        description: "A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and lungs."
      }
    ];
    
    recommendations = [
      "Rest and stay hydrated",
      "Take over-the-counter pain relievers for fever",
      "Use a humidifier to ease congestion",
      "Stay warm and get plenty of sleep",
      "Consult a doctor if symptoms persist for more than 3 days"
    ];
  } else if (hasCough && hasFever) {
    severity = 2;
    urgency = 'moderate';
    summary = 'Your symptoms suggest a respiratory infection. Seek medical attention if you experience difficulty breathing.';
    requiresAttention = true;
    
    possibleConditions = [
      {
        name: "Bronchitis",
        probability: 65,
        description: "Inflammation of the lining of your bronchial tubes, which carry air to and from your lungs."
      },
      {
        name: "Pneumonia",
        probability: 50,
        description: "An infection that inflames the air sacs in one or both lungs, which may fill with fluid."
      }
    ];
    
    recommendations = [
      "Rest as much as possible",
      "Drink plenty of fluids",
      "Use over-the-counter medications to reduce fever",
      "Use a humidifier to add moisture to the air",
      "See a doctor if cough worsens or you have difficulty breathing"
    ];
  } else if (hasHeadache) {
    severity = 1;
    urgency = 'mild';
    summary = 'You are experiencing a headache. Most headaches can be managed with self-care.';
    requiresAttention = false;
    
    possibleConditions = [
      {
        name: "Tension Headache",
        probability: 75,
        description: "A mild to moderate pain often described as feeling like a tight band around the head."
      },
      {
        name: "Migraine",
        probability: 50,
        description: "A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound."
      }
    ];
    
    recommendations = [
      "Rest in a quiet, dark room",
      "Apply a cold pack to your forehead",
      "Drink plenty of water",
      "Take over-the-counter pain relievers",
      "Manage stress through relaxation techniques"
    ];
  } else if (hasFatigue) {
    severity = 1;
    urgency = 'mild';
    summary = 'You are experiencing fatigue. Ensure adequate rest and monitor your symptoms.';
    requiresAttention = true;
    
    possibleConditions = [
      {
        name: "Chronic Fatigue Syndrome",
        probability: 40,
        description: "A complicated disorder characterized by extreme fatigue that can't be explained by any underlying medical condition."
      },
      {
        name: "Iron Deficiency",
        probability: 55,
        description: "A condition in which blood lacks adequate healthy red blood cells that carry oxygen to the body's tissues."
      }
    ];
    
    recommendations = [
      "Establish a regular sleep schedule",
      "Engage in light physical activity",
      "Eat a balanced diet rich in iron",
      "Manage stress through relaxation techniques",
      "Consult a doctor to rule out underlying conditions"
    ];
  } else {
    severity = 1;
    urgency = 'mild';
    summary = 'Your symptoms are currently mild. Monitor them and seek medical attention if they worsen.';
    requiresAttention = false;
    
    possibleConditions = [
      {
        name: "General Malaise",
        probability: 50,
        description: "A general feeling of discomfort, illness, or uneasiness whose exact cause is difficult to identify."
      }
    ];
    
    recommendations = [
      "Get adequate rest",
      "Stay hydrated",
      "Maintain a balanced diet",
      "Monitor your symptoms",
      "Seek medical advice if symptoms persist"
    ];
  }
  
  return {
    summary,
    possibleConditions,
    severity,
    recommendations,
    requiresAttention,
    urgency,
    confidence: severity <= 1 ? 'Medium' : 'High',
    disclaimer: "This analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
    diet: {
      recommendedFoods: [
        "Citrus fruits (oranges, lemons)",
        "Berries (blueberries, strawberries)",
        "Leafy greens (spinach, kale)",
        "Whole grains (brown rice, oats)",
        "Lean proteins (chicken, fish)"
      ],
      foodsToAvoid: [
        "Sugary drinks",
        "Processed foods",
        "Fried foods",
        "Excessive caffeine",
        "Alcohol"
      ],
      hydration: "Drink plenty of water throughout the day. Aim for 8-10 glasses daily unless advised otherwise by a doctor."
    },
    medications: {
      recommended: [
        "Paracetamol for fever and pain",
        "Ibuprofen for inflammation",
        "Cough suppressants if needed"
      ],
      supplements: [
        "Vitamin C supplements",
        "Zinc lozenges",
        "Vitamin D if deficient"
      ],
      precautions: "Always read medication labels carefully and follow dosage instructions. Report any adverse reactions to your healthcare provider immediately. Do not take multiple pain relievers together."
    }
  };
};

// Mock doctors data
export const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Aisha Sharma",
    specialization: "Family Medicine",
    location: "Delhi",
    rating: 4.9,
    photoUrl: "https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg",
    availability: ["Monday", "Tuesday", "Thursday"],
    isAvailableToday: true,
    experience: 12,
    patientCount: 2300,
    reviews: 120,
    isVerified: true
  },
  {
    id: "2",
    name: "Dr. Meera Menon",
    specialization: "Internal Medicine",
    location: "Mumbai",
    rating: 4.7,
    photoUrl: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
    availability: ["Wednesday", "Friday"],
    isAvailableToday: false,
    experience: 9,
    patientCount: 1800,
    reviews: 95,
    isVerified: true
  },
  {
    id: "3",
    name: "Dr. Kavita Banerjee",
    specialization: "Pediatrics",
    location: "Kolkata",
    rating: 4.8,
    photoUrl: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
    availability: ["Monday", "Wednesday", "Friday"],
    isAvailableToday: true,
    experience: 7,
    patientCount: 1500,
    reviews: 110,
    isVerified: true
  },
  {
    id: "4",
    name: "Dr. Anjali Iyer",
    specialization: "Cardiology",
    location: "Bangalore",
    rating: 4.8,
    photoUrl: "https://images.pexels.com/photos/5327590/pexels-photo-5327590.jpeg",
    availability: ["Tuesday", "Thursday"],
    isAvailableToday: false,
    experience: 15,
    patientCount: 2000,
    reviews: 130,
    isVerified: true
  },
  {
    id: "5",
    name: "Dr. Priya Desai",
    specialization: "Dermatology",
    location: "Pune",
    rating: 4.6,
    photoUrl: "https://images.pexels.com/photos/5215027/pexels-photo-5215027.jpeg",
    availability: ["Monday", "Wednesday", "Saturday"],
    isAvailableToday: true,
    experience: 8,
    patientCount: 1200,
    reviews: 85,
    isVerified: true
  }
];