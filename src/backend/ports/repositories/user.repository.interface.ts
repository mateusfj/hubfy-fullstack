import { IUser } from "@/src/types/IUser";

export interface UserRepositoryInterface {
  findByEmail: (email: string) => Promise<IUser | null>;
  create: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<IUser>;
}
