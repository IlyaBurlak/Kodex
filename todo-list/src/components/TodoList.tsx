import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: {
        id: string;
        text: string;
        completed: boolean;
    }[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
    return (
        <div className="todo-list">
            {todos.length === 0 ? (
                <p>Нет задач! Добавьте новую задачу.</p>
            ) : (
                todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
};

export default TodoList;