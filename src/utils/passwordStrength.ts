export interface PasswordStrength {
  score: number;
  label: 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  percentage: number;
  barColorClass: string;
  textColorClass: string;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

/**
 * Evaluates password strength based on length, uppercase letters, numbers, and special characters.
 * @param password Input password string
 * @returns PasswordStrength evaluation object
 */
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: 'Weak',
      percentage: 0,
      barColorClass: 'bg-gray-300 dark:bg-neutral-700',
      textColorClass: 'text-gray-400 dark:text-gray-500',
      hasMinLength: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecial: false,
    };
  }

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (hasMinLength) score += 1;
  if (hasUppercase) score += 1;
  if (hasNumber) score += 1;
  if (hasSpecial) score += 1;

  let label: 'Weak' | 'Fair' | 'Strong' | 'Very Strong' = 'Weak';
  let percentage = 25;
  let barColorClass = 'bg-red-500';
  let textColorClass = 'text-red-500 dark:text-red-400';

  if (score <= 1) {
    label = 'Weak';
    percentage = 25;
    barColorClass = 'bg-red-500';
    textColorClass = 'text-red-500 dark:text-red-400';
  } else if (score === 2) {
    label = 'Fair';
    percentage = 50;
    barColorClass = 'bg-amber-500';
    textColorClass = 'text-amber-500 dark:text-amber-400';
  } else if (score === 3) {
    label = 'Strong';
    percentage = 75;
    barColorClass = 'bg-blue-500';
    textColorClass = 'text-blue-500 dark:text-blue-400';
  } else {
    label = 'Very Strong';
    percentage = 100;
    barColorClass = 'bg-emerald-500';
    textColorClass = 'text-emerald-500 dark:text-emerald-400';
  }

  return {
    score,
    label,
    percentage,
    barColorClass,
    textColorClass,
    hasMinLength,
    hasUppercase,
    hasNumber,
    hasSpecial,
  };
}
