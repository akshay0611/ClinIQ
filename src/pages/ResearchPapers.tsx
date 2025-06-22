import React, { useState, useMemo } from 'react';
import { 
  MagnifyingGlassIcon, 
  ArrowDownTrayIcon, 
  BookOpenIcon, 
  StarIcon, 
  CheckIcon, 
  FireIcon, 
  UserGroupIcon, 
  ClockIcon, 
  AdjustmentsHorizontalIcon 
} from '@heroicons/react/24/outline';

interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  publicationDate: string;
  authors: string[];
  journal: string;
  topic: string;
  downloadLink: string;
  views: number;
  rating: number;
  featured?: boolean;
  keywords: string[];
}

const RESEARCH_PAPERS: ResearchPaper[] = [
    {
        id: '1',
        title: 'Advances in CRISPR-Cas9 for Gene Therapy in Rare Diseases',
        abstract: 'This paper explores the application of CRISPR-Cas9 in treating rare genetic disorders, focusing on delivery mechanisms and clinical trial outcomes.',
        publicationDate: '2025-03-15',
        authors: ['Dr. Krishnan Iyer', 'Dr. Rajesh Menon'],
        journal: 'Nature Biotechnology',
        topic: 'Gene Therapy',
        downloadLink: 'https://research.ClinIQ.ai/crispr-gene-therapy.pdf',
        views: 23450,
        rating: 4.9,
        featured: true,
        keywords: ['CRISPR', 'gene therapy', 'rare diseases', 'genetic engineering']
      },
      {
        id: '2',
        title: 'AI-Driven Diagnostics for Early Cancer Detection',
        abstract: 'A comprehensive review of AI algorithms in medical imaging for early cancer detection, highlighting accuracy and limitations.',
        publicationDate: '2024-11-20',
        authors: ['Dr. Priya Sharma', 'Dr. Aarav Joshi'],
        journal: 'The Lancet Digital Health',
        topic: 'Artificial Intelligence',
        downloadLink: 'https://research.ClinIQ.ai/ai-cancer-diagnostics.pdf',
        views: 18900,
        rating: 4.7,
        keywords: ['AI', 'cancer detection', 'medical imaging', 'diagnostics']
      },
      {
        id: '3',
        title: 'Telemedicine Efficacy in Rural Healthcare Systems',
        abstract: 'An analysis of telemedicines impact on healthcare access in rural areas, with case studies from multiple regions.',
        publicationDate: '2025-01-10',
        authors: ['Dr. Suresh Nair', 'Dr. Meera Kulkarni'],
        journal: 'Journal of Telemedicine and Telecare',
        topic: 'Telemedicine',
        downloadLink: 'https://research.ClinIQ.ai/telemedicine-rural.pdf',
        views: 15670,
        rating: 4.6,
        featured: true,
        keywords: ['telemedicine', 'rural healthcare', 'access', 'digital health']
      },
      {
        id: '4',
        title: 'Nanotechnology in Targeted Drug Delivery',
        abstract: 'This study examines the role of nanotechnology in improving drug delivery precision for cancer treatment.',
        publicationDate: '2024-09-05',
        authors: ['Dr. Kavita Deshmukh', 'Dr. Nikhil Verma'],
        journal: 'ACS Nano',
        topic: 'Nanotechnology',
        downloadLink: 'https://research.ClinIQ.ai/nanotech-drug-delivery.pdf',
        views: 13240,
        rating: 4.8,
        keywords: ['nanotechnology', 'drug delivery', 'cancer treatment', 'precision medicine']
      },
      {
        id: '5',
        title: 'Mental Health Outcomes in Post-Pandemic Healthcare Workers',
        abstract: 'A longitudinal study on the mental health challenges faced by healthcare workers post-COVID-19, with intervention recommendations.',
        publicationDate: '2025-02-28',
        authors: ['Dr. Sneha Reddy', 'Dr. Aman Banerjee'],
        journal: 'JAMA Psychiatry',
        topic: 'Mental Health',
        downloadLink: 'https://research.ClinIQ.ai/mental-health-postpandemic.pdf',
        views: 10980,
        rating: 4.5,
        keywords: ['mental health', 'healthcare workers', 'post-COVID', 'interventions']
      }      
];

const TOPICS = ['All', 'Gene Therapy', 'Artificial Intelligence', 'Telemedicine', 'Nanotechnology', 'Mental Health'];
const YEARS = ['All', '2025', '2024', '2023'];
const JOURNALS = ['All', 'Nature Biotechnology', 'The Lancet Digital Health', 'Journal of Telemedicine and Telecare', 'ACS Nano', 'JAMA Psychiatry'];

export default function ResearchPapers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedJournal, setSelectedJournal] = useState('All');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const filteredPapers = useMemo(() => {
    return RESEARCH_PAPERS.filter(paper => {
      const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           paper.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTopic = selectedTopic === 'All' || paper.topic === selectedTopic;
      const matchesYear = selectedYear === 'All' || paper.publicationDate.startsWith(selectedYear);
      const matchesJournal = selectedJournal === 'All' || paper.journal === selectedJournal;
      
      return matchesSearch && matchesTopic && matchesYear && matchesJournal;
    });
  }, [searchTerm, selectedTopic, selectedYear, selectedJournal]);

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
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
            <BookOpenIcon className="w-5 h-5 mr-2" />
            <span>Medical Research</span>
            <div className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 bg-clip-text text-transparent leading-tight">
            Research Papers
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            Explore cutting-edge medical and healthcare research to stay informed on the latest advancements
          </p>
          
          <div className="flex justify-center items-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">5</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Featured Papers</div>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">80K+</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Views</div>
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
                placeholder="Search papers, topics, or keywords..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-blue-200/50 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-medium shadow-lg"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-blue-100/50 dark:border-slate-700/50">
                <AdjustmentsHorizontalIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                >
                  {TOPICS.map(topic => (
                    <option key={topic} value={topic} className="bg-white dark:bg-slate-800">{topic}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-blue-100/50 dark:border-slate-700/50">
                <ClockIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                >
                  {YEARS.map(year => (
                    <option key={year} value={year} className="bg-white dark:bg-slate-800">{year}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-blue-100/50 dark:border-slate-700/50">
                <BookOpenIcon className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                <select
                  value={selectedJournal}
                  onChange={(e) => setSelectedJournal(e.target.value)}
                  className="bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                >
                  {JOURNALS.map(journal => (
                    <option key={journal} value={journal} className="bg-white dark:bg-slate-800">{journal}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className={`group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                paper.featured 
                  ? 'border-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-700 dark:to-indigo-700 ring-2 ring-blue-500/20 dark:ring-blue-400/20' 
                  : 'border-blue-100/50 dark:border-slate-700/50'
              }`}
            >
              {paper.featured && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow-lg">
                  <FireIcon className="w-3 h-3" />
                  <span>Featured</span>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200/50 dark:border-blue-700/50">
                    {paper.topic}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 text-cyan-700 dark:text-cyan-300 text-xs font-bold border border-cyan-200/50 dark:border-cyan-700/50">
                    {paper.journal}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                  {paper.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed line-clamp-3">
                  {paper.abstract}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                    <UserGroupIcon className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">By {paper.authors.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4 text-indigo-500" />
                      <span className="font-medium">Published {new Date(paper.publicationDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{paper.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4 text-cyan-500" />
                      <span className="font-medium">{paper.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={paper.downloadLink}
                    className="group/btn flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                    Download PDF
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                  </a>
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
                <BookOpenIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-6 bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Stay Informed
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Subscribe for the latest medical research updates and new publications
              </p>
            </div>

            <div className="max-w-xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for research updates"
                  className="w-full sm:w-96 px-6 py-4 rounded-2xl border border-blue-200/50 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-medium shadow-lg"
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
                  Successfully subscribed! You'll receive the latest research updates.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}