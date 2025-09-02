export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddTodoProps {
  onAdd: (title: string, description: string) => void;
}


export interface TodoActionsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  count: {
    all: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

export interface TodoProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}
export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}


export interface TodoFormProps {
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (title: string, description: string) => void;
  onCancel?: () => void;
  submitText: string;
}

export type FilterType = 'all' | 'active' | 'completed';



