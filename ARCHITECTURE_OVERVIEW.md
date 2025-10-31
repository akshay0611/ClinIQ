# 🏗️ Architecture Overview

## System Design

ClinIQ follows a modern **JAMstack architecture** with a React frontend, Supabase backend, and AI integration through Google's Gemini API. The system is designed for scalability, security, and real-time data synchronization.

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│  React + TypeScript + Tailwind CSS + Framer Motion         │
│  (SPA with React Router, Context API for state)            │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ├──────────────┬──────────────┬──────────────┐
                 │              │              │              │
                 ▼              ▼              ▼              ▼
         ┌──────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
         │   Supabase   │ │  Gemini  │ │  Vercel  │ │   Browser    │
         │   Backend    │ │  AI API  │ │   CDN    │ │   Storage    │
         └──────┬───────┘ └────────── └──────────┘ └──────────────┘
                │
                ├─── Auth (JWT + RLS)
                ├─── PostgreSQL Database
                ├─── RESTful API
                └─── Real-time Subscriptions
```

## Data Flow

### 1. Authentication Flow
- User signs up/logs in via Supabase Auth (email/password)
- JWT token issued and stored in browser
- `AuthContext` manages session state globally
- Row Level Security (RLS) policies enforce data access control

### 2. Core Feature Flows

**Symptom Checker:**
```
User Input → React Component → Gemini API → AI Analysis → 
Display Results → Store in Supabase (symptoms table) → Update UI
```

**Doctor Discovery:**
```
User Search → Query Supabase (profiles + doctor_profiles tables) → 
Filter by specialization/location → Display cards → 
Click → Navigate to doctor profile page
```

**Appointment Booking:**
```
Select Doctor → Choose Date/Time → Submit Form → 
Insert into appointments table → Trigger email notification → 
Update doctor's availability → Redirect to confirmation
```

**Role-Based Dashboards:**
```
Login → Fetch user role from profiles table → 
Conditional rendering (Patient vs Doctor UI) → 
Load role-specific data (symptoms/appointments) → Display dashboard
```

## Database Schema

### Core Tables
- **`profiles`**: User base info (name, email, role, medical data)
- **`doctor_profiles`**: Doctor-specific data (specialization, fees, qualifications)
- **`appointments`**: Booking records (patient_id, doctor_id, date, status)
- **`symptoms`**: Symptom check history (user_id, input, result, severity)

### Security
- **Row Level Security (RLS)**: Users can only access their own data
- **Role-based policies**: Doctors see patient appointments, patients see their records
- **JWT authentication**: Secure token-based auth with automatic refresh

## API Structure

### Supabase REST API
- **GET** `/profiles?id=eq.{userId}` - Fetch user profile
- **POST** `/appointments` - Create appointment
- **GET** `/doctor_profiles?specialization=eq.{spec}` - Search doctors
- **POST** `/symptoms` - Save symptom check results

### External APIs
- **Gemini AI API**: POST requests with symptom descriptions, returns diagnosis suggestions
- **Fallback**: Mock data when API key unavailable (development mode)

## Scalability & Future Plans

### Current Infrastructure
- **Frontend**: Deployed on Vercel with automatic CDN distribution
- **Backend**: Supabase managed PostgreSQL with connection pooling
- **Static Assets**: Served via Vercel Edge Network

### Planned Enhancements
1. **Microservices Migration**: Split into Auth, Appointments, AI, and Notifications services
2. **Caching Layer**: Redis for frequently accessed data (doctor listings, availability)
3. **Message Queue**: RabbitMQ/Bull for async tasks (email notifications, report generation)
4. **Load Balancing**: Horizontal scaling with multiple Supabase instances
5. **CDN Optimization**: Image optimization with WebP format and lazy loading
6. **Real-time Features**: WebSocket integration for live chat and notifications
7. **Monitoring**: Sentry for error tracking, DataDog for performance metrics

## Technology Stack

| Layer          | Technology                    | Purpose                          |
|----------------|-------------------------------|----------------------------------|
| Frontend       | React 18 + TypeScript         | UI components and type safety    |
| Styling        | Tailwind CSS + Framer Motion  | Responsive design and animations |
| State          | Context API + React Hooks     | Global state management          |
| Routing        | React Router v6               | Client-side navigation           |
| Backend        | Supabase (PostgreSQL)         | Database, Auth, and API          |
| AI             | Google Gemini API             | Symptom analysis and insights    |
| Deployment     | Vercel                        | CI/CD and hosting                |
| Version Control| Git + GitHub                  | Source control and collaboration |

## Performance Considerations

- **Code Splitting**: React.lazy() for route-based splitting
- **Memoization**: useMemo/useCallback to prevent unnecessary re-renders
- **Optimistic UI**: Instant feedback before server confirmation
- **Debouncing**: Search inputs debounced to reduce API calls
- **Image Optimization**: Compressed assets, lazy loading below fold

---

**Last Updated**: October 2025  
**Maintained By**: Akshay Kumar
