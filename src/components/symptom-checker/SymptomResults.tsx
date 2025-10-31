import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Info,
  ThumbsUp,
  Stethoscope,
  Clock,
  BadgeCheck,
  ChevronRight,
  PlusCircle,
  Utensils,
  Pill,
  User
} from 'lucide-react';
import { SymptomResult } from '../../types';
import { mockDoctors } from '../../services/mockData';
import Card from '../common/Card';
import Button from '../common/Button';
import PDFExportButton from './PDFExportButton';

// Import the function from your new utility file
import { getSpecializationsForConditions } from '../../utils/medicalMappings'; // Adjust path if needed

interface SymptomResultsProps {
  result: SymptomResult;
  symptoms?: string;
}

const SymptomResults: React.FC<SymptomResultsProps> = ({ result, symptoms = '' }) => {
  if (!result) {
    return (
      <div className="p-10 text-center bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl shadow-md">
        <AlertCircle className="h-14 w-14 text-yellow-500 mx-auto mb-5" />
        <h3 className="text-2xl font-bold tracking-tight">No symptom data available</h3>
        <p className="text-neutral-600 dark:text-neutral-300 mt-3 text-lg">
          Please complete the symptom assessment to see results.
        </p>
      </div>
    );
  }

  // Get dynamic specializations based on conditions using the imported function
  const dynamicSpecializations = getSpecializationsForConditions(result.possibleConditions);

  // Filter doctors based on dynamic specializations and verification
  const recommendedDoctors = mockDoctors
    .filter(doctor =>
      dynamicSpecializations.includes(doctor.specialization) && doctor.isVerified
    )
    .sort((a, b) => {
      if (result.severity === 4) { // Emergency
        if (a.isAvailableToday !== b.isAvailableToday) {
          return a.isAvailableToday ? -1 : 1; // Prioritize available today
        }
      }
      return b.rating - a.rating; // Then sort by rating
    })
    .slice(0, 3); // Limit to top 3 doctors

  const renderUrgencyLevel = () => {
    const urgencyConfig = {
      mild: {
        color: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/40',
        border: 'border-green-200 dark:border-green-800',
        text: 'text-green-800 dark:text-green-300',
        icon: <ThumbsUp className="h-7 w-7 text-green-500" />,
        title: 'Mild',
        description: 'Your symptoms suggest a mild condition that can likely be managed at home.'
      },
      moderate: {
        color: 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/40',
        border: 'border-yellow-200 dark:border-yellow-800',
        text: 'text-yellow-800 dark:text-yellow-300',
        icon: <Info className="h-7 w-7 text-yellow-500" />,
        title: 'Moderate',
        description: 'Your symptoms may require medical attention but are not immediately life-threatening.'
      },
      emergency: {
        color: 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/40',
        border: 'border-red-200 dark:border-red-800',
        text: 'text-red-800 dark:text-red-300',
        icon: <AlertCircle className="h-7 w-7 text-red-500" />,
        title: 'Emergency',
        description: 'Your symptoms require immediate medical attention. Please seek emergency care.'
      }
    };

    const urgencyMap: Record<number, keyof typeof urgencyConfig> = {
      1: 'mild',
      2: 'moderate',
      3: 'moderate',
      4: 'emergency'
    };

    const urgencyKey = result?.severity ? urgencyMap[result.severity] : undefined;
    const urgency = urgencyKey || 'moderate';
    const config = urgencyConfig[urgency] as typeof urgencyConfig.mild;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className={`${config.color} ${config.text} p-8 rounded-2xl shadow-xl ${config.border} border mb-10 hover:shadow-2xl transition-shadow duration-300`}
      >
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-white dark:bg-neutral-800 mr-4 shadow-lg">
            {config.icon}
          </div>
          <h3 className="text-2xl font-bold tracking-tight">{config.title} Urgency</h3>
        </div>
        <p className="ml-1 text-lg">{config.description}</p>
      </motion.div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 80 } }
  };

  const getSeverityColor = (severity: 'high' | 'medium' | 'low'): string => {
    switch (severity) {
      case 'high':
        return 'text-red-500 dark:text-red-400';
      case 'medium':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'low':
        return 'text-green-500 dark:text-green-400';
      default:
        return 'text-blue-500 dark:text-blue-400';
    }
  };

  const getProbabilitySeverity = (probability: number): 'high' | 'medium' | 'low' => {
    if (probability >= 75) return 'high';
    if (probability >= 50) return 'medium';
    return 'low';
  };


  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-10 px-4 sm:px-6 lg:px-8"
      id="symptom-results-container"
    >
      <motion.div
        variants={itemVariants}
        className="mb-8"
      >
        <PDFExportButton result={result} symptoms={symptoms} />
      </motion.div>

      {renderUrgencyLevel()}

      <hr className="my-10 border-neutral-200 dark:border-neutral-700" />

      <motion.div
        variants={itemVariants}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-neutral-800 dark:text-white flex items-center tracking-tight">
            Possible Conditions
          </h3>
          <div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>Analysis confidence: {(result as { confidence?: string }).confidence || "High"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(result.possibleConditions || []).map((condition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15, type: 'spring' }}
            >
              <Card className="p-0 overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.02] rounded-2xl">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-700 p-5">
                  <h4 className="font-bold text-neutral-800 dark:text-white flex items-center text-lg">
                    {condition.name}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(getProbabilitySeverity(condition.probability))}`}>
                    {condition.probability?.toFixed(0) || "N/A"}% match
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4 text-base">
                    {condition.description}
                  </p>
                  <div className="flex items-center text-blue-500 dark:text-blue-400 text-sm font-medium cursor-pointer group">
                    <span>Learn more</span>
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <hr className="my-10 border-neutral-200 dark:border-neutral-700" />

      <motion.div
        variants={itemVariants}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-white flex items-center tracking-tight">
          <PlusCircle className="mr-3 h-6 w-6 text-green-500" />
          Recommended Actions
        </h3>

        <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h4 className="font-bold text-neutral-700 dark:text-neutral-200 mb-5 flex items-center text-lg">
            <BadgeCheck className="mr-3 h-6 w-6 text-green-500" />
            Home Remedies & Self-Care
          </h4>

          <div className="space-y-4 pl-4">
            {(result.recommendations || []).map((remedy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.15, type: 'spring' }}
                className="flex items-start"
              >
                <div className="h-7 w-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4 shrink-0">
                  <span className="font-medium">{index + 1}</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 pt-1 text-base">{remedy}</p>
              </motion.div>
            ))}
            {(result.recommendations?.length === 0) && (
              <p className="text-neutral-500 dark:text-neutral-400">No specific home remedies listed. Follow general wellness advice.</p>
            )}
          </div>
        </div>
      </motion.div>

      <hr className="my-10 border-neutral-200 dark:border-neutral-700" />

      <motion.div
        variants={itemVariants}
        className="mb-12"
      >
        <h4 className="font-bold text-neutral-700 dark:text-neutral-200 mb-5 flex items-center text-lg">
          <Stethoscope className="mr-3 h-6 w-6 text-blue-500" />
          Medical Consultation
        </h4>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-start">
            <div className="shrink-0 mt-1 bg-white dark:bg-neutral-800 p-3 rounded-full shadow-lg">
              {result.requiresAttention
                ? <AlertCircle size={24} className="text-blue-500" />
                : <ThumbsUp size={24} className="text-green-500" />
              }
            </div>
            <div className="ml-5">
              <p className="font-bold text-neutral-800 dark:text-white text-xl">
                {result.requiresAttention
                  ? "Professional medical consultation recommended"
                  : "Medical consultation may not be necessary at this time"}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 mt-3 text-base">
                {result.requiresAttention
                  ? "Based on your symptom analysis, you should consult a healthcare provider."
                  : "Monitor your symptoms and seek medical attention if they worsen or do not improve."}
              </p>
            </div>
          </div>

          {result.requiresAttention && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
              className="mt-8"
            >
              <Link to="/doctors">
                <Button
                  fullWidth
                  rightIcon={<ArrowRight size={18} />}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-4 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-lg"
                >
                  Find a Doctor
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>

      <hr className="my-10 border-neutral-200 dark:border-neutral-700" />

      {/* Recommended Doctors Section */}
      <motion.div
        variants={itemVariants}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-white flex items-center tracking-tight">
          <User className="mr-3 h-6 w-6 text-blue-500" />
          Recommended Doctors
        </h3>

        {recommendedDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15, type: 'spring' }}
              >
                <Card className="p-0 overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.02] rounded-2xl">
                  <div className="flex items-center border-b border-neutral-100 dark:border-neutral-700 p-5">
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-neutral-800 dark:text-white text-lg">{doctor.name}</h4>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm">{doctor.specialization}</p>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm">{doctor.location}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-neutral-600 dark:text-neutral-300 mb-3 text-base">
                      Rating: {doctor.rating} ({doctor.reviews} reviews) | {doctor.experience} years experience
                    </p>
                    <p className={`text-base mb-3 ${doctor.isAvailableToday ? 'text-green-600 dark:text-green-400' : 'text-neutral-600 dark:text-neutral-300'}`}>
                      {doctor.isAvailableToday ? 'Available Today' : 'Check Availability'}
                    </p>
                    <Link to={`/doctors/${doctor.id}`}> {/* Assuming a route like /doctors/:id */}
                      <Button
                        fullWidth
                        rightIcon={<ArrowRight size={16} />}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                      >
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-neutral-100 dark:border-neutral-700/80 p-8 shadow-xl">
            <p className="text-neutral-600 dark:text-neutral-300 text-base">
              No doctors found matching the relevant specializations for your conditions from our current list.
              We recommend consulting a General Practitioner or Family Doctor. You can also search our full doctor directory.
            </p>
            <Link to="/doctors">
                <Button
                  className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  Search Full Doctor Directory
                </Button>
              </Link>
          </div>
        )}
      </motion.div>

      <hr className="my-10 border-neutral-200 dark:border-neutral-700" />

      {/* Dietary Recommendations Section */}
      <motion.div
        variants={itemVariants}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-white flex items-center tracking-tight">
          <Utensils className="mr-3 h-6 w-6 text-orange-500" />
          Dietary Recommendations
        </h3>

        <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-orange-50 dark:border-neutral-700/80 p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-2 text-lg flex items-center">
                <div className="h-7 w-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 shrink-0">1</div>
                Recommended Foods
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 text-base ml-10">Include these in your diet:</p>
              <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300 mt-2 ml-14 text-base">
                {(result.diet?.recommendedFoods && result.diet.recommendedFoods.length > 0)
                  ? result.diet.recommendedFoods.map((food, index) => <li key={index}>{food}</li>)
                  : <li>Follow general healthy eating guidelines.</li>
                }
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-2 text-lg flex items-center">
                <div className="h-7 w-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 shrink-0">2</div>
                Foods to Avoid
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 text-base ml-10">Limit or avoid these foods:</p>
              <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300 mt-2 ml-14 text-base">
                {(result.diet?.foodsToAvoid && result.diet.foodsToAvoid.length > 0)
                  ? result.diet.foodsToAvoid.map((food, index) => <li key={index}>{food}</li>)
                  : <li>No specific foods listed to avoid.</li>
                }
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-2 text-lg flex items-center">
                <div className="h-7 w-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 shrink-0">3</div>
                Hydration
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 text-base ml-10">
                {result.diet?.hydration || 'Drink plenty of water throughout the day. Aim for 8-10 glasses daily unless advised otherwise by a doctor.'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <hr className="my-10 border-neutral-200 dark:border-neutral-700" />

      {/* Medications & Supplements Section */}
      <motion.div
        variants={itemVariants}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-white flex items-center tracking-tight">
          <Pill className="mr-3 h-6 w-6 text-purple-500" />
          Medications & Supplements
        </h3>

        <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-purple-50 dark:border-neutral-700/80 p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-2 text-lg flex items-center">
                <div className="h-7 w-7 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3 shrink-0">1</div>
                Recommended Medications
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 text-base ml-10">Consult your doctor before taking any medications:</p>
              <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300 mt-2 ml-14 text-base">
                {(result.medications?.recommended && result.medications.recommended.length > 0)
                  ? result.medications.recommended.map((med, index) => <li key={index}>{med}</li>)
                  : <li>No specific medications listed. Consult a doctor for advice.</li>
                }
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-2 text-lg flex items-center">
                <div className="h-7 w-7 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3 shrink-0">2</div>
                Supplements
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 text-base ml-10">Consider these supplements (consult your doctor first):</p>
              <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300 mt-2 ml-14 text-base">
                {(result.medications?.supplements && result.medications.supplements.length > 0)
                  ? result.medications.supplements.map((supp, index) => <li key={index}>{supp}</li>)
                  : <li>No specific supplements listed. Consult a doctor for advice.</li>
                }
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-2 text-lg flex items-center">
                <div className="h-7 w-7 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3 shrink-0">3</div>
                Precautions
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 text-base ml-10">
                {result.medications?.precautions || 'Always read medication labels carefully and follow dosage instructions. Report any adverse reactions to your healthcare provider immediately.'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <hr className="my-10 border-neutral-200 dark:border-neutral-700" />

      <motion.div
        variants={itemVariants}
        className="mt-10 text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex">
          <AlertCircle className="h-6 w-6 text-neutral-400 dark:text-neutral-500 mr-3 shrink-0 mt-0.5" />
          <p className="text-base">
            <span className="font-bold text-neutral-700 dark:text-neutral-300">Disclaimer:</span> {result.disclaimer || "This analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SymptomResults;