"use client";

import { getTokens } from "@/src/app/actions/get-token/get-token";
import { ReactNode, createContext, useEffect, useState } from "react";
import { decodeToken, JwtPayloadInterface } from "../../jwt";

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function checkAuthCookie() {
      const { accessToken } = await getTokens();

      if (!accessToken) return;

      const decoded: JwtPayloadInterface = decodeToken(
        accessToken
      ) as JwtPayloadInterface;

      setUser({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      });
    }
    checkAuthCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
