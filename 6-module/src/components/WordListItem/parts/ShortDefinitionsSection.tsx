import { memo } from 'react';
import { Section } from './Section';

interface ShortDefinitionsSectionProps {
  definitions: string[];
}

export const ShortDefinitionsSection = memo(({ definitions }: ShortDefinitionsSectionProps) => (
  <Section title='Short Definitions' className='short-definitions'>
    <ul>
      {definitions.map((def, index) => (
        <li key={index}>{def}</li>
      ))}
    </ul>
  </Section>
));
ShortDefinitionsSection.displayName = 'ShortDefinitionsSection';
