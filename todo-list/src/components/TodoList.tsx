import type { FC } from 'react';
import { TodoItem } from "./TodoItem";
import { TodoListProps } from "../types/todo";
import '../styles/TodoList.scss'

const TodoList: FC<TodoListProps> = ({
                                             todos,
                                             onToggle,
                                             onDelete,
                                             onEdit
                                           }) => {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p>Нет задач! Добавьте новую задачу.</p>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;