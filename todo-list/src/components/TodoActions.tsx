import type { FC } from 'react';
import { FilterType, TodoActionsProps } from "../types/todo";
import '../styles/TodoActions.scss';

const FILTER_BUTTONS = [
  FilterType.ALL,
  FilterType.ACTIVE,
  FilterType.COMPLETED,
] as const;

const FILTER_TEXTS: Record<FilterType, string> = {
  [FilterType.ALL]: 'Все',
  [FilterType.ACTIVE]: 'В процессе',
  [FilterType.COMPLETED]: 'Выполненные',
};

export const TodoActions: FC<TodoActionsProps> = ({
                                                    filter,
                                                    setFilter,
                                                    count,
                                                    onClearCompleted
                                                  }) => {
  return (
    <div className="todo-actions-container">
      <div className="todo-filter">
        {FILTER_BUTTONS.map((filterType) => (
          <button
            key={filterType}
            className={filter === filterType ? 'active' : ''}
            onClick={() => setFilter(filterType)}
          >
            {FILTER_TEXTS[filterType]} ({count[filterType]})
          </button>
        ))}
      </div>
      {count.completed > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Очистить выполненные
        </button>
      )}
    </div>
  );
};