import { memo } from 'react';
import { Section } from './Section';

interface WordListSectionProps {
  title: string;
  words: string[];
}

export const WordListSection = memo(({ title, words }: WordListSectionProps) => (
  <Section title={title}>
    <div className='word-list'>
      {words.map((word, index) => (
        <span key={index} className='word-tag'>
          {word}
        </span>
      ))}
    </div>
  </Section>
));

WordListSection.displayName = 'WordListSection';
