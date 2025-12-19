import { Plus } from "lucide-react";
import { Skeleton } from "../../skeleton";

export const KanbanSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, columnIndex) => (
        <div
          key={columnIndex}
          className="rounded-lg border bg-background p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Plus className="h-4 w-4 text-muted-foreground opacity-40" />
          </div>

          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="relative rounded-lg border p-3 space-y-2"
              >
                <Skeleton className="absolute left-0 top-0 h-full w-1 rounded-l-lg" />

                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
