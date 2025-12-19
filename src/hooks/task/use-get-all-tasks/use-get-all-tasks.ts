import { CUSTOM_TASK } from "@/src/services/endpoints/task";
import { TASK_QUERY_KEY } from "@/src/services/query-keys/task/task";
import { TaskStatus } from "@/src/types/ITask";
import { QuerySchema } from "@/src/validators/query.schema";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";

interface useGetAllTasksProps extends Omit<QuerySchema, "page" | "limit"> {
  enabled?: boolean;
  status?: TaskStatus;
  pagination?: PaginationState;
}

export const useGetAllTasks = ({
  enabled = true,
  status,
  search,
  orderBy,
  orderDirection,
  pagination,
}: useGetAllTasksProps) => {
  const statusFilter = status ? `status=${status}` : "";
  const paginationFilter = pagination
    ? `&page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`
    : "";
  const searchFilter = search ? `&search=${search}` : "";
  const orderByFilter = orderBy ? `&orderBy=${orderBy}` : "";
  const orderDirectionFilter = orderDirection
    ? `&orderDirection=${orderDirection}`
    : "";
  const urlFilter = `?${statusFilter}${paginationFilter}${searchFilter}${orderByFilter}${orderDirectionFilter}`;

  return useQuery({
    enabled,
    queryKey: TASK_QUERY_KEY.list({
      status,
      search,
      orderBy,
      orderDirection,
      pagination,
    }),
    queryFn: async () => {
      const response = await CUSTOM_TASK.getList(urlFilter);
      return response;
    },
  });
};
