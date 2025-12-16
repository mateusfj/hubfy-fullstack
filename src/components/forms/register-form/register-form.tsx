"use client";

import { useRegisterForm } from "./use-register-form";
import { FormInput } from "../../@shared/form/form-input/form-input";
import { FormInputPassword } from "../../@shared/form/form-input/form-input-password";
import { Form } from "../../ui/form";
import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";

const RegisterForm = () => {
  const { form, onSubmit, isCreatingUser } = useRegisterForm();

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <FormInput
          control={form.control}
          name="name"
          label="Nome"
          placeholder="Digite seu nome completo"
          disabled={form.formState.isSubmitting}
        />

        <FormInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Digite seu email"
          disabled={form.formState.isSubmitting}
        />

        <FormInputPassword
          control={form.control}
          name="password"
          disabled={form.formState.isSubmitting}
        />

        <FormInputPassword
          control={form.control}
          name="confirmPassword"
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
        />

        <Button
          className="cursor-pointer w-full"
          onClick={form.handleSubmit(onSubmit)}
          type="button"
          disabled={isCreatingUser || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Spinner /> Cadastrando...
            </>
          ) : (
            "Registrar"
          )}
        </Button>
      </div>
    </Form>
  );
};

export { RegisterForm };
