import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';

const Toast: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: theme === 'dark' ? '#1E293B' : '#FFFFFF',
          color: theme === 'dark' ? '#FFFFFF' : '#1E293B',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

export default Toast;