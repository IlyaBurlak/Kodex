import React from 'react';
import {Todo} from '../App';
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, title: string, description: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
                                               todos,
                                               onToggle,
                                               onDelete,
                                               onEdit
                                           }) => {
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
                        onEdit={onEdit}
                    />
                ))
            )}
        </div>
    );
};

export default TodoList;