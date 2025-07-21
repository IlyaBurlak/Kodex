import React, { useState } from 'react';

const ArrayOperations = ({ showToast }) => {
    const [arrayCount, setArrayCount] = useState(2);
    const [array1, setArray1] = useState(Array(2).fill(''));
    const [array2, setArray2] = useState(Array(2).fill(''));
    const [operation, setOperation] = useState('add');
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const generateArrayInputs = () => {
        if (arrayCount < 2 || arrayCount > 10) {
            showToast('Количество элементов должно быть от 2 до 10');
            return;
        }

        setArray1(Array(arrayCount).fill(''));
        setArray2(Array(arrayCount).fill(''));
        setResult(null);
        setShowResult(false);
    };

    const handleArrayChange = (index, value, arraySetter) => {
        arraySetter(prev => {
            const newArray = [...prev];
            newArray[index] = value;
            return newArray;
        });
    };

    const calculateArray = () => {
        if (array1.some(val => val === '')) {
            showToast('Заполните все поля в массиве 1');
            return;
        }

        if (operation === 'add' && array2.some(val => val === '')) {
            showToast('Заполните все поля в массиве 2');
            return;
        }

        if (operation === 'add') {
            const arr1 = array1.map(Number);
            const arr2 = array2.map(Number);

            if (arr1.some(isNaN) || arr2.some(isNaN)) {
                showToast('Все значения должны быть числами');
                return;
            }

            setResult(arr1.map((num, i) => num + arr2[i]));
        } else {
            const arr = array1.map(Number);

            if (arr.some(isNaN)) {
                showToast('Все значения должны быть числами');
                return;
            }

            setResult((arr.reduce((acc, num) => acc + num, 0) / arr.length).toFixed(2));
        }

        setShowResult(true);
    };

    return (
        <div>
            <div className="input-group">
                <label>Количество элементов (2-10):</label>
                <input
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
                            onChange={e => handleArrayChange(
                                index,
                                e.target.value,
                                setArray2
                            )}
                            disabled={operation === 'average'}
                        />
                    ))}
                </div>
            </div>

            <div className="input-group">
                <label>Операция:</label>
                <select
                    value={operation}
                    onChange={e => setOperation(e.target.value)}
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

export default ArrayOperations;