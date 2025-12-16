import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
  defaultValue?: string;
}

export function FormSelect({
  control,
  name,
  label,
  placeholder = "Selecione...",
  options,
  disabled = false,
  defaultValue,
}: FormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={defaultValue}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
