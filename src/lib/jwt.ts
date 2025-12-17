import jwt, { JwtPayload } from "jsonwebtoken";

export interface JwtPayloadInterface extends JwtPayload {
  id: number;
  name: string;
  email: string;
}

const JWT_SECRET: string = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN!);

export function signToken(payload: JwtPayloadInterface): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload | string {
  return jwt.verify(token, JWT_SECRET);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
