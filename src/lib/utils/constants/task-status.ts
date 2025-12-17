import { TaskStatus } from "@/src/types/ITask";

export const TASK_STATUS = [
  { value: TaskStatus.PENDING, label: "Pendente" },
  { value: TaskStatus.IN_PROGRESS, label: "Em progresso" },
  { value: TaskStatus.COMPLETED, label: "Concluído" },
];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: "Pendente",
  [TaskStatus.IN_PROGRESS]: "Em progresso",
  [TaskStatus.COMPLETED]: "Concluído",
};
