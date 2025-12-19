import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useGetTask } from "@/src/hooks/task/use-get-task/use-get-task";
import { useCreateTask } from "@/src/hooks/task/use-create-task/use-create-task";
import { TASK_QUERY_KEY } from "@/src/services/query-keys/task/task";
import { useUpdateTask } from "@/src/hooks/task/use-update-task/use-update-task";
import {
  createTaskSchema,
  CreateTaskSchema,
} from "@/src/validators/task.schema";
import { AuthContext } from "@/src/lib/utils/providers/AuthProvider";
import { TaskStatus } from "@/src/types/ITask";

interface UseTaskFormProps {
  onClose?: () => void;
  taskId?: number;
  status?: TaskStatus;
}

export const useTaskForm = ({ onClose, taskId, status }: UseTaskFormProps) => {
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
      description: undefined,
      status: status,
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
    } else {
      await createTask(values);
    }
    form.reset();
    onClose?.();
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
