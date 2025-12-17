export type ApiListResponse<K extends string, T> = {
  [key in K]: T[];
};

export type ApiSingleResponse<K extends string, T> = {
  [key in K]: T;
};

export interface IResponse<T> {
  ok: boolean;
  data: T;
}
