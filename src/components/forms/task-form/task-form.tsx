"use client";

import { TASK_STATUS } from "@/src/lib/utils/constants/task-status";
import { FormInput } from "../../@shared/form/form-input/form-input";
import { FormSelect } from "../../@shared/form/form-select/form-select";
import { FormTextArea } from "../../@shared/form/form-textarea/form-textarea";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import { useTaskForm } from "./use-task-form";
import { Spinner } from "../../ui/spinner";

interface TaskFormProps {
  onClose?: () => void;
  taskId?: number;
}

const TaskForm = ({ onClose, taskId }: TaskFormProps) => {
  const { form, onSubmit, isErrorTask, isLoadingTask, resultTask } =
    useTaskForm({
      onClose,
      taskId,
    });

  if (isErrorTask) {
    return <div>Erro ao carregar a vaga.</div>;
  }

  if (isLoadingTask) {
    return (
      <div className="flex justify-center items-center p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <FormInput
            control={form.control}
            name="title"
            label="Título"
            placeholder="Digite o título da vaga"
          />

          <FormSelect
            control={form.control}
            name="status"
            label="Status"
            options={TASK_STATUS}
            defaultValue={resultTask?.status}
          />

          <FormTextArea
            control={form.control}
            name="description"
            label="Descrição"
            placeholder="Digite a descrição da vaga"
          />

          <div className="flex justify-end gap-2">
            {onClose && (
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                disabled={form.formState.isSubmitting}
              >
                Cancelar
              </Button>
            )}
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export { TaskForm };
