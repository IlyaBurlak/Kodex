import React, { useState } from 'react';

const Calculator: React.FC<CalculatorProps> = ({ showToast }) => {
    const [currentInput, setCurrentInput] = useState<string>('0');

    const appendToDisplay = (value: string): void => {
        setCurrentInput(prev => {
            if (prev === 'Ошибка' || prev === '0') {
                return value === '.' ? '0.' : value;
            }
            return prev + value;
        });
    };

    const clearDisplay = (): void => setCurrentInput('0');

    const calculate = (): void => {
        try {
            const expression = currentInput
                .replace(/×/g, '*')
                .replace(/÷/g, '/');

            const result = Function(`"use strict"; return (${expression})`)();

            if (!isFinite(result)) {
                throw new Error('Недопустимая операция');
            }

            setCurrentInput(String(result));
        } catch (error) {
            showToast('Ошибка вычисления: ' + (error as Error).message);
            setCurrentInput('Ошибка');
        }
    };

    return (
        <div className="calculator">
            <div className="display">
                <input
                    type="text"
                    value={currentInput}
                    readOnly
                />
            </div>
            <div className="buttons">
                <button className="clear" onClick={clearDisplay}>C</button>
                <button onClick={() => appendToDisplay('(')}>(</button>
                <button onClick={() => appendToDisplay(')')}>)</button>
                <button className="operator" onClick={() => appendToDisplay('/')}>÷</button>

                <button onClick={() => appendToDisplay('7')}>7</button>
                <button onClick={() => appendToDisplay('8')}>8</button>
                <button onClick={() => appendToDisplay('9')}>9</button>
                <button className="operator" onClick={() => appendToDisplay('*')}>×</button>

                <button onClick={() => appendToDisplay('4')}>4</button>
                <button onClick={() => appendToDisplay('5')}>5</button>
                <button onClick={() => appendToDisplay('6')}>6</button>
                <button className="operator" onClick={() => appendToDisplay('-')}>-</button>

                <button onClick={() => appendToDisplay('1')}>1</button>
                <button onClick={() => appendToDisplay('2')}>2</button>
                <button onClick={() => appendToDisplay('3')}>3</button>
                <button className="operator" onClick={() => appendToDisplay('+')}>+</button>

                <button onClick={() => appendToDisplay('0')}>0</button>
                <button onClick={() => appendToDisplay('.')}>.</button>
                <button className="equals" onClick={calculate}>=</button>
            </div>
        </div>
    );
};

export default Calculator;