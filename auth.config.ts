import type { NextAuthConfig } from "next-auth";
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        console.log(isOnDashboard, "already logged in");
        return isLoggedIn;
      } else if (isLoggedIn) {
        console.log(isLoggedIn, "redirect to dashboard");

        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
} satisfies NextAuthConfig;
