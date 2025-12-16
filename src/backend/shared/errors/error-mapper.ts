import { ZodError } from "zod";
import { AppError } from "./error";

export type ErrorMapperResponse = {
  statusCode: number;
  body: {
    error: {
      message: string;
    };
  };
};

export function mapError(error: unknown): ErrorMapperResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: 422,
      body: {
        error: {
          message: JSON.parse(error.message)[0].message,
        },
      },
    };
  }

  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      body: {
        error: {
          message: error.message,
        },
      },
    };
  }

  return {
    statusCode: 500,
    body: {
      error: {
        message: "Erro interno do servidor",
      },
    },
  };
}
