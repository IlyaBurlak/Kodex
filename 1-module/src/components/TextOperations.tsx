import React, { useState, useCallback } from 'react';
import { withToast } from "./ToastContext";
import { InputGroup } from './InputGroup';
import { ResultContainer } from './ResultContainer';

interface TextOperationsProps {
    showToast: (message: string, type?: 'error' | 'success' | 'info' | 'warning') => void;
}

const TextOperations: React.FC<TextOperationsProps> = ({ showToast }) => {
    const [text, setText] = useState<string>('');
    const [findChar, setFindChar] = useState<string>('');
    const [replaceChar, setReplaceChar] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [showResult, setShowResult] = useState<boolean>(false);

    const replaceText = useCallback((): void => {
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

        const newResult = text.replace(regex, replaceChar);
        setResult(newResult);
        setShowResult(true);
        showToast('Текст успешно преобразован!', 'success');
    }, [text, findChar, replaceChar, showToast]);

    return (
      <div>
          <InputGroup label="Исходный текст:">
                <textarea
                  rows={5}
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
          </InputGroup>

          <InputGroup label="Символ для замены:">
              <input
                type="text"
                maxLength={1}
                value={findChar}
                onChange={e => setFindChar(e.target.value)}
              />
          </InputGroup>

          <InputGroup label="Заменить на:">
              <input
                type="text"
                maxLength={1}
                value={replaceChar}
                onChange={e => setReplaceChar(e.target.value)}
              />
          </InputGroup>

          <button onClick={replaceText}>Заменить</button>

          {showResult && (
            <ResultContainer label="Результат:">
                <div className="result-text">{result}</div>
            </ResultContainer>
          )}
      </div>
    );
};

export default withToast(TextOperations);