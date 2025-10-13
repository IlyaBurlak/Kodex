export const FilterType = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type FilterType = typeof FilterType[keyof typeof FilterType];

export interface TodoCount {
  all: number;
  active: number;
  completed: number;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoCommonHandlers {
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}

export interface TodoProps extends TodoCommonHandlers {
  todo: Todo;
}

export interface TodoListProps extends TodoCommonHandlers {
  todos: Todo[];
}

export interface TodoActionsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  count: TodoCount;
  onClearCompleted: () => void;
}

export interface TodoFormProps {
  initialValues?: Pick<Todo, 'title' | 'description'>;
  onSubmit: (title: string, description: string) => void;
  onCancel?: () => void;
  submitText: string;
}
export interface AddTodoProps {
  onAdd: (title: string, description: string) => void;
}