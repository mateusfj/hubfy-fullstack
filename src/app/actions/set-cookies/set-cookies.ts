"use server";

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export const setCookie = async (token: string): Promise<void> => {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  cookieStore.delete("accessToken");

  cookieStore.set({
    httpOnly: true,
    name: "accessToken",
    sameSite: "strict",
    secure: true,
    value: token,
  });
};
