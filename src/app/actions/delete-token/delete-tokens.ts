"use server";

import { cookies } from "next/headers";

export async function deleteTokens(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie);
  });
}
