import { memo } from 'react';
import { Idiom } from '../../../types/word';
import { IdiomItem } from './IdiomItem';
import { ListSection } from './ListSection';

interface IdiomsSectionProps {
  idioms: Idiom[];
}

export const IdiomsSection = memo(({ idioms }: IdiomsSectionProps) => (
  <ListSection
    title='Idioms & Phrases'
    items={idioms}
    className='idioms'
    renderItem={(idiom, idx) => <IdiomItem key={idx} idiom={idiom} />}
  />
));

IdiomsSection.displayName = 'IdiomsSection';
