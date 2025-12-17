"use server";

import { cookies } from "next/headers";

export async function getTokens(): Promise<{ accessToken?: string }> {
  const accessToken: string | undefined = (await cookies()).get(
    "accessToken"
  )?.value;

  return { accessToken };
}
