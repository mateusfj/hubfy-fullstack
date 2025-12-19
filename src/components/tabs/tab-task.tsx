import { useState } from "react";
import { Button } from "../ui/button";
import { Kanban, List } from "lucide-react";
import { TaskTable } from "../tables/task-table/task-table";
import { KanbanTask } from "../kanban/kanban-task";

enum TabViewModes {
  LIST = "list",
  KANBAN = "kanban",
}

export const TabTask = () => {
  const [viewMode, setViewMode] = useState<TabViewModes>(TabViewModes.LIST);
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");

  const toggleOrderDirection = () => {
    setOrderDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            className={
              viewMode === TabViewModes.LIST
                ? "border-primary text-primary"
                : ""
            }
            onClick={() => setViewMode(TabViewModes.LIST)}
          >
            <List className="mr-2" />
            Lista
          </Button>
          <Button
            variant={"outline"}
            className={
              viewMode === TabViewModes.KANBAN
                ? "border-primary text-primary"
                : ""
            }
            onClick={() => setViewMode(TabViewModes.KANBAN)}
          >
            <Kanban className="mr-2" />
            Kanban
          </Button>
        </div>
        {viewMode === "list" && (
          <div className="flex gap-2">
            <Button variant={"outline"} onClick={toggleOrderDirection}>
              <Kanban className="mr-2" />
              {orderDirection === "desc" ? "Mais recentes" : "Mais antigos"}
            </Button>
          </div>
        )}
      </div>

      {viewMode === "list" ? (
        <TaskTable orderBy="createdAt" orderDirection={orderDirection} />
      ) : (
        <KanbanTask />
      )}
    </div>
  );
};
