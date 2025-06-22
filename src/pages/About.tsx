import React from 'react';
import { motion } from 'framer-motion';
import { 
  LightBulbIcon, 
  LockClosedIcon, 
  HandRaisedIcon, 
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { 
  Trophy,
  Award,
  Heart,
  Users,
  ArrowUpRight,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';

const coreValues = [
  { 
    icon: <LightBulbIcon className="w-10 h-10 text-blue-500" />, 
    title: 'Innovation', 
    desc: 'We mbrace new ideas and technologies to drive healthcare forward.' 
  },
  { 
    icon: <LockClosedIcon className="w-10 h-10 text-primary-500" />, 
    title: 'Privacy First', 
    desc: 'Protecting user data and confidentiality is our highest priority.' 
  },
  { 
    icon: <HandRaisedIcon className="w-10 h-10 text-green-500" />, 
    title: 'Accessibility', 
    desc: 'Making quality healthcare information available for everyone, everywhere.' 
  },
  { 
    icon: <MagnifyingGlassIcon className="w-10 h-10 text-amber-500" />, 
    title: 'Accuracy', 
    desc: 'We strive for medical precision in every insight and recommendation.' 
  },
];

const team = [
  {
    name: 'Akshay Kumar',
    role: 'Frontend, UI/UX Developer',
    img: '/akshay.jpg',
    bio: 'Specializes in creating intuitive user interfaces and responsive designs that enhance user experience. Skilled in modern frontend frameworks and design systems.',
    linkedin: 'https://www.linkedin.com/in/akshaykumar0611/',
    github: 'https://github.com/akshay0611'
  },
  {
    name: 'Jishnu Chauhan',
    role: 'Backend, Database Developer',
    img: '/jishnu1.jpg',
    bio: 'Focused on building secure, efficient backend systems and optimizing database performance. Experienced in developing scalable APIs and handling server-side logic.',
    linkedin: 'https://www.linkedin.com/in/jishnu-chauhan-87624b36a',
    github: 'http://github.com/jishnukeyhack'
  },
  {
    name: 'Raunak Jain',
    role: 'Project Management',
    img: '/raunak.jpeg',
    bio: 'Drives project execution through effective planning, coordination, and leadership. Ensures timely delivery while aligning team efforts with business goals.',
    linkedin: 'https://www.linkedin.com/in/raunak-jain-ba2a4920a',
    github: 'https://github.com/raunak-jain-02'
  },
  {
    name: 'Himanshu Maurya',
    role: 'Research Management',
    img: '/himanshu.jpeg',
    bio: 'Leads innovation through in-depth research and trend analysis. Bridges the gap between emerging technologies and practical implementation.',
    linkedin: 'https://www.linkedin.com/in/kumarhk2006',
    github: 'https://github.com/himanshukum0r'
  }
];

const milestones = [
  {
    year: 'Jun 2025',
    title: 'The Problem Identified',
    description: 'Recognized the critical gap in accessible healthcare diagnostics and AI-powered medical assistance for underserved communities.',
    icon: <LightBulbIcon className="w-6 h-6" />,
    status: 'completed'
  },
  {
    year: 'Jun 2025',
    title: 'Team Formation',
    description: 'Assembled a diverse team of developers, designers, and healthcare enthusiasts passionate about democratizing healthcare.',
    icon: <Users className="w-6 h-6" />,
    status: 'completed'
  },
  {
    year: 'Jun 2025',
    title: 'MVP Development',
    description: 'Built our core AI diagnostic assistant with symptom analysis, drug interaction checker, and multilingual support.',
    icon: <Trophy className="w-6 h-6" />,
    status: 'completed'
  }
];

const stats = [
  { value: '500k+', label: 'Active Users', icon: <Users className="w-6 h-6 text-blue-400" /> },
  { value: '12M+', label: 'Health Queries Answered', icon: <Heart className="w-6 h-6 text-red-400" /> },
  { value: '97%', label: 'User Satisfaction', icon: <Award className="w-6 h-6 text-amber-400" /> },
  { value: '24/7', label: 'AI Support', icon: <Clock className="w-6 h-6 text-green-400" /> },
];

export default function About() {
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
          className="text-center mb-16 md:mb-24"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <span>About ClinIQ</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Transforming Healthcare <br className="hidden sm:block" />Through Intelligence
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our mission is to make healthcare more accessible, understandable, and personalized 
            through the power of artificial intelligence and human expertise.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.a 
              href="#our-story" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center"
            >
              Our Story
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </motion.a>
            
            <motion.a 
              href="#team" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-lg bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-300 font-medium border border-blue-100 dark:border-neutral-700 shadow-lg shadow-blue-100/20 dark:shadow-neutral-900/30"
            >
              Meet Our Team
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex flex-col items-center bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-6 shadow-xl shadow-blue-900/5 dark:shadow-neutral-900/30"
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-blue-50 dark:bg-blue-900/50 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          id="our-story"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          className="mb-24 scroll-mt-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-3">
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">The ClinIQ Story</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From a simple idea to a healthcare platform used by thousands — our journey of making healthcare more accessible.
            </p>
          </div>
          
<div className="relative">
  {/* Timeline Line */}
  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-100 via-indigo-100 to-green-100 dark:from-blue-800 dark:via-indigo-800 dark:to-green-800 rounded-full z-0"></div>

  <div className="space-y-16">
    {milestones.map((milestone, i) => (
      <motion.div
        key={milestone.year}
        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="relative z-10"
      >
        <div className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
          
          {/* Dot */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-full h-12 w-12 bg-white dark:bg-neutral-800 border-4 border-blue-100 dark:border-blue-800 shadow-md flex items-center justify-center z-10"
            >
              {milestone.icon}
            </motion.div>
          </div>

          {/* Content */}
          <div className={`w-full md:w-1/2 px-6 mt-16 md:mt-0 ${i % 2 === 0 ? 'md:pl-12 md:pr-0 text-left' : 'md:pr-12 md:pl-0 text-right'} text-center md:text-inherit`}>
            <motion.div
              whileHover={{ scale: 1.03, x: i % 2 === 0 ? -5 : 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`bg-white dark:bg-neutral-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-blue-50 dark:border-neutral-700/80 inline-block`}
            >
              <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-2">
                {milestone.year}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
            </motion.div>
          </div>

          {/* Empty Side for Desktop Alignment */}
          <div className="hidden md:block w-1/2"></div>
        </div>
      </motion.div>
    ))}
  </div>
</div>

      </motion.div>


        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <div className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-3">
              Our Foundation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Core Values</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do, from product development to user interaction.
            </p>
          </div>
          
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {coreValues.map((val, i) => (
              <motion.div 
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl p-8 border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-neutral-900/30 flex flex-col items-center text-center transition-all duration-300"
              >
                <div className="mb-6 p-3 rounded-full bg-blue-50 dark:bg-blue-900/50">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{val.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{val.desc}</p>
              </motion.div>
            ))}
          </div> */}
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
  {coreValues.map((val, i) => (
    <motion.div
      key={val.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative group overflow-visible"
    >
      {/* Glowing Background (visible on hover only) */}
      <div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-300 via-indigo-300 to-green-300 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 pointer-events-none z-0 dark:from-blue-600 dark:via-indigo-600 dark:to-green-600"
        aria-hidden="true"
      ></div>

      {/* Card Content */}
      <div className="relative bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl p-6 border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-neutral-900/30 flex flex-col items-center text-center transition-all duration-300 z-10 h-60 w-full max-w-xs">
        <div className="mb-4 p-3 rounded-full bg-blue-50 dark:bg-blue-900/50">
          {val.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{val.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{val.desc}</p>
      </div>
    </motion.div>
  ))}
</div>

        </motion.div>
        
        <motion.div 
          id="team"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-24 scroll-mt-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-3">
              The Experts
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate individuals combining expertise in healthcare, technology, and design.
            </p>
          </div>
          
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
  {team.map((member, i) => (
    <motion.div 
      key={member.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl shadow-blue-900/5 dark:shadow-neutral-900/30 border border-blue-50 dark:border-neutral-700/80 group"
    >
      <div className="flex items-center justify-center mt-8 mb-2">
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-800 shadow">
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{member.name}</h3>
        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-3">{member.role}</p>
        <div className="flex gap-3 mb-3">
          <motion.a 
            href={member.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.76-1.76 0-.97.78-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.37-1.56 2.83-1.56 3.03 0 3.59 2 3.59 4.59v5.61z"/>
            </svg>
            <span className="sr-only">LinkedIn profile of {member.name}</span>
          </motion.a>
          <motion.a 
            href={member.github} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-900 dark:text-gray-200 hover:text-black dark:hover:text-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.438 9.799 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.625-5.475 5.921.43.369.823 1.096.823 2.21v3.285c0 .319.192.694.801.576 4.765-1.59 8.199-6.088 8.199-11.386 0-6.63-5.37-12-12-12z"/>
            </svg>
            <span className="sr-only">GitHub profile of {member.name}</span>
          </motion.a>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
      </div>
    </motion.div>
  ))}
</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-8 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h2>
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.03, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center gap-5 group"
              >
                <div className="flex-shrink-0 p-3 rounded-full bg-blue-50 dark:bg-blue-900/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition-colors duration-200">
                  <MapPin className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Location</p>
                  <p className="text-gray-600 dark:text-gray-300">Bangalore, Karnataka</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center gap-5 group"
              >
                <div className="flex-shrink-0 p-3 rounded-full bg-green-50 dark:bg-green-900/50 group-hover:bg-green-100 dark:group-hover:bg-green-800/50 transition-colors duration-200">
                  <Users className="w-6 h-6 text-green-500 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Team Size</p>
                  <p className="text-gray-600 dark:text-gray-300">35+ Healthcare & AI Specialists</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center gap-5 group"
              >
                <div className="flex-shrink-0 p-3 rounded-full bg-pink-50 dark:bg-pink-900/50 group-hover:bg-pink-100 dark:group-hover:bg-pink-800/50 transition-colors duration-200">
                  <Clock className="w-6 h-6 text-pink-500 dark:text-pink-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Founded</p>
                  <p className="text-gray-600 dark:text-gray-300">Established in 2025</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-neutral-700/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Get In Touch</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Have questions or want to learn more about ClinIQ?</p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Contact Us
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 p-1">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Join the Healthcare Revolution
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                  Experience personalized, accessible, and accurate healthcare insights with ClinIQ. 
                  Sign up today and be part of our mission to transform healthcare for everyone.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center justify-center"
                  >
                    Get Started
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="/learn-more"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 rounded-lg bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-300 font-medium border border-blue-100 dark:border-neutral-700 shadow-lg shadow-blue-100/20 dark:shadow-neutral-900/30"
                  >
                    Learn More
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}