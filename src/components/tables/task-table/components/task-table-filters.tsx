import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { TASK_STATUS } from "@/src/lib/utils/constants/task-status";
import { TaskStatus } from "@/src/types/ITask";

interface TaskTableFiltersProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  status: TaskStatus | "";
  setStatus: React.Dispatch<React.SetStateAction<TaskStatus | "">>;
}

export const TaskTableFilters = ({
  search,
  setSearch,
  status,
  setStatus,
}: TaskTableFiltersProps) => {
  return (
    <Card className="gap-0">
      <CardHeader>
        <h2 className="text-lg font-semibold">Filtros</h2>
      </CardHeader>
      <CardContent>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-6">
          <div className="col-span-1  md:col-span-2 lg:col-span-4">
            <Input
              placeholder="Pesquisar por título"
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as TaskStatus | "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {TASK_STATUS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setSearch("");
                setStatus("");
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
