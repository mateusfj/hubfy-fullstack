import { IError } from "./IError";

export interface IResponse<T> {
  ok: boolean;
  data?: T;
  error?: IError;
}
