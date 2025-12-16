import bcrypt from "bcrypt";

import { IResponse } from "@/src/types/Response/IResponse";
import { IUser } from "@/src/types/IUser";
import { PrismaUserRepository } from "@/src/backend/infra/adapters/user.repository";
import {
  RegisterSchema,
  ResponseRegisterSchema,
} from "@/src/validators/auth.schema";
import { ConflictError } from "@/src/backend/shared/errors/error";

export class RegisterUserUseCase {
  constructor(
    private userRepository: PrismaUserRepository = new PrismaUserRepository()
  ) {}

  async execute(
    data: RegisterSchema
  ): Promise<IResponse<ResponseRegisterSchema>> {
    const exists: IUser | null = await this.userRepository.findByEmail(
      data.email
    );

    if (exists) {
      throw new ConflictError("Email já cadastrado");
    }

    //TODO: criar interface para hash de senha
    const passwordHash: string = await bcrypt.hash(data.password, 10);

    const user: IUser = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });

    return {
      ok: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
