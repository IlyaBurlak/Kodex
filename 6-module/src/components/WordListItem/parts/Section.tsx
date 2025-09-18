import { memo, ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Section = memo(({ title, children, className = '' }: SectionProps) => (
  <div className={className}>
    <h3>{title}</h3>
    {children}
  </div>
));

Section.displayName = 'Section';
