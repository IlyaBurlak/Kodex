import { useEffect, useState } from 'react';
import './WordListItem.scss';
import { fetchWordDetails } from '../../features/words/wordCacheSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { WordItem } from '../../types/word';
import { truncate } from '../../utils/truncate';
import {
  DefinitionsSection,
  EtymologySection,
  FavoriteButton,
  IdiomsSection,
  IllustrationSection,
  OffensiveWarningSection,
  PhoneticSection,
  RelatedWordsSection,
  ShortDefinitionsSection,
  WordListSection,
} from './parts';

export function WordListItem({ item }: { item: WordItem }) {
  const dispatch = useAppDispatch();
  const favs = useAppSelector((s) => s.favorites.words);
  const cache = useAppSelector((s) => s.wordCache.byWord);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const itemUuid = (item as any).meta?.uuid;
  const isFav = itemUuid ? favs.some((f: any) => f.uuid === itemUuid) : false;
  const short = item.shortdef?.[0] ?? '';
  const cachedData = cache[item.word] || item;

  useEffect(() => {
    if (open && !cachedData.detailed) {
      setIsLoading(true);
      dispatch(fetchWordDetails(item.word))
        .unwrap()
        .finally(() => setIsLoading(false));
    }
  }, [open, cachedData.detailed, dispatch, item.word]);

  return (
    <li className='word-item'>
      <div className='summary' onClick={() => setOpen((v) => !v)}>
        <span className='word'>{item.word}</span>
        {item.fl && <span className='pos'>{item.fl}</span>}
        {short && <span className='meaning'>{truncate(short, 60)}</span>}
        <FavoriteButton isFav={isFav} id={(item as any).meta?.uuid} word={item.word} item={item} />
      </div>

      {open && (
        <div className='details'>
          {isLoading ? (
            <div className='loading'>Loading details...</div>
          ) : (
            <>
              {cachedData.phonetics && <PhoneticSection phonetics={cachedData.phonetics} />}
              {cachedData.shortdef && <ShortDefinitionsSection definitions={cachedData.shortdef} />}
              {cachedData.definitions && (
                <DefinitionsSection definitions={cachedData.definitions} />
              )}
              {cachedData.idioms && <IdiomsSection idioms={cachedData.idioms} />}
              {cachedData.et && <EtymologySection etymology={cachedData.et} />}
              {cachedData.syns && <WordListSection title='Synonyms' words={cachedData.syns} />}
              {cachedData.ants && <WordListSection title='Antonyms' words={cachedData.ants} />}
              {cachedData.art && <IllustrationSection art={cachedData.art} alt={item.word} />}
              {cachedData.uros && <RelatedWordsSection uros={cachedData.uros} />}
              {cachedData.stems && <WordListSection title='Word Forms' words={cachedData.stems} />}
              {cachedData.offensive && <OffensiveWarningSection />}
            </>
          )}
        </div>
      )}
    </li>
  );
}
