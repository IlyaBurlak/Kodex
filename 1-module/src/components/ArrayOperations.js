import React, { Component } from 'react';

class ArrayOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayCount: 2,
            array1: Array(2).fill(''),
            array2: Array(2).fill(''),
            operation: 'add',
            result: null,
            showResult: false
        };
    }

    generateArrayInputs = () => {
        const { arrayCount } = this.state;
        if (isNaN(arrayCount)) {
            this.props.showToast('Введите корректное количество элементов');
            return;
        }

        if (arrayCount < 2 || arrayCount > 10) {
            this.props.showToast('Количество элементов должно быть от 2 до 10');
            return;
        }

        this.setState({
            array1: Array(arrayCount).fill(''),
            array2: Array(arrayCount).fill(''),
            result: null,
            showResult: false
        });
    };

    handleArrayCountChange = (e) => {
        this.setState({ arrayCount: parseInt(e.target.value) || 0 });
    };

    handleArray1Change = (index, value) => {
        const newArray = [...this.state.array1];
        newArray[index] = value;
        this.setState({ array1: newArray });
    };

    handleArray2Change = (index, value) => {
        const newArray = [...this.state.array2];
        newArray[index] = value;
        this.setState({ array2: newArray });
    };

    handleOperationChange = (e) => {
        this.setState({ operation: e.target.value });
    };

    calculateArray = () => {
        const { array1, array2, operation } = this.state;
        let hasEmptyFields = false;

        if (operation === 'add') {
            hasEmptyFields = array1.some(val => val === '') || array2.some(val => val === '');
        } else {
            hasEmptyFields = array1.some(val => val === '');
        }

        if (hasEmptyFields) {
            this.props.showToast('Заполните все поля в массивах');
            return;
        }

        let result;
        if (operation === 'add') {
            const arr1 = array1.map(val => parseFloat(val) || 0);
            const arr2 = array2.map(val => parseFloat(val) || 0);
            if (arr1.length !== arr2.length) {
                this.props.showToast('Массивы должны быть одинаковой длины');
                return;
            }
            result = arr1.map((num, i) => num + arr2[i]);
        } else if (operation === 'average') {
            const arr = array1.map(val => parseFloat(val) || 0);
            const sum = arr.reduce((acc, num) => acc + num, 0);
            result = (sum / arr.length).toFixed(2);
        }

        this.setState({ result, showResult: true });
    };

    render() {
        const { arrayCount, array1, array2, operation, result, showResult } = this.state;

        return (
            <div>
                <div className="input-group">
                    <label>Количество элементов массива (2-10):</label>
                    <input
                        type="number"
                        value={arrayCount}
                        min="2"
                        max="10"
                        onChange={this.handleArrayCountChange}
                    />
                    <button className="generate-btn" onClick={this.generateArrayInputs}>Сгенерировать поля</button>
                </div>

                <div className="input-group">
                    <label>Массив 1:</label>
                    <div className="array-inputs">
                        {array1.map((value, index) => (
                            <input
                                key={index}
                                type="number"
                                className="array-input"
                                placeholder={`Элемент ${index + 1}`}
                                value={value}
                                onChange={(e) => this.handleArray1Change(index, e.target.value)}
                                required
                            />
                        ))}
                    </div>
                </div>

                <div className="input-group">
                    <label>Массив 2:</label>
                    <div className="array-inputs">
                        {array2.map((value, index) => (
                            <input
                                key={index}
                                type="number"
                                className="array-input"
                                placeholder={`Элемент ${index + 1}`}
                                value={value}
                                onChange={(e) => this.handleArray2Change(index, e.target.value)}
                                required
                                disabled={operation === 'average'}
                            />
                        ))}
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="array-operation">Операция:</label>
                    <select
                        id="array-operation"
                        value={operation}
                        onChange={this.handleOperationChange}
                    >
                        <option value="add">Сложение массивов</option>
                        <option value="average">Среднее арифметическое</option>
                    </select>
                </div>

                <button className="calculate-btn" onClick={this.calculateArray}>Вычислить</button>

                {showResult && (
                    <div className="result-container">
                        <div className="result-title">Результат:</div>
                        <div>
                            {Array.isArray(result) ? `[${result.join(', ')}]` : result}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ArrayOperations;