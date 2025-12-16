import { UserRepositoryInterface } from "@/src/backend/ports/repositories/user.repository.interface";
import { RegisterUserUseCase } from "./create-user.usecase";

describe("RegisterUserUseCase (unit)", (): void => {
  const mockUserRepository: jest.Mocked<UserRepositoryInterface> = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const body = {
    name: "Usuário Teste",
    email: "teste@test.com",
    password: "password123",
  };

  let resisterUserUseCase: RegisterUserUseCase;

  beforeEach((): void => {
    jest.clearAllMocks();
    resisterUserUseCase = new RegisterUserUseCase(mockUserRepository);
  });

  it("não deve permitir email duplicado", async (): Promise<void> => {
    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue({
      id: "1",
      name: body.name,
      email: body.email,
      password: "hashedpassword",
    });

    const result = resisterUserUseCase.execute(body);

    await expect(result).rejects.toThrow("Email já cadastrado");
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(body.email);
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });

  it("deve criar usuário com sucesso", async (): Promise<void> => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    (mockUserRepository.create as jest.Mock).mockResolvedValue({
      id: "1",
      name: body.name,
      email: body.email,
      password: "hashedpassword",
    });

    const result = await resisterUserUseCase.execute(body);

    expect(result).toEqual({
      ok: true,
      data: {
        id: "1",
        name: body.name,
        email: body.email,
      },
    });
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(body.email);
    expect(mockUserRepository.create).toHaveBeenCalled();
  });
});
