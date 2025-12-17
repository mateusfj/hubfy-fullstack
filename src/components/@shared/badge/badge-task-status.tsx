import { Badge } from "@/src/components/ui/badge";
import { TASK_STATUS_LABELS } from "@/src/lib/utils/constants/task-status";

interface IBadgeTaskStatusProps {
  status: string;
}

interface IConfigStatus {
  label: string;
  variant: "outline" | "destructive" | "default" | "secondary" | "success";
}

const configStatus: Record<string, IConfigStatus> = {
  PENDING: { label: TASK_STATUS_LABELS.PENDING, variant: "destructive" },
  IN_PROGRESS: { label: TASK_STATUS_LABELS.IN_PROGRESS, variant: "default" },
  COMPLETED: { label: TASK_STATUS_LABELS.COMPLETED, variant: "success" },
};

export const BadgeTaskStatus = ({ status }: IBadgeTaskStatusProps) => {
  const config = configStatus[status];

  if (!config) {
    return <Badge variant="outline">Desconhecido</Badge>;
  }

  return <Badge variant={config.variant}>{config.label}</Badge>;
};
