import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoActions from './components/TodoActions';
import useLocalStorage from "./hooks/useLocalStorage";
import AddTodo from "./components/AddTodo";

export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const APP_STORAGE_KEY = 'todo-app-data';

type FilterType = 'all' | 'active' | 'completed';

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

    const addTodo = (title: string, description: string) => {
        const now = new Date();
        const newTodo: Todo = {
            id: Date.now().toString(),
            title,
            description,
            completed: false,
            createdAt: now,
            updatedAt: now
        };
        setTodos([...todos, newTodo]);
    };

    const editTodo = (id: string, newTitle: string, newDescription: string) => {
        setTodos(
            todos.map(todo =>
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
    };

    const toggleTodo = (id: string) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const count = {
        all: todos.length,
        active: todos.filter(t => !t.completed).length,
        completed: todos.filter(t => t.completed).length,
    };

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