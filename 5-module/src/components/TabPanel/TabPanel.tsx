import { FC } from 'react';
import './TabPanel.scss';
import { TabPanelProps } from '../../types/joke';

const TabPanel: FC<TabPanelProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className='tab-panel'>
      <div className='tabs-container'>
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
