import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error): Promise<never> => {
    return Promise.reject(new Error("Erro: " + error.message));
  }
);

export { instance as axiosConfig };
