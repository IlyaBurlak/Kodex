import React from 'react';
import { TodoForm } from './TodoForm';

interface AddTodoProps {
  onAdd: (title: string, description: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  return <TodoForm onSubmit={onAdd} submitText="Добавить" />;
};