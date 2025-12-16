import { Axios, AxiosRequestConfig } from "axios";

import { handleAxiosError } from "./del";

/**
 * Realiza uma requisição HTTP POST para a URL especificada com os dados fornecidos.
 *
 * @param {string} path - A URL para enviar a requisição POST.
 * @param {*} data - Os dados para enviar no corpo da requisição POST.
 * @returns {Promise<T>} - Uma promessa que resolve com os dados da resposta do servidor.
 */
export async function post<T>(
  axios: Axios,
  path: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axios.post<T>(path, data, config);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    handleAxiosError(error);
  }
}
