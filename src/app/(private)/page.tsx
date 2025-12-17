"use client";

import { CustomDialog } from "@/src/components/@shared/custom-dialog/custom-dialog";
import { PageHeader } from "@/src/components/@shared/page-header/page-header";
import { TaskForm } from "@/src/components/forms/task-form/task-form";
import { TaskTable } from "@/src/components/tables/task-table/task-table";
import { useState } from "react";

export const Page = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Minhas Tasks"
        description="Gerencie suas tasks aqui"
        onClick={() => setOpenDialog(true)}
        buttonText="Criar nova Task"
      />
      <TaskTable />
      <CustomDialog
        open={openDialog}
        onOpenChange={() => setOpenDialog(false)}
        title="Criar nova Task"
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
