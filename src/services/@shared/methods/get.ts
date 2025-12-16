import { Axios } from "axios";

import { handleAxiosError } from "./del";

export async function get<T>(axios: Axios, path: string): Promise<T> {
  try {
    const response = await axios.get<T>(path);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleAxiosError(error);
  }
}
