import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'bordered' | 'glass' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'elevated', padding = 'md', children, ...props }, ref) => {
    
    // Exact shadow specifications
    const variants = {
      // Light mode prominent card e.g., features, testimonials on light bg
      elevated: 'bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-[#e5e7eb] rounded-[28px]',
      
      // Clean, low intensity card
      bordered: 'bg-white border border-[#e5e7eb] shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px]',
      
      // Transparent / subtle overlay for dark backgrounds
      glass: 'bg-[rgba(255,255,255,0.05)] border border-white/10 backdrop-blur-md rounded-[28px]',
      
      // High contrast dark card typical in AD Sky dark sections
      dark: 'bg-[linear-gradient(180deg,#2f3136_0%,#2a2a2b_100%)] shadow-[0_22px_50px_rgba(0,0,0,0.24)] rounded-[30px] text-white'
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6 sm:p-8',
      lg: 'p-8 sm:p-12',
    };

    return (
      <div 
        ref={ref} 
        className={`flex flex-col overflow-hidden transition-shadow duration-300 ${variants[variant]} ${paddings[padding]} ${className}`} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
