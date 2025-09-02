import React from 'react';
import { FilterType, TodoActionsProps } from "../types/todo";

export const TodoActions: React.FC<TodoActionsProps> = ({
                                                          filter,
                                                          setFilter,
                                                          count,
                                                          onClearCompleted
                                                        }) => {
  return (
    <div className="todo-actions-container">
      <div className="todo-filter">
        {([FilterType.ALL, FilterType.ACTIVE, FilterType.COMPLETED] as FilterType[]).map(
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
    case FilterType.ALL:
      return 'Все';
    case FilterType.ACTIVE:
      return 'В процессе';
    case FilterType.COMPLETED:
      return 'Выполненные';
    default:
      return '';
  }
};