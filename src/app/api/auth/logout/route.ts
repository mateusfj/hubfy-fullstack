import { deleteTokens } from "@/src/app/actions/delete-token/delete-tokens";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Faz logout do usuário
 *     description: Remove os tokens de autenticação e redireciona para a página de login.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       302:
 *         description: Redireciona para /login
 */

export async function GET(request: NextRequest) {
  await deleteTokens();
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? "https";
  const redirectUrl = new URL("/login", `${protocol}://${host}`);

  const response = NextResponse.redirect(redirectUrl);

  return response;
}
