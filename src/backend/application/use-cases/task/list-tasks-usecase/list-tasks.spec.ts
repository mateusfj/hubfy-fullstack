import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";
import { ITask, TaskStatus } from "@/src/types/ITask";
import { ListTasksUseCase } from "./list-tasks.usecase";
import { TaskData } from "@/src/backend/infra/adapters/task.repository";

describe("ListTasksUseCase (unit)", (): void => {
  const mockTaskRepository = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    findAllByUser: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as jest.Mocked<TaskRepositoryInterface<TaskData>>;

  let listTasksUseCase: ListTasksUseCase;

  beforeEach((): void => {
    jest.clearAllMocks();
    listTasksUseCase = new ListTasksUseCase(mockTaskRepository);
  });

  it("deve listar as tarefas de um usuário", async (): Promise<void> => {
    const now = new Date();

    const tasks: ITask[] = [
      {
        id: 1,
        userId: 1,
        title: "Tarefa 1",
        description: "Descrição 1",
        status: TaskStatus.PENDING,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        userId: 1,
        title: "Tarefa 2",
        description: "Descrição 2",
        status: TaskStatus.IN_PROGRESS,
        createdAt: now,
        updatedAt: now,
      },
    ];

    (mockTaskRepository.findAllByUser as jest.Mock).mockResolvedValue({
      tasks,
      total: tasks.length,
    });

    const result = await listTasksUseCase.execute(1);

    expect(result).toEqual({
      ok: true,
      data: {
        tasks,
        meta: {
          total: tasks.length,
        },
      },
    });
  });
});
