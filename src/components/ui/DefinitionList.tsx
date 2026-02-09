import { ReactNode } from "react";

type DefinitionListItem = {
  term: string;
  description: ReactNode;
};

type DefinitionListProps = {
  items: DefinitionListItem[];
};

export function DefinitionList({ items }: DefinitionListProps) {
  return (
    <dl className="space-y-4">
      {items.map((item) => (
        <div
          key={item.term}
          className="grid gap-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-4"
        >
          <dt className="text-sm font-semibold text-[var(--foreground)]">
            {item.term}
          </dt>
          <dd className="text-sm text-[var(--muted)]">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
