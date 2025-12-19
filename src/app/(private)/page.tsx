"use client";

import { CustomDialog } from "@/src/components/@shared/custom-dialog/custom-dialog";
import { PageHeader } from "@/src/components/@shared/page-header/page-header";
import { TaskForm } from "@/src/components/forms/task-form/task-form";
import { TabTask } from "@/src/components/tabs/tab-task";

import { useState } from "react";

export const Page = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Minhas Tarefas"
        description="Gerencie suas tarefas aqui"
        onClick={() => setOpenDialog(true)}
        buttonText="Criar nova Tarefa"
      />

      <TabTask />

      <CustomDialog
        open={openDialog}
        onOpenChange={() => setOpenDialog(false)}
        title="Criar nova Tarefa"
        content={
          <div className="p-4">
            <TaskForm
              onClose={() => {
                setOpenDialog(false);
              }}
            />
          </div>
        }
      />
    </div>
  );
};

export default Page;
