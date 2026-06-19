import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: {
    all: number;
    "done": number;
    "in-progress": number;
    "under-review": number;
  };
}

export function FilterBar({ activeFilter, onFilterChange, counts }: FilterBarProps) {
  const filters = [
    { id: "all", label: `All (${counts.all})` },
    { id: "in-progress", label: `In Progress (${counts["in-progress"]})` },
    { id: "under-review", label: `Under Review (${counts["under-review"]})` },
    { id: "done", label: `Completed (${counts["done"]})` },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-2 mb-4">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "rounded-full",
            activeFilter === filter.id ? "filter-button-active" : "filter-button-inactive"
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}