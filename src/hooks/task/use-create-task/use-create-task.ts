import { CUSTOM_TASK } from "@/src/services/endpoints/task";
import { CreateTaskSchema } from "@/src/validators/task.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTask = (invalidateQueries: object) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: CreateTaskSchema) => {
      const response = await CUSTOM_TASK.create(task);
      return response;
    },

    onMutate() {
      const toastId = toast.loading("Cadastrando usuário...");
      return { toastId };
    },

    onError(error, _, context) {
      toast.error(error.message);
      toast.dismiss(context?.toastId);
    },

    onSuccess(_, __, context) {
      toast.success("Cadastro realizado com sucesso!");
      toast.dismiss(context?.toastId);
      queryClient.invalidateQueries(invalidateQueries);
    },

    onSettled(_, __, ___, context) {
      toast.dismiss(context?.toastId);
    },
  });
};
