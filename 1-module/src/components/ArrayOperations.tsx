import React, { useState } from 'react';
import {withToast} from "./ToastContext";

interface ArrayOperationsProps {
    showToast: (message: string, type?: 'error' | 'success' | 'info' | 'warning') => void;
}

const ArrayOperations: React.FC<ArrayOperationsProps> = ({ showToast }) => {
    const [arrayCount, setArrayCount] = useState<number>(2);
    const [array1, setArray1] = useState<string[]>(Array(2).fill(''));
    const [array2, setArray2] = useState<string[]>(Array(2).fill(''));
    const [operation, setOperation] = useState<'add' | 'average'>('add');
    const [result, setResult] = useState<number[] | string | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);

    const generateArrayInputs = (): void => {
        if (arrayCount < 2 || arrayCount > 10) {
            showToast('Количество элементов должно быть от 2 до 10');
            return;
        }

        setArray1(Array(arrayCount).fill(''));
        setArray2(Array(arrayCount).fill(''));
        setResult(null);
        setShowResult(false);
        showToast('Массивы сгенерированы!', 'info');
    };

    const handleArrayChange = (index: number, value: string, arraySetter: React.Dispatch<React.SetStateAction<string[]>>): void => {
        arraySetter(prev => {
            const newArray = [...prev];
            newArray[index] = value;
            return newArray;
        });
    };

    const calculateArray = (): void => {
        if (array1.some(val => val === '')) {
            showToast('Заполните все поля в массиве 1');
            return;
        }

        if (array2.some(val => val === '')) {
            showToast('Заполните все поля в массиве 2');
            return;
        }

        const arr1 = array1.map(Number);
        const arr2 = array2.map(Number);

        if (arr1.some(isNaN) || arr2.some(isNaN)) {
            showToast('Все значения должны быть числами');
            return;
        }

        if (operation === 'add') {
            const resultArray = arr1.map((num, i) => num + arr2[i]);
            setResult(resultArray);
            showToast('Массивы успешно сложены!', 'success');
        } else {
            const combinedArray = [...arr1, ...arr2];
            const avg = (combinedArray.reduce((acc, num) => acc + num, 0) / combinedArray.length).toFixed(2);
            setResult(avg);
            showToast(`Среднее арифметическое: ${avg}`, 'success');
        }

        setShowResult(true);
    };

    return (
        <div>
            <div className="input-group">
                <label>Количество элементов (2-10):</label>
                <input
                    className={'chooseInput'}
                    type="number"
                    min="2"
                    max="10"
                    value={arrayCount}
                    onChange={e => setArrayCount(Number(e.target.value))}
                />
                <button onClick={generateArrayInputs}>Сгенерировать</button>
            </div>

            <div className="input-group">
                <label>Массив 1:</label>
                <div className="array-inputs">
                    {array1.map((value, index) => (
                        <input
                            key={`arr1-${index}`}
                            type="number"
                            value={value}
                            className="array-input"
                            placeholder={`Элемент ${index+1}`}
                            onChange={e => handleArrayChange(
                                index,
                                e.target.value,
                                setArray1
                            )}
                        />
                    ))}
                </div>
            </div>

            <div className="input-group">
                <label>Массив 2:</label>
                <div className="array-inputs">
                    {array2.map((value, index) => (
                        <input
                            key={`arr2-${index}`}
                            type="number"
                            value={value}
                            className="array-input"
                            placeholder={`Элемент ${index+1}`}
                            onChange={e => handleArrayChange(
                                index,
                                e.target.value,
                                setArray2
                            )}
                        />
                    ))}
                </div>
            </div>

            <div className="input-group">
                <label>Операция:</label>
                <select
                    value={operation}
                    onChange={e => setOperation(e.target.value as 'add' | 'average')}
                >
                    <option value="add">Сложение массивов</option>
                    <option value="average">Среднее арифметическое</option>
                </select>
            </div>

            <button onClick={calculateArray}>Вычислить</button>

            {showResult && (
                <div className="result-container">
                    <label>Результат:</label>
                    <div>
                        {Array.isArray(result)
                            ? `[${result.join(', ')}]`
                            : result}
                    </div>
                </div>
            )}
        </div>
    );
};

export default withToast(ArrayOperations);