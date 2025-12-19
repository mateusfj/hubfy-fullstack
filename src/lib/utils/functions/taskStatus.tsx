import { CheckCircle2, Clock, HelpCircle, Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface TaskStatusConfig {
  label: string;
  icon: ReactNode;
  variant?:
    | "outline"
    | "destructive"
    | "default"
    | "secondary"
    | "success"
    | "warning";
}

const STATUS_CONFIG = {
  PENDING: {
    label: "Pendente",
    icon: <Clock className="h-4 w-4 text-yellow-500" />,
    variant: "warning",
  },
  IN_PROGRESS: {
    label: "Em Progresso",
    icon: <Loader2 className="h-4 w-4 text-blue-500" />,
    variant: "default",
  },
  COMPLETED: {
    label: "Concluído",
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    variant: "success",
  },
} as const;

export type TaskStatus = keyof typeof STATUS_CONFIG;

const DEFAULT_STATUS: TaskStatusConfig = {
  label: "Desconhecido",
  icon: <HelpCircle className="h-4 w-4 text-muted-foreground" />,
};

export function getTaskStatusConfig(status?: TaskStatus) {
  const config = status ? STATUS_CONFIG[status] : DEFAULT_STATUS;
  return config;
}
