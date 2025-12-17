import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { LoginForm, loginSchema } from "./login-schema";
import { useLogin } from "@/src/hooks/auth/use-login/use-login";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  const { push } = useRouter();
  const { mutateAsync: login, isPending } = useLogin();
  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginForm): Promise<void> {
    await login({ email: values.email, password: values.password });
    push("/");
  }

  return { form, onSubmit, isPending };
};
