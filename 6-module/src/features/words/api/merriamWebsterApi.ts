import { MERRIAM_API_KEY, MERRIAM_BASE_URL } from '../../../config';
import { WordItem } from '../../../types/word';
import { extractDefinitions, extractIdioms } from '../utils/dataProcessors';
import {
  mapEtymology,
  mapPhonetics,
  mapRelatedWords,
  mapShortDefinitions,
  mapSynonymsAntonyms,
} from '../utils/mappers';
import { MerriamWebsterEntry } from '../utils/types';

export const fetchWordDetailsFromApi = async (word: string): Promise<WordItem | undefined> => {
  try {
    const url = `${MERRIAM_BASE_URL}/${encodeURIComponent(word)}?key=${MERRIAM_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch word details');

    const data = (await response.json()) as MerriamWebsterEntry[];
    const entry = data.find(
      (e): e is MerriamWebsterEntry => typeof e === 'object' && typeof e?.meta?.id === 'string'
    );

    if (!entry) return undefined;

    const phonetics = mapPhonetics(entry.hwi?.prs);
    const definitions = entry.def?.[0]?.sseq ? extractDefinitions(entry.def[0].sseq) : [];
    const idioms = entry.dros ? extractIdioms(entry.dros) : [];
    const shortdef = mapShortDefinitions(entry.shortdef);
    const syns = mapSynonymsAntonyms(entry.syns);
    const ants = mapSynonymsAntonyms(entry.ants);
    const et = mapEtymology(entry.et);
    const uros = mapRelatedWords(entry.uros);

    const wordItem: WordItem = {
      word: String(entry.meta.id).split(':')[0] || word,
      fl: entry.fl,
      phonetics: phonetics.length > 0 ? phonetics : undefined,
      shortdef: shortdef && shortdef.length > 0 ? shortdef : undefined,
      definitions: definitions.length > 0 ? definitions : undefined,
      idioms: idioms.length > 0 ? idioms : undefined,
      detailed: true,
      syns,
      ants,
      et,
      art: entry.art?.url,
      uros,
      stems: entry.meta?.stems || [],
      offensive: entry.meta?.offensive || false,
      meta: entry.meta?.uuid ? { uuid: String(entry.meta.uuid) } : undefined,
    };

    return wordItem;
  } catch (error) {
    console.error('Error fetching word details:', error);
    throw error;
  }
};
