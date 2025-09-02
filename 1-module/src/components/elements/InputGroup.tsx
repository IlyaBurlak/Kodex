import React from 'react';


interface InputGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ label, children, className = '' }) => {
  return (
    <div className={`input-group ${className}`}>
      <label>{label}</label>
      {children}
    </div>
  );
};