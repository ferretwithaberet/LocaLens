import { UseFormReturn } from "react-hook-form";

export const getFieldErrorMessage = (form: UseFormReturn, field: string) => {
  return form.formState?.errors?.[field]?.message as string;
};
