"use client";

import { FormInput } from "../../@shared/form/form-input/form-input";
import { FormInputPassword } from "../../@shared/form/form-input/form-input-password";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import { useLoginForm } from "./use-login-form";

const LoginForm = () => {
  const { form, onSubmit, isPending } = useLoginForm();
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Digite seu email"
          />
          <FormInputPassword control={form.control} name="password" />
          <Button
            className="w-full cursor-pointer"
            type="submit"
            disabled={form.formState.isSubmitting || isPending}
          >
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { LoginForm };
