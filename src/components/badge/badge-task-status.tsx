import { Badge } from "@/src/components/ui/badge";
import { getTaskStatusConfig } from "@/src/lib/utils/functions/taskStatus";
import { TaskStatus } from "@/src/types/ITask";

interface IBadgeTaskStatusProps {
  status: TaskStatus;
}

export const BadgeTaskStatus = ({ status }: IBadgeTaskStatusProps) => {
  const config = getTaskStatusConfig(status);

  return (
    <div className="flex items-center gap-1">
      {config.icon}
      <Badge variant={config.variant}>{config.label}</Badge>
    </div>
  );
};
