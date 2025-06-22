import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import PDFExportService from '../../services/PDFExportService';
import { SymptomResult } from '../../types';

interface PDFExportButtonProps {
  result: SymptomResult;
  symptoms: string;
}

const PDFExportButton: React.FC<PDFExportButtonProps> = ({ result, symptoms }) => {
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportError, setExportError] = React.useState<string | null>(null);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setExportError(null);
      await PDFExportService.generateReport(result, symptoms);
    } catch (error) {
      console.error('Failed to export report:', error);
      setExportError('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mb-8">
      <motion.button
        onClick={handleExport}
        disabled={isExporting}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 hover:shadow-xl transition-all disabled:opacity-70"
      >
        {isExporting ? (
          <>
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <FileText className="mr-2 h-5 w-5" />
            <span>Download PDF Report</span>
            <Download className="ml-2 h-4 w-4" />
          </>
        )}
      </motion.button>
      
      {exportError && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="mt-2 text-red-500 text-sm text-center"
        >
          {exportError}
        </motion.div>
      )}
    </div>
  );
};

export default PDFExportButton;