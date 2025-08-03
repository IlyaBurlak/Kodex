import React, { useState } from 'react';
import { Todo } from '../App';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, title: string, description: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
                                               todo,
                                               onToggle,
                                               onDelete,
                                               onEdit
                                           }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description);

    const handleSave = () => {
        if (editTitle.trim()) {
            onEdit(todo.id, editTitle, editDescription);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditTitle(todo.title);
        setEditDescription(todo.description);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="todo-item editing">
                <div className="edit-form">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Название"
                        className="edit-input"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Описание"
                        className="edit-textarea"
                    />
                    <div className="edit-actions">
                        <button
                            onClick={handleSave}
                            className="save-btn"
                        >
                            Сохранить
                        </button>
                        <button
                            onClick={handleCancel}
                            className="cancel-btn"
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <div className="todo-content">
                <h3>{todo.title}</h3>
                {todo.description && <p>{todo.description}</p>}
                <div className="todo-meta">
                    <span className="date">
                        {new Date(todo.updatedAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <div className="todo-buttons">
                <button
                    onClick={() => setIsEditing(true)}
                    className="edit-btn"
                >
                    Редактировать
                </button>
                <button
                    onClick={() => onDelete(todo.id)}
                    className="delete-btn"
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default TodoItem;