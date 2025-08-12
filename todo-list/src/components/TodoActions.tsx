import React from 'react';

interface TodoActionsProps {
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
    count: {
        all: number;
        active: number;
        completed: number;
    };
    onClearCompleted: () => void;
}

const TodoActions: React.FC<TodoActionsProps> = ({
                                                     filter,
                                                     setFilter,
                                                     count,
                                                     onClearCompleted
                                                 }) => {
    return (
        <div className="todo-actions">
            <div className="todo-filter">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    Все ({count.all})
                </button>
                <button
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    В процессе ({count.active})
                </button>
                <button
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => setFilter('completed')}
                >
                    Выполненные ({count.completed})
                </button>
            </div>
            {count.completed > 0 && (
                <button className="clear-completed" onClick={onClearCompleted}>
                    Очистить выполненные
                </button>
            )}
        </div>
    );
};

export default TodoActions;