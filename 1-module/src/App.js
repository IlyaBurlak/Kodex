import React, { Component } from 'react';
import Calculator from './components/Calculator';
import ArrayOperations from './components/ArrayOperations';
import ImageOperations from './components/ImageOperations';
import TextOperations from './components/TextOperations';
import Toast from './components/Toast';
import './css/main.css';
import './css/calculator.css';
import './css/array.css';
import './css/image.css';
import './css/text.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'basic',
            toasts: []
        };
    }

    changeTab = (tabId) => {
        this.setState({ activeTab: tabId });
    };

    showToast = (message, type = 'error') => {
        const id = Date.now();
        this.setState(prevState => ({
            toasts: [...prevState.toasts, { id, message, type }]
        }));

        setTimeout(() => {
            this.removeToast(id);
        }, 3000);
    };

    removeToast = (id) => {
        this.setState(prevState => ({
            toasts: prevState.toasts.filter(toast => toast.id !== id)
        }));
    };

    render() {
        const { activeTab, toasts } = this.state;

        return (
            <>
                <Toast toasts={toasts} removeToast={this.removeToast} />

            <div className="app-container">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
                        onClick={() => this.changeTab('basic')}
                    >
                        Калькулятор
                    </div>
                    <div
                        className={`tab ${activeTab === 'array' ? 'active' : ''}`}
                        onClick={() => this.changeTab('array')}
                    >
                        Массивы
                    </div>
                    <div
                        className={`tab ${activeTab === 'image' ? 'active' : ''}`}
                        onClick={() => this.changeTab('image')}
                    >
                        Изображения
                    </div>
                    <div
                        className={`tab ${activeTab === 'text' ? 'active' : ''}`}
                        onClick={() => this.changeTab('text')}
                    >
                        Текст
                    </div>
                </div>

                <div className="tab-content" style={{ display: activeTab === 'basic' ? 'block' : 'none' }}>
                    <Calculator showToast={this.showToast} />
                </div>
                <div className="tab-content" style={{ display: activeTab === 'array' ? 'block' : 'none' }}>
                    <ArrayOperations showToast={this.showToast} />
                </div>
                <div className="tab-content" style={{ display: activeTab === 'image' ? 'block' : 'none' }}>
                    <ImageOperations showToast={this.showToast} />
                </div>
                <div className="tab-content" style={{ display: activeTab === 'text' ? 'block' : 'none' }}>
                    <TextOperations showToast={this.showToast} />
                </div>
            </div>
            </>
        );
    }
}

export default App;