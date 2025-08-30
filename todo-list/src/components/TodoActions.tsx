import React from 'react';
import { FilterType } from '../types/todo';

interface TodoActionsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  count: {
    all: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

export const TodoActions: React.FC<TodoActionsProps> = ({
                                                          filter,
                                                          setFilter,
                                                          count,
                                                          onClearCompleted
                                                        }) => {
  return (
    <div className="todo-actions-container">
      <div className="todo-filter">
        {(['all', 'active', 'completed'] as FilterType[]).map(
          (filterType) => (
            <button
              key={filterType}
              className={filter === filterType ? 'active' : ''}
              onClick={() => setFilter(filterType)}
            >
              {getFilterText(filterType)} ({count[filterType]})
            </button>
          )
        )}
      </div>
      {count.completed > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Очистить выполненные
        </button>
      )}
    </div>
  );
};

const getFilterText = (filter: FilterType): string => {
  switch (filter) {
    case 'all':
      return 'Все';
    case 'active':
      return 'В процессе';
    case 'completed':
      return 'Выполненные';
    default:
      return '';
  }
};