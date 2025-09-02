import React from 'react';
import { FC } from 'react';



interface InputGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const InputGroup:FC<InputGroupProps> = ({ label, children, className = '' }) => {
  return (
    <div className={`input-group ${className}`}>
      <label>{label}</label>
      {children}
    </div>
  );
};