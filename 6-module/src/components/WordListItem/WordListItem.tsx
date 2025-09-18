import { memo, useEffect, useState } from 'react';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import { fetchWordDetails } from '../../features/words/wordCacheSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './WordListItem.scss';

function truncate(text: string, max: number) {
  if (text.length <= max) {
    return text;
  }
  return text.slice(0, max - 1) + '…';
}

export function WordListItem({ item }: { item: any }) {
  const dispatch = useAppDispatch();
  const favs = useAppSelector((s) => s.favorites.words);
  const cache = useAppSelector((s) => s.wordCache.byWord);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favs.includes(item.word);

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

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play().catch((e) => console.error('Audio playback failed:', e));
  };

  return (
    <li className='word-item'>
      <div className='summary' onClick={() => setOpen((v) => !v)}>
        <span className='word'>{item.word}</span>
        {item.fl && <span className='pos'>{item.fl}</span>}
        {short && <span className='meaning'>{truncate(short, 60)}</span>}
        <button
          aria-label={isFav ? 'Unstar' : 'Star'}
          className={`star ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFavorite(item.word));
          }}
        >
          ★
        </button>
      </div>
      {open && (
        <div className='details'>
          {isLoading ? (
            <div className='loading'>Loading details...</div>
          ) : (
            <>
              {cachedData.phonetics && cachedData.phonetics.length > 0 && (
                <div className='phonetic-section'>
                  <h3>Pronunciation</h3>
                  {cachedData.phonetics.map((ph: any, idx: number) => (
                    <div key={idx} className='phonetic-item'>
                      <span className='transcription'>[{ph.transcription}]</span>
                      {ph.audio && (
                        <button
                          className='audio-button'
                          onClick={(e) => {
                            e.stopPropagation();
                            playAudio(ph.audio);
                          }}
                          aria-label='Listen pronunciation'
                        >
                          🔊
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {cachedData.shortdef && cachedData.shortdef.length > 0 && (
                <div className='short-definitions'>
                  <h3>Short Definitions</h3>
                  <ul>
                    {cachedData.shortdef.map((def: string, index: number) => (
                      <li key={index}>{def}</li>
                    ))}
                  </ul>
                </div>
              )}

              {cachedData.definitions && cachedData.definitions.length > 0 && (
                <div className='definitions'>
                  <h3>Detailed Definitions</h3>
                  {cachedData.definitions.map((def: any, idx: number) => (
                    <div key={idx} className='definition-item'>
                      {def.number && <span className='def-number'>{def.number}.</span>}
                      {def.definition && <span className='def-text'>{def.definition}</span>}
                      {def.examples && def.examples.length > 0 && (
                        <div className='examples'>
                          {def.examples.map((ex: string, exIdx: number) => (
                            <div key={exIdx} className='example'>
                              "{ex}"
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {cachedData.idioms && cachedData.idioms.length > 0 && (
                <div className='idioms'>
                  <h3>Idioms & Phrases</h3>
                  {cachedData.idioms.map((idiom: any, idx: number) => (
                    <div key={idx} className='idiom-item'>
                      <h4 className='idiom-phrase'>{idiom.phrase}</h4>
                      {idiom.definitions.map((def: any, defIdx: number) => (
                        <div key={defIdx} className='idiom-definition'>
                          <p>{def.text}</p>
                          {def.examples && def.examples.length > 0 && (
                            <div className='idiom-examples'>
                              {def.examples.map((ex: string, exIdx: number) => (
                                <div key={exIdx} className='example'>
                                  "{ex}"
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {cachedData.et && (
                <div className='etymology'>
                  <h3>Etymology</h3>
                  <p>{cachedData.et}</p>
                </div>
              )}

              {cachedData.syns && cachedData.syns.length > 0 && (
                <div className='synonyms'>
                  <h3>Synonyms</h3>
                  <div className='word-list'>
                    {cachedData.syns.map((syn: string, index: number) => (
                      <span key={index} className='word-tag'>
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {cachedData.ants && cachedData.ants.length > 0 && (
                <div className='antonyms'>
                  <h3>Antonyms</h3>
                  <div className='word-list'>
                    {cachedData.ants.map((ant: string, index: number) => (
                      <span key={index} className='word-tag'>
                        {ant}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {cachedData.art && (
                <div className='illustration'>
                  <h3>Illustration</h3>
                  <img src={cachedData.art} alt={item.word} />
                </div>
              )}

              {cachedData.uros && cachedData.uros.length > 0 && (
                <div className='related-words'>
                  <h3>Related Words</h3>
                  <ul>
                    {cachedData.uros.map((uro: any, index: number) => (
                      <li key={index}>
                        <strong>{uro.ure}</strong> ({uro.fl})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cachedData.stems && cachedData.stems.length > 0 && (
                <div className='word-forms'>
                  <h3>Word Forms</h3>
                  <div className='word-list'>
                    {cachedData.stems.map((stem: string, index: number) => (
                      <span key={index} className='word-tag'>
                        {stem}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {cachedData.offensive && (
                <div className='offensive-warning'>
                  <h3>⚠️ Note</h3>
                  <p>This word may be considered offensive or sensitive in some contexts.</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </li>
  );
}

export default memo(WordListItem);
