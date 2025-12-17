import { CUSTOM_TASK } from "@/src/services/endpoints/task";
import { UpdateTaskSchema } from "@/src/validators/task.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateTaskProps {
  data: UpdateTaskSchema;
  id: number;
}

export const useUpdateTask = (invalidateQueries: object) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: UpdateTaskProps) => {
      const response = await CUSTOM_TASK.patch(data, id);
      return response;
    },

    onMutate() {
      const toastId = toast.loading("Atualizando tarefa...");
      return { toastId };
    },

    onError(error, _, context) {
      toast.error(error.message);
      toast.dismiss(context?.toastId);
    },

    onSuccess(_, __, context) {
      toast.success("Tarefa atualizada com sucesso!");
      toast.dismiss(context?.toastId);
      queryClient.invalidateQueries(invalidateQueries);
    },

    onSettled(_, __, ___, context) {
      toast.dismiss(context?.toastId);
    },
  });
};
