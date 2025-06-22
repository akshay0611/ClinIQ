import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Brain, PencilIcon, Loader2 } from 'lucide-react';
import TextArea from '../common/TextArea';

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item: (index: number) => SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item: (index: number) => SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition  {
  new (): SpeechRecognition;
}

interface SymptomFormProps {
  onSubmit: (symptoms: string) => void;
  isLoading: boolean;
  initialValue?: string;
  disabled?: boolean;
}

const SymptomForm: React.FC<SymptomFormProps> = ({ 
  onSubmit, 
  isLoading, 
  initialValue = '',
  disabled = false 
}) => {
  const [symptoms, setSymptoms] = useState(initialValue);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [demoExamples, setDemoExamples] = useState<string[]>([
    "I've had a persistent cough and sore throat for the past 3 days, with mild fever in the evenings.",
    "I have severe headache in the front of my head and sensitivity to light for the last 6 hours.",
    "My lower back has been hurting for two weeks, especially when I bend over or sit for long periods."
  ]);


  useEffect(() => {
    setSymptoms(initialValue);
  }, [initialValue]);

 
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }
    
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    
    recognitionInstance.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + ' ';
        }
      }
      if (transcript) {
        setSymptoms(prev => prev + ' ' + transcript.trim());
      }
    };
    
    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsRecording(false);
    };
    
    recognitionInstance.onend = () => {
      setIsRecording(false);
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      setError('Please enter your symptoms');
      return;
    }
    
    if (!isLoading && !disabled) {
      setError('');
      onSubmit(symptoms);
    }
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      setError('Speech recognition is not supported in your browser');
      return;
    }
    
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setError('');
      try {
        recognition.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Speech recognition error:', err);
        setError('Could not start speech recognition');
      }
    }
  };

  const handleExampleClick = (example: string) => {
    if (!disabled) {
      setSymptoms(example);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30 p-8 border border-blue-50 dark:border-neutral-700/80 backdrop-blur-sm"
    >
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stethoscope"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">
            Describe Your Symptoms
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            Be as detailed as possible for the most accurate analysis
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <TextArea
            label="What symptoms are you experiencing?"
            placeholder="E.g., I've had a persistent cough and sore throat for the past 3 days, with mild fever in the evenings..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            error={error}
            disabled={isLoading || disabled}
            className="mb-6"
            rows={6}
          />
          
          {disabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100/50 dark:bg-neutral-900/50 rounded-xl">
              <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-md text-sm font-medium">
                Viewing saved result
              </span>
            </div>
          )}
        </div>
        
       
        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center">
            <PencilIcon size={14} className="mr-1" />
            Example descriptions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {demoExamples.map((example, index) => (
              <motion.button
                key={index}
                type="button"
                whileHover={{ scale: disabled ? 1 : 1.02 }}
                whileTap={{ scale: disabled ? 1 : 0.98 }}
                onClick={() => handleExampleClick(example)}
                disabled={disabled}
                className={`text-left text-xs p-3 rounded-lg transition-colors duration-200 border border-blue-100 dark:border-blue-800/50
                  ${disabled 
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed' 
                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40'
                  }`}
              >
                {example.length > 70 ? example.substring(0, 70) + "..." : example}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          {speechSupported ? (
            <motion.button
              type="button"
              whileHover={{ scale: disabled ? 1 : 1.05 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
              onClick={handleVoiceInput}
              disabled={isLoading || disabled}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium shadow-lg disabled:opacity-70
                ${disabled
                  ? 'bg-neutral-400 dark:bg-neutral-700 text-white cursor-not-allowed'
                  : `bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500 text-white shadow-violet-500/20 dark:shadow-violet-700/30 hover:shadow-xl hover:shadow-violet-500/30 ${isRecording ? 'animate-pulse' : ''}`
                }`}
            >
              <Mic size={16} />
              {isRecording ? 'Stop Recording' : 'Voice Input'}
            </motion.button>
          ) : (
            <motion.button
              type="button"
              disabled={true}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-400 text-white font-medium opacity-70 cursor-not-allowed"
            >
              <Mic size={16} />
              Voice Not Supported
            </motion.button>
          )}
          
          <motion.button
            type="submit"
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            disabled={isLoading || !symptoms.trim() || disabled}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium shadow-lg
              ${isLoading || !symptoms.trim() || disabled
                ? 'bg-neutral-400 dark:bg-neutral-700 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white shadow-blue-500/20 dark:shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-500/30'
              }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain size={16} />
                Analyze Symptoms
              </>
            )}
          </motion.button>
        </div>
      </form>
      
      {isRecording && (
        <div className="mt-4 p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg border border-violet-200 dark:border-violet-800/50">
          <p className="text-sm text-violet-700 dark:text-violet-300 flex items-center">
            <span className="inline-block w-2 h-2 bg-violet-500 rounded-full mr-2 animate-pulse"></span>
            Listening... Speak clearly about your symptoms
          </p>
        </div>
      )}
      
      <div className="mt-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 border border-neutral-100 dark:border-neutral-700/50">
        <div className="flex items-start">
          <div className="shrink-0 mt-1 text-blue-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a88 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
            </svg>
          </div>
          <p className="ml-3 text-sm text-neutral-500 dark:text-neutral-400">
            This tool is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician with any questions you have regarding a medical condition.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SymptomForm;