import React from 'react';
import './TabPanel.scss';

type Tab = {
    label: string;
};

type TabPanelProps = {
    tabs: Tab[];
    activeTab: number;
    onTabChange: (index: number) => void;
};

const TabPanel: React.FC<TabPanelProps> = ({
                                               tabs,
                                               activeTab,
                                               onTabChange
                                           }) => {
    return (
        <div className="tab-panel">
            <div className="tabs-container">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab ${activeTab === index ? 'active' : ''}`}
                        onClick={() => onTabChange(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className={`tab-indicator ${activeTab === 0 ? 'left' : 'right'}`} />
        </div>
    );
};

export default TabPanel;