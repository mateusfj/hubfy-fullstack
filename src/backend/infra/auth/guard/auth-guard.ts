import { UnauthorizedError } from "@/src/backend/shared/errors/error";
import { JwtPayloadInterface, verifyToken } from "@/src/lib/jwt";

export function authGuard(req: Request): number {
  const authorization: string | null = req.headers.get("authorization");
  if (!authorization) throw new UnauthorizedError();

  const [, token] = authorization.split(" ");

  if (!token) throw new UnauthorizedError();

  const payload: JwtPayloadInterface = verifyToken(
    token
  ) as JwtPayloadInterface;

  return payload.id;
}
