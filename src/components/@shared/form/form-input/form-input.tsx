import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Control } from "react-hook-form";

interface TextInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  mask?: (value: string) => string;
}

export function FormInput({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled,
  mask,
}: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => {
                const value = e.target.value;
                const maskedValue = mask ? mask(value) : value;
                field.onChange(maskedValue);
              }}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
