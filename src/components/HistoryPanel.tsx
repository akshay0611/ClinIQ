import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Clock, X, ChevronRight, Trash2, List, AlertTriangle } from 'lucide-react';
import LocalStorageService, { SymptomHistoryEntry } from '../services/LocalStorageService';

interface HistoryPanelProps {
  onClose: () => void;
  onSelect: (entry: SymptomHistoryEntry) => void;
  isOpen: boolean;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ onClose, onSelect, isOpen }) => {
  const [history, setHistory] = useState<SymptomHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  const loadHistory = () => {
    setIsLoading(true);
   
    setTimeout(() => {
      const entries = LocalStorageService.getSymptomHistory();
      setHistory(entries);
      setIsLoading(false);
    }, 300);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); 
    const success = LocalStorageService.deleteSymptomCheckById(id);
    if (success) {
      setHistory(history.filter(entry => entry.id !== id));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      LocalStorageService.clearSymptomHistory();
      setHistory([]);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getUrgencyLabel = (severity: number) => {
    switch (severity) {
      case 4:
        return { text: 'Emergency', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' };
      case 3:
        return { text: 'Urgent', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' };
      case 2:
        return { text: 'Moderate', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' };
      case 1:
      default:
        return { text: 'Mild', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' };
    }
  };

  
  const truncateText = (text: string, maxLength: number = 60) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-neutral-900 shadow-2xl z-50 overflow-hidden flex flex-col rounded-l-2xl"
        >
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-100 dark:border-blue-800 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">Symptom History</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-10 h-10 border-4 border-t-blue-500 border-blue-200 dark:border-blue-700 dark:border-t-blue-400 rounded-full animate-spin"></div>
              </div>
            ) : history.length > 0 ? (
              <div>
                {history.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => onSelect(entry)}
                    className="mb-3 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-100 dark:border-neutral-700 p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDate(entry.date)}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${getUrgencyLabel(entry.result.severity).color}`}>
                        {getUrgencyLabel(entry.result.severity).text}
                      </span>
                    </div>
                    
                    <h3 className="font-medium text-neutral-800 dark:text-white mt-2 mb-1">
                      {entry.result.possibleConditions?.[0]?.name || "Symptom Check"}
                    </h3>
                    
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                      {truncateText(entry.symptoms)}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm">
                        <span>View details</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                      
                      <button
                        onClick={(e) => handleDelete(entry.id, e)}
                        className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition-colors"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                  <List className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                </div>
                <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-2">No History Found</h3>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-xs">
                  Your symptom check history will appear here after you complete your first check.
                </p>
              </div>
            )}
          </div>
          
          {history.length > 0 && (
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
              <button
                onClick={handleClearAll}
                className="w-full py-2.5 px-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All History
              </button>
            </div>
          )}
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border-t border-yellow-100 dark:border-yellow-800/50 rounded-b-2xl">
            <div className="flex items-start">
              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2 shrink-0" />
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                History is stored locally on your device and is not backed up. Clearing your browser data will erase this history.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;