// User types
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  preferences?: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

// Symptom check types
export interface SymptomCheck {
  id: string;
  userId: string;
  symptoms: string;
  result: SymptomResult;
  timestamp: string;
}

// Result check types
export interface SymptomResult {
  summary: string;
  possibleConditions: {
    name: string;
    probability: number;
    description: string;
  }[];
  severity: number;
  recommendations: string[];
  requiresAttention: boolean;
  disclaimer: string;
  urgency?: 'mild' | 'moderate' | 'emergency'; 
  confidence?: 'High' | 'Medium' | 'Low'; 
  conditions?: {
    name: string;
    severity?: 'low' | 'medium' | 'high';
    description: string;
    matchPercentage?: string;
  }[];
  remedies?: string[];
  consultDoctor?: {
    required: boolean;
    reason?: string;
  };  
  diet?: {
    recommendedFoods: string[];
    foodsToAvoid: string[];
    hydration: string;
  };
  medications?: {
    recommended: string[];
    supplements: string[];
    precautions: string;
  };
}

export interface Condition {
  name: string;
  description: string;
  probability?: number;
  severity?: 'high' | 'medium' | 'low';
  matchPercentage?: string;
}

// Doctor types
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  location: string;
  rating: number;
  photoUrl: string;
  availability: string[];
  isAvailableToday: boolean;
  experience: number;
  patientCount: number;
  reviews: number;
  isVerified: boolean; 
}



// Appointment types
export interface Appointment {
  id: string;
  doctorId: string;
  userId: string;
  doctor: {
    name: string;
    specialization: string;
    photoUrl: string;
  };
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Theme type
export type Theme = 'light' | 'dark';

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

// Webinars
export interface Webinar {
  id: string;
  title: string;
  speakers: string[];
  date: string;
  time: string;
  duration: string;
  description: string;
  topic: string;
  type: 'upcoming' | 'past';
  registration_link?: string;
  recording_link?: string;
  thumbnail: string;
  attendees?: number;
  rating?: number;
  featured?: boolean;
}