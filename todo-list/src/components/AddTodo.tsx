import React, { useState } from 'react';

interface AddTodoProps {
    onAdd: (title: string, description: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title, description);
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form className="add-todo" onSubmit={handleSubmit}>
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
            <button type="submit">Добавить</button>
        </form>
    );
};
export default AddTodo;