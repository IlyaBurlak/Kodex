import { FC } from 'react';
import { TodoForm } from './TodoForm';
import { AddTodoProps } from "../types/todo";

export const AddTodo: FC<AddTodoProps> = ({ onAdd }) => {
  return <TodoForm onSubmit={onAdd} submitText="Добавить" />;
};