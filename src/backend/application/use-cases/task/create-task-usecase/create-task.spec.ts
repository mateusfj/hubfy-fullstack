import { ITask, TaskStatus } from "@/src/types/ITask";
import { CreateTaskUseCase } from "./create-task.usecase";
import { CreateTaskSchema } from "@/src/validators/task.schema";
import { TaskData } from "@/src/backend/infra/adapters/task.repository";
import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";

describe("CreateTaskUseCase (unit)", (): void => {
  const mockTaskRepository = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    findAllByUser: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as jest.Mocked<TaskRepositoryInterface<TaskData>>;

  const body: CreateTaskSchema = {
    userId: 1,
    title: "Nova tarefa",
    description: "Descrição da tarefa",
    status: TaskStatus.PENDING,
  };

  let createTaskUseCase: CreateTaskUseCase;

  beforeEach((): void => {
    jest.clearAllMocks();
    createTaskUseCase = new CreateTaskUseCase(mockTaskRepository);
  });

  it("deve criar uma tarefa com sucesso", async (): Promise<void> => {
    const now = new Date();

    (mockTaskRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      userId: body.userId,
      title: body.title,
      description: body.description,
      status: body.status!,
      createdAt: now,
      updatedAt: now,
    } as ITask);

    const result = await createTaskUseCase.execute(body);

    expect(mockTaskRepository.create).toHaveBeenCalledWith({
      userId: body.userId,
      title: body.title,
      description: body.description,
      status: body.status,
    });

    expect(result).toEqual({
      ok: true,
      data: {
        id: 1,
        userId: 1,
        title: body.title,
        description: body.description,
        status: body.status!,
        createdAt: now,
        updatedAt: now,
      },
    });
  });
});
