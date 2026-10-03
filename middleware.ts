import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      return !!token;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    "/admin",
    "/admin/((?!login|forgot-password|reset-password).*)",
    "/api/admin/:path*",
    "/api/upload"
  ],
};
