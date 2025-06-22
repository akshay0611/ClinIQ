import React, { useState, useMemo } from 'react';

import { 
  HeartIcon, 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  ClockIcon, 
  UserGroupIcon, 
  BookOpenIcon, 
  PlayIcon, 
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  StarIcon,
  CheckIcon,
  FireIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

interface FirstAidGuide {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  description: string;
  thumbnail: string;
  steps: number;
  scenario: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  downloadLink?: string;
  videoLink?: string;
  lastUpdated: string;
  views: number;
  rating: number;
  featured?: boolean;
  keywords: string[];
}

const FIRST_AID_DATA: FirstAidGuide[] = [
  {
    id: '1',
    title: 'CPR for Adults: Life-Saving Technique',
    category: 'Cardiac Emergency',
    difficulty: 'Intermediate',
    readTime: '8 min',
    description: 'Learn the proper technique for performing CPR on adults, including chest compressions and rescue breathing.',
    thumbnail: '/api/placeholder/400/300',
    steps: 12,
    scenario: 'Cardiac Arrest',
    urgency: 'Critical',
    downloadLink: 'https://guides.ClinIQ.ai/cpr-adults.pdf',
    videoLink: 'https://videos.ClinIQ.ai/cpr-demonstration',
    lastUpdated: '2025-05-15',
    views: 15420,
    rating: 4.9,
    featured: true,
    keywords: ['CPR', 'cardiac arrest', 'chest compressions', 'rescue breathing']
  },
  {
    id: '2',
    title: 'Choking Relief: Heimlich Maneuver',
    category: 'Respiratory Emergency',
    difficulty: 'Beginner',
    readTime: '5 min',
    description: 'Step-by-step guide to help someone who is choking, including the Heimlich maneuver for adults and children.',
    thumbnail: '/api/placeholder/400/300',
    steps: 8,
    scenario: 'Choking',
    urgency: 'Critical',
    downloadLink: 'https://guides.ClinIQ.ai/choking-relief.pdf',
    videoLink: 'https://videos.ClinIQ.ai/heimlich-maneuver',
    lastUpdated: '2025-05-12',
    views: 12890,
    rating: 4.8,
    keywords: ['choking', 'heimlich maneuver', 'airway obstruction']
  },
  {
    id: '3',
    title: 'Severe Bleeding Control',
    category: 'Trauma Care',
    difficulty: 'Intermediate',
    readTime: '6 min',
    description: 'Essential techniques for controlling severe bleeding, including direct pressure and tourniquet application.',
    thumbnail: '/api/placeholder/400/300',
    steps: 10,
    scenario: 'Severe Hemorrhage',
    urgency: 'Critical',
    downloadLink: 'https://guides.ClinIQ.ai/bleeding-control.pdf',
    lastUpdated: '2025-05-10',
    views: 9876,
    rating: 4.7,
    featured: true,
    keywords: ['bleeding', 'hemorrhage', 'tourniquet', 'pressure points']
  },
  {
    id: '4',
    title: 'Burn Treatment Basics',
    category: 'Injury Management',
    difficulty: 'Beginner',
    readTime: '7 min',
    description: 'How to assess and treat different types of burns, from minor to severe, and when to seek medical help.',
    thumbnail: '/api/placeholder/400/300',
    steps: 9,
    scenario: 'Burns',
    urgency: 'Medium',
    downloadLink: 'https://guides.ClinIQ.ai/burn-treatment.pdf',
    videoLink: 'https://videos.ClinIQ.ai/burn-care',
    lastUpdated: '2025-05-08',
    views: 8765,
    rating: 4.6,
    keywords: ['burns', 'thermal injury', 'wound care']
  },
  {
    id: '5',
    title: 'Shock Recognition and Treatment',
    category: 'Medical Emergency',
    difficulty: 'Advanced',
    readTime: '10 min',
    description: 'Understanding different types of shock, recognition of symptoms, and appropriate first aid response.',
    thumbnail: '/api/placeholder/400/300',
    steps: 15,
    scenario: 'Shock',
    urgency: 'Critical',
    downloadLink: 'https://guides.ClinIQ.ai/shock-treatment.pdf',
    lastUpdated: '2025-05-05',
    views: 7654,
    rating: 4.8,
    keywords: ['shock', 'hypotension', 'circulation', 'vital signs']
  },
  {
    id: '6',
    title: 'Fracture Stabilization',
    category: 'Trauma Care',
    difficulty: 'Intermediate',
    readTime: '9 min',
    description: 'Proper techniques for immobilizing suspected fractures and preventing further injury during transport.',
    thumbnail: '/api/placeholder/400/300',
    steps: 11,
    scenario: 'Suspected Fracture',
    urgency: 'Medium',
    downloadLink: 'https://guides.ClinIQ.ai/fracture-care.pdf',
    videoLink: 'https://videos.ClinIQ.ai/fracture-immobilization',
    lastUpdated: '2025-05-02',
    views: 6543,
    rating: 4.5,
    keywords: ['fracture', 'immobilization', 'splinting', 'bone injury']
  },
  {
    id: '7',
    title: 'Allergic Reaction Management',
    category: 'Medical Emergency',
    difficulty: 'Beginner',
    readTime: '6 min',
    description: 'Recognizing severe allergic reactions and proper use of epinephrine auto-injectors.',
    thumbnail: '/api/placeholder/400/300',
    steps: 7,
    scenario: 'Anaphylaxis',
    urgency: 'Critical',
    downloadLink: 'https://guides.ClinIQ.ai/allergic-reactions.pdf',
    lastUpdated: '2025-04-28',
    views: 5432,
    rating: 4.7,
    keywords: ['allergy', 'anaphylaxis', 'epinephrine', 'epipen']
  },
];

const CATEGORIES = ['All', 'Cardiac Emergency', 'Respiratory Emergency', 'Trauma Care', 'Injury Management', 'Medical Emergency', 'Environmental Emergency'];
const DIFFICULTY_LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const URGENCY_LEVELS = ['All', 'Low', 'Medium', 'High', 'Critical'];

export default function FirstAidGuides() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('All');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const filteredGuides = useMemo(() => {
    return FIRST_AID_DATA.filter(guide => {
      const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           guide.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || guide.difficulty === selectedDifficulty;
      const matchesUrgency = selectedUrgency === 'All' || guide.urgency === selectedUrgency;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesUrgency;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedUrgency]);

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'from-red-500 to-red-600';
      case 'High': return 'from-orange-500 to-orange-600';
      case 'Medium': return 'from-yellow-500 to-yellow-600';
      case 'Low': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'from-emerald-500 to-green-500';
      case 'Intermediate': return 'from-blue-500 to-indigo-500';
      case 'Advanced': return 'from-purple-500 to-violet-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}} />
        
       
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
        <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-400/60 rounded-full animate-bounce" style={{animationDelay: '3s'}} />
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-cyan-400/60 rounded-full animate-bounce" style={{animationDelay: '5s'}} />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
     
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex justify-center items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm">
            <ShieldCheckIcon className="w-5 h-5 mr-2" />
            <span>Emergency Preparedness</span>
            <div className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 bg-clip-text text-transparent leading-tight">
            First Aid Guides
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            Comprehensive emergency response guides to help you save lives and provide critical care when it matters most
          </p>
          
          
          <div className="flex justify-center items-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">7</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Critical Guides</div>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">50K+</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Lives Saved</div>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">4.7★</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Average Rating</div>
            </div>
          </div>
        </div>

       
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
           
            <div className="relative w-full lg:w-96">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search guides, symptoms, or techniques..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-blue-200/50 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-medium shadow-lg"
              />
            </div>

           
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-blue-100/50 dark:border-slate-700/50">
                <AdjustmentsHorizontalIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category} className="bg-white dark:bg-slate-800">{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-blue-100/50 dark:border-slate-700/50">
                <BoltIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                >
                  {DIFFICULTY_LEVELS.map(level => (
                    <option key={level} value={level} className="bg-white dark:bg-slate-800">{level}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-blue-100/50 dark:border-slate-700/50">
                <ExclamationTriangleIcon className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                <select
                  value={selectedUrgency}
                  onChange={(e) => setSelectedUrgency(e.target.value)}
                  className="bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                >
                  {URGENCY_LEVELS.map(urgency => (
                    <option key={urgency} value={urgency} className="bg-white dark:bg-slate-800">{urgency}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredGuides.map((guide, index) => (
            <div
              key={guide.id}
              className={`group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                guide.featured 
                  ? 'border-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-700 dark:to-indigo-700 ring-2 ring-blue-500/20 dark:ring-blue-400/20' 
                  : 'border-blue-100/50 dark:border-slate-700/50'
              }`}
            >
             
              {guide.featured && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow-lg">
                  <FireIcon className="w-3 h-3" />
                  <span>Essential</span>
                </div>
              )}

             
              <div className="relative overflow-hidden h-56">
                <img
                  src={guide.thumbnail}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
               
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border bg-gradient-to-r ${getUrgencyColor(guide.urgency)} text-white border-white/20 shadow-lg`}>
                    {guide.urgency}
                  </span>
                </div>

               
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <ClockIcon className="w-4 h-4" />
                    <span>{guide.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{guide.rating}</span>
                  </div>
                </div>
              </div>

             
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200/50 dark:border-blue-700/50">
                    {guide.category}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getDifficultyColor(guide.difficulty)} shadow-lg`}>
                    {guide.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                  {guide.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed line-clamp-3">
                  {guide.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                    <BookOpenIcon className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{guide.steps} Steps • {guide.scenario}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
                    <div className="flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4 text-indigo-500" />
                      <span className="font-medium">{guide.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4 text-cyan-500" />
                      <span className="font-medium">Updated {new Date(guide.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="group/btn flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                    <BookOpenIcon className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                    Read Guide
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                  </button>

                  {guide.downloadLink && (
                    <a
                      href={guide.downloadLink}
                      className="group/btn flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4 group-hover/btn:animate-bounce" />
                      <div className="absolute inset-0 bg-white/10 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                    </a>
                  )}

                  {guide.videoLink && (
                    <a
                      href={guide.videoLink}
                      className="group/btn flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                    >
                      <PlayIcon className="w-4 h-4 group-hover/btn:animate-pulse" />
                      <div className="absolute inset-0 bg-white/10 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl rounded-3xl border border-blue-100/50 dark:border-slate-700/50 p-12 md:p-16 shadow-3xl overflow-hidden">
         
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-500 rounded-full" />
              <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-indigo-500 rounded-full" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-blue-400 rounded-full" />
            </div>
            
            <div className="relative z-10 text-center mb-10">
              <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 mb-6 shadow-xl">
                <HeartIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-6 bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Emergency Preparedness
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Stay prepared with the latest first aid updates, emergency protocols, and life-saving techniques
              </p>
            </div>

            <div className="max-w-xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for emergency updates"
                  className="w-full sm:w-96 px-6 py-4 rounded-2xl border border-blue-200/50 dark:                  border-slate-600/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-medium shadow-lg"
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={!email || !email.includes('@')}
                    className={`flex-1 inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                      !email || !email.includes('@') ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <CheckIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Subscribe
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </button>
                </div>
                {isSubscribed && (
                  <div className="mt-4 text-green-600 dark:text-green-400 font-medium animate-fade-in">
                    Successfully subscribed! You'll receive the latest first aid updates.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }