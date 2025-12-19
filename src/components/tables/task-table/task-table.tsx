"use client";

import { useDeleteTask } from "@/src/hooks/task/use-delete-task/use-delete-task";
import { useGetAllTasks } from "@/src/hooks/task/use-get-all-tasks/use-get-all-tasks";
import { TASK_QUERY_KEY } from "@/src/services/query-keys/task/task";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { DataTable } from "../../@shared/data-table/data-table";
import { ITask, TaskStatus } from "@/src/types/ITask";
import { DataTableColumnHeader } from "../../@shared/data-table/data-table-column-header";
import { CustomDialog } from "../../@shared/custom-dialog/custom-dialog";
import { TaskForm } from "../../forms/task-form/task-form";
import { BadgeTaskStatus } from "../../badge/badge-task-status";
import { textLimiter } from "@/src/lib/utils/functions/textLimitter";
import { TaskTableFilters } from "./components/task-table-filters";

export const TaskTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus | "">("");

  const {
    data: taskResult,
    isLoading: tasksIsLoading,
    isError: tasksIsError,
  } = useGetAllTasks({
    pagination,
    search,
    status: status === "" ? undefined : (status as TaskStatus),
  });

  const { mutateAsync: deleteTask, isPending: isDeleting } = useDeleteTask(
    TASK_QUERY_KEY.list
  );

  const openDeleteModal = (id: number): void => {
    setSelectedTaskId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteModal = (): void => {
    setIsDeleteDialogOpen(false);
    setSelectedTaskId(null);
  };

  const handleDeleteTask = async (taskId: number): Promise<void> => {
    await deleteTask(taskId);
    closeDeleteModal();
  };

  const columns: ColumnDef<ITask>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Título" />;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Status" />;
      },
      cell: ({ row }) => {
        return <p>{BadgeTaskStatus({ status: row.getValue("status") })}</p>;
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Descrição" />;
      },
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return <p>{textLimiter(description, 40) ?? "Sem descrição"}</p>;
      },
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="space-x-2">
            <Button
              variant="default"
              size="icon"
              onClick={() => {
                setOpenDialog(true);
                setSelectedTaskId(row.original.id!);
              }}
            >
              <Edit />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => openDeleteModal(row.original.id!)}
            >
              <Trash />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <TaskTableFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      <DataTable
        total={taskResult?.meta.total ?? 0}
        columns={columns}
        data={taskResult?.tasks ?? []}
        onSetPagination={setPagination}
        pagination={pagination}
        isLoading={tasksIsLoading}
        isError={tasksIsError}
      />
      <CustomDialog
        open={openDialog}
        onOpenChange={() => setOpenDialog(false)}
        title="Editar Tarefa"
        content={
          <div className="p-4">
            <TaskForm
              taskId={selectedTaskId ?? undefined}
              onClose={() => {
                setOpenDialog(false);
              }}
            />
          </div>
        }
      />
      <CustomDialog
        open={isDeleteDialogOpen}
        onOpenChange={closeDeleteModal}
        title="Deletar vaga"
        content={
          <p className="p-4 text-sm text-muted-foreground">
            Deseja realmente deletar esta vaga? Esta ação não pode ser desfeita.
          </p>
        }
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => closeDeleteModal()}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteTask(selectedTaskId!)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deletando..." : "Deletar"}
            </Button>
          </div>
        }
      />
    </>
  );
};
