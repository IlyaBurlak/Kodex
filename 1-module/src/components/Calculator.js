import React, { Component } from 'react';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentInput: '0'
        };
    }

    appendToDisplay = (value) => {
        this.setState(prevState => {
            let currentInput = prevState.currentInput;
            if (currentInput === 'Ошибка') {
                currentInput = '0';
            }

            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            return { currentInput };
        });
    };

    clearDisplay = () => {
        this.setState({ currentInput: '0' });
    };

    calculate = () => {
        try {
            const expression = this.state.currentInput.replace(/×/g, '*');
            const result = eval(expression);

            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Недопустимая операция');
            }

            this.setState({ currentInput: result.toString() });
        } catch (error) {
            this.setState({ currentInput: '0' });
            this.props.showToast('Ошибка вычисления: ' + error.message);
        }
    };

    render() {
        return (
            <div className="calculator">
                <div className="display">
                    <input
                        type="text"
                        id="result"
                        readOnly
                        value={this.state.currentInput}
                    />
                </div>
                <div className="buttons">
                    <button className="clear" onClick={this.clearDisplay}>C</button>
                    <button onClick={() => this.appendToDisplay('(')}>(</button>
                    <button onClick={() => this.appendToDisplay(')')}>)</button>
                    <button className="operator" onClick={() => this.appendToDisplay('/')}>/</button>

                    <button onClick={() => this.appendToDisplay('7')}>7</button>
                    <button onClick={() => this.appendToDisplay('8')}>8</button>
                    <button onClick={() => this.appendToDisplay('9')}>9</button>
                    <button className="operator" onClick={() => this.appendToDisplay('*')}>×</button>

                    <button onClick={() => this.appendToDisplay('4')}>4</button>
                    <button onClick={() => this.appendToDisplay('5')}>5</button>
                    <button onClick={() => this.appendToDisplay('6')}>6</button>
                    <button className="operator" onClick={() => this.appendToDisplay('-')}>-</button>

                    <button onClick={() => this.appendToDisplay('1')}>1</button>
                    <button onClick={() => this.appendToDisplay('2')}>2</button>
                    <button onClick={() => this.appendToDisplay('3')}>3</button>
                    <button className="operator" onClick={() => this.appendToDisplay('+')}>+</button>

                    <button onClick={() => this.appendToDisplay('0')}>0</button>
                    <button onClick={() => this.appendToDisplay('.')}>.</button>
                    <button className="equals" onClick={this.calculate}>=</button>
                </div>
            </div>
        );
    }
}

export default Calculator;