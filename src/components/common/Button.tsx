import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

// Properly extend HTMLMotionProps and exclude conflicting properties
interface ButtonProps
  extends Omit<
    HTMLMotionProps<"button">,
    "onAnimationStart" | "onAnimationEnd" | "children"
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode; // Explicitly define children as ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200";

  const variantClasses = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white shadow-sm border border-transparent",
    secondary:
      "bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm border border-transparent",
    outline:
      "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent",
    danger:
      "bg-red-500 hover:bg-red-600 text-white shadow-sm border border-transparent",
  };

  const sizeClasses = {
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2.5 px-4",
    lg: "text-lg py-3 px-5",
  };

  const disabledClasses =
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer";

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${widthClass}
    ${className}
  `;

  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || isLoading}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      {...props}
    >
      {isLoading && (
        <span className="w-5 h-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && leftIcon && (
        <span className={size === "sm" ? "mr-1.5" : "mr-2"}>{leftIcon}</span>
      )}
      {children}
      {!isLoading && rightIcon && (
        <span className={size === "sm" ? "ml-1.5" : "ml-2"}>{rightIcon}</span>
      )}
    </motion.button>
  );
};

export default Button;
