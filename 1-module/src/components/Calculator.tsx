import { useState, useCallback, FC } from 'react';

import { withToast } from "./ToastContext";
import { OperationsProps } from "../types/Operations";

import '../styles/components/_calculator.scss'

const isOperator = (char: string): boolean => {
    return ['+', '-', '*', '/'].includes(char);
};

const Calculator:FC<OperationsProps> = ({ showToast }) => {
    const [currentInput, setCurrentInput] = useState<string>('0');

    const appendToDisplay = useCallback((value: string): void => {
        setCurrentInput(prev => {
            if (prev === 'Ошибка') {
                return value === '.' ? '0.' : value;
            }

            if (prev === '0') {
                if (value === '.') return '0.';
                if (isOperator(value)) return '0';
                return value;
            }

            const lastChar = prev.slice(-1);

            if (isOperator(value) && isOperator(lastChar)) {
                return prev.slice(0, -1) + value;
            }

            if (value === '.' && isOperator(lastChar)) {
                return prev + '0.';
            }

            if (value === '.') {
                const parts = prev.split(/[\+\-\*\/]/);
                const lastPart = parts[parts.length - 1] || '';
                if (lastPart.includes('.')) {
                    return prev;
                }
            }

            return prev + value;
        });
    }, []);

    const clearDisplay = useCallback((): void => setCurrentInput('0'), []);

    const calculate = useCallback((): void => {
        try {
            const lastChar = currentInput.slice(-1);
            if (isOperator(lastChar)) {
                showToast('Выражение не завершено', 'error');
                return;
            }

            const openBrackets = (currentInput.match(/\(/g) || []).length;
            const closeBrackets = (currentInput.match(/\)/g) || []).length;
            if (openBrackets !== closeBrackets) {
                showToast('Несбалансированные скобки', 'error');
                return;
            }

            const expression = currentInput
              .replace(/×/g, '*')
              .replace(/÷/g, '/');

            const result = Function(`"use strict"; return (${expression})`)();

            if (!isFinite(result)) {
                throw new Error('Недопустимая операция');
            }

            setCurrentInput(String(result));
            showToast('Вычисление выполнено успешно!', 'success');
        } catch (error) {
            showToast('Ошибка вычисления: ' + (error as Error).message);
            setCurrentInput('Ошибка');
        }
    }, [currentInput, showToast]);

    const buttons = [
        { label: 'C', className: 'clear', action: clearDisplay },
        { label: '(', action: () => appendToDisplay('(') },
        { label: ')', action: () => appendToDisplay(')') },
        { label: '÷', className: 'operator', action: () => appendToDisplay('/') },
        { label: '7', action: () => appendToDisplay('7') },
        { label: '8', action: () => appendToDisplay('8') },
        { label: '9', action: () => appendToDisplay('9') },
        { label: '×', className: 'operator', action: () => appendToDisplay('*') },
        { label: '4', action: () => appendToDisplay('4') },
        { label: '5', action: () => appendToDisplay('5') },
        { label: '6', action: () => appendToDisplay('6') },
        { label: '-', className: 'operator', action: () => appendToDisplay('-') },
        { label: '1', action: () => appendToDisplay('1') },
        { label: '2', action: () => appendToDisplay('2') },
        { label: '3', action: () => appendToDisplay('3') },
        { label: '+', className: 'operator', action: () => appendToDisplay('+') },
        { label: '0', action: () => appendToDisplay('0') },
        { label: '.', action: () => appendToDisplay('.') },
        { label: '=', className: 'equals', action: calculate }
    ];

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
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className={button.className || ''}
                  onClick={button.action}
                >
                    {button.label}
                </button>
              ))}
          </div>
      </div>
    );
};

export default withToast(Calculator);