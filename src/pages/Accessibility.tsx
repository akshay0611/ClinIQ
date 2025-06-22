import React from 'react';
import { motion } from 'framer-motion';
import {DocumentTextIcon, GlobeAltIcon, UserGroupIcon } from '@heroicons/react/24/outline'; // Added UserGroupIcon for visual diversity

export default function Accessibility() {
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

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
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <UserGroupIcon className="w-4 h-4 mr-2" />
            <span>Accessibility Statement</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Accessibility
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            ClinIQ's commitment to making our services accessible to everyone in India.
          </p>
        </motion.div>

       
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-8 md:p-10 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30">
            
           
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between mb-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50"
            >
              <div className="flex items-center">
                <DocumentTextIcon className="w-6 h-6 text-blue-500 mr-3" />
                <span className="text-blue-700 dark:text-blue-300 font-medium">Last Updated:</span>
              </div>
              <span className="text-blue-700 dark:text-blue-300 font-medium">June 10, 2025</span>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <GlobeAltIcon className="w-6 h-6 text-blue-500 mr-3" />
                Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                ClinIQ Health Technologies Pvt. Ltd. ("we", "our", or "us") is dedicated to ensuring that our website, mobile applications, and related services (collectively, our "Services") are accessible to all users in India, including those with disabilities. We strive to comply with internationally recognized standards such as the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, and applicable Indian accessibility standards and laws.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                This Accessibility Statement outlines our ongoing efforts to enhance accessibility and provide an inclusive digital experience for all our users.
              </p>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Commitment to Accessibility
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We are committed to making our Services accessible by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li>Integrating accessibility into our design and development processes from the outset.</li>
                <li>Regularly testing and reviewing our Services for accessibility compliance.</li>
                <li>Providing training to our team members on accessibility principles and best practices.</li>
                <li>Actively seeking and incorporating feedback from users, including those with disabilities, to improve accessibility.</li>
                <li>Collaborating with accessibility experts and organizations to continuously enhance our Services.</li>
              </ul>
            </motion.div>

            
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Accessibility Features
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our Services incorporate various accessibility features to ensure an inclusive experience, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li><span className="font-semibold">Keyboard Navigation:</span> Ensuring all interactive elements and content can be accessed and operated using a keyboard.</li>
                <li><span className="font-semibold">Screen Reader Support:</span> Aiming for compatibility with popular screen readers (e.g., JAWS, NVDA, VoiceOver) to assist users with visual impairments.</li>
                <li><span className="font-semibold">Text Alternatives:</span> Providing alternative text for non-text content like images and descriptive labels for form inputs and controls.</li>
                <li><span className="font-semibold">Visual Design:</span> Using sufficient color contrast, offering resizable text options, and ensuring layouts are responsive and adaptable.</li>
                <li><span className="font-semibold">Understandable Content:</span> Striving for clear and simple language, and providing clear instructions and feedback.</li>
                <li><span className="font-semibold">Consistent Navigation:</span> Maintaining predictable and logical navigation patterns across our Services.</li>
              </ul>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Compliance Efforts
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We aim to align our Services with the following standards and guidelines:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.</li>
                <li>The Rights of Persons with Disabilities Act, 2016 (RPWD Act), which mandates accessibility for persons with disabilities in India, including in information and communication technology.</li>
                <li>Guidelines for Indian Government Websites (GIGW) as a reference for best practices in digital accessibility in India, where applicable.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300">
                We conduct regular accessibility audits and assessments using a combination of automated tools and manual testing by individuals knowledgeable in accessibility to identify and address potential barriers.
              </p>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Feedback and Support
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your feedback is crucial in helping us improve the accessibility of our Services. If you encounter any accessibility barriers, have suggestions, or require assistance, please contact us.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When reporting an accessibility issue, please provide:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li>A clear description of the issue encountered.</li>
                <li>The specific URL or section of our Services where the issue occurred.</li>
                <li>The type of assistive technology you were using (if any, e.g., screen reader, browser version).</li>
                <li>Your contact information (optional, but helpful for follow-up).</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300">
                We aim to acknowledge and respond to accessibility-related feedback and inquiries in a timely manner.
              </p>
            </motion.div>

            
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Third-Party Content
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our Services may include links to or integrations with third-party websites, applications, or content that are not under our direct control. While we encourage third-party providers to make their content accessible, we cannot guarantee the accessibility of such third-party content. We advise users to review the accessibility statements of these third parties.
              </p>
            </motion.div>

            
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ongoing Improvements
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Digital accessibility is an ongoing commitment and a continuous journey. We are dedicated to regularly reviewing and enhancing the usability and accessibility of our Services by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li>Keeping abreast of evolving accessibility standards and guidelines.</li>
                <li>Incorporating user feedback and technological advancements into our accessibility roadmap.</li>
                <li>Periodically reviewing and updating our internal accessibility policies and practices.</li>
                <li>Continuing to invest in accessibility training and awareness for our team.</li>
              </ul>
            </motion.div>

           
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have questions, feedback, or need assistance regarding the accessibility of our Services, please reach out to us:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50">
                <p className="text-gray-800 dark:text-gray-200 font-medium">Accessibility Team, ClinIQ Health Technologies Pvt. Ltd.</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Email: teamcodexsupport@gmail.com (Please include "Accessibility" in the subject line)</p>
                <p className="text-gray-600 dark:text-gray-300">Phone: +91 9876543210</p>
                <p className="text-gray-600 dark:text-gray-300">Address: 123 Health Avenue, Medical District, Bangalore, Karnataka 560001, India</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        
        <div className="relative pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
           {/* Optional: Add a subtle decorative icon here if desired */}
           {/* <UserGroupIcon className="w-16 h-16 text-blue-300 dark:text-blue-700 absolute top-10 left-10 animate-pulse opacity-30" /> */}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <GlobeAltIcon className="w-20 h-20 text-blue-300 dark:text-indigo-700 absolute bottom-10 right-10 rotate-12 opacity-30" />
          </motion.div>
        </div>
        </div>
      </div>
  );
}