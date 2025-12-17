import { type NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES } from "./lib/utils/constants/public-routes";
import { NextURL } from "next/dist/server/web/next-url";

const REDIRECT_TO_LOGIN = "/login";

export async function middleware(request: NextRequest) {
  const path: string = request.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.find((route) => route.path === path);
  const authToken: string | undefined =
    request.cookies.get("accessToken")?.value;

  if (!authToken && isPublicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !isPublicRoute) {
    const redirectPath: NextURL = request.nextUrl.clone();
    redirectPath.pathname = REDIRECT_TO_LOGIN;
    return NextResponse.redirect(redirectPath);
  }

  if (authToken && !isPublicRoute) {
    return NextResponse.next();
  }

  if (authToken && isPublicRoute) {
    const redirectPath: NextURL = request.nextUrl.clone();
    redirectPath.pathname = "/";
    return NextResponse.redirect(redirectPath);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
