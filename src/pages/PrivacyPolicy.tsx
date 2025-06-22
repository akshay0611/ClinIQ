import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function PrivacyPolicy() {
  
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
            <ShieldCheckIcon className="w-4 h-4 mr-2" />
            <span>Privacy & Data Protection</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            How ClinIQ protects your data and respects your privacy in compliance with Indian regulations.
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
                <LockClosedIcon className="w-6 h-6 text-blue-500 mr-3" />
                Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                ClinIQ ("we", "our", or "us"), operated by ClinIQ Health Technologies Pvt. Ltd., is committed to protecting your privacy. This Privacy Policy explains how your personal information, including sensitive personal data, is collected, used, and disclosed by ClinIQ in compliance with applicable Indian laws. This Privacy Policy applies to our website, mobile applications, and related services (collectively, our "Services").
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                By accessing or using our Services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and consent to the same.
              </p>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We collect several different types of information for various purposes to provide and improve our Services to you:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">Personal Information and Sensitive Personal Data</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                While using our Services, we may ask you to provide us with certain personally identifiable information ("Personal Information") and, where necessary for healthcare services, sensitive personal data or information ("SPDI") as defined under Indian law. This may include, but is not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Date of birth</li>
                <li>Address and location information</li>
                <li>Medical history and health information (considered SPDI)</li>
                <li>Insurance information (if applicable)</li>
                <li>Other information you voluntarily provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">Usage Data</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may also collect information on how the Services are accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address, browser type, browser version, the pages of our Services that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
              </p>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use the collected data for various purposes, based on your consent and as permitted by law:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li>To provide and maintain our Services, including facilitating medical consultations</li>
                <li>To notify you about changes to our Services</li>
                <li>To provide customer support and respond to your queries</li>
                <li>To gather analysis or valuable information so that we can improve our Services</li>
                <li>To monitor the usage of our Services</li>
                <li>To detect, prevent and address technical issues and security incidents</li>
                <li>To process and manage appointments</li>
                <li>To provide personalized health insights and recommendations (where you opt-in)</li>
                <li>To comply with legal obligations and regulatory requirements in India</li>
              </ul>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Data Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The security of your data is important to us. We strive to use commercially acceptable and legally mandated means to protect your Personal Information and SPDI. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We implement a variety of security measures to maintain the safety of your personal information, in line with industry best practices and legal requirements in India:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li>All sensitive information (such as health data) is transmitted via Secure Socket Layer (SSL) technology or other strong encryption methods.</li>
                <li>All personal data is stored in secure, and where appropriate, encrypted databases.</li>
                <li>Access to personal information is restricted to authorized personnel on a need-to-know basis.</li>
                <li>We conduct regular security reviews and assessments.</li>
                <li>We strive to be compliant with applicable Indian data protection laws, including the Information Technology Act, 2000, and its rules (such as the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011 – "SPDI Rules"), and the Digital Personal Data Protection Act, 2023 ("DPDP Act").</li>
              </ul>
            </motion.div>

            
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Sharing Your Personal Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may share your personal information in the following situations, consistent with your consent and applicable law:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li><span className="font-semibold">With Healthcare Providers:</span> To facilitate appointments, consultations, and medical services you request.</li>
                <li><span className="font-semibold">With Service Providers:</span> We may employ third-party companies and individuals to facilitate our Services, provide Services on our behalf, or assist us in analyzing how our Services are used. These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</li>
                <li><span className="font-semibold">For Business Transfers:</span> In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                <li><span className="font-semibold">With Your Consent:</span> We may disclose your personal information for any other purpose with your explicit consent.</li>
                <li><span className="font-semibold">For Legal Requirements:</span> We may disclose your Personal Information where required by law, or if we believe in good faith that such action is necessary to comply with a legal obligation, protect and defend our rights or property, prevent or investigate possible wrongdoing in connection with the Service, protect the personal safety of users of the Service or the public, or protect against legal liability.</li>
              </ul>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Data Protection Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Under applicable Indian law, including the Digital Personal Data Protection Act, 2023, you have certain rights regarding your personal information. These may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li><span className="font-semibold">The right to access</span> – You have the right to obtain confirmation and access to your personal data that we process, and other supporting information.</li>
                <li><span className="font-semibold">The right to correction and erasure</span> – You have the right to request correction of inaccurate or misleading personal data, completion of incomplete data, updating of data, and erasure of personal data that is no longer necessary for the purpose it was collected or is otherwise not required to be retained by law.</li>
                <li><span className="font-semibold">The right to withdraw consent</span> – Where the processing of your personal data is based on your consent, you have the right to withdraw your consent at any time. The withdrawal of consent will not affect the lawfulness of processing based on consent before its withdrawal.</li>
                <li><span className="font-semibold">The right to grievance redressal</span> – You have the right to an easily accessible means of registering a grievance with us regarding our data processing activities or any alleged non-compliance with applicable law.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300">
                To exercise any of these rights, or if you have any questions or grievances regarding the processing of your personal information, please contact our Grievance Officer using the details provided in the "Contact Us" section. We will respond to your requests and grievances in accordance with applicable Indian law.
              </p>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use cookies and similar tracking technologies to track activity on our Services and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services. We will seek your consent for non-essential cookies as required by law.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Examples of Cookies we may use:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li><span className="font-semibold">Session Cookies:</span> To operate our Services.</li>
                <li><span className="font-semibold">Preference Cookies:</span> To remember your preferences and various settings.</li>
                <li><span className="font-semibold">Security Cookies:</span> For security purposes.</li>
                <li><span className="font-semibold">Analytics Cookies:</span> To understand how you use our Services, subject to your consent where applicable.</li>
              </ul>
            </motion.div>

            
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Children's Privacy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our Services are not intended for use by individuals under the age of 18 ("Children") without verifiable parental consent. We do not knowingly collect personally identifiable information from anyone under the age of 18 without such consent. As per the DPDP Act, 2023, processing children's data requires verifiable parental consent and prohibits processing that is likely to cause harm to a child.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                If you are a parent or guardian and you are aware that your Child has provided us with Personal Data without your consent (or if you wish to withdraw consent), please contact us. If we become aware that we have collected Personal Data from Children without appropriate verifiable parental consent, we take steps to remove that information from our servers or obtain necessary consents.
              </p>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. We may also notify you through email or other direct communication channels where feasible and appropriate.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </motion.div>

           
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us / Grievance Officer
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, wish to exercise your rights, or have any grievances, please contact our Grievance Officer:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50">
                <p className="text-gray-800 dark:text-gray-200 font-medium">Grievance Officer, ClinIQ Health Technologies Pvt. Ltd.</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Email: teamcodexsupport@gmail.com (Please mention "Privacy Grievance" in the subject line)</p>
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
            <ShieldCheckIcon className="w-16 h-16 text-blue-300 dark:text-blue-700 absolute top-10 left-10 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <LockClosedIcon className="w-20 h-20 text-blue-300 dark:text-indigo-700 absolute bottom-10 right-10 rotate-12" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}