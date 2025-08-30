import React from 'react';

interface ResultContainerProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const ResultContainer: React.FC<ResultContainerProps> = ({
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