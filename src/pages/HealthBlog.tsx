import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  BookOpenIcon, 
  ClockIcon, 
  AdjustmentsHorizontalIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  publicationDate: string;
  category: string;
  thumbnail: string;
  readLink: string;
  keywords: string[];
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Daily Habits to Boost Your Immune System',
    description: 'Discover simple lifestyle changes to strengthen your immune system, including diet tips and stress management techniques.',
    publicationDate: '2025-05-21',
    category: 'Wellness',
    thumbnail: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71',
    readLink: '/health-blog/1',
    keywords: ['immune system', 'wellness', 'health habits', 'nutrition'],
    content: `
      <h2>Introduction</h2>
      <p>Maintaining a strong immune system is crucial for overall health. This article explores five daily habits to boost immunity...</p>
      <h2>1. Balanced Diet</h2>
      <p>Include nutrient-rich foods like fruits, vegetables, and whole grains...</p>
      <h2>2. Regular Exercise</h2>
      <p>Engage in moderate exercise to enhance immune function...</p>
    `
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Home Workouts for Beginners',
    description: 'Learn effective home workout routines to stay fit without a gym, complete with beginner-friendly exercises.',
    publicationDate: '2025-05-21',
    category: 'Fitness',
    thumbnail: 'https://images.unsplash.com/photo-1605296866985-34ba4b4f5c90',
    readLink: '/health-blog/2',
    keywords: ['fitness', 'home workouts', 'exercise', 'beginner'],
    content: `
      <h2>Getting Started</h2>
      <p>Home workouts are a great way to stay fit without expensive equipment...</p>
      <h2>Workout Plan</h2>
      <p>Try these beginner-friendly exercises...</p>
    `
  },
  {
    id: '3',
    title: 'Understanding Diabetes: Prevention and Management',
    description: 'A comprehensive overview of diabetes types, risk factors, and practical steps for prevention and management.',
    publicationDate: '2025-05-21',
    category: 'Medical Awareness',
    thumbnail: 'https://images.unsplash.com/photo-1581599546143-3eb3bad17059',
    readLink: '/health-blog/3',
    keywords: ['diabetes', 'medical awareness', 'prevention', 'health'],
    content: `
      <h2>What is Diabetes?</h2>
      <p>Diabetes is a chronic condition affecting blood sugar levels...</p>
      <h2>Prevention Tips</h2>
      <p>Maintain a healthy diet and regular exercise...</p>
    `
  },
  {
    id: '4',
    title: 'Mindfulness Practices for Stress Reduction',
    description: 'Explore mindfulness techniques to reduce stress and improve mental well-being in your daily life.',
    publicationDate: '2025-05-21',
    category: 'Wellness',
    thumbnail: 'https://images.unsplash.com/photo-1518602164570-4f1733dd02aa',
    readLink: '/health-blog/4',
    keywords: ['mindfulness', 'stress reduction', 'wellness', 'mental health'],
    content: `
      <h2>Introduction to Mindfulness</h2>
      <p>Mindfulness involves staying present in the moment...</p>
      <h2>Techniques</h2>
      <p>Practice meditation and deep breathing...</p>
    `
  },
  {
    id: '5',
    title: 'Top 10 Superfoods for Heart Health',
    description: 'Find out which superfoods can support cardiovascular health and how to incorporate them into your diet.',
    publicationDate: '2025-05-21',
    category: 'Nutrition',
    thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
    readLink: '/health-blog/5',
    keywords: ['superfoods', 'heart health', 'nutrition', 'diet'],
    content: `
      <h2>Why Heart Health Matters</h2>
      <p>A healthy heart is key to overall well-being...</p>
      <h2>Top Superfoods</h2>
      <p>Include berries, nuts, and leafy greens...</p>
    `
  }
];

const CATEGORIES = ['All', 'Wellness', 'Fitness', 'Nutrition', 'Medical Awareness'];

const HealthBlog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }} />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex justify-center items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm">
            <BookOpenIcon className="w-5 h-5 mr-2" />
            <span>Health Blog</span>
            <div className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 bg-clip-text text-transparent leading-tight">
            Health & Wellness Blog
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-light">
            Discover expert tips on health, fitness, nutrition, and medical awareness to live your best life
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative w-full lg:w-96">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                placeholder="Search blog posts, topics, or keywords..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-blue-200/50 dark:border-neutral-600/50 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-medium shadow-lg"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl border border-blue-100/50 dark:border-neutral-700/50">
                <AdjustmentsHorizontalIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <select
                  value={selectedCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border-none outline-none text-neutral-700 dark:text-neutral-200 font-medium cursor-pointer"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category} className="bg-white dark:bg-neutral-800">{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post: BlogPost) => (
            <div
              key={post.id}
              className="group relative bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xl rounded-3xl border border-blue-100/50 dark:border-neutral-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                  {post.title}
                </h3>

                <div className="mb-3">
                  <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200/50 dark:border-blue-700/50">
                    {post.category}
                  </span>
                </div>

                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm mb-6">
                  <ClockIcon className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">Published {new Date(post.publicationDate).toLocaleDateString()}</span>
                </div>

                <Link
                  to={post.readLink}
                  className="group/btn inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                >
                  <ArrowRightIcon className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                  Read More
                  <div className="absolute inset-0 bg-white/10 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthBlog;