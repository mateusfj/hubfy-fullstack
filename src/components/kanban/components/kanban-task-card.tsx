import { getTaskStatusConfig } from "@/src/lib/utils/functions/taskStatus";
import { TaskStatus } from "@/src/types/ITask";
import { memo } from "react";
import { Calendar } from "lucide-react";
import { formatDate } from "@/src/lib/utils/functions/masksDate";

type Props = {
  name: string;
  startAt: Date | string;
  status: TaskStatus;
};

export const KanbanTaskCard = memo(({ name, startAt, status }: Props) => {
  const { icon, label } = getTaskStatusConfig(status);

  return (
    <>
      <div className="flex items-center gap-2">
        <p className="flex-1 font-medium text-sm">{name}</p>

        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          {formatDate(startAt)}
          <Calendar size={12} />
        </p>
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </p>
    </>
  );
});

KanbanTaskCard.displayName = "KanbanTaskCard";
