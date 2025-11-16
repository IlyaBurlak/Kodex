import { WordItem } from '../../../types/word';
import { DefinitionsSection } from './DefinitionsSection';
import { EtymologySection } from './EtymologySection';
import { IdiomsSection } from './IdiomsSection';
import { IllustrationSection } from './IllustrationSection';
import { OffensiveWarningSection } from './OffensiveWarningSection';
import { PhoneticSection } from './PhoneticSection';
import { RelatedWordsSection } from './RelatedWordsSection';
import { ShortDefinitionsSection } from './ShortDefinitionsSection';
import { WordListSection } from './WordListSection';

interface WordDetailsProps {
  data: WordItem;
  isLoading: boolean;
}

export function WordDetails({ data, isLoading }: WordDetailsProps) {
  if (isLoading) {
    return <div className='loading'>Loading details...</div>;
  }

  return (
    <>
      {data.phonetics && <PhoneticSection phonetics={data.phonetics} />}
      {data.shortdef && <ShortDefinitionsSection definitions={data.shortdef} />}
      {data.definitions && <DefinitionsSection definitions={data.definitions} />}
      {data.idioms && <IdiomsSection idioms={data.idioms} />}
      {data.et && <EtymologySection etymology={data.et} />}
      {data.syns && <WordListSection title='Synonyms' words={data.syns} />}
      {data.ants && <WordListSection title='Antonyms' words={data.ants} />}
      {data.art && <IllustrationSection art={data.art} alt={data.word} />}
      {data.uros && <RelatedWordsSection uros={data.uros} />}
      {data.stems && <WordListSection title='Word Forms' words={data.stems} />}
      {data.offensive && <OffensiveWarningSection />}
    </>
  );
}
