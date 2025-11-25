import { SearchItem, WordItem } from '../../../types/word';
import { truncate } from '../../../utils/truncate';
import { FavoriteButton } from './FavoriteButton';

interface WordSummaryProps {
  item: WordItem | SearchItem;
  isFav: boolean;
  short: string;
  onToggle: () => void;
}

export function WordSummary({ item, isFav, short, onToggle }: WordSummaryProps) {
  return (
    <div className='summary' onClick={onToggle}>
      <span className='word'>{item.word}</span>
      {item.fl && <span className='pos'>{item.fl}</span>}
      {short && <span className='meaning'>{truncate(short, 60)}</span>}
      <FavoriteButton isFav={isFav} id={item.meta?.uuid ?? ''} word={item.word} item={item} />
    </div>
  );
}
