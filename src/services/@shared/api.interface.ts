import { Axios } from "axios";

import { del } from "./methods/del";
import { get } from "./methods/get";
import { patch } from "./methods/patch";
import { post } from "./methods/post";

export interface IApiMethods<T> {
  create: (data: T) => Promise<T>;
  deleteOne: (id: number) => Promise<void>;
  getList: (params?: number) => Promise<T[]>;
  getOne: (id: number, params?: number) => Promise<T>;
  patch: (data: Partial<T>, id: number) => Promise<T>;
}

const apiMethods = <
  TListResponse,
  TSingleResponse,
  TCreate,
  TUpdate = Partial<TCreate>
>(
  axios: Axios,
  path: string
) => ({
  create: async (data: TCreate): Promise<TSingleResponse> => {
    return await post(axios, path, data);
  },
  deleteOne: async (id: number): Promise<void> => {
    return await del(axios, `${path}/${id}`);
  },
  getList: async (params?: number): Promise<TListResponse> => {
    if (params) {
      return await get(axios, `${path}${params}`);
    } else {
      return await get(axios, path);
    }
  },
  getOne: async (id: number, params?: number): Promise<TSingleResponse> => {
    if (params) {
      return await get(axios, `${path}/${id}${params}`);
    } else {
      return await get(axios, `${path}/${id}`);
    }
  },
  patch: async (data: TUpdate, id: number): Promise<TSingleResponse> => {
    return await patch(axios, `${path}/${id}`, data);
  },
});

export { apiMethods };
