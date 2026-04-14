import { HTMLAttributes, forwardRef } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'white' | 'lightGray' | 'darkGray' | 'black' | 'darkGradient' | 'transparent';
  spacing?: 'sm' | 'md' | 'lg' | 'none';
  containerWidth?: 'default' | 'narrow' | 'wide' | 'full';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className = '', variant = 'white', spacing = 'lg', containerWidth = 'default', children, ...props }, ref) => {
    // 1. Background Variants
    const backgrounds = {
      white: 'bg-white text-slate-900',
      lightGray: 'bg-[#f7f8fb] text-slate-900', // Standard Awign off-white
      darkGray: 'bg-[#1f1f1f] text-white',
      black: 'bg-[#040404] text-white',
      darkGradient: 'bg-[radial-gradient(circle_at_50%_34%,rgba(33,94,146,0.72),rgba(7,22,41,0.95)_40%,#01060e_78%)] text-white', // Used typically in Hero
      transparent: 'bg-transparent',
    };

    // 2. Vertical Spacing Scale (8px scale perfectly hitting standard rhythm)
    const paddingY = {
      none: '',
      sm: 'py-12 sm:py-16',
      md: 'py-20 sm:py-24',
      lg: 'py-28 sm:py-32 lg:py-36', // Extensive spacing mimicking Awign's distinct sections
    };

    // 3. Container Width Constrains
    const maxWidthStyles: Record<NonNullable<SectionProps['containerWidth']>, string> = {
      default: '1280px',
      narrow: '860px',
      wide: '1520px',
      full: '100%',
    };

    return (
      <section ref={ref} className={`w-full !pb-[3%] overflow-hidden ${backgrounds[variant]} ${paddingY[spacing]} ${className}`} {...props}>
        <div className="mx-auto flex w-full justify-center px-6 lg:px-8 !mt-[5%]">
          <div className="w-full" style={{ maxWidth: maxWidthStyles[containerWidth] }}>
            {children}
          </div>
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
