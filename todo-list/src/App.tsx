import React, { useCallback, useMemo, useState } from "react";
import TodoList from './components/TodoList';
import useLocalStorage from "./hooks/useLocalStorage";
import { AddTodo } from "./components/AddTodo";
import { TodoActions } from "./components/TodoActions";
import { FilterType, Todo } from "./types/todo";


const APP_STORAGE_KEY = 'todo-app-data';

const App: React.FC = () => {
    const [todos, setTodos] = useLocalStorage<Todo[]>(APP_STORAGE_KEY, [
        {
            id: '1',
            title: 'Изучить TypeScript',
            description: 'Освоить базовые концепты TS',
            completed: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '2',
            title: 'Создать To-Do приложение',
            description: 'Реализовать на React с TypeScript',
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ]);
    const [filter, setFilter] = useState<FilterType>('all');

    const addTodo = useCallback((title: string, description: string) => {
        const now = new Date();
        const newTodo: Todo = {
            id: Date.now().toString(),
            title,
            description,
            completed: false,
            createdAt: now,
            updatedAt: now
        };
        setTodos(prevTodos => [...prevTodos, newTodo]);
    }, []);

    const editTodo = useCallback((id: string, newTitle: string, newDescription: string) => {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === id
              ? {
                  ...todo,
                  title: newTitle,
                  description: newDescription,
                  updatedAt: new Date()
              }
              : todo
          )
        );
    }, []);

    const toggleTodo = useCallback((id: string) => {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
    }, []);

    const deleteTodo = useCallback((id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []);

    const clearCompleted = useCallback(() => {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    }, []);

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        });
    }, [todos, filter]);

    const count = useMemo(() => ({
        all: todos.length,
        active: todos.filter(t => !t.completed).length,
        completed: todos.filter(t => t.completed).length,
    }), [todos]);

    return (
        <div className="app">
            <h1>To-Do List</h1>
            <AddTodo onAdd={addTodo} />

            <TodoActions
                filter={filter}
                setFilter={setFilter}
                count={count}
                onClearCompleted={clearCompleted}
            />

            <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
            />
        </div>
    );
};

export default App;