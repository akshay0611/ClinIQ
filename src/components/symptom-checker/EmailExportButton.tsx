import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { SymptomResult } from '../../types';
import { sendEmailReport } from '../../services/emailApi';

interface EmailExportButtonProps {
  result: SymptomResult;
  symptoms: string;
}

const EmailExportButton: React.FC<EmailExportButtonProps> = ({ result, symptoms }) => {
  const handleExport = () => {
    sendEmailReport(result, symptoms);
  };

  return (
    <div className="mb-8">
      <motion.button
        onClick={handleExport}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl shadow-lg shadow-teal-500/20 dark:shadow-teal-700/30 hover:shadow-xl transition-all"
      >
        <Mail className="mr-2 h-5 w-5" />
        <span>Email Report</span>
      </motion.button>
    </div>
  );
};

export default EmailExportButton;
