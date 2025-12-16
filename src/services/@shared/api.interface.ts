import { Axios } from "axios";

import { del } from "./methods/del";
import { get } from "./methods/get";
import { patch } from "./methods/patch";
import { post } from "./methods/post";

export interface IApiMethods<T> {
  create: (data: T) => Promise<T>;
  deleteOne: (id: string) => Promise<void>;
  getList: (params?: string) => Promise<T[]>;
  getOne: (id: string, params?: string) => Promise<T>;
  patch: (data: Partial<T>, id: string) => Promise<T>;
}

const apiMethods = <T>(axios: Axios, path: string) => ({
  create: async (data: T): Promise<T> => {
    return await post(axios, path, data);
  },
  deleteOne: async (id: string): Promise<void> => {
    return await del(axios, `${path}/${id}`);
  },
  getList: async (params?: string): Promise<T[]> => {
    if (params) {
      return await get(axios, `${path}${params}`);
    } else {
      return await get(axios, path);
    }
  },
  getOne: async (id: string, params?: string): Promise<T> => {
    if (params) {
      return await get(axios, `${path}/${id}${params}`);
    } else {
      return await get(axios, `${path}/${id}`);
    }
  },
  patch: async (data: Partial<T>, id: string): Promise<T> => {
    return await patch(axios, `${path}/${id}`, data);
  },
});

export { apiMethods };
