import React, { useState } from 'react';
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

const App = () => {
    const [activeTab, setActiveTab] = useState('basic');
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'error') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <>
            <Toast toasts={toasts} removeToast={removeToast} />

            <div className="app-container">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
                        onClick={() => setActiveTab('basic')}
                    >
                        Калькулятор
                    </div>
                    <div
                        className={`tab ${activeTab === 'array' ? 'active' : ''}`}
                        onClick={() => setActiveTab('array')}
                    >
                        Массивы
                    </div>
                    <div
                        className={`tab ${activeTab === 'image' ? 'active' : ''}`}
                        onClick={() => setActiveTab('image')}
                    >
                        Изображения
                    </div>
                    <div
                        className={`tab ${activeTab === 'text' ? 'active' : ''}`}
                        onClick={() => setActiveTab('text')}
                    >
                        Текст
                    </div>
                </div>

                <div className="tab-content" style={{ display: activeTab === 'basic' ? 'block' : 'none' }}>
                    <Calculator showToast={showToast} />
                </div>
                <div className="tab-content" style={{ display: activeTab === 'array' ? 'block' : 'none' }}>
                    <ArrayOperations showToast={showToast} />
                </div>
                <div className="tab-content" style={{ display: activeTab === 'image' ? 'block' : 'none' }}>
                    <ImageOperations showToast={showToast} />
                </div>
                <div className="tab-content" style={{ display: activeTab === 'text' ? 'block' : 'none' }}>
                    <TextOperations showToast={showToast} />
                </div>
            </div>
        </>
    );
};

export default App;