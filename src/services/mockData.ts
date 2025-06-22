import { Doctor, FAQ, SymptomResult } from '../types';

// Mock symptom result for demonstration
export const getMockSymptomResult = (symptoms: string): SymptomResult => {
  // This is a simplified mock that would be replaced with actual AI analysis
  const hasHeadache = symptoms.toLowerCase().includes('headache');
  const hasFever = symptoms.toLowerCase().includes('fever');
  const hasCough = symptoms.toLowerCase().includes('cough');
  const hasFatigue = symptoms.toLowerCase().includes('fatigue');
  
  let urgency = 'mild';
  let conditions = [];
  let remedies = [];
  let consultDoctor = {
    required: false,
    reason: "Based on your symptoms, home care should be sufficient at this time."
  };
  
  // Very simple logic to determine conditions
  if (hasHeadache && hasFever) {
    conditions.push({
      name: "Common Cold",
      description: "A viral infection causing inflammation of the mucous membranes lining the respiratory passages."
    });
    
    conditions.push({
      name: "Influenza",
      description: "A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and lungs."
    });
    
    remedies = [
      "Rest and stay hydrated",
      "Take over-the-counter pain relievers for fever",
      "Use a humidifier to ease congestion",
      "Stay warm and get plenty of sleep"
    ];
    
    urgency = "moderate";
    consultDoctor = {
      required: true,
      reason: "Your combination of fever and headache should be evaluated by a healthcare professional, especially if symptoms persist for more than 3 days."
    };
  } else if (hasCough && hasFever) {
    conditions.push({
      name: "Bronchitis",
      description: "Inflammation of the lining of your bronchial tubes, which carry air to and from your lungs."
    });
    
    conditions.push({
      name: "Pneumonia",
      description: "An infection that inflames the air sacs in one or both lungs, which may fill with fluid."
    });
    
    remedies = [
      "Rest as much as possible",
      "Drink plenty of fluids",
      "Use over-the-counter medications to reduce fever",
      "Use a humidifier to add moisture to the air"
    ];
    
    urgency = "moderate";
    consultDoctor = {
      required: true,
      reason: "Cough with fever may indicate a respiratory infection that should be evaluated by a doctor, especially if you have difficulty breathing."
    };
  } else if (hasHeadache) {
    conditions.push({
      name: "Tension Headache",
      description: "A mild to moderate pain often described as feeling like a tight band around the head."
    });
    
    conditions.push({
      name: "Migraine",
      description: "A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound."
    });
    
    remedies = [
      "Rest in a quiet, dark room",
      "Apply a cold pack to your forehead",
      "Drink plenty of water",
      "Take over-the-counter pain relievers"
    ];
    
    urgency = "mild";
  } else if (hasFatigue) {
    conditions.push({
      name: "Chronic Fatigue Syndrome",
      description: "A complicated disorder characterized by extreme fatigue that can't be explained by any underlying medical condition."
    });
    
    conditions.push({
      name: "Iron Deficiency",
      description: "A condition in which blood lacks adequate healthy red blood cells that carry oxygen to the body's tissues."
    });
    
    remedies = [
      "Establish a regular sleep schedule",
      "Engage in light physical activity",
      "Eat a balanced diet",
      "Manage stress through relaxation techniques"
    ];
    
    urgency = "mild";
    consultDoctor = {
      required: true,
      reason: "Persistent fatigue should be evaluated to rule out underlying conditions like anemia or thyroid issues."
    };
  } else {
    // Default case
    conditions.push({
      name: "General Malaise",
      description: "A general feeling of discomfort, illness, or uneasiness whose exact cause is difficult to identify."
    });
    
    remedies = [
      "Get adequate rest",
      "Stay hydrated",
      "Maintain a balanced diet",
      "Monitor your symptoms"
    ];
    
    urgency = "mild";
  }
  
  return {
    conditions,
    urgency: urgency as 'mild' | 'moderate' | 'emergency',
    remedies,
    consultDoctor
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
    location: "Chennai",
    rating: 4.9,
    photoUrl: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg",
    availability: ["Tuesday", "Thursday"],
    isAvailableToday: false,
    experience: 15,
    patientCount: 2600,
    reviews: 135,
    isVerified: true
  },
  {
    id: "5",
    name: "Dr. Rohan Gupta",
    specialization: "Neurology",
    location: "Bangalore",
    rating: 4.8,
    photoUrl: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg", // Different photo
    availability: ["Monday", "Wednesday", "Friday"],
    isAvailableToday: true,
    experience: 10,
    patientCount: 1900,
    reviews: 105,
    isVerified: true
  },
  {
    id: "6",
    name: "Dr. Priya Singh",
    specialization: "Dermatology",
    location: "Hyderabad",
    rating: 4.6,
    photoUrl: "https://images.pexels.com/photos/4167542/pexels-photo-4167542.jpeg", // Different photo
    availability: ["Tuesday", "Thursday", "Saturday"],
    isAvailableToday: false,
    experience: 8,
    patientCount: 1750,
    reviews: 90,
    isVerified: true
  },
  {
    id: "7",
    name: "Dr. Arjun Desai",
    specialization: "ENT (Otolaryngology)",
    location: "Pune",
    rating: 4.7,
    photoUrl: "https://images.pexels.com/photos/5794047/pexels-photo-5794047.jpeg", // Different photo
    availability: ["Monday", "Thursday"],
    isAvailableToday: true,
    experience: 11,
    patientCount: 2100,
    reviews: 100,
    isVerified: true
  },
  {
    id: "8",
    name: "Dr. Sneha Reddy",
    specialization: "Pulmonology",
    location: "Ahmedabad",
    rating: 4.8,
    photoUrl: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg", // Different photo
    availability: ["Wednesday", "Friday", "Saturday"],
    isAvailableToday: true,
    experience: 9,
    patientCount: 1850,
    reviews: 98,
    isVerified: true
  },
  {
    id: "9",
    name: "Dr. Vikram Patel",
    specialization: "Gastroenterology",
    location: "Jaipur",
    rating: 4.5,
    photoUrl: "https://images.pexels.com/photos/5206931/pexels-photo-5206931.jpeg", // Different photo
    availability: ["Tuesday", "Thursday"],
    isAvailableToday: false,
    experience: 13,
    patientCount: 2200,
    reviews: 115,
    isVerified: true
  },
  {
    id: "10",
    name: "Dr. Sunita Joshi",
    specialization: "Endocrinology",
    location: "Lucknow",
    rating: 4.9,
    photoUrl: "https://images.pexels.com/photos/5214996/pexels-photo-5214996.jpeg", // Different photo
    availability: ["Monday", "Wednesday"],
    isAvailableToday: true,
    experience: 14,
    patientCount: 2400,
    reviews: 125,
    isVerified: true
  },
  {
    id: "11",
    name: "Dr. Alok Verma",
    specialization: "Orthopedics",
    location: "Chandigarh",
    rating: 4.6,
    photoUrl: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg", // Different photo
    availability: ["Tuesday", "Friday", "Saturday"],
    isAvailableToday: false,
    experience: 10,
    patientCount: 2000,
    reviews: 102,
    isVerified: true
  },
  {
    id: "12",
    name: "Dr. Fatima Khan",
    specialization: "Psychiatry",
    location: "Bhopal",
    rating: 4.7,
    photoUrl: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg", // Different photo
    availability: ["Monday", "Thursday"],
    isAvailableToday: true,
    experience: 8,
    patientCount: 1600,
    reviews: 85,
    isVerified: true
  },
   {
    id: "13",
    name: "Dr. Rajesh Kumar",
    specialization: "Emergency Medicine", 
    location: "Mumbai",
    rating: 4.6,
    photoUrl: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg",
    availability: ["Tuesday", "Wednesday", "Friday"],
    isAvailableToday: false,
    experience: 9,
    patientCount: 1950,
    reviews: 100,
    isVerified: true
  },
  {
    id: "14",
    name: "Dr. Anita Desai",
    specialization: "Internal Medicine",
    location: "Delhi",
    rating: 4.8,
    photoUrl: "https://images.pexels.com/photos/5998461/pexels-photo-5998461.jpeg",
    availability: ["Monday", "Thursday", "Saturday"],
    isAvailableToday: true,
    experience: 11,
    patientCount: 2150,
    reviews: 112,
    isVerified: true
  },
  {
    id: "15",
    name: "Dr. Sameer Shah",
    specialization: "Neurology", 
    location: "Chennai",
    rating: 4.7,
    photoUrl: "https://images.pexels.com/photos/5234534/pexels-photo-5234534.jpeg",
    availability: ["Tuesday", "Friday"],
    isAvailableToday: false,
    experience: 12,
    patientCount: 2050,
    reviews: 108,
    isVerified: true
  }
];

// Mock FAQs
export const mockFAQs: FAQ[] = [
  {
    id: "1",
    question: "How accurate is the symptom checker?",
    answer: "Our symptom checker uses advanced AI algorithms trained on medical data. While it can provide helpful insights, it's not a substitute for professional medical diagnosis. The accuracy varies depending on the symptoms described and their complexity.",
    category: "symptom-checker"
  },
  {
    id: "2",
    question: "Is my health data secure?",
    answer: "Yes, we take your privacy seriously. All health data is encrypted and stored securely. We comply with HIPAA regulations and never share your personal information with third parties without your explicit consent.",
    category: "privacy"
  },
  {
    id: "3",
    question: "How do I book an appointment with a doctor?",
    answer: "After finding a doctor that matches your needs, click the 'Book Now' button on their profile. You'll be able to select an available date and time, provide some basic information, and confirm your appointment. You'll receive a confirmation email with all the details.",
    category: "appointments"
  },
  {
    id: "4",
    question: "Can I use voice input for the symptom checker?",
    answer: "Yes, you can use the voice input feature by clicking the microphone button when describing your symptoms. This feature uses speech recognition to convert your spoken words into text.",
    category: "symptom-checker"
  },
  {
    id: "5",
    question: "How do I cancel or reschedule an appointment?",
    answer: "You can cancel or reschedule appointments through your Dashboard. Navigate to the 'Appointments' tab, find the appointment you want to modify, and click on 'Cancel' or 'Reschedule'. Please do this at least 24 hours before your scheduled time to avoid any cancellation fees.",
    category: "appointments"
  }
];