import React, { useState } from 'react';
import { withToast } from "./ToastContext";
import { InputGroup } from './InputGroup';
import { useArrayState } from "../hooks/useArrayState";

interface ArrayOperationsProps {
    showToast: (message: string, type?: 'error' | 'success' | 'info' | 'warning') => void;
}

const ArrayOperations: React.FC<ArrayOperationsProps> = ({ showToast }) => {
    const [arrayCount, setArrayCount] = useState<number>(2);
    const { array: array1, updateArray: updateArray1, resizeArray: resizeArray1 } = useArrayState(2);
    const { array: array2, updateArray: updateArray2, resizeArray: resizeArray2 } = useArrayState(2);
    const [operation, setOperation] = useState<'add' | 'average'>('add');
    const [result, setResult] = useState<number[] | string | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);

    const generateArrayInputs = (): void => {
        if (arrayCount < 2 || arrayCount > 10) {
            showToast('Количество элементов должно быть от 2 до 10');
            return;
        }

        resizeArray1(arrayCount);
        resizeArray2(arrayCount);
        setResult(null);
        setShowResult(false);
        showToast('Массивы сгенерированы!', 'info');
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

        try {
            if (operation === 'add') {
                if (arr1.length !== arr2.length) {
                    showToast('Массивы должны быть одинаковой длины для сложения');
                    return;
                }

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
        } catch (error) {
            showToast('Произошла ошибка при вычислении', 'error');
        }
    };

    const renderArrayInputs = (array: string[], updateArray: (index: number, value: string) => void, label: string) => (
      <InputGroup label={label}>
          <div className="array-inputs">
              {array.map((value, index) => (
                <input
                  key={`${label}-${index}`}
                  type="number"
                  value={value}
                  className="array-input"
                  placeholder={`Элемент ${index+1}`}
                  onChange={e => updateArray(index, e.target.value)}
                />
              ))}
          </div>
      </InputGroup>
    );

    return (
      <div>
          <InputGroup label="Количество элементов (2-10):">
              <input
                className={'chooseInput'}
                type="number"
                min="2"
                max="10"
                value={arrayCount}
                onChange={e => setArrayCount(Number(e.target.value))}
              />
              <button onClick={generateArrayInputs}>Сгенерировать</button>
          </InputGroup>

          {renderArrayInputs(array1, updateArray1, "Массив 1:")}
          {renderArrayInputs(array2, updateArray2, "Массив 2:")}

          <InputGroup label="Операция:">
              <select
                value={operation}
                onChange={e => setOperation(e.target.value as 'add' | 'average')}
              >
                  <option value="add">Сложение массивов</option>
                  <option value="average">Среднее арифметическое</option>
              </select>
          </InputGroup>

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