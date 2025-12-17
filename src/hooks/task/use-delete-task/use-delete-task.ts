import { CUSTOM_TASK } from "@/src/services/endpoints/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTask = (invalidateQueries: object) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      const response = await CUSTOM_TASK.deleteOne(id);
      return response;
    },

    onMutate() {
      const toastId = toast.loading("Deletando tarefa...");
      return { toastId };
    },

    onError(error: Error, _, context) {
      toast.error(error.message);
      toast.dismiss(context?.toastId);
    },

    onSuccess(_, __, context) {
      toast.success("Tarefa deletada com sucesso!");
      toast.dismiss(context?.toastId);
    },

    onSettled(_, __, ___, context) {
      toast.dismiss(context?.toastId);
      queryClient.invalidateQueries(invalidateQueries);
    },
  });
};
