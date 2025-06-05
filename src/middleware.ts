import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/incidents", "/reports", "/logout"];
const authRoutes = ["/login"];

export async function middleware(request: NextRequest) {
  const token = (await cookies()).get("authToken")?.value;
  const { pathname } = request.nextUrl;

  if (
    pathname === "/" ||
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const verifyResponse = await fetch(new URL("/api/verify", request.url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!verifyResponse.ok) {
        throw new Error("Invalid token");
      }
    } catch {
      const response = NextResponse.redirect(new URL("/login", request.url));
      (await cookies()).delete("authToken");
      return response;
    }
  }

  if (authRoutes.includes(pathname) && token) {
    try {
      const verifyResponse = await fetch(new URL("/api/verify", request.url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (verifyResponse.ok) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {}
  }

  return NextResponse.next();
}
