import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useGetTask } from "@/src/hooks/task/use-get-task/use-get-task";
import { useCreateTask } from "@/src/hooks/task/use-create-taks/use-create-taks";
import { TASK_QUERY_KEY } from "@/src/services/query-keys/task/task";
import { useUpdateTask } from "@/src/hooks/task/use-update-task/use-update-task";
import {
  createTaskSchema,
  CreateTaskSchema,
} from "@/src/validators/task.schema";
import { TaskStatus } from "@/src/types/ITask";
import { AuthContext } from "@/src/lib/utils/providers/AuthProvider";

interface UseTaskFormProps {
  onClose?: () => void;
  taskId?: number;
}

export const useTaskForm = ({ onClose, taskId }: UseTaskFormProps) => {
  const { user } = useContext(AuthContext);
  const {
    data: resultTask,
    isLoading: isLoadingTask,
    isError: isErrorTask,
  } = useGetTask({
    taskId: taskId ?? 0,
    enabled: !!taskId,
  });

  const { mutateAsync: createTask, isPending: isCreating } = useCreateTask(
    TASK_QUERY_KEY.list
  );

  const { mutateAsync: updateTask, isPending: isUpdating } = useUpdateTask(
    TASK_QUERY_KEY.list
  );

  const form = useForm<CreateTaskSchema>({
    defaultValues: {
      userId: user?.id ?? 0,
      title: "",
      description: "",
      status: TaskStatus.PENDING,
    },
    resolver: zodResolver(createTaskSchema),
  });

  useEffect(() => {
    if (resultTask) {
      form.reset({
        userId: resultTask.userId,
        title: resultTask.title,
        description: resultTask.description ?? "",
        status: resultTask.status,
      });
    }
  }, [resultTask, form]);

  async function onSubmit(values: CreateTaskSchema): Promise<void> {
    if (taskId) {
      await updateTask({ data: values, id: taskId });
      onClose?.();
    } else {
      await createTask(values);
      onClose?.();
    }
    form.reset();
  }

  return {
    form,
    onSubmit,
    isLoadingTask,
    isErrorTask,
    resultTask,
    isCreating,
    isUpdating,
  };
};
