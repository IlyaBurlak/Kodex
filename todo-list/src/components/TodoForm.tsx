import React, { useState } from 'react';
import '../styles/main.scss'
import { TodoFormProps } from "../types/todo";

export const TodoForm: React.FC<TodoFormProps> = ({
                                                    initialValues = { title: '', description: '' },
                                                    onSubmit,
                                                    onCancel,
                                                    submitText
                                                  }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, description);
      if (!onCancel) {
        setTitle('');
        setDescription('');
      }
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Название задачи..."
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Описание задачи..."
        rows={3}
      />
      <div className="form-actions">
        <button type="submit">{submitText}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};