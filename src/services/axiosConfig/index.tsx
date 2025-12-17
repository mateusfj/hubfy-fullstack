import { getTokens } from "@/src/app/actions/get-token/get-token";
import { isTokenExpired } from "@/src/lib/utils/functions/isTokenExpired";
import axios, { AxiosInstance } from "axios";
import { toast } from "sonner";

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

instance.interceptors.request.use(
  async (config) => {
    const { accessToken } = await getTokens();
    if (accessToken) {
      if (isTokenExpired(accessToken)) {
        toast.error("Sessão expirada. Redirecionando para login...");

        setTimeout(async () => {
          window.location.href = "/api/auth/logout";
        }, 1500);

        return config;
      }

      config.headers.Authorization = "Bearer " + accessToken;
    }

    return config;
  },
  (error): Promise<never> => {
    return Promise.reject(new Error("Erro: " + error.message));
  }
);

export { instance as axiosConfig };
