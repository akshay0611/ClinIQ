import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getPasswordStrength } from '../../utils/passwordStrength';

interface PasswordStrengthMeterProps {
  password?: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password = '' }) => {
  const strength = getPasswordStrength(password);

  if (!password) {
    return null;
  }

  const criteria = [
    { label: 'At least 8 characters', met: strength.hasMinLength },
    { label: 'Uppercase letter (A-Z)', met: strength.hasUppercase },
    { label: 'Number (0-9)', met: strength.hasNumber },
    { label: 'Special character (!@#$%^&*)', met: strength.hasSpecial },
  ];

  return (
    <div className="mt-3 space-y-2" id="password-strength-container">
      {/* Label and Strength Status */}
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-gray-600 dark:text-gray-400">Password Strength:</span>
        <span
          id="password-strength-label"
          className={`${strength.textColorClass} font-bold transition-colors duration-200`}
        >
          {strength.label}
        </span>
      </div>

      {/* ARIA Accessible Progress Bar */}
      <div
        className="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={strength.percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Password strength: ${strength.label}`}
        aria-describedby="password-strength-label"
      >
        <div
          className={`h-full ${strength.barColorClass} transition-all duration-300 ease-out`}
          style={{ width: `${strength.percentage}%` }}
        />
      </div>

      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite">
        Password strength is currently {strength.label}.
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-1 text-xs">
        {criteria.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-1.5 transition-colors duration-200 ${
              item.met
                ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {item.met ? (
              <CheckIcon className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            ) : (
              <XMarkIcon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            )}
            <span className="truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
