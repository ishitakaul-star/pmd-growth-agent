export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    // Protect all app routes
    "/(app)/:path*",
    // Protect API routes (except auth)
    "/api/((?!auth).)*",
  ],
};
