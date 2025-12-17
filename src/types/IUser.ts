export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface IUserWithoutPassword {
  id: number;
  name: string;
  email: string;
}

export interface IUserToken {
  token: string;
  user: IUserWithoutPassword;
}
