import bcrypt from "bcrypt";

import { IResponse } from "@/src/types/Response/IResponse";
import { IUser } from "@/src/types/IUser";
import { PrismaUserRepository } from "@/src/backend/infra/adapters/user.repository";
import { LoginSchema, ResponseLoginSchema } from "@/src/validators/auth.schema";
import { ConflictError } from "@/src/backend/shared/errors/error";
import { signToken } from "@/src/lib/jwt";

export class LoginUseCase {
  constructor(
    private userRepository: PrismaUserRepository = new PrismaUserRepository()
  ) {}

  async execute(data: LoginSchema): Promise<IResponse<ResponseLoginSchema>> {
    const user: IUser | null = await this.userRepository.findByEmail(
      data.email
    );

    if (!user) {
      throw new ConflictError("Usuário não encontrado");
    }

    const passwordMatch: boolean = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new ConflictError("Senha inválida");
    }

    const token: string = signToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      ok: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
    };
  }
}
