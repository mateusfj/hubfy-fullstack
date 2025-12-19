import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";
import { TaskData } from "@/src/backend/infra/adapters/task.repository";
import { ITask, TaskStatus } from "@/src/types/ITask";
import { DeleteTaskUseCase } from "@/src/backend/application/use-cases/task/delete-task-usecase/delete-task.usecase";

describe("DeleteTaskUseCase (unit)", (): void => {
  const mockTaskRepository = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    findAllByUser: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as jest.Mocked<TaskRepositoryInterface<TaskData>>;

  const existingTask: ITask = {
    id: 1,
    userId: 1,
    title: "Tarefa a ser deletada",
    description: "Descrição",
    status: TaskStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let deleteTaskUseCase: DeleteTaskUseCase;

  beforeEach((): void => {
    jest.clearAllMocks();
    deleteTaskUseCase = new DeleteTaskUseCase(mockTaskRepository);
  });

  it("não deve deletar uma tarefa inexistente", async (): Promise<void> => {
    (mockTaskRepository.findOne as jest.Mock).mockResolvedValue(null);

    const result = deleteTaskUseCase.execute("1");

    await expect(result).rejects.toThrow("Tarefa não encontrada");
    expect(mockTaskRepository.findOne).toHaveBeenCalledWith("1");
    expect(mockTaskRepository.delete).not.toHaveBeenCalled();
  });

  it("deve deletar uma tarefa com sucesso", async (): Promise<void> => {
    (mockTaskRepository.findOne as jest.Mock).mockResolvedValue(existingTask);
    (mockTaskRepository.delete as jest.Mock).mockResolvedValue(undefined);

    await deleteTaskUseCase.execute("1");

    expect(mockTaskRepository.findOne).toHaveBeenCalledWith("1");
    expect(mockTaskRepository.delete).toHaveBeenCalledWith("1");
  });
});
