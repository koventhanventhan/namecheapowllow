import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const publicPaths = [
          "/admin/login",
          "/admin/forgot-password",
          "/admin/reset-password",
        ];
        const { pathname } = req.nextUrl;
        if (publicPaths.some((p) => pathname.startsWith(p))) return true;
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
