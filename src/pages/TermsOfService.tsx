import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, DocumentTextIcon, ScaleIcon } from '@heroicons/react/24/outline';

export default function TermsOfService() {

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
            <ScaleIcon className="w-4 h-4 mr-2" />
            <span>Terms & Conditions</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The rules and guidelines for using ClinIQ's services in India.
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
                <ScaleIcon className="w-6 h-6 text-blue-500 mr-3" />
                1. Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Welcome to ClinIQ ("we", "our", or "us"), operated by ClinIQ Health Technologies Pvt. Ltd. These Terms of Service ("Terms") govern your access to and use of our website, mobile applications, and related services (collectively, our "Services") offered in India. By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                If you do not agree with these Terms, you must not use our Services. We reserve the right to update or modify these Terms at any time, and such changes will be effective upon posting. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
              </p>
            </motion.div>

          
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Use of Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You agree to use our Services only for lawful purposes and in accordance with these Terms and all applicable Indian laws and regulations. You are responsible for all activities conducted under your account.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">Eligibility</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                To use our Services, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li>Be at least 18 years of age or older. If you are under 18, you may use the Services only with the involvement, supervision, and consent of a parent or legal guardian.</li>
                <li>Provide accurate, current, and complete information during registration and keep your account information updated.</li>
                <li>Maintain the security of your account credentials and be solely responsible for all activities that occur under your account.</li>
                <li>Have the legal capacity to enter into a binding contract.</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">Prohibited Conduct</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li>Use the Services for any illegal or unauthorized purpose, or in violation of any local, state, national, or international law including but not limited to the Indian Penal Code, 1860, and the Information Technology Act, 2000.</li>
                <li>Interfere with, disrupt, or damage the Services or servers or networks connected to the Services.</li>
                <li>Attempt to gain unauthorized access to any part of the Services, other accounts, computer systems, or networks connected to the Services.</li>
                <li>Transmit viruses, worms, malware, or any other code of a destructive or harmful nature.</li>
                <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                <li>Collect or store personal data about other users without their express permission.</li>
                 <li>Engage in any activity that is harmful, fraudulent, deceptive, threatening, harassing, defamatory, obscene, or otherwise objectionable.</li>
              </ul>
            </motion.div>

          
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. User Content
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You may provide content, such as medical information, feedback, comments, or other materials ("User Content") through our Services. By submitting User Content, you grant us a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and fully sublicensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content in connection with providing and improving our Services.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You represent and warrant that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4 ml-4">
                <li>You own or have the necessary rights, licenses, consents, and permissions to submit the User Content and grant the license set forth above.</li>
                <li>The User Content does not violate any applicable laws or regulations, or infringe upon the intellectual property rights or privacy rights of any third party.</li>
                <li>The User Content is accurate and not misleading.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300">We reserve the right, but are not obligated, to monitor, review, or remove User Content at our sole discretion.</p>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All content, features, and functionality of the Services, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, and software, and the compilation thereof, are the exclusive property of ClinIQ Health Technologies Pvt. Ltd., its affiliates, partners, or licensors, and are protected by Indian and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You are granted a limited, non-transferable, non-exclusive, revocable license to access and use the Services for your personal, non-commercial use only, strictly in accordance with these Terms. You may not copy, reproduce, modify, distribute, transmit, display, perform, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from our Services without our prior written permission.
              </p>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may terminate or suspend your access to all or part of the Services at our sole discretion, immediately and without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Upon termination, your right to use the Services will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability. We may delete your account and User Content without further obligation to you.
              </p>
            </motion.div>

           
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Disclaimers and Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The Services are provided on an "as is" and "as available" basis. ClinIQ makes no representations or warranties of any kind, express or implied, as to the operation of the Services or the information, content, materials, or products included on the Services. You expressly agree that your use of the Services is at your sole risk.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To the fullest extent permissible by applicable Indian law, ClinIQ disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose, non-infringement, title, quiet enjoyment, data accuracy, and system integration. We do not warrant that the Services will be uninterrupted, error-free, secure, or free of viruses or other harmful components.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                ClinIQ is a technology platform and does not provide medical advice or services. Any information or services provided through ClinIQ are for informational purposes only and do not constitute medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To the fullest extent permitted by applicable Indian law, ClinIQ Health Technologies Pvt. Ltd., its affiliates, officers, directors, employees, agents, or licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Services; (ii) any conduct or content of any third party on the Services; (iii) any content obtained from the Services; or (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
              </p>
               <p className="text-gray-600 dark:text-gray-300">Our total liability to you for all claims arising out of or relating to these Terms or your use of the Services shall not exceed the amount paid by you, if any, to us for access to or use of the Services in the twelve (12) months preceding the claim, or One Thousand Indian Rupees (₹1000), whichever is lower.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Indemnification</h2>
                <p className="text-gray-600 dark:text-gray-300">
                You agree to defend, indemnify, and hold harmless ClinIQ Health Technologies Pvt. Ltd., its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services, including, but not limited to, your User Content, any use of the Service's content, services, and products other than as expressly authorized in these Terms, or your use of any information obtained from the Services.
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Governing Law and Dispute Resolution
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These Terms and your use of the Services shall be governed by and construed in accordance with the laws of India, without giving effect to any principles of conflicts of law.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Any dispute, claim, or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation, or validity thereof, including the determination of the scope or applicability of this agreement to arbitrate, shall be determined by arbitration in India, before a sole arbitrator appointed by ClinIQ. The arbitration shall be conducted in accordance with the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be Bangalore, Karnataka. The language of the arbitration shall be English. Subject to the foregoing, the courts at Bangalore, Karnataka shall have exclusive jurisdiction.
              </p>
            </motion.div>

          
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Changes to These Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, in whole or in part, please stop using the website and the Services. We encourage you to review these Terms periodically to stay informed.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Miscellaneous</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><span className="font-semibold">Entire Agreement:</span> These Terms, together with our Privacy Policy, constitute the entire agreement between you and ClinIQ Health Technologies Pvt. Ltd. regarding your use of the Services and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Services.</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><span className="font-semibold">Severability:</span> If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><span className="font-semibold">No Waiver:</span> No waiver by ClinIQ of any term or condition set out in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of ClinIQ to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><span className="font-semibold">Assignment:</span> You may not assign or transfer these Terms, by operation of law or otherwise, without ClinIQ’s prior written consent. Any attempt by you to assign or transfer these Terms, without such consent, will be null and void. ClinIQ may freely assign or transfer these Terms without restriction.</p>
            </motion.div>


           
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                11. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50">
                <p className="text-gray-800 dark:text-gray-200 font-medium">ClinIQ Health Technologies Pvt. Ltd.</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Email: teamcodexsupport@gmail.com (Please mention "Terms of Service Query" in the subject line)</p>
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
            <ScaleIcon className="w-20 h-20 text-blue-300 dark:text-indigo-700 absolute bottom-10 right-10 rotate-12" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}