import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";
import { TaskData } from "@/src/backend/infra/adapters/task.repository";
import { ITask, TaskStatus } from "@/src/types/ITask";
import { GetTaskUseCase } from "@/src/backend/application/use-cases/task/get-task-usecase/get-task.usecase";

describe("GetTaskUseCase (unit)", (): void => {
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
    title: "Tarefa existente",
    description: "Descrição",
    status: TaskStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let getTaskUseCase: GetTaskUseCase;

  beforeEach((): void => {
    jest.clearAllMocks();
    getTaskUseCase = new GetTaskUseCase(mockTaskRepository);
  });

  it("não deve retornar uma tarefa inexistente", async (): Promise<void> => {
    (mockTaskRepository.findOne as jest.Mock).mockResolvedValue(null);

    const result = getTaskUseCase.execute("1");

    await expect(result).rejects.toThrow("Tarefa não encontrada");
    expect(mockTaskRepository.findOne).toHaveBeenCalledWith("1");
  });

  it("deve retornar uma tarefa existente", async (): Promise<void> => {
    (mockTaskRepository.findOne as jest.Mock).mockResolvedValue(existingTask);

    const result = await getTaskUseCase.execute("1");

    expect(mockTaskRepository.findOne).toHaveBeenCalledWith("1");

    expect(result).toEqual({
      ok: true,
      data: existingTask,
    });
  });
});
