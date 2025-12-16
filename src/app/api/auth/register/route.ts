import {
  ErrorMapperResponse,
  mapError,
} from "@/src/backend/shared/errors/error-mapper";
import {
  RegisterSchema,
  registerSchema,
  ResponseRegisterSchema,
} from "@/src/validators/auth.schema";
import { NextResponse } from "next/server";
import { RegisterUserUseCase } from "@/src/backend/application/use-cases/auth/create-user-usecase/create-user.usecase";
import { IResponse } from "@/src/types/Response/IResponse";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();

    const data: RegisterSchema = registerSchema.parse(body);

    const registerUserUseCase = new RegisterUserUseCase();

    const response: IResponse<ResponseRegisterSchema> =
      await registerUserUseCase.execute(data);

    return NextResponse.json({
      message: "Usuário criado com sucesso",
      user: response.data,
    });
  } catch (error: unknown) {
    const mappedError: ErrorMapperResponse = mapError(error);

    return NextResponse.json(mappedError.body, {
      status: mappedError.statusCode,
    });
  }
}
