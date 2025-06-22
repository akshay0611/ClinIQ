import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  BeakerIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Drug {
  id: string;
  name: string;
  genericName: string;
  category: string[];
  prescriptionStatus: 'OTC' | 'Prescription' | 'Controlled';
  usageType: string[];
  uses: string;
  dosage: string;
  sideEffects: string[];
  interactions: string[];
  warnings: string[];
}

interface FilterOptions {
  category: string[];
  usageType: string[];
  prescriptionStatus: string[];
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


const fetchDrugs = async (letter = 'a'): Promise<Drug[]> => {
  const mockDrugDatabase: Record<string, Drug[]> = {
    a: [
      {
        id: 'a1',
        name: 'Aspirin',
        genericName: 'Acetylsalicylic acid',
        category: ['NSAID', 'Analgesic', 'Antipyretic', 'Antiplatelet'],
        prescriptionStatus: 'OTC',
        usageType: ['Oral', 'Tablet'],
        uses: 'Used to treat pain, fever, and inflammation. Low doses may be used as an antiplatelet medication to prevent heart attacks and strokes.',
        dosage: 'Adults: 325-650 mg every 4-6 hours as needed, not to exceed 4000 mg per day.',
        sideEffects: [
          'Stomach upset or heartburn',
          'Gastrointestinal bleeding',
          'Tinnitus (ringing in ears) at high doses',
          'Allergic reactions'
        ],
        interactions: [
          'Anticoagulants (increased bleeding risk)',
          'Other NSAIDs (increased side effect risk)',
          'ACE inhibitors (reduced effectiveness)',
          'Alcohol (increased bleeding risk)'
        ],
        warnings: [
          'Not recommended for children under 12 due to risk of Reye\'s syndrome',
          'Avoid in third trimester of pregnancy',
          'Use caution in patients with asthma, peptic ulcer disease, or bleeding disorders',
          'Discontinue use 7 days before surgery'
        ]
      },
      {
        id: 'a2',
        name: 'Atorvastatin',
        genericName: 'Atorvastatin calcium',
        category: ['Statin', 'Lipid-lowering'],
        prescriptionStatus: 'Prescription',
        usageType: ['Oral', 'Tablet'],
        uses: 'Used to lower cholesterol and reduce the risk of heart disease, stroke, and heart attacks.',
        dosage: 'Initially 10-20 mg once daily. Maintenance: 10-80 mg once daily, preferably in the evening.',
        sideEffects: [
          'Muscle pain or weakness',
          'Liver enzyme abnormalities',
          'Headache',
          'Joint pain',
          'Digestive issues'
        ],
        interactions: [
          'Grapefruit juice (increased drug concentration)',
          'Cyclosporine (increased risk of myopathy)',
          'Clarithromycin (increased statin blood levels)',
          'Alcohol (increased risk of liver damage)'
        ],
        warnings: [
          'Report unexplained muscle pain, tenderness, or weakness immediately',
          'Regular liver function testing recommended',
          'Not recommended during pregnancy or breastfeeding',
          'Avoid excessive alcohol consumption'
        ]
      }
    ],
    b: [
      {
        id: 'b1',
        name: 'Bupropion',
        genericName: 'Bupropion hydrochloride',
        category: ['Antidepressant', 'Smoking cessation aid'],
        prescriptionStatus: 'Prescription',
        usageType: ['Oral', 'Extended-release tablet'],
        uses: 'Used to treat depression and seasonal affective disorder. Also used to help people stop smoking by reducing cravings and withdrawal symptoms.',
        dosage: 'Depression: Initially 150 mg once daily for 3 days, then 150 mg twice daily. Smoking cessation: 150 mg once daily for 3 days, then 150 mg twice daily for 7-12 weeks.',
        sideEffects: [
          'Dry mouth',
          'Headache',
          'Insomnia',
          'Nausea',
          'Anxiety',
          'Increased risk of seizures'
        ],
        interactions: [
          'MAO inhibitors (risk of hypertensive crisis)',
          'Alcohol (increased seizure risk)',
          'CYP2B6 inhibitors like ticlopidine and clopidogrel',
          'Drugs that lower seizure threshold'
        ],
        warnings: [
          'Increased risk of suicidal thoughts, especially in young adults',
          'Contraindicated in patients with seizure disorders or eating disorders',
          'Discontinue if agitation, hostility, or suicidal thoughts emerge',
          'Not recommended during pregnancy unless benefits outweigh risks'
        ]
      },
      {
        id: 'b2',
        name: 'Benzonatate',
        genericName: 'Benzonatate',
        category: ['Non-narcotic antitussive'],
        prescriptionStatus: 'Prescription',
        usageType: ['Oral', 'Capsule'],
        uses: 'Used to relieve cough symptoms by numbing stretch receptors in the lungs, reducing the cough reflex.',
        dosage: 'Adults and children over 10 years: 100-200 mg three times daily as needed, not to exceed 600 mg per day.',
        sideEffects: [
          'Drowsiness',
          'Headache',
          'Constipation',
          'Nausea',
          'Dizziness',
          'Numbness in chest'
        ],
        interactions: [
          'Other medications causing drowsiness (additive effects)',
          'Alcohol (enhanced sedative effects)'
        ],
        warnings: [
          'Do not chew or dissolve capsules (can cause throat and mouth numbness)',
          'Keep away from children (resembles candy and can be fatal if chewed)',
          'Avoid in patients with known hypersensitivity',
          'Use caution when driving or operating machinery'
        ]
      }
    ],
    l: [
      {
        id: 'l1',
        name: 'Lisinopril',
        genericName: 'Lisinopril',
        category: ['ACE inhibitor', 'Antihypertensive'],
        prescriptionStatus: 'Prescription',
        usageType: ['Oral', 'Tablet'],
        uses: 'Used to treat high blood pressure, heart failure, and to improve survival after heart attacks. Also used to protect the kidneys in people with diabetes.',
        dosage: 'Hypertension: Initially 10 mg once daily, maintenance 20-40 mg once daily. Heart failure: Initially 5 mg once daily, target 20-40 mg once daily.',
        sideEffects: [
          'Dry cough',
          'Dizziness',
          'Headache',
          'Fatigue',
          'Hyperkalemia (high potassium levels)',
          'Angioedema (in rare cases)'
        ],
        interactions: [
          'Potassium supplements (increased risk of hyperkalemia)',
          'NSAIDs (reduced antihypertensive effect)',
          'Lithium (increased lithium levels)',
          'Diuretics (enhanced hypotensive effect)'
        ],
        warnings: [
          'Contraindicated in pregnancy (can cause fetal harm)',
          'Risk of angioedema (swelling of face, lips, tongue, throat)',
          'Regular monitoring of blood pressure, kidney function, and potassium levels advised',
          'May cause first-dose hypotension (low blood pressure)'
        ]
      }
    ]
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDrugDatabase[letter.toLowerCase()] || []);
    }, 300);
  });
};


const searchDrugs = async (query: string): Promise<Drug[]> => {
  const letters = ['a', 'b', 'c', 'd', 'e', 'l'];
  try {
    const results = await Promise.all(letters.map((letter) => fetchDrugs(letter)));
    const allDrugs = results.flat();
    return allDrugs.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.genericName.toLowerCase().includes(query.toLowerCase()) ||
        item.uses.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
};

export default function DrugDatabase() {
  const [activeLetter, setActiveLetter] = useState('a');
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    category: [],
    usageType: [],
    prescriptionStatus: []
  });

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);


  const filterOptions: FilterOptions = {
    category: ['NSAID', 'Analgesic', 'Antipyretic', 'Antiplatelet', 'Statin', 'Lipid-lowering', 'Antidepressant', 'ACE inhibitor', 'Antihypertensive'],
    usageType: ['Oral', 'Tablet', 'Extended-release tablet', 'Capsule', 'Injection', 'Topical'],
    prescriptionStatus: ['OTC', 'Prescription', 'Controlled']
  };

  useEffect(() => {
    loadDrugs(activeLetter);
  }, [activeLetter]);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      performSearch(debouncedSearchQuery);
    } else if (searchQuery === '') {
      setIsSearching(false);
      setErrorMessage(null);
    }
  }, [debouncedSearchQuery]);

  const loadDrugs = async (letter: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await fetchDrugs(letter);
      setDrugs(result);
      setSearchQuery('');
      setSearchResults([]);
      setIsSearching(false);
    } catch (error) {
      setErrorMessage('Failed to load drug information');
      toast.error('Failed to load drug information');
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
      const results = await searchDrugs(query);
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
    setActiveFilters({
      category: [],
      usageType: [],
      prescriptionStatus: []
    });
    loadDrugs(activeLetter);
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
        [type]: current
      };
    });
  };

  
  const filteredDrugs = (isSearching ? searchResults : drugs).filter((drug) => {
    const categoryMatch = 
      activeFilters.category.length === 0 || 
      drug.category.some(cat => activeFilters.category.includes(cat));
    
    const usageTypeMatch = 
      activeFilters.usageType.length === 0 || 
      drug.usageType.some(usage => activeFilters.usageType.includes(usage));
    
    const prescriptionMatch = 
      activeFilters.prescriptionStatus.length === 0 || 
      activeFilters.prescriptionStatus.includes(drug.prescriptionStatus);
    
    return categoryMatch && usageTypeMatch && prescriptionMatch;
  });

  const hasActiveFilters = 
    activeFilters.category.length > 0 || 
    activeFilters.usageType.length > 0 || 
    activeFilters.prescriptionStatus.length > 0;

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
            Drug Database
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Detailed information on medications including uses, dosage instructions, side effects, interactions, and important warnings.
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
                  placeholder="Search drugs by name, generic name, or use..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  aria-label="Search drugs"
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
                    ? `Filters (${activeFilters.category.length + activeFilters.usageType.length + activeFilters.prescriptionStatus.length})` 
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.category.map((category) => (
                        <motion.button
                          key={category}
                          onClick={() => toggleFilter('category', category)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeFilters.category.includes(category)
                              ? 'bg-blue-600 text-white dark:bg-blue-500'
                              : 'bg-gray-100 text-gray-700 hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600'
                          }`}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                 
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Usage Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.usageType.map((usageType) => (
                        <motion.button
                          key={usageType}
                          onClick={() => toggleFilter('usageType', usageType)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeFilters.usageType.includes(usageType)
                              ? 'bg-blue-600 text-white dark:bg-blue-500'
                              : 'bg-gray-100 text-gray-700 hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600'
                          }`}
                        >
                          {usageType}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Prescription Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.prescriptionStatus.map((status) => (
                        <motion.button
                          key={status}
                          onClick={() => toggleFilter('prescriptionStatus', status)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeFilters.prescriptionStatus.includes(status)
                              ? 'bg-blue-600 text-white dark:bg-blue-500'
                              : 'bg-gray-100 text-gray-700 hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600'
                          }`}
                        >
                          {status}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="mt-4 flex justify-end">
                    <motion.button
                      onClick={() => setActiveFilters({
                        category: [],
                        usageType: [],
                        prescriptionStatus: []
                      })}
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
              <PlusCircleIcon className="w-6 h-6 text-blue-500" />
              {isSearching 
                ? `${filteredDrugs.length} ${filteredDrugs.length === 1 ? 'Result' : 'Results'} ${searchQuery ? `for "${searchQuery}"` : ''}` 
                : `Drugs Starting with ${activeLetter.toUpperCase()}`
              }
            </h2>

            {isLoading ? (
              <div className="text-center py-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                />
                <p className="mt-4 text-gray-600 dark:text-gray-300">Loading drug information...</p>
              </div>
            ) : filteredDrugs.length === 0 ? (
              <div className="text-center py-10">
                <BeakerIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  {isSearching
                    ? `No drugs found matching your search${hasActiveFilters ? ' and filter' : ''} criteria.`
                    : `No drugs found for letter ${activeLetter.toUpperCase()}.`}
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                {filteredDrugs.map((drug) => (
                  <motion.div
                    key={drug.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border-b border-gray-100 dark:border-neutral-700/50 pb-8 last:border-b-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {drug.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          {drug.genericName}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">

                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          drug.prescriptionStatus === 'OTC' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                            : drug.prescriptionStatus === 'Prescription'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                            : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
                        }`}>
                          {drug.prescriptionStatus}
                        </span>
                      </div>
                    </div>
                    
                   
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {drug.category.map((cat, index) => (
                          <motion.span
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-300 text-sm font-medium"
                          >
                            {cat}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-2">
                          <BeakerIcon className="w-5 h-5 text-teal-500" />
                          Uses
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">{drug.uses}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-2">
                          <ClockIcon className="w-5 h-5 text-teal-500" />
                          Dosage
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">{drug.dosage}</p>
                      </div>
                    </div>
                    
                   
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-2">
                          <ExclamationTriangleIcon className="w-5 h-5 text-amber-500" />
                          Side Effects
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                          {drug.sideEffects.map((effect, index) => (
                            <li key={index}>{effect}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-2">
                          <ArrowPathIcon className="w-5 h-5 text-red-500" />
                          Interactions
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                          {drug.interactions.map((interaction, index) => (
                            <li key={index}>{interaction}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-2">
                          <ShieldCheckIcon className="w-5 h-5 text-red-500" />
                          Warnings
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                          {drug.warnings.map((warning, index) => (
                            <li key={index}>{warning}</li>
                          ))}
                        </ul>
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
            <PlusCircleIcon className="w-16 h-16 text-teal-300 dark:text-teal-700 absolute top-10 left-10 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <BeakerIcon className="w-20 h-20 text-teal-300 dark:text-blue-700 absolute bottom-10 right-10 rotate-12 animate-float" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}