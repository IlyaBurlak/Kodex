import './WordListState.scss';

export type WordListStateType =
  | 'loading'
  | 'empty-favorites'
  | 'empty-search'
  | 'empty'
  | 'no-words-for-pos';

type WordListStateProps = {
  type: WordListStateType;
  query?: string;
};

export function WordListState({ type, query }: WordListStateProps) {
  switch (type) {
    case 'loading':
      return (
        <div className='word-list-state loading'>
          <p>Загрузка...</p>
        </div>
      );

    case 'empty-favorites':
      return (
        <div className='word-list-state empty'>
          <p>В избранном ничего нет</p>
        </div>
      );

    case 'empty-search':
      return (
        <div className='word-list-state empty'>
          <p>{query ? `По запросу "${query}" ничего не найдено` : 'Ничего не найдено'}</p>
        </div>
      );

    case 'no-words-for-pos':
      return (
        <div className='word-list-state empty'>
          <p>В избранном нет слов с выбранной частью речи</p>
        </div>
      );

    case 'empty':
    default:
      return (
        <div className='word-list-state empty'>
          <p>Ничего не найдено</p>
        </div>
      );
  }
}
