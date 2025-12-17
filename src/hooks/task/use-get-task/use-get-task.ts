import { CUSTOM_TASK } from "@/src/services/endpoints/task";
import { TASK_QUERY_KEY } from "@/src/services/query-keys/task/task";
import { useQuery } from "@tanstack/react-query";

interface useGetTaskProps {
  taskId: number;
  enabled?: boolean;
}

export const useGetTask = ({ taskId, enabled = true }: useGetTaskProps) => {
  return useQuery({
    enabled,
    queryKey: TASK_QUERY_KEY.detail(taskId),
    queryFn: async () => {
      const response = await CUSTOM_TASK.getOne(taskId);
      return response.task;
    },
  });
};
