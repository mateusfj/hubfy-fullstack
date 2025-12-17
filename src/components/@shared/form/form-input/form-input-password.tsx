import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Control } from "react-hook-form";

interface PasswordInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function FormInputPassword({
  control,
  name,
  label = "Senha",
  placeholder = "Digite sua senha",
  disabled,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder}
                disabled={disabled}
                type={showPassword ? "text" : "password"}
                className="pr-10"
              />
            </FormControl>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
