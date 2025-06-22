import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  interactive = false,
  onClick
}) => {
  const baseClasses = 'bg-white dark:bg-neutral-800 rounded-lg shadow-card overflow-hidden';
  const interactiveClasses = interactive 
    ? 'cursor-pointer transition-shadow hover:shadow-card-hover' 
    : '';
  
  const cardClasses = `${baseClasses} ${interactiveClasses} ${className}`;

  if (interactive) {
    return (
      <motion.div 
        className={cardClasses}
        whileHover={{ y: -4 }}
        whileTap={{ y: 0 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={cardClasses}>{children}</div>;
};

export default Card;