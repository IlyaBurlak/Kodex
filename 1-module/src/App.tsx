import Calculator from './components/Calculator';
import ArrayOperations from './components/ArrayOperations';
import ImageOperations from './components/ImageOperations';
import TextOperations from './components/TextOperations';
import React, { useState } from 'react';
import {ToastProvider} from "./components/ToastContext";

type TabType = 'basic' | 'array' | 'image' | 'text';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('basic');

    return (
        <ToastProvider>
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
                    <Calculator />
                </div>
                <div className="tab-content" style={{ display: activeTab === 'array' ? 'block' : 'none' }}>
                    <ArrayOperations />
                </div>
                <div className="tab-content" style={{ display: activeTab === 'image' ? 'block' : 'none' }}>
                    <ImageOperations />
                </div>
                <div className="tab-content" style={{ display: activeTab === 'text' ? 'block' : 'none' }}>
                    <TextOperations />
                </div>
            </div>
        </ToastProvider>
    );
};

export default App;