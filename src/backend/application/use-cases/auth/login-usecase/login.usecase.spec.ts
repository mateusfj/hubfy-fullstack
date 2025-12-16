import bcrypt from "bcrypt";

import { UserRepositoryInterface } from "@/src/backend/ports/repositories/user.repository.interface";
import { LoginUseCase } from "./login.usecase";
import { LoginSchema } from "@/src/validators/auth.schema";
import { signToken } from "@/src/lib/jwt";

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

jest.mock("@/src/lib/jwt", () => ({
  signToken: jest.fn(),
}));

describe("LoginUseCase (unit)", (): void => {
  const mockUserRepository: jest.Mocked<UserRepositoryInterface> = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const body: LoginSchema = {
    email: "teste@test.com",
    password: "password123",
  };

  let loginUseCase: LoginUseCase;

  beforeEach((): void => {
    jest.clearAllMocks();
    loginUseCase = new LoginUseCase(mockUserRepository);
  });

  it("não deve autenticar usuário inexistente", async (): Promise<void> => {
    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    const result = loginUseCase.execute(body);

    await expect(result).rejects.toThrow("Usuário não encontrado");
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(body.email);
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(signToken).not.toHaveBeenCalled();
  });

  it("não deve autenticar com senha inválida", async (): Promise<void> => {
    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Usuário Teste",
      email: body.email,
      password: "hashedpassword",
      createdAt: new Date(),
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const result = loginUseCase.execute(body);

    await expect(result).rejects.toThrow("Senha inválida");
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(body.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      body.password,
      "hashedpassword"
    );
    expect(signToken).not.toHaveBeenCalled();
  });

  it("deve autenticar usuário com sucesso", async (): Promise<void> => {
    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Usuário Teste",
      email: body.email,
      password: "hashedpassword",
      createdAt: new Date(),
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (signToken as jest.Mock).mockReturnValue("mocked-token");

    const result = await loginUseCase.execute(body);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(body.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      body.password,
      "hashedpassword"
    );
    expect(signToken).toHaveBeenCalledWith({
      id: 1,
      name: "Usuário Teste",
      email: body.email,
    });

    expect(result).toEqual({
      ok: true,
      data: {
        id: 1,
        name: "Usuário Teste",
        email: body.email,
        token: "mocked-token",
      },
    });
  });
});
