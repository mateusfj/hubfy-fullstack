"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";

import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "../ui/shadcn-io/kanban";

import { TaskStatus } from "@/src/types/ITask";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

import { useGetAllTasks } from "@/src/hooks/task/use-get-all-tasks/use-get-all-tasks";
import { useUpdateTask } from "@/src/hooks/task/use-update-task/use-update-task";

import { CustomDialog } from "../@shared/custom-dialog/custom-dialog";
import { TaskForm } from "../forms/task-form/task-form";
import { KanbanSkeleton } from "../ui/shadcn-io/kanban/kanban-skeleton";
import { TASK_QUERY_KEY } from "@/src/services/query-keys/task/task";
import { KanbanTaskCard } from "./components/kanban-task-card";
import { ErrorState } from "../@shared/error-state/error-state";

const columns = [
  { id: TaskStatus.PENDING, name: "Pendente", color: "yellow-500" },
  { id: TaskStatus.IN_PROGRESS, name: "Em Progresso", color: "blue-500" },
  { id: TaskStatus.COMPLETED, name: "Concluído", color: "green-500" },
];

type KanbanFeature = {
  id: number;
  name: string;
  startAt: Date | string;
  column: TaskStatus;
};

const KanbanTask = () => {
  const { data: taskResult, isLoading, isError } = useGetAllTasks({});

  const { mutateAsync: updateTaskStatus } = useUpdateTask(TASK_QUERY_KEY.list);

  const [dialogStatus, setDialogStatus] = useState<TaskStatus>();
  const [kanbanData, setKanbanData] = useState<KanbanFeature[]>([]);

  const features = useMemo<KanbanFeature[]>(() => {
    if (!taskResult) return [];

    return taskResult.tasks.map((task) => ({
      id: task.id,
      name: task.title,
      startAt: task.createdAt,
      column: task.status,
    }));
  }, [taskResult]);

  useEffect(() => {
    setKanbanData(features);
  }, [features]);

  const handleDragEnd = useCallback(
    async ({ active }: DragEndEvent) => {
      const card = kanbanData.find((item) => item.id === Number(active.id));
      if (!card) return;

      const original = taskResult?.tasks.find((task) => task.id === card.id);

      if (!original || original.status === card.column) return;

      await updateTaskStatus({
        id: card.id,
        data: { status: card.column },
      });
    },
    [kanbanData, taskResult, updateTaskStatus]
  );

  if (isLoading) {
    return <KanbanSkeleton />;
  }

  if (isError) {
    return <ErrorState invalidateQueries={TASK_QUERY_KEY.list} />;
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="min-w-225">
          <KanbanProvider
            columns={columns}
            data={kanbanData}
            onDataChange={setKanbanData}
            onDragEnd={handleDragEnd}
          >
            {(column) => (
              <KanbanBoard key={column.id} id={column.id}>
                <KanbanHeader>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: column.color }}
                      />
                      <span className="truncate">{column.name}</span>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => setDialogStatus(column.id)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </KanbanHeader>

                <KanbanCards id={column.id}>
                  {(feature: KanbanFeature) => (
                    <KanbanCard
                      id={feature.id}
                      column={column.id}
                      name={feature.name}
                    >
                      <KanbanTaskCard
                        name={feature.name}
                        startAt={feature.startAt}
                        status={column.id}
                      />
                    </KanbanCard>
                  )}
                </KanbanCards>
              </KanbanBoard>
            )}
          </KanbanProvider>
        </div>
      </div>

      <CustomDialog
        open={!!dialogStatus}
        onOpenChange={() => setDialogStatus(undefined)}
        title="Criar nova tarefa"
        content={
          <div className="p-4">
            <TaskForm
              status={dialogStatus}
              onClose={() => setDialogStatus(undefined)}
            />
          </div>
        }
      />
    </>
  );
};

export { KanbanTask };
