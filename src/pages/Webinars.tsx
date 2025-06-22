import React, { useState, useMemo, useEffect } from 'react';
import { PlayCircle, Calendar, Filter } from 'lucide-react';
import { CalendarDaysIcon, ClockIcon, UserGroupIcon, PlayCircleIcon, AcademicCapIcon, StarIcon, TrophyIcon, VideoCameraIcon, BellIcon, CheckIcon } from '@heroicons/react/24/outline';
import { supabase } from '../services/supabaseClient';

interface Webinar {
  id: string;
  title: string;
  speakers: string[];
  date: string;
  time: string;
  duration: string;
  description: string;
  topic: string;
  type: 'upcoming' | 'past';
  registration_link?: string;
  recording_link?: string;
  thumbnail: string;
  attendees?: number;
  rating?: number;
  featured?: boolean;
}

const TOPICS = ['All', 'AI & Diagnostics', 'Telemedicine', 'Digital Health', 'Research & Development'];

export default function Webinars() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebinars = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('webinars')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        setError('Failed to fetch webinars');
        console.error(error);
      } else {
        setWebinars(data);
      }
      setLoading(false);
    };

    fetchWebinars();
  }, []);

  const filteredWebinars = useMemo(() => {
    return webinars.filter(webinar => {
      const matchesType = webinar.type === activeTab;
      const matchesTopic = selectedTopic === 'All' || webinar.topic === selectedTopic;
      return matchesType && matchesTopic;
    });
  }, [activeTab, selectedTopic, webinars]);

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  if (loading) {
    return <div className="text-center py-16">Loading webinars...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">{error}</div>;
  }

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
            <VideoCameraIcon className="w-5 h-5 mr-2" />
            <span>Educational Webinars</span>
            <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 bg-clip-text text-transparent leading-tight">
            Medical Webinars
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            Join leading healthcare professionals and experts in cutting-edge medical technology discussions
          </p>
          
          <div className="flex justify-center items-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">25+</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Expert Speakers</div>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">10K+</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Participants</div>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">4.8★</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Average Rating</div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="flex bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-1.5 shadow-2xl border border-blue-100/50 dark:border-slate-700/50">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 transform scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <Calendar className="w-5 h-5 inline mr-2" />
                Upcoming
                {activeTab === 'upcoming' && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                  activeTab === 'past'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 transform scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <PlayCircle className="w-5 h-5 inline mr-2" />
                Past Recordings
                {activeTab === 'past' && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-xl border border-blue-100/50 dark:border-slate-700/50">
              <Filter className="w-5 h-5 text-blue-500 dark:text-blue-400" />
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredWebinars.map((webinar, index) => (
            <div
              key={webinar.id}
              className={`group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                webinar.featured 
                  ? 'border-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-700 dark:to-indigo-700 ring-2 ring-blue-500/20 dark:ring-blue-400/20' 
                  : 'border-blue-100/50 dark:border-slate-700/50'
              }`}
            >
              {webinar.featured && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow-lg">
                  <TrophyIcon className="w-3 h-3" />
                  <span>Featured</span>
                </div>
              )}

              <div className="relative overflow-hidden h-56">
                <img
                  src={webinar.thumbnail}
                  alt={webinar.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border ${
                    webinar.type === 'upcoming' 
                      ? 'bg-emerald-500/90 text-white border-emerald-400/50 shadow-lg shadow-emerald-500/30' 
                      : 'bg-blue-500/90 text-white border-blue-400/50 shadow-lg shadow-blue-500/30'
                  }`}>
                    {webinar.type === 'upcoming' ? 'Upcoming' : 'Recording'}
                  </span>
                </div>
                
                {webinar.type === 'past' && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    {webinar.attendees && (
                      <div className="flex items-center gap-1 text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{webinar.attendees.toLocaleString()}</span>
                      </div>
                    )}
                    {webinar.rating && (
                      <div className="flex items-center gap-1 text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{webinar.rating}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200/50 dark:border-blue-700/50">
                    {webinar.topic}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                  {webinar.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed line-clamp-3">
                  {webinar.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                    <AcademicCapIcon className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{webinar.speakers.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
                    <div className="flex items-center gap-1">
                      <CalendarDaysIcon className="w-4 h-4 text-indigo-500" />
                      <span className="font-medium">{new Date(webinar.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4 text-cyan-500" />
                      <span className="font-medium">{webinar.time} • {webinar.duration}</span>
                    </div>
                  </div>
                </div>

                {webinar.type === 'upcoming' ? (
                  <a
                    href={webinar.registration_link}
                    className="group/btn w-full inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                  >
                    <CalendarDaysIcon className="w-5 h-5 mr-2 group-hover/btn:animate-bounce" />
                    Register Now
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                  </a>
                ) : (
                  <a
                    href={webinar.recording_link}
                    className="group/btn w-full inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                  >
                    <PlayCircleIcon className="w-5 h-5 mr-2 group-hover/btn:animate-pulse" />
                    Watch Recording
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                  </a>
                )}
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
                <BellIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-6 bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Stay Updated
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Subscribe to receive notifications about upcoming webinars and exclusive medical content
              </p>
            </div>

            <div className="max-w-xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full sm:w-96 px-6 py-4 rounded-2xl border border-blue-200/50 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg font-medium shadow-lg"
                />
                <button
                  onClick={handleSubscribe}
                  className="w-full sm:w-auto group px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden"
                  disabled={isSubscribed || !email}
                >
                  {isSubscribed ? (
                    <>
                      <CheckIcon className="w-6 h-6 mr-2 animate-bounce" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <BellIcon className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                      Subscribe
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {isSubscribed && (
              <div className="mt-6 text-center text-emerald-600 dark:text-emerald-400 font-bold text-lg animate-pulse">
                🎉 Thank you for subscribing! You'll receive updates about future webinars.
              </div>
            )}
          </div>
        </div>

        <div className="relative pointer-events-none">
          <div className="absolute top-20 left-10 opacity-20 animate-float">
            <VideoCameraIcon className="w-20 h-20 text-blue-400 dark:text-blue-600" />
          </div>
          <div className="absolute bottom-20 right-10 opacity-20 rotate-12 animate-float" style={{animationDelay: '2s'}}>
            <AcademicCapIcon className="w-24 h-24 text-indigo-400 dark:text-indigo-600" />
          </div>
          <div className="absolute top-1/2 left-20 opacity-20 animate-float" style={{animationDelay: '4s'}}>
            <StarIcon className="w-16 h-16 text-cyan-400 dark:text-cyan-600" />
          </div>
        </div>
      </div>
    </div>
  );
}