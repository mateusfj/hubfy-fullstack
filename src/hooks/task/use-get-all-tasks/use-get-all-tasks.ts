import { CUSTOM_TASK } from "@/src/services/endpoints/task";
import { TASK_QUERY_KEY } from "@/src/services/query-keys/task/task";
import { useQuery } from "@tanstack/react-query";

interface useGetAllTasksProps {
  enabled?: boolean;
}

export const useGetAllTasks = ({ enabled = true }: useGetAllTasksProps) => {
  return useQuery({
    enabled,
    queryKey: TASK_QUERY_KEY.list({}),
    queryFn: async () => {
      const response = await CUSTOM_TASK.getList();
      return response.tasks;
    },
  });
};
