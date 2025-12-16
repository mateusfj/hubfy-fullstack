import { prisma } from "@/src/lib/prisma";
import { UserRepositoryInterface } from "../../ports/repositories/user.repository.interface";
import { IUser } from "@/src/types/IUser";

export class PrismaUserRepository implements UserRepositoryInterface {
  async findByEmail(email: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    return prisma.user.create({ data });
  }
}
