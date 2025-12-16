import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET!;

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string): JwtPayload | string {
  return jwt.verify(token, JWT_SECRET);
}
