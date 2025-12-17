import {
  ErrorMapperResponse,
  mapError,
} from "@/src/backend/shared/errors/error-mapper";
import {
  LoginSchema,
  loginSchema,
  ResponseLoginSchema,
} from "@/src/validators/auth.schema";
import { NextResponse } from "next/server";
import { IResponse } from "@/src/types/Response/IResponse";
import { LoginUseCase } from "@/src/backend/application/use-cases/auth/login-usecase/login.usecase";
import { setCookie } from "@/src/app/actions/set-cookies/set-cookies";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();

    const data: LoginSchema = loginSchema.parse(body);

    const loginUseCase = new LoginUseCase();

    const response: IResponse<ResponseLoginSchema> = await loginUseCase.execute(
      data
    );

    await setCookie(response.data.token);

    return NextResponse.json({
      token: response.data.token,
      user: {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
      },
    });
  } catch (error: unknown) {
    const mappedError: ErrorMapperResponse = mapError(error);

    return NextResponse.json(mappedError.body, {
      status: mappedError.statusCode,
    });
  }
}
