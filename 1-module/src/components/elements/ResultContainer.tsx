import { FC }  from 'react';

import '../../styles/components/_results.scss'

interface ResultContainerProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const ResultContainer:FC<ResultContainerProps> = ({
                                                                  label,
                                                                  children,
                                                                  className = ''
                                                                }) => {
  return (
    <div className={`result-container ${className}`}>
      <label>{label}</label>
      <div>{children}</div>
    </div>
  );
};

export default ResultContainer;