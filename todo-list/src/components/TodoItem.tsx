import React, { useState } from 'react';
import {  TodoProps } from "../types/todo";
import { TodoForm } from './TodoForm';

export const TodoItem: React.FC<TodoProps> = ({
                                                todo,
                                                onToggle,
                                                onDelete,
                                                onEdit
                                              }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (title: string, description: string) => {
    onEdit(todo.id, title, description);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <TodoForm
          key={todo.id}
          initialValues={{ title: todo.title, description: todo.description }}
          onSubmit={handleSave}
          onCancel={handleCancel}
          submitText="Сохранить"
        />
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
      <div className="todo-actions">
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