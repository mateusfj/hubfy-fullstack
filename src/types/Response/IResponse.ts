export type ApiListResponse<K extends string, T> = {
  [key in K]: T[];
} & {
  meta: {
    total: number;
  };
};

export type ApiSingleResponse<K extends string, T> = {
  [key in K]: T;
};

export interface IResponse<T> {
  ok: boolean;
  data: T;
}
