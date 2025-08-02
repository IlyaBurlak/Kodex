import React, { useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import TodoActions from './components/TodoActions';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: '1', text: 'Изучить TypeScript', completed: true },
        { id: '2', text: 'Создать To-Do приложение', completed: false },
    ]);

    const [filter, setFilter] = useState<FilterType>('all');

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
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
            />
        </div>
    );
};

export default App;