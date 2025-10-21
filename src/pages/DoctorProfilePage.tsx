import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../services/supabaseClient';

export default function DoctorProfilePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*, doctor_profiles(*)')
          .eq('id', id)
          .eq('role', 'doctor')
          .single();

        if (error) {
          console.error('Error fetching doctor profile:', error);
        } else if (data) {
          setDoctor(data);
        }
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!doctor) {
    return <div>Doctor not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white dark:bg-neutral-800/90 p-8 rounded-2xl shadow-xl"
      >
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-4xl font-bold">{doctor.full_name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">{doctor.doctor_profiles.specialization}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p>{doctor.doctor_profiles.about}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
          <ul className="list-disc list-inside">
            {doctor.doctor_profiles.qualifications.map((q: string, i: number) => <li key={i}>{q}</li>)}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          <p>{doctor.doctor_profiles.experience_years} years</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Consultation Fee</h2>
          <p>${doctor.doctor_profiles.consultation_fee}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Clinic Address</h2>
          <p>{doctor.doctor_profiles.clinic_address}</p>
        </div>
      </motion.div>
    </div>
  );
}
