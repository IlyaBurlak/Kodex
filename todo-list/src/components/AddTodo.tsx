import React from 'react';
import { TodoForm } from './TodoForm';
import { AddTodoProps } from "../types/todo";

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  return <TodoForm onSubmit={onAdd} submitText="Добавить" />;
};