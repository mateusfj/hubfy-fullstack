import { RegisterSchema } from "@/src/validators/auth.schema";
import { apiMethods, IApiMethods } from "../../@shared/api.interface";
import { axiosConfig } from "../../axiosConfig";
import { IUser, IUserToken } from "@/src/types/IUser";
import { post } from "../../@shared/methods/post";

const AUTH: IApiMethods<IUser> = apiMethods(axiosConfig, `/auth`);

const CUSTOM_AUTH = {
  ...AUTH,

  create: async (data: RegisterSchema): Promise<IUser> => {
    return post(axiosConfig, `/auth/register`, data);
  },

  login: async (data: {
    email: string;
    password: string;
  }): Promise<IUserToken> => {
    return post(axiosConfig, `/auth/login`, data);
  },
};

export { CUSTOM_AUTH };
