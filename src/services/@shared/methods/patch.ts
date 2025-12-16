import { Axios } from "axios";

import { handleAxiosError } from "./del";

export async function patch<T>(
  axios: Axios,
  path: string,
  data?: unknown
): Promise<T> {
  try {
    const response = await axios.patch<T>(path, data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleAxiosError(error);
  }
}
