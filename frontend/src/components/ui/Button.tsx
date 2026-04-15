import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dimmed';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'lg', asChild = false , children, ...props }, ref) => {
    //  const Comp = asChild ? Slot : 'button';
    // Base styles: precise flex center, rounded pill shape, text-center + transition
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200';
    
    // Variant styles referencing exact Awign colors
    const variants = {
      primary: 'bg-[#c9ff45] text-[#1b1f22] hover:scale-[1.02] shadow-[0_4px_14px_rgba(201,255,69,0.2)]', // Lime/Neon
      secondary: 'bg-white text-[#24344a] shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:scale-[1.02]',     // White over dark bg
      outline: 'border border-white/65 bg-[rgba(51,66,88,0.45)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-[rgba(59,77,103,0.6)]', // Transparent pill
      ghost: 'bg-transparent text-white/92 hover:text-white', // Simple text
      dimmed: 'bg-[#2a2a2a] text-white/90 hover:bg-[#363636]' // Dark bg tab 
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-8 text-[15px]',
      lg: 'h-[52px] px-10 text-[17px]', // Used in Home hero
      xl: 'h-[64px] px-10 text-[1.05rem] lg:min-w-[280px]', // Extreme giant action buttons
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
