import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Textarea } from "@/src/components/ui/textarea";
import { Control } from "react-hook-form";

interface TextAreaProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function FormTextArea({
  control,
  name,
  label,
  placeholder,
  disabled,
}: TextAreaProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              value={field.value ?? ""}
              className="min-h-[120px]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
