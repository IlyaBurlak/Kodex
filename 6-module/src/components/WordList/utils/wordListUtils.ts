import { FavoriteEntry } from '../../../features/dictionarySlice';
import { SearchItem } from '../../../types/word';

export const getSelectedPosFromParams = (posParam: string): string[] => {
  return posParam
    .split(',')
    .map((posStr) => posStr.trim().toLowerCase())
    .filter(Boolean);
};

export const sortItemsAlphabetically = (items: SearchItem[]): SearchItem[] => {
  return [...items].sort((a, b) => a.word.localeCompare(b.word));
};

export const getMissingWordsToFetch = (
  favs: FavoriteEntry[],
  cache: Record<string, any>,
  items: SearchItem[],
  requestedWords: Set<string>
): string[] => {
  const missingWords: string[] = [];

  favs.forEach((favEntry) => {
    const isInCache = Object.values(cache).some(
      (cacheEntry) => cacheEntry?.meta?.uuid === favEntry.uuid
    );

    if (!isInCache) {
      const preferredWord =
        favEntry.word ?? items.find((listItem) => listItem.meta?.uuid === favEntry.uuid)?.word;

      if (preferredWord && !requestedWords.has(preferredWord) && !cache[preferredWord]) {
        missingWords.push(preferredWord);
      }
    }
  });

  return missingWords;
};
