import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";
import { ITask, TaskStatus } from "@/src/types/ITask";
import { UpdateTaskUseCase } from "./update-task.usecase";
import { TaskData } from "@/src/backend/infra/adapters/task.repository";
import { UpdateTaskSchema } from "@/src/validators/task.schema";

describe("UpdateTaskUseCase (unit)", (): void => {
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
    title: "Tarefa antiga",
    description: "Descrição antiga",
    status: TaskStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let updateTaskUseCase: UpdateTaskUseCase;

  beforeEach((): void => {
    jest.clearAllMocks();
    updateTaskUseCase = new UpdateTaskUseCase(mockTaskRepository);
  });

  it("não deve atualizar uma tarefa inexistente", async (): Promise<void> => {
    (mockTaskRepository.findOne as jest.Mock).mockResolvedValue(null);

    const body: UpdateTaskSchema = {
      title: "Nova tarefa",
    };

    const result = updateTaskUseCase.execute("1", body);

    await expect(result).rejects.toThrow("Tarefa não encontrada");
    expect(mockTaskRepository.findOne).toHaveBeenCalledWith("1");
    expect(mockTaskRepository.update).not.toHaveBeenCalled();
  });

  it("deve atualizar uma tarefa com sucesso", async (): Promise<void> => {
    (mockTaskRepository.findOne as jest.Mock).mockResolvedValue(existingTask);

    const now = new Date();

    const body: UpdateTaskSchema = {
      title: "Tarefa atualizada",
      description: "Descrição atualizada",
      status: TaskStatus.COMPLETED,
    };

    (mockTaskRepository.update as jest.Mock).mockResolvedValue({
      ...existingTask,
      ...body,
      updatedAt: now,
    } as ITask);

    const result = await updateTaskUseCase.execute("1", body);

    expect(mockTaskRepository.findOne).toHaveBeenCalledWith("1");

    expect(mockTaskRepository.update).toHaveBeenCalledWith("1", {
      userId: Number(existingTask.userId),
      title: body.title,
      description: body.description,
      status: body.status,
    } as TaskData);

    expect(result).toEqual({
      ok: true,
      data: {
        ...existingTask,
        ...body,
        updatedAt: now,
      },
    });
  });
});
