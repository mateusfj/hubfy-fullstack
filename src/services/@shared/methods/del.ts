import { Axios, AxiosError } from "axios";

export function handleAxiosError(error: AxiosError): never {
  if (!error?.response) {
    throw new Error(error?.message);
  }
  throw error?.response?.data;
}

export async function del<T>(axios: Axios, path: string): Promise<T> {
  try {
    const response = await axios.delete<T>(path);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleAxiosError(error);
  }
}
