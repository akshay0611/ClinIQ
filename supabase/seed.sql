-- Seed data for ClinIQ
-- Run this after schema.sql to populate your database with initial data.

-- 1. Sample Doctors
-- Note: These UUIDs should be replaced with real user IDs from auth.users in a real app.
INSERT INTO public.profiles (id, full_name, role, email)
VALUES 
('d5d992e2-9b2d-4f1b-9f9b-1f9b1f9b1f9b', 'Dr. Emily Chen', 'doctor', 'emily.chen@example.com'),
('e5e992e2-9b2d-4f1b-9f9b-1f9b1f9b1f9b', 'Dr. Sarah Smith', 'doctor', 'sarah.smith@example.com');

INSERT INTO public.doctor_profiles (profile_id, specialization, qualifications, experience_years, consultation_fee, clinic_address, about)
VALUES 
('d5d992e2-9b2d-4f1b-9f9b-1f9b1f9b1f9b', 'Cardiologist', ARRAY['MD', 'PhD'], 12, 150, '123 Heart St, Medical District', 'Specialist in cardiovascular diseases.'),
('e5e992e2-9b2d-4f1b-9f9b-1f9b1f9b1f9b', 'Dermatologist', ARRAY['MD'], 8, 100, '456 Skin Care Ave, Uptown', 'Expert in clinical dermatology.');
