import { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className = '',
}: Props) {
  const isCenter = align === 'center';

  return (
    <div className={`${isCenter ? 'section-header section-header-center' : 'section-header'} ${className}`.trim()}>
      <p className={`eyebrow ${isCenter ? 'eyebrow-light' : ''} mb-5`}>{eyebrow}</p>
      <h2 className="heading-md text-white">{title}</h2>
      {description ? <p className={`subtext mt-5 ${isCenter ? 'mx-auto' : ''}`}>{description}</p> : null}
      {action ? <div className={`mt-8 ${isCenter ? 'flex justify-center' : ''}`}>{action}</div> : null}
    </div>
  );
}
