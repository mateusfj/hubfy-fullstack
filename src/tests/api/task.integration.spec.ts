import { prisma } from "@/src/lib/prisma";
import { POST as registerPOST } from "@/src/app/api/auth/register/route";
import { POST as loginPOST } from "@/src/app/api/auth/login/route";
import {
  POST as createTaskPOST,
  GET as listTasksGET,
} from "@/src/app/api/task/route";
import {
  GET as getTaskGET,
  PATCH as updateTaskPATCH,
  DELETE as deleteTaskDELETE,
} from "@/src/app/api/task/[id]/route";
import { TaskStatus } from "@/src/types/ITask";

jest.mock("@/src/app/actions/set-cookies/set-cookies", () => ({
  setCookie: jest.fn().mockResolvedValue(undefined),
}));

const BASE_URL = "http://localhost";

function createJsonRequest(
  url: string,
  method: string,
  body?: unknown,
  token?: string
): Request {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };

  if (token) {
    headers["authorization"] = `Bearer ${token}`;
  }

  return new Request(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers,
  });
}

function createRequest(url: string, method: string, token?: string): Request {
  const headers: Record<string, string> = {};

  if (token) {
    headers["authorization"] = `Bearer ${token}`;
  }

  return new Request(url, {
    method,
    headers,
  });
}

async function registerAndLogin(email: string) {
  const password = "password123";
  const name = `User ${email}`;

  const registerReq = createJsonRequest(
    `${BASE_URL}/api/auth/register`,
    "POST",
    {
      name,
      email,
      password,
    }
  );

  await registerPOST(registerReq);

  const loginReq = createJsonRequest(`${BASE_URL}/api/auth/login`, "POST", {
    email,
    password,
  });

  const loginRes = await loginPOST(loginReq);
  const loginJson = await loginRes.json();

  return {
    token: loginJson.token as string,
    userId: loginJson.user.id as number,
  };
}

describe("Task API (integration)", (): void => {
  beforeAll(async (): Promise<void> => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany({
      where: {
        email: {
          contains: "@int-task.test",
        },
      },
    });
  });

  afterAll(async (): Promise<void> => {
    await prisma.$disconnect();
  });

  it("deve criar, listar, buscar, atualizar e deletar uma tarefa para o usuário autenticado", async (): Promise<void> => {
    const userEmail = "user1@int-task.test";
    const { token, userId } = await registerAndLogin(userEmail);

    // criar tarefa
    const createReq = createJsonRequest(
      `${BASE_URL}/api/task`,
      "POST",
      {
        userId,
        title: "Tarefa de integração",
        description: "Descrição da tarefa de integração",
        status: TaskStatus.PENDING,
      },
      token
    );

    const createRes = await createTaskPOST(createReq);
    const createJson = await createRes.json();

    expect(createRes.status).toBe(200);
    expect(createJson.task).toBeDefined();
    expect(createJson.task.userId).toBe(userId);

    const taskId = createJson.task.id as number;

    // buscar tarefa por id
    const getReq = createRequest(
      `${BASE_URL}/api/task/${taskId}`,
      "GET",
      token
    );
    const getRes = await getTaskGET(getReq, {
      params: Promise.resolve({ id: String(taskId) }),
    });
    const getJson = await getRes.json();

    expect(getRes.status).toBe(200);
    expect(getJson.task).toBeDefined();
    expect(getJson.task.id).toBe(taskId);

    // atualizar tarefa
    const updateReq = createJsonRequest(
      `${BASE_URL}/api/task/${taskId}`,
      "PATCH",
      {
        title: "Tarefa atualizada",
      },
      token
    );

    const updateRes = await updateTaskPATCH(updateReq, {
      params: Promise.resolve({ id: String(taskId) }),
    });
    const updateJson = await updateRes.json();

    expect(updateRes.status).toBe(200);
    expect(updateJson.task.title).toBe("Tarefa atualizada");

    // deletar tarefa
    const deleteReq = createRequest(
      `${BASE_URL}/api/task/${taskId}`,
      "DELETE",
      token
    );

    const deleteRes = await deleteTaskDELETE(deleteReq, {
      params: Promise.resolve({ id: String(taskId) }),
    });
    const deleteJson = await deleteRes.json();

    expect(deleteRes.status).toBe(200);
    expect(deleteJson.message).toBe("Tarefa removida com sucesso");

    // garantir que tarefa não existe mais
    const getAfterDeleteReq = createRequest(
      `${BASE_URL}/api/task/${taskId}`,
      "GET",
      token
    );

    const getAfterDeleteRes = await getTaskGET(getAfterDeleteReq, {
      params: Promise.resolve({ id: String(taskId) }),
    });
    const getAfterDeleteJson = await getAfterDeleteRes.json();

    expect(getAfterDeleteRes.status).toBe(404);
    expect(getAfterDeleteJson.message).toBe("Tarefa não encontrada");
  });

  it("deve listar apenas as tarefas do usuário autenticado (isolamento entre usuários)", async (): Promise<void> => {
    const user1Email = "user-isolamento-1@int-task.test";
    const user2Email = "user-isolamento-2@int-task.test";

    const user1 = await registerAndLogin(user1Email);
    const user2 = await registerAndLogin(user2Email);

    // criar tarefas para usuário 1
    const createReqUser1a = createJsonRequest(
      `${BASE_URL}/api/task`,
      "POST",
      {
        userId: user1.userId,
        title: "Tarefa 1 usuário 1",
        status: TaskStatus.PENDING,
      },
      user1.token
    );
    await createTaskPOST(createReqUser1a);

    const createReqUser1b = createJsonRequest(
      `${BASE_URL}/api/task`,
      "POST",
      {
        userId: user1.userId,
        title: "Tarefa 2 usuário 1",
        status: TaskStatus.PENDING,
      },
      user1.token
    );
    await createTaskPOST(createReqUser1b);

    // criar tarefa para usuário 2
    const createReqUser2 = createJsonRequest(
      `${BASE_URL}/api/task`,
      "POST",
      {
        userId: user2.userId,
        title: "Tarefa usuário 2",
        status: TaskStatus.PENDING,
      },
      user2.token
    );
    await createTaskPOST(createReqUser2);

    // listar tarefas usuário 1
    const listReqUser1 = createRequest(
      `${BASE_URL}/api/task`,
      "GET",
      user1.token
    );
    const listResUser1 = await listTasksGET(listReqUser1);
    const listJsonUser1 = (await listResUser1.json()) as {
      tasks: Array<{ userId: number }>;
      meta: { total: number };
    };

    expect(listResUser1.status).toBe(200);
    expect(listJsonUser1.tasks.length).toBeGreaterThanOrEqual(2);
    expect(listJsonUser1.tasks.every((t) => t.userId === user1.userId)).toBe(
      true
    );

    // listar tarefas usuário 2
    const listReqUser2 = createRequest(
      `${BASE_URL}/api/task`,
      "GET",
      user2.token
    );
    const listResUser2 = await listTasksGET(listReqUser2);
    const listJsonUser2 = (await listResUser2.json()) as {
      tasks: Array<{ userId: number }>;
      meta: { total: number };
    };

    expect(listResUser2.status).toBe(200);
    expect(listJsonUser2.tasks.length).toBeGreaterThanOrEqual(1);
    expect(listJsonUser2.tasks.every((t) => t.userId === user2.userId)).toBe(
      true
    );
  });

  it("não deve permitir acesso às rotas de tarefas sem token", async (): Promise<void> => {
    const req = createRequest(`${BASE_URL}/api/task`, "GET");

    const res = await listTasksGET(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.message).toBe("Unauthorized");
  });

  it("deve retornar erro ao usar token inválido", async (): Promise<void> => {
    const req = createRequest(`${BASE_URL}/api/task`, "GET", "token-invalido");

    const res = await listTasksGET(req);
    const json = await res.json();

    // Comportamento atual: erro interno por causa do token inválido no jwt.verify
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(json.message).toBeDefined();
  });
});
