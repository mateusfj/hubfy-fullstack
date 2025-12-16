import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RegisterForm, registerSchema } from "./register-schema";
import { useCreateUser } from "@/src/hooks/auth/use-register-user/use-register-user";

export const useRegisterForm = () => {
  const { push } = useRouter();
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();

  const form = useForm<RegisterForm>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterForm): Promise<void> {
    await createUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    push("/login");
  }

  return { form, onSubmit, isCreatingUser };
};
