import { ZodError } from "zod";
import { AppError } from "./error";

export type ErrorMapperResponse = {
  statusCode: number;
  body: {
    message: string;
  };
};

export function mapError(error: unknown): ErrorMapperResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: 422,
      body: {
        message: JSON.parse(error.message)[0].message,
      },
    };
  }

  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      body: {
        message: error.message,
      },
    };
  }

  return {
    statusCode: 500,
    body: {
      message: "Erro interno do servidor",
    },
  };
}
