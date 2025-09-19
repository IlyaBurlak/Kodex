import { memo } from 'react';
import { Section } from './Section';

interface EtymologySectionProps {
  etymology: string;
}

export const EtymologySection = memo(({ etymology }: EtymologySectionProps) => (
  <Section title='Etymology' className='etymology'>
    <p>{etymology}</p>
  </Section>
));

EtymologySection.displayName = 'EtymologySection';
