import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabaseClient';

interface DoctorProfileData {
  specialization: string;
  qualifications: string[];
  experience_years: number;
  consultation_fee: number;
  clinic_address: string;
  about: string;
}

export default function DoctorProfileForm(): JSX.Element {
  const { currentUser } = useAuth();
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      if (currentUser) {
        const { data, error } = await supabase
          .from('doctor_profiles')
          .select('*')
          .eq('profile_id', currentUser.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching doctor profile:', error);
          toast.error('Could not fetch doctor profile.');
        } else if (data) {
          setDoctorProfile(data);
        } else {
          setDoctorProfile({
            specialization: '',
            qualifications: [],
            experience_years: 0,
            consultation_fee: 0,
            clinic_address: '',
            about: '',
          });
        }
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDoctorProfile(prev => (prev ? { ...prev, [name]: value } : null));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof DoctorProfileData) => {
    const { value } = e.target;
    setDoctorProfile(prev => (prev ? { ...prev, [field]: value.split(',').map(item => item.trim()) } : null));
  };

  const handleSaveProfile = async () => {
    if (!currentUser || !doctorProfile) return;

    const { error } = await supabase.from('doctor_profiles').upsert({ 
      profile_id: currentUser.id, 
      ...doctorProfile 
    });

    if (error) {
      console.error('Error updating doctor profile:', error);
      toast.error(error.message || 'Failed to update doctor profile.');
    } else {
      toast.success('Doctor profile updated successfully!');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {doctorProfile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Specialization</label>
            <input type="text" name="specialization" value={doctorProfile.specialization} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Experience (Years)</label>
            <input type="number" name="experience_years" value={doctorProfile.experience_years} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Qualifications (comma-separated)</label>
            <input type="text" name="qualifications" value={doctorProfile.qualifications.join(', ')} onChange={(e) => handleArrayChange(e, 'qualifications')} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Consultation Fee</label>
            <input type="number" name="consultation_fee" value={doctorProfile.consultation_fee} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Clinic Address</label>
            <input type="text" name="clinic_address" value={doctorProfile.clinic_address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">About</label>
            <textarea name="about" value={doctorProfile.about} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
          </div>
        </div>
      )}
    </div>
  );
}
