import { CUSTOM_AUTH } from "@/src/services/endpoints/auth";
import { IUser } from "@/src/types/IUser";
import { RegisterSchema } from "@/src/validators/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (user: RegisterSchema): Promise<IUser> => {
      const response: IUser = await CUSTOM_AUTH.create(user);
      return response;
    },

    onMutate() {
      const toastId: string | number = toast.loading("Cadastrando usuário...");
      return { toastId };
    },

    onError(error: Error, _, context) {
      toast.error(error.message);
      toast.dismiss(context?.toastId);
    },

    onSuccess(_, __, context) {
      toast.success("Cadastro realizado com sucesso!");
      toast.dismiss(context?.toastId);
    },

    onSettled(_, __, ___, context) {
      toast.dismiss(context?.toastId);
    },
  });
};
