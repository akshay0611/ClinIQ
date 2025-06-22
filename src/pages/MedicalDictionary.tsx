import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, BookOpenIcon, AcademicCapIcon, ArrowPathIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';


interface MedicalTerm {
  id: string;
  term: string;
  definition: string;
  usage: string;
  relatedTerms: string[];
  termType: string[]; 
  specialty: string[]; 
}

interface FilterOptions {
  termType: string[];
  specialty: string[];
}


function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


const fetchMedicalTerms = async (letter = 'a'): Promise<MedicalTerm[]> => {
  const mockDictionary: Record<string, MedicalTerm[]> = {
    a: [
      {
        id: 'a1',
        term: 'Anemia',
        definition: 'A condition marked by a deficiency of red blood cells or hemoglobin in the blood, resulting in pallor and weariness.',
        usage: 'Patients with anemia often experience fatigue and weakness due to reduced oxygen-carrying capacity in the blood.',
        relatedTerms: ['Hemoglobin', 'Iron Deficiency', 'Erythrocyte'],
        termType: ['Medical Condition'],
        specialty: ['Hematology'],
      },
      {
        id: 'a2',
        term: 'Arrhythmia',
        definition: 'Any abnormality in the rhythm of the heartbeat.',
        usage: 'An ECG is used to diagnose various types of arrhythmias, including atrial fibrillation.',
        relatedTerms: ['Bradycardia', 'Tachycardia', 'Fibrillation'],
        termType: ['Medical Condition'],
        specialty: ['Cardiology'],
      },
    ],
    b: [
      {
        id: 'b1',
        term: 'Bronchitis',
        definition: 'Inflammation of the bronchial tubes, carrying air to your lungs that results in coughing and mucus production.',
        usage: 'Acute bronchitis is often caused by viruses, while chronic bronchitis is more commonly associated with smoking.',
        relatedTerms: ['Asthma', 'COPD', 'Respiratory Infection'],
        termType: ['Medical Condition'],
        specialty: ['Respiratory'],
      },
    ],
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDictionary[letter.toLowerCase()] || []);
    }, 300);
  });
};

const searchMedicalTerms = async (query: string): Promise<MedicalTerm[]> => {
  const letters = ['a', 'b', 'c', 'd', 'e'];
  try {
    const results = await Promise.all(letters.map((letter) => fetchMedicalTerms(letter)));
    const allTerms = results.flat();
    return allTerms.filter(
      (item) =>
        item.term.toLowerCase().includes(query.toLowerCase()) ||
        item.definition.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
};

export default function MedicalDictionary() {
  const [activeLetter, setActiveLetter] = useState('a');
  const [terms, setTerms] = useState<MedicalTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MedicalTerm[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    termType: [],
    specialty: [],
  });
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    termType: ['Medical Condition', 'Anatomical Term', 'Procedure', 'Diagnostic Test'],
    specialty: ['Hematology', 'Cardiology', 'Respiratory', 'Neurology'],
  });

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);


  useEffect(() => {
    const updateFilterOptions = async () => {
      const letters = ['a', 'b', 'c', 'd', 'e'];
      const allTerms = (await Promise.all(letters.map((letter) => fetchMedicalTerms(letter)))).flat();
      const termTypes = Array.from(new Set(allTerms.flatMap((term) => term.termType)));
      const specialties = Array.from(new Set(allTerms.flatMap((term) => term.specialty)));
      setFilterOptions({
        termType: termTypes.length > 0 ? termTypes : filterOptions.termType,
        specialty: specialties.length > 0 ? specialties : filterOptions.specialty,
      });
    };
    updateFilterOptions();
  }, []);

  useEffect(() => {
    loadTerms(activeLetter);
  }, [activeLetter]);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      performSearch(debouncedSearchQuery);
    } else if (searchQuery === '') {
      setIsSearching(false);
      setErrorMessage(null);
    }
  }, [debouncedSearchQuery]);

  const loadTerms = async (letter: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await fetchMedicalTerms(letter);
      setTerms(result);
      setSearchQuery('');
      setSearchResults([]);
      setIsSearching(false);
    } catch (error) {
      setErrorMessage('Failed to load medical terms');
      toast.error('Failed to load medical terms');
    } finally {
      setIsLoading(false);
    }
  };

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setIsSearching(true);
    setErrorMessage(null);

    try {
      const results = await searchMedicalTerms(query);
      setSearchResults(results);
      if (results.length === 0) {
        setErrorMessage(`No results found for "${query}"`);
        toast.error(`No results found for "${query}"`);
      }
    } catch (error) {
      setErrorMessage('Search failed. Please try again.');
      toast.error('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setErrorMessage(null);
    loadTerms(activeLetter);
  };

  const toggleFilter = (type: keyof FilterOptions, value: string) => {
    setActiveFilters((prev) => {
      const current = [...prev[type]];
      const index = current.indexOf(value);

      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }

      return {
        ...prev,
        [type]: current,
      };
    });
  };


  const filteredTerms = (isSearching ? searchResults : terms).filter((term) => {
    const termTypeMatch =
      activeFilters.termType.length === 0 ||
      term.termType.some((type) => activeFilters.termType.includes(type));
    const specialtyMatch =
      activeFilters.specialty.length === 0 ||
      term.specialty.some((spec) => activeFilters.specialty.includes(spec));

    return termTypeMatch && specialtyMatch;
  });

  const hasActiveFilters = activeFilters.termType.length > 0 || activeFilters.specialty.length > 0;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
      
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <span>Medical Reference</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Medical Dictionary
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore comprehensive definitions of medical terms, conditions, and treatments to better understand healthcare concepts.
          </p>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-6xl mx-auto mb-10"
        >
          <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-6 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30">
         
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search medical terms..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  aria-label="Search medical terms"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <motion.button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    aria-label="Clear search"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {isSearching && (
                  <motion.button
                    onClick={resetSearch}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <ArrowPathIcon className="w-4 h-4" />
                    Reset Search
                  </motion.button>
                )}
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 ${
                    hasActiveFilters
                      ? 'text-blue-700 dark:text-blue-300 font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <AdjustmentsHorizontalIcon className="w-4 h-4" />
                  {hasActiveFilters
                    ? `Filters (${activeFilters.termType.length + activeFilters.specialty.length})`
                    : 'Filters'}
                </motion.button>
              </div>
            </div>

           
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 border-t border-b border-gray-100 dark:border-neutral-700/50 py-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Term Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.termType.map((type) => (
                        <motion.button
                          key={type}
                          onClick={() => toggleFilter('termType', type)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeFilters.termType.includes(type)
                              ? 'bg-blue-600 text-white dark:bg-blue-500'
                              : 'bg-gray-100 text-gray-700 hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600'
                          }`}
                          title={
                            type === 'Medical Condition'
                              ? 'Diseases or health disorders'
                              : type === 'Anatomical Term'
                              ? 'Terms related to body structures'
                              : type === 'Procedure'
                              ? 'Medical interventions or treatments'
                              : type === 'Diagnostic Test'
                              ? 'Tests used to diagnose conditions'
                              : type
                          }
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Medical Specialty</h3>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.specialty.map((specialty) => (
                        <motion.button
                          key={specialty}
                          onClick={() => toggleFilter('specialty', specialty)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeFilters.specialty.includes(specialty)
                              ? 'bg-blue-600 text-white dark:bg-blue-500'
                              : 'bg-gray-100 text-gray-700 hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600'
                          }`}
                          title={
                            specialty === 'Hematology'
                              ? 'Blood-related medical terms'
                              : specialty === 'Cardiology'
                              ? 'Heart-related medical terms'
                              : specialty === 'Respiratory'
                              ? 'Lung and breathing-related terms'
                              : specialty === 'Neurology'
                              ? 'Nervous system-related terms'
                              : specialty
                          }
                        >
                          {specialty}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="mt-4 flex justify-end">
                    <motion.button
                      onClick={() => setActiveFilters({ termType: [], specialty: [] })}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
                    >
                      Clear all filters
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

           
            <div className="flex flex-wrap justify-center gap-2">
              {alphabet.map((letter) => (
                <motion.button
                  key={letter}
                  onClick={() => {
                    setActiveLetter(letter);
                    setIsSearching(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg font-medium text-sm uppercase transition-all duration-200 ${
                    activeLetter === letter && !isSearching
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600'
                  }`}
                >
                  {letter}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

       
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto mb-4"
          >
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg">
              {errorMessage}
            </div>
          </motion.div>
        )}

       
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-8 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <BookOpenIcon className="w-6 h-6 text-blue-500" />
              {isSearching
                ? `${filteredTerms.length} ${filteredTerms.length === 1 ? 'Result' : 'Results'} for "${searchQuery}"`
                : `Terms Starting with ${activeLetter.toUpperCase()}`}
            </h2>

            {isLoading ? (
              <div className="text-center py-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                />
                <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
              </div>
            ) : filteredTerms.length === 0 ? (
              <div className="text-center py-10">
                <AcademicCapIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  {isSearching
                    ? `No terms found matching your search${hasActiveFilters ? ' and filter' : ''} criteria.`
                    : `No terms found for letter ${activeLetter.toUpperCase()}.`}
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredTerms.map((term) => (
                  <motion.div
                    key={term.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border-b border-gray-100 dark:border-neutral-700/50 pb-6 last:border-b-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{term.term}</h3>
                    </div>

                   
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {term.termType.map((type, index) => (
                          <motion.span
                            key={`type-${index}`}
                            whileHover={{ scale: 1.03 }}
                            className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-300 text-sm font-medium"
                          >
                            {type}
                          </motion.span>
                        ))}
                        {term.specialty.map((spec, index) => (
                          <motion.span
                            key={`spec-${index}`}
                            whileHover={{ scale: 1.03 }}
                            className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 text-sm font-medium"
                          >
                            {spec}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-3">{term.definition}</p>
                    <p className="text-gray-500 dark:text-gray-400 italic mb-3">
                      <span className="font-medium">Usage: </span>{term.usage}
                    </p>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">Related Terms: </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {term.relatedTerms.map((related, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSearchQuery(related);
                              performSearch(related);
                            }}
                            className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-all duration-200"
                          >
                            {related}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

       
        <div className="relative pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <BookOpenIcon className="w-16 h-16 text-blue-300 dark:text-blue-700 absolute top-10 left-10 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <AcademicCapIcon className="w-20 h-20 text-blue-300 dark:text-indigo-700 absolute bottom-10 right-10 rotate-12 animate-float" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}