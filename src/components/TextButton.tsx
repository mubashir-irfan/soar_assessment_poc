import { ReactNode } from 'react';

interface TextButtonProps {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}

function TextButton({ children, onClick, ariaLabel }: TextButtonProps) {
  return (
    <button
      className="text-soar font-medium cursor-pointer relative overflow-hidden group active:font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-soar focus-visible:ring-offset-1 focus-visible:ring-offset-background-white"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[1px] bg-soar transition-all duration-300 sm:group-hover:w-full"></span>
    </button>
  );
}

export default TextButton;