import { ReactNode } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string
}

function Button({ label, onClick, type = 'button', disabled, className }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-active text-text-light py-2 px-12 rounded-lg font-medium transition-colors duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
      } ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;