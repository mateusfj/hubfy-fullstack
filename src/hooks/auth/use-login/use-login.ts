import { CUSTOM_AUTH } from "@/src/services/endpoints/auth";
import { IUserToken } from "@/src/types/IUser";
import { LoginSchema } from "@/src/validators/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (input: LoginSchema): Promise<IUserToken> => {
      const response = await CUSTOM_AUTH.login(input);
      return response;
    },

    onMutate() {
      const toastId = toast.loading("Fazendo login...");
      return { toastId };
    },

    onError(error: Error, _, context) {
      toast.error(error.message);
      toast.dismiss(context?.toastId);
    },

    onSuccess: (_, __, context) => {
      toast.success("Login realizado com sucesso!");
      toast.dismiss(context?.toastId);
    },

    onSettled(_, __, ___, context) {
      toast.dismiss(context?.toastId);
    },
  });
};
