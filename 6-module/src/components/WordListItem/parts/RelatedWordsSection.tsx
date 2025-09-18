import { memo } from 'react';
import { RelatedWord } from '../../../types/word';
import { Section } from './Section';

interface RelatedWordsSectionProps {
  uros: RelatedWord[];
}

export const RelatedWordsSection = memo(({ uros }: RelatedWordsSectionProps) => (
  <Section title='Related Words' className='related-words'>
    <ul>
      {uros.map((uro, index) => (
        <li key={index}>
          <strong>{uro.ure}</strong> ({uro.fl})
        </li>
      ))}
    </ul>
  </Section>
));

RelatedWordsSection.displayName = 'RelatedWordsSection';
