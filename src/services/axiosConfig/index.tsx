import { getTokens } from "@/src/app/actions/get-token/get-token";
import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

instance.interceptors.request.use(
  async (config) => {
    const { accessToken } = await getTokens();

    config.headers.Authorization = "Bearer " + accessToken;

    return config;
  },
  (error): Promise<never> => {
    return Promise.reject(new Error("Erro: " + error.message));
  }
);

export { instance as axiosConfig };
