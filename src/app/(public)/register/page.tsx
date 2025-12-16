import { RegisterForm } from "@/src/components/forms/register-form/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Cadastrar</CardTitle>
            <CardDescription>
              Digite seus dados abaixo para cadastrar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter className="text-center pb-6">
            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link className="text-primary hover:underline" href="/login">
                Entrar
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
