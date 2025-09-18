import { memo, ReactNode } from 'react';

interface ListSectionProps {
  title: string;
  items: any[];
  renderItem: (item: any, index: number) => ReactNode;
  className?: string;
}

export const ListSection = memo(
  ({ title, items, renderItem, className = '' }: ListSectionProps) => (
    <div className={className}>
      <h3>{title}</h3>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  )
);

ListSection.displayName = 'ListSection';
