import React, { useState } from 'react';

const TextOperations = ({ showToast }) => {
    const [text, setText] = useState('');
    const [findChar, setFindChar] = useState('');
    const [replaceChar, setReplaceChar] = useState('');
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);

    const replaceText = () => {
        if (!text.trim()) {
            showToast('Введите текст');
            return;
        }

        if (!findChar) {
            showToast('Введите символ для замены');
            return;
        }

        if (findChar.length > 1) {
            showToast('Введите только один символ для замены');
            return;
        }

        const escapedFindChar = findChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedFindChar, 'g');

        setResult(text.replace(regex, replaceChar));
        setShowResult(true);
    };

    return (
        <div>
            <div className="input-group">
                <label>Исходный текст:</label>
                <textarea
                    rows="5"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Символ для замены:</label>
                <input
                    type="text"
                    maxLength="1"
                    value={findChar}
                    onChange={e => setFindChar(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Заменить на:</label>
                <input
                    type="text"
                    maxLength="1"
                    value={replaceChar}
                    onChange={e => setReplaceChar(e.target.value)}
                />
            </div>

            <button onClick={replaceText}>Заменить</button>

            {showResult && (
                <div className="result-container">
                    <label>Результат:</label>
                    <div className="result-text">{result}</div>
                </div>
            )}
        </div>
    );
};

export default TextOperations;