import { prisma } from "@/src/lib/prisma";
import { POST as registerPOST } from "@/src/app/api/auth/register/route";
import { POST as loginPOST } from "@/src/app/api/auth/login/route";

jest.mock("@/src/app/actions/set-cookies/set-cookies", () => ({
  setCookie: jest.fn().mockResolvedValue(undefined),
}));

function createJsonRequest(url: string, body: unknown): Request {
  return new Request(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
}

describe("Auth API (integration)", (): void => {
  const BASE_URL = "http://localhost";

  const TEST_USER = {
    name: "Usuário Integração",
    email: "auth-integration@test.com",
    password: "password123",
  } as const;

  beforeEach(async (): Promise<void> => {
    await prisma.user.deleteMany({ where: { email: TEST_USER.email } });
  });

  afterAll(async (): Promise<void> => {
    await prisma.$disconnect();
  });

  it("deve registrar um novo usuário com sucesso", async (): Promise<void> => {
    const req = createJsonRequest(`${BASE_URL}/api/auth/register`, {
      name: TEST_USER.name,
      email: TEST_USER.email,
      password: TEST_USER.password,
    });

    const res = await registerPOST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.user).toBeDefined();
    expect(json.user.email).toBe(TEST_USER.email);
    expect(json.user.id).toBeDefined();
  });

  it("não deve permitir email duplicado", async (): Promise<void> => {
    const firstReq = createJsonRequest(`${BASE_URL}/api/auth/register`, {
      name: TEST_USER.name,
      email: TEST_USER.email,
      password: TEST_USER.password,
    });
    await registerPOST(firstReq);

    const secondReq = createJsonRequest(`${BASE_URL}/api/auth/register`, {
      name: TEST_USER.name,
      email: TEST_USER.email,
      password: TEST_USER.password,
    });

    const res = await registerPOST(secondReq);
    const json = await res.json();

    expect(res.status).toBe(409);
    expect(json.message).toBe("Email já cadastrado");
  });

  it("deve autenticar usuário com sucesso", async (): Promise<void> => {
    const registerReq = createJsonRequest(`${BASE_URL}/api/auth/register`, {
      name: TEST_USER.name,
      email: TEST_USER.email,
      password: TEST_USER.password,
    });
    await registerPOST(registerReq);

    const loginReq = createJsonRequest(`${BASE_URL}/api/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password,
    });

    const res = await loginPOST(loginReq);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.token).toBeDefined();
    expect(json.user).toBeDefined();
    expect(json.user.email).toBe(TEST_USER.email);
  });

  it("não deve autenticar usuário inexistente", async (): Promise<void> => {
    const loginReq = createJsonRequest(`${BASE_URL}/api/auth/login`, {
      email: "usuario-nao-existe@test.com",
      password: "some-password",
    });

    const res = await loginPOST(loginReq);
    const json = await res.json();

    expect(res.status).toBe(409);
    expect(json.message).toBe("Usuário não encontrado");
  });

  it("não deve autenticar com senha inválida", async (): Promise<void> => {
    const registerReq = createJsonRequest(`${BASE_URL}/api/auth/register`, {
      name: TEST_USER.name,
      email: TEST_USER.email,
      password: TEST_USER.password,
    });
    await registerPOST(registerReq);

    const loginReq = createJsonRequest(`${BASE_URL}/api/auth/login`, {
      email: TEST_USER.email,
      password: "senha-incorreta",
    });

    const res = await loginPOST(loginReq);
    const json = await res.json();

    expect(res.status).toBe(409);
    expect(json.message).toBe("Senha inválida");
  });
});
