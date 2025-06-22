"use client";

import React, { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MapPinIcon, ChatBubbleLeftEllipsisIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  getPincodeCoordinates,
  getHospitalsNearby,
  formatHospitalData,
} from "../lib/openstreetmap";

interface Coordinates {
  lat: number;
  lon: number;
}

interface Hospital {
  id: string;
  name: string;
  distance: number;
  address: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

function PincodeForm({ onSubmit }: { onSubmit: (pincode: string) => void }) {
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim()) {
      onSubmit(pincode.trim());
    } else {
      toast.error("Please enter a valid pincode");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 border border-blue-50 dark:border-neutral-700"
    >
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
        Find Hospitals Near You
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
        Enter your pincode to discover nearby healthcare facilities
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter your pincode"
            className="w-full px-6 py-4 rounded-xl border border-gray-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700/50 text-lg transition-all duration-200"
          />
          <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 hover:shadow-blue-500/30 transition-all duration-200"
        >
          Search Hospitals
        </motion.button>
      </form>
    </motion.div>
  );
}

function HospitalSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-blue-50 dark:border-neutral-700/80 bg-white dark:bg-neutral-800/90 shadow-xl animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-7 bg-gray-200 dark:bg-neutral-700/50 rounded w-48 mb-3" />
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-neutral-700/50" />
            <div className="h-4 bg-gray-200 dark:bg-neutral-700/50 rounded w-64" />
          </div>
          <div className="h-4 bg-gray-200 dark:bg-neutral-700/50 rounded w-24" />
        </div>
        <div className="w-32 h-9 bg-gray-200 dark:bg-neutral-700/50 rounded" />
      </div>
    </div>
  );
}

function HospitalsContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePincodeSubmit = (pincode: string) => {
    setSearchParams({ pincode });
  };

  useEffect(() => {
    const pincode = searchParams.get("pincode");
    if (!pincode) {
      return;
    }

    const fetchHospitals = async () => {
      setLoading(true);
      try {
        const coordinates: Coordinates = await getPincodeCoordinates(pincode);
        if (!coordinates) {
          toast.error("Could not find coordinates for the pincode");
          return;
        }

        const nearbyHospitals = await getHospitalsNearby(coordinates);
        const formattedHospitals = nearbyHospitals.map((hospital) =>
          formatHospitalData(hospital, coordinates.lat, coordinates.lon)
        );
        setHospitals(formattedHospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        toast.error("Failed to fetch hospitals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [searchParams]);

  const handleChatClick = (hospitalId: string) => {
    navigate(`/auth?hospital=${hospitalId}`);
  };

  if (!searchParams.get("pincode")) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <PincodeForm onSubmit={handlePincodeSubmit} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto px-4">
        <div className="h-8 w-48 bg-gray-200 dark:bg-neutral-700/50 rounded animate-pulse mx-auto mb-8" />
        <HospitalSkeleton />
        <HospitalSkeleton />
        <HospitalSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Nearby Hospitals
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Found {hospitals.length} hospitals near pincode {searchParams.get("pincode")}
        </p>
      </motion.div>

      <div className="space-y-6">
        {hospitals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-blue-50 dark:border-neutral-700"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No hospitals found nearby. Try a different pincode.
            </p>
          </motion.div>
        ) : (
          hospitals.map((hospital, index) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-blue-50 dark:border-neutral-700/80 bg-white dark:bg-neutral-800/90 shadow-xl shadow-blue-900/5 dark:shadow-neutral-900/30 hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                    <MapPinIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                    <span>{hospital.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                      {hospital.distance} km away
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${hospital.coordinates.lat},${hospital.coordinates.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <MapPinIcon className="w-4 h-4" />
                    View on Map
                  </a>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChatClick(hospital.id)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center gap-2 hover:shadow-blue-500/30 transition-all duration-200"
                >
                  <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
                  Chat
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default function HospitalsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <Suspense
          fallback={
            <div className="space-y-4">
              <HospitalSkeleton />
              <HospitalSkeleton />
              <HospitalSkeleton />
            </div>
          }
        >
          <HospitalsContent />
        </Suspense>
      </div>
    </div>
  );
}