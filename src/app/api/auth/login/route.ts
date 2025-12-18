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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Realiza o login do usuário
 *     description: Autentica o usuário e retorna o token JWT e os dados básicos do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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
