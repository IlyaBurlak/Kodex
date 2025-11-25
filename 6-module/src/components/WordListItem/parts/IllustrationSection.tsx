import { memo } from 'react';
import { Section } from './Section';

interface IllustrationSectionProps {
  art: string;
  alt: string;
}

export const IllustrationSection = memo(({ art, alt }: IllustrationSectionProps) => (
  <Section title='Illustration' className='illustration'>
    <img src={art} alt={alt} />
  </Section>
));

IllustrationSection.displayName = 'IllustrationSection';
