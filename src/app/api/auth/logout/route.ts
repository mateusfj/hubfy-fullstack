import { deleteTokens } from "@/src/app/actions/delete-token/delete-tokens";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await deleteTokens();
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? "https";
  const redirectUrl = new URL("/login", `${protocol}://${host}`);

  const response = NextResponse.redirect(redirectUrl);

  return response;
}
