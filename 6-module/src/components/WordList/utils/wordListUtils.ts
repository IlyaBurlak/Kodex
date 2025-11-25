import { FavoriteEntry } from '../../../features/dictionarySlice';
import { SearchItem } from '../../../types/word';

export const getSelectedPosFromParams = (posParam: string): string[] =>
  posParam
    .split(',')
    .map((posStr) => posStr.trim().toLowerCase())
    .filter(Boolean);

export const sortItemsAlphabetically = (items: SearchItem[]): SearchItem[] =>
  [...items].sort((a, b) => a.word.localeCompare(b.word));

export const getMissingWordsToFetch = (
  favorites: FavoriteEntry[],
  cache: Record<string, unknown>,
  items: SearchItem[],
  requestedWords: Set<string>
): string[] => {
  const missingWords: string[] = [];

  favorites.forEach((favEntry) => {
    const isInCache = Object.values(cache).some(
      (cacheEntry) => (cacheEntry as SearchItem)?.meta?.uuid === favEntry.uuid
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
