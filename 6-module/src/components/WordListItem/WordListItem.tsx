import './WordListItem.scss';
import { useWordItemData } from '../../hooks/useWordItemData';
import { SearchItem, WordItem } from '../../types/word';
import { WordDetails } from './parts/WordDetails';
import { WordSummary } from './parts/WordSummary';

export type WordListItemProps = {
  item: WordItem | SearchItem;
};

export function WordListItem({ item }: WordListItemProps) {
  const { open, setOpen, isFav, short, cachedDataRaw, isLoading, isWordItem } =
    useWordItemData(item);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <li className='word-item'>
      <WordSummary item={item} isFav={isFav} short={short} onToggle={handleToggle} />

      {open && (
        <div className='details'>
          {isWordItem(cachedDataRaw) ? (
            <WordDetails data={cachedDataRaw} isLoading={isLoading} />
          ) : (
            <div>No detailed data available</div>
          )}
        </div>
      )}
    </li>
  );
}
