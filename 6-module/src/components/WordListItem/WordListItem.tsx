import { useEffect, useState } from 'react';
import './WordListItem.scss';
import { FavoriteEntry } from '../../features/dictionarySlice';
import { fetchWordDetails } from '../../features/searchThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { SearchItem, WordItem } from '../../types/word';
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

export function WordListItem({ item }: { item: WordItem | SearchItem }) {
  const dispatch = useAppDispatch();
  const favs: FavoriteEntry[] = useAppSelector((state) => state.dictionary.favorites);
  const cache = useAppSelector((state) => state.dictionary.wordCache);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const itemUuid = item.meta?.uuid;
  const isFav = itemUuid ? favs.some((fav) => fav.uuid === itemUuid) : false;
  const short = item.shortdef?.[0] ?? '';
  const cachedDataRaw = cache[item.word] ?? item;

  const isWordItem = (candidate: object | null): candidate is WordItem =>
    typeof candidate === 'object' && candidate !== null && 'word' in candidate;

  useEffect(() => {
    if (open) {
      const hasDetails = isWordItem(cachedDataRaw) && !!cachedDataRaw.detailed;
      if (!hasDetails) {
        setIsLoading(true);
        dispatch(fetchWordDetails(item.word))
          .unwrap()
          .finally(() => setIsLoading(false));
      }
    }
  }, [open, cachedDataRaw, dispatch, item.word]);

  return (
    <li className='word-item'>
      <div className='summary' onClick={() => setOpen((prev) => !prev)}>
        <span className='word'>{item.word}</span>
        {item.fl && <span className='pos'>{item.fl}</span>}
        {short && <span className='meaning'>{truncate(short, 60)}</span>}
        <FavoriteButton isFav={isFav} id={item.meta?.uuid ?? ''} word={item.word} item={item} />
      </div>

      {open && (
        <div className='details'>
          {isLoading ? (
            <div className='loading'>Loading details...</div>
          ) : (
            <>
              {isWordItem(cachedDataRaw) && (
                <>
                  {cachedDataRaw.phonetics && (
                    <PhoneticSection phonetics={cachedDataRaw.phonetics} />
                  )}
                  {cachedDataRaw.shortdef && (
                    <ShortDefinitionsSection definitions={cachedDataRaw.shortdef} />
                  )}
                  {cachedDataRaw.definitions && (
                    <DefinitionsSection definitions={cachedDataRaw.definitions} />
                  )}
                  {cachedDataRaw.idioms && <IdiomsSection idioms={cachedDataRaw.idioms} />}
                  {cachedDataRaw.et && <EtymologySection etymology={cachedDataRaw.et} />}
                  {cachedDataRaw.syns && (
                    <WordListSection title='Synonyms' words={cachedDataRaw.syns} />
                  )}
                  {cachedDataRaw.ants && (
                    <WordListSection title='Antonyms' words={cachedDataRaw.ants} />
                  )}
                  {cachedDataRaw.art && (
                    <IllustrationSection art={cachedDataRaw.art} alt={item.word} />
                  )}
                  {cachedDataRaw.uros && <RelatedWordsSection uros={cachedDataRaw.uros} />}
                  {cachedDataRaw.stems && (
                    <WordListSection title='Word Forms' words={cachedDataRaw.stems} />
                  )}
                  {cachedDataRaw.offensive && <OffensiveWarningSection />}
                </>
              )}
            </>
          )}
        </div>
      )}
    </li>
  );
}
