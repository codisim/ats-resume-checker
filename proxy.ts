import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public routes that don't need auth
  const publicRoutes = [""];
  
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    // If user is already logged in and tries to access login/register, redirect to dashboard
    if (token && (pathname === "/login" || pathname === "/register")) {
       try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/", req.url));
      } catch (e) {
        // Token invalid, let them stay on login/register
      }
    }
    return NextResponse.next();
  }

  // Protected routes (dashboard, etc.)
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Add user info to headers for downstream use if needed
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", payload.userId as string);
    requestHeaders.set("x-user-roles", JSON.stringify(payload.roles));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Token verification failed
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (except login/register which are handled above, but general api/auth might be public?)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};



// register and login are not working from ui pages. 
// ==== 
// const res = await fetch("/api/auth/register",
//  const res = await fetch("/api/auth/login"
// ========

