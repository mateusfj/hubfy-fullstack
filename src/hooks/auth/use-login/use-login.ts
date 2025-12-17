import { decodeToken, JwtPayloadInterface } from "@/src/lib/jwt";
import { AuthContext } from "@/src/lib/utils/providers/AuthProvider";
import { CUSTOM_AUTH } from "@/src/services/endpoints/auth";
import { IUserToken } from "@/src/types/IUser";
import { LoginSchema } from "@/src/validators/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";

export const useLogin = () => {
  const { setUser } = useContext(AuthContext);
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

    onSuccess: (data, __, context) => {
      const user: JwtPayloadInterface = decodeToken(
        data.token
      ) as JwtPayloadInterface;

      setUser({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      toast.success("Login realizado com sucesso!");
      toast.dismiss(context?.toastId);
    },

    onSettled(_, __, ___, context) {
      toast.dismiss(context?.toastId);
    },
  });
};
