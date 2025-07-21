import React, { Component } from 'react';
import { escapeRegExp } from '../utils/helpers';

class TextOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            findChar: '',
            replaceChar: '',
            result: '',
            showResult: false
        };
    }

    handleTextChange = (e) => {
        this.setState({ text: e.target.value });
    };

    handleFindChange = (e) => {
        this.setState({ findChar: e.target.value });
    };

    handleReplaceChange = (e) => {
        this.setState({ replaceChar: e.target.value });
    };

    replaceText = () => {
        const { text, findChar, replaceChar } = this.state;

        if (!text.trim()) {
            this.props.showToast('Введите текст');
            return;
        }

        if (!findChar) {
            this.props.showToast('Введите символ для замены');
            return;
        }

        if (findChar.length > 1) {
            this.props.showToast('Введите только один символ для замены');
            return;
        }

        if (replaceChar.length > 1) {
            this.props.showToast('Введите только один символ замены');
            return;
        }

        const result = text.replace(new RegExp(escapeRegExp(findChar), 'g'), replaceChar);
        this.setState({ result, showResult: true });
    };

    render() {
        const { text, findChar, replaceChar, result, showResult } = this.state;

        return (
            <div>
                <div className="input-group">
                    <label htmlFor="text-input">Исходный текст:</label>
                    <textarea
                        id="text-input"
                        rows="5"
                        value={text}
                        onChange={this.handleTextChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="text-find">Символ для замены:</label>
                    <input
                        type="text"
                        id="text-find"
                        maxLength="1"
                        value={findChar}
                        onChange={this.handleFindChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="text-replace">Заменить на:</label>
                    <input
                        type="text"
                        id="text-replace"
                        maxLength="1"
                        value={replaceChar}
                        onChange={this.handleReplaceChange}
                    />
                </div>

                <button className="replace-btn" onClick={this.replaceText}>Заменить</button>

                {showResult && (
                    <div className="result-container">
                        <div className="result-title">Результат:</div>
                        <div>{result}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default TextOperations;