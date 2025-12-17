import { TaskStatus } from "@/src/types/ITask";

export const TASK_STATUS = [
  { value: TaskStatus.PENDING, label: "Pendente" },
  { value: TaskStatus.IN_PROGRESS, label: "Em progresso" },
  { value: TaskStatus.COMPLETED, label: "Concluído" },
];
