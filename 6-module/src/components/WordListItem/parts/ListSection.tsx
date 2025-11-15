import { ReactNode } from 'react';

interface ListSectionProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
}

export function ListSection<T>({ title, items, renderItem, className = '' }: ListSectionProps<T>) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      {items.map((child, index) => renderItem(child, index))}
    </div>
  );
}
