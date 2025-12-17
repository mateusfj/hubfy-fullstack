import { JwtPayload } from "jsonwebtoken";
import { decodeToken } from "../../jwt";

export const isTokenExpired = (token?: string) => {
  if (!token) return true;
  const decodedToken = decodeToken(token) as JwtPayload;
  return decodedToken.exp && decodedToken.exp < Date.now() / 1000;
};
