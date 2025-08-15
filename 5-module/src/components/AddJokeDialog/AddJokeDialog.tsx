import React, { useState } from 'react';
import './AddJokeDialog.scss';

type Genre = 'Программистские' | 'Математические' | 'Школьные' | 'Студенческие' | 'Семейные';

type AddJokeDialogProps = {
    onAddJoke: (text: string, author: string, genre: Genre) => void;
};

const AddJokeDialog: React.FC<AddJokeDialogProps> = ({ onAddJoke }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState<Genre>('Программистские');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!text.trim() || !author.trim()) {
            setError('Все поля обязательны для заполнения');
            return;
        }

        if (text.length < 10) {
            setError('Анекдот должен содержать не менее 10 символов');
            return;
        }

        onAddJoke(text, author, genre);
        setText('');
        setAuthor('');
        setGenre('Программистские');
        setError('');
        setIsOpen(false);
    };

    return (
        <div className="add-joke-dialog">
            <button className="add-button" onClick={() => setIsOpen(true)}>
                + Добавить анекдот
            </button>

            {isOpen && (
                <div className="dialog-backdrop">
                    <div className="dialog-content">
                        <h2>Добавить новый анекдот</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="joke-text">Текст анекдота:</label>
                                <textarea
                                    id="joke-text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    rows={4}
                                    placeholder="Расскажите свой анекдот..."
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="joke-author">Автор:</label>
                                    <input
                                        type="text"
                                        id="joke-author"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        placeholder="Ваше имя"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="joke-genre">Жанр:</label>
                                    <select
                                        id="joke-genre"
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value as Genre)}
                                    >
                                        <option value="Программистские">Программистские</option>
                                        <option value="Математические">Математические</option>
                                        <option value="Школьные">Школьные</option>
                                        <option value="Студенческие">Студенческие</option>
                                        <option value="Семейные">Семейные</option>
                                    </select>
                                </div>
                            </div>

                            {error && <div className="error-message">{error}</div>}

                            <div className="dialog-actions">
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setError('');
                                    }}
                                >
                                    Отмена
                                </button>
                                <button type="submit" className="submit-button">
                                    Опубликовать
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddJokeDialog;