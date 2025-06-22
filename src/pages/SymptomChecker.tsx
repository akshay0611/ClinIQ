import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SymptomForm from '../components/symptom-checker/SymptomForm';
import SymptomResults from '../components/symptom-checker/SymptomResults';
import { SymptomResult } from '../types';
import { getMockSymptomResult } from '../services/mockData';
import GeminiSymptomService from '../services/GeminiSymptomService';
import { ChevronDownIcon, ActivityIcon, HeartPulseIcon, BrainIcon, AlertTriangleIcon, ClockIcon } from 'lucide-react';
import LocalStorageService, { SymptomHistoryEntry } from '../services/LocalStorageService';
import HistoryPanel from '../components/HistoryPanel';


const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const USE_MOCK_DATA = !geminiApiKey;
let geminiService: GeminiSymptomService | null = null;

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
  const [selectedHistoryEntry, setSelectedHistoryEntry] = useState<SymptomHistoryEntry | null>(null);
  

  useEffect(() => {
    if (geminiApiKey) {
      geminiService = new GeminiSymptomService(geminiApiKey);
    }
  }, []);

 
  const openHistoryPanel = () => {
    setIsHistoryPanelOpen(true);
  };

  const closeHistoryPanel = () => {
    setIsHistoryPanelOpen(false);
  };

  const handleHistoryEntrySelect = (entry: SymptomHistoryEntry) => {
    setSelectedHistoryEntry(entry);
    setSymptoms(entry.symptoms);
    setResult(entry.result);
    closeHistoryPanel();
    

    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);
  };

  const handleSubmit = async (symptoms: string) => {
    setSymptoms(symptoms);
    setIsLoading(true);
    setError(null);
    setSelectedHistoryEntry(null);
    
    try {
      let analysisResult: SymptomResult;
      
      if (USE_MOCK_DATA || !geminiService) {
       
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        analysisResult = getMockSymptomResult(symptoms);
        
      
        if (!geminiApiKey) {
          console.warn('Using mock data: No Gemini API key provided. Set VITE_GEMINI_API_KEY in your environment variables.');
        }
      } else {
        
        analysisResult = await geminiService.analyzeSymptoms(symptoms);
      }
      
      setResult(analysisResult);
      
     
      LocalStorageService.saveSymptomCheck(symptoms, analysisResult);
      
    } catch (err) {
      console.error('Error analyzing symptoms:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while analyzing symptoms');
    } finally {
      setIsLoading(false);
      
    
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  };

  const clearResults = () => {
    setResult(null);
    setSymptoms('');
    setSelectedHistoryEntry(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950">
    
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

     
      <div className="fixed top-20 right-4 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openHistoryPanel}
          className="flex items-center px-4 py-2 bg-white dark:bg-neutral-800 rounded-full shadow-lg shadow-blue-900/10 dark:shadow-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 font-medium"
        >
          <ClockIcon className="w-4 h-4 mr-2" />
          History
        </motion.button>
      </div>

     
      <HistoryPanel 
        isOpen={isHistoryPanelOpen}
        onClose={closeHistoryPanel}
        onSelect={handleHistoryEntrySelect}
      />

      <div className="relative container mx-auto px-4 py-16 md:py-24">
       
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <HeartPulseIcon className="w-4 h-4 mr-2" />
            <span>ClinIQ Health Assistant</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            AI-Powered Symptom Checker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Describe your symptoms to get an instant analysis, possible conditions,
            and guidance on what to do next. Your health is our priority.
          </p>
          
          {USE_MOCK_DATA && (
            <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300">
              <AlertTriangleIcon className="w-4 h-4 mr-2" />
              <span className="text-sm">Running in demo mode with mock data. Add Gemini API key for real analysis.</span>
            </div>
          )}
        </motion.div>

       
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
        >
          <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-6 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <ActivityIcon className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">Advanced algorithms assess your symptoms against thousands of conditions for accuracy.</p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-6 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30">
            <div className="h-12 w-12 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <HeartPulseIcon className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Personalized Guidance</h3>
            <p className="text-gray-600 dark:text-gray-300">Get tailored recommendations based on your specific symptoms and medical profile.</p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-6 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <ClockIcon className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Symptom Timeline</h3>
            <p className="text-gray-600 dark:text-gray-300">Track your health journey with a complete history of your symptom checks, stored securely on your device.</p>
          </div>
        </motion.div>

       
        <div className="max-w-4xl mx-auto">
          {selectedHistoryEntry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <p className="text-blue-700 dark:text-blue-300">
                    Viewing saved symptom check from {new Date(selectedHistoryEntry.date).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={clearResults}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-800/50 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md transition-colors"
                >
                  Start New Check
                </button>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <SymptomForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              initialValue={symptoms}
              disabled={!!selectedHistoryEntry}
            />
          </motion.div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50 rounded-xl text-red-700 dark:text-red-300"
            >
              <div className="flex items-center">
                <AlertTriangleIcon className="h-5 w-5 mr-2" />
                <p>{error}</p>
              </div>
            </motion.div>
          )}
          
          {result && !isLoading && !error && (
            <motion.div
              id="results-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mt-8 bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-8 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30"
            >
              <SymptomResults result={result} />
            </motion.div>
          )}
        </div>

       
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300">Get answers to common questions about our symptom checker</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl border border-blue-50 dark:border-neutral-700/80 p-4 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/30">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-gray-900 dark:text-white">How accurate is the symptom checker?</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDownIcon className="h-5 w-5 text-blue-500" />
                  </span>
                </summary>
                <p className="text-gray-600 dark:text-gray-300 mt-3">
                  Our symptom checker uses advanced AI algorithms trained on vast medical datasets. While it provides valuable insights, it's important to remember it's not a substitute for professional medical advice. Always consult with a healthcare provider for proper diagnosis.
                </p>
              </details>
            </div>
            
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl border border-blue-50 dark:border-neutral-700/80 p-4 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/30">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-gray-900 dark:text-white">Is my medical data secure?</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDownIcon className="h-5 w-5 text-blue-500" />
                  </span>
                </summary>
                <p className="text-gray-600 dark:text-gray-300 mt-3">
                  Yes, we take your privacy seriously. All information provided to our symptom checker is encrypted and protected. Your symptom history is stored locally on your device only and not on our servers. You can delete your history at any time.
                </p>
              </details>
            </div>
            
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl border border-blue-50 dark:border-neutral-700/80 p-4 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/30">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-gray-900 dark:text-white">What should I do in a medical emergency?</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDownIcon className="h-5 w-5 text-blue-500" />
                  </span>
                </summary>
                <p className="text-gray-600 dark:text-gray-300 mt-3">
                  If you're experiencing severe symptoms like chest pain, difficulty breathing, or severe bleeding, please call emergency services immediately (911 in the US). Our symptom checker is not designed for emergency situations and should not delay seeking urgent medical care.
                </p>
              </details>
            </div>
            
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl border border-blue-50 dark:border-neutral-700/80 p-4 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/30">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-gray-900 dark:text-white">How does the symptom history feature work?</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDownIcon className="h-5 w-5 text-blue-500" />
                  </span>
                </summary>
                <p className="text-gray-600 dark:text-gray-300 mt-3">
                  Our symptom history feature automatically saves your symptom checks locally on your device. No account or login is required. You can access your history by clicking the "History" button in the top-right corner. Your data remains private and is only stored on your current device. Clearing your browser data will erase this history.
                </p>
              </details>
            </div>
          </div>
        </motion.div>

       
        <div className="relative pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <HeartPulseIcon className="w-16 h-16 text-blue-300 dark:text-blue-700 absolute top-10 left-10 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <ActivityIcon className="w-20 h-20 text-blue-300 dark:text-indigo-700 absolute bottom-10 right-10 rotate-12" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;