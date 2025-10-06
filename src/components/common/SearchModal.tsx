import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  FileText,
  Users,
  Stethoscope,
  Hospital,
  BookOpen,
  Pill,
  ArrowRight,
  Clock,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

// Custom hook for debouncing
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category:
    | "doctors"
    | "guides"
    | "dictionary"
    | "drugs"
    | "blog"
    | "hospitals"
    | "faq";
  path: string;
  keywords?: string[];
  rating?: number;
}

// Mock search data - in a real app, this would come from your API
const mockSearchData: SearchResult[] = [
  // Doctors
  {
    id: "doc-1",
    title: "Dr. Sarah Johnson",
    description:
      "Cardiologist with 15 years of experience in heart disease treatment",
    category: "doctors",
    path: "/doctors",
    keywords: ["cardiology", "heart", "chest pain", "hypertension"],
    rating: 4.8,
  },
  {
    id: "doc-2",
    title: "Dr. Michael Chen",
    description: "Family Medicine specialist focusing on preventive care",
    category: "doctors",
    path: "/doctors",
    keywords: ["family medicine", "primary care", "preventive"],
    rating: 4.9,
  },

  // First Aid Guides
  {
    id: "guide-1",
    title: "CPR and Basic Life Support",
    description: "Learn essential CPR techniques for emergency situations",
    category: "guides",
    path: "/first-aid-guides",
    keywords: ["cpr", "emergency", "life support", "resuscitation"],
  },
  {
    id: "guide-2",
    title: "Wound Care and Bandaging",
    description: "Proper techniques for cleaning and dressing wounds",
    category: "guides",
    path: "/first-aid-guides",
    keywords: ["wound", "bandage", "injury", "bleeding"],
  },

  // Medical Dictionary
  {
    id: "dict-1",
    title: "Hypertension",
    description:
      "High blood pressure condition affecting cardiovascular system",
    category: "dictionary",
    path: "/medical-dictionary",
    keywords: ["blood pressure", "cardiovascular", "heart"],
  },
  {
    id: "dict-2",
    title: "Pneumonia",
    description: "Infection that inflames air sacs in one or both lungs",
    category: "dictionary",
    path: "/medical-dictionary",
    keywords: ["lung", "infection", "respiratory", "breathing"],
  },

  // Drugs
  {
    id: "drug-1",
    title: "Aspirin",
    description: "Pain reliever and anti-inflammatory medication",
    category: "drugs",
    path: "/drug-database",
    keywords: ["pain", "headache", "inflammation", "fever"],
  },
  {
    id: "drug-2",
    title: "Metformin",
    description: "Medication used to treat type 2 diabetes",
    category: "drugs",
    path: "/drug-database",
    keywords: ["diabetes", "blood sugar", "glucose"],
  },

  // Blog Posts
  {
    id: "blog-1",
    title: "10 Tips for Heart Health",
    description: "Essential lifestyle changes to maintain a healthy heart",
    category: "blog",
    path: "/health-blog",
    keywords: ["heart", "cardiovascular", "exercise", "diet"],
  },
  {
    id: "blog-2",
    title: "Understanding Mental Health",
    description: "A comprehensive guide to mental wellness and self-care",
    category: "blog",
    path: "/health-blog",
    keywords: ["mental health", "wellness", "stress", "anxiety"],
  },

  // Hospitals
  {
    id: "hosp-1",
    title: "City General Hospital",
    description: "Full-service hospital with emergency and specialty care",
    category: "hospitals",
    path: "/hospitals",
    keywords: ["emergency", "hospital", "healthcare"],
  },

  // FAQ
  {
    id: "faq-1",
    title: "How do I book an appointment?",
    description: "Step-by-step guide to scheduling your medical appointment",
    category: "faq",
    path: "/faq",
    keywords: ["appointment", "booking", "schedule"],
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "doctors":
      return <Users size={16} className="text-blue-500" />;
    case "guides":
      return <FileText size={16} className="text-green-500" />;
    case "dictionary":
      return <BookOpen size={16} className="text-purple-500" />;
    case "drugs":
      return <Pill size={16} className="text-orange-500" />;
    case "blog":
      return <FileText size={16} className="text-pink-500" />;
    case "hospitals":
      return <Hospital size={16} className="text-red-500" />;
    case "faq":
      return <FileText size={16} className="text-yellow-500" />;
    default:
      return <Search size={16} className="text-gray-500" />;
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "doctors":
      return "Doctors";
    case "guides":
      return "First Aid Guides";
    case "dictionary":
      return "Medical Dictionary";
    case "drugs":
      return "Drug Database";
    case "blog":
      return "Health Blog";
    case "hospitals":
      return "Hospitals";
    case "faq":
      return "FAQ";
    default:
      return "Other";
  }
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cliniq-recent-searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save search to recent searches
  const saveSearch = useCallback(
    (query: string) => {
      const updated = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("cliniq-recent-searches", JSON.stringify(updated));
    },
    [recentSearches]
  );

  // Filter search results
  const searchResults = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];

    const query = debouncedSearchQuery.toLowerCase();
    return mockSearchData
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.keywords?.some((keyword) =>
            keyword.toLowerCase().includes(query)
          )
      )
      .slice(0, 10); // Limit to 10 results
  }, [debouncedSearchQuery]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    searchResults.forEach((result) => {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    });
    return groups;
  }, [searchResults]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        saveSearch(searchQuery.trim());
      }
    },
    [searchQuery, saveSearch]
  );

  const handleResultClick = useCallback(
    (_result: SearchResult) => {
      if (searchQuery.trim()) {
        saveSearch(searchQuery.trim());
      }
      onClose();
    },
    [searchQuery, saveSearch, onClose]
  );

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("cliniq-recent-searches");
  };

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:transform md:-translate-x-1/2 md:w-full md:max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 max-h-[80vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <form
                onSubmit={handleSearchSubmit}
                className="flex-1 flex items-center"
              >
                <Search size={20} className="text-gray-400 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, guides, medications, and more..."
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-lg"
                  autoFocus
                />
              </form>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {searchQuery.trim() ? (
                // Search Results
                <div className="p-4">
                  {searchResults.length > 0 ? (
                    <div className="space-y-6">
                      {Object.entries(groupedResults).map(
                        ([category, results]) => (
                          <div key={category}>
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                              {getCategoryLabel(category)} ({results.length})
                            </h3>
                            <div className="space-y-2">
                              {results.map((result) => (
                                <Link
                                  key={result.id}
                                  to={result.path}
                                  onClick={() => handleResultClick(result)}
                                  className="block p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                                >
                                  <div className="flex items-start space-x-3">
                                    <div className="mt-1">
                                      {getCategoryIcon(result.category)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                                          {result.title}
                                        </h4>
                                        {result.rating && (
                                          <div className="flex items-center space-x-1 text-xs text-yellow-500">
                                            <Star
                                              size={12}
                                              className="fill-current"
                                            />
                                            <span>{result.rating}</span>
                                          </div>
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                        {result.description}
                                      </p>
                                      {result.keywords && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                          {result.keywords
                                            .slice(0, 3)
                                            .map((keyword) => (
                                              <span
                                                key={keyword}
                                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
                                              >
                                                {keyword}
                                              </span>
                                            ))}
                                        </div>
                                      )}
                                    </div>
                                    <ArrowRight
                                      size={16}
                                      className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Search
                        size={48}
                        className="text-gray-300 dark:text-gray-600 mx-auto mb-4"
                      />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No results found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Try searching for doctors, medical terms, or health
                        topics
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Recent Searches & Suggestions
                <div className="p-4">
                  {recentSearches.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Recent Searches
                        </h3>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(search)}
                            className="flex items-center w-full p-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors group"
                          >
                            <Clock size={16} className="text-gray-400 mr-3" />
                            <span className="flex-1">{search}</span>
                            <ArrowRight
                              size={14}
                              className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/symptom-check"
                        onClick={onClose}
                        className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-colors group"
                      >
                        <Stethoscope
                          size={20}
                          className="text-blue-600 dark:text-blue-400 mr-3"
                        />
                        <div>
                          <div className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                            Symptom Checker
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400">
                            Check symptoms
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/doctors"
                        onClick={onClose}
                        className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-colors group"
                      >
                        <Users
                          size={20}
                          className="text-green-600 dark:text-green-400 mr-3"
                        />
                        <div>
                          <div className="font-medium text-green-900 dark:text-green-100 text-sm">
                            Find Doctors
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400">
                            Book appointment
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
