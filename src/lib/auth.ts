import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const isDev = process.env.NODE_ENV === "development";

// Build providers list
const providers: any[] = [];

// Google OAuth — only add when credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

// Dev-mode credentials provider — lets you test locally without Google OAuth
// Uses real database users when DATABASE_URL is set, returns real roles from DB
if (isDev) {
  providers.push(
    Credentials({
      name: "Dev Login",
      credentials: {
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        const role = (credentials?.role as string) || "manager";

        // If DB is available, return the real user for this role
        if (process.env.DATABASE_URL) {
          try {
            const prisma = require("./prisma").default;
            const profile = await prisma.userProfile.findFirst({
              where: { role },
              include: { user: true },
            });
            if (profile?.user) {
              return {
                id: profile.user.id,
                name: profile.user.name,
                email: profile.user.email,
                role: profile.role,
              };
            }
          } catch {
            // DB not available — fall through to mock user
          }
        }

        // Fallback: mock user
        return {
          id: role === "manager" ? "dev-user-ishita" : "dev-user-employee",
          name: role === "manager" ? "Ishita Kaul" : "Dev Employee",
          email:
            role === "manager"
              ? "ishita_kaul@intuit.com"
              : "dev_employee@intuit.com",
          role,
        };
      },
    })
  );
}

// Prisma adapter — only use with Google OAuth + PostgreSQL in production.
// For dev mode with SQLite + Credentials provider, we skip the adapter
// and manage user lookup directly in the authorize/jwt callbacks.
let adapter: any = undefined;
if (
  process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.startsWith("file:") &&
  process.env.GOOGLE_CLIENT_ID
) {
  try {
    const { PrismaAdapter } = require("@auth/prisma-adapter");
    const prisma = require("./prisma").default;
    adapter = PrismaAdapter(prisma);
  } catch {
    // Database adapter not available — skip
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role || "employee";

        // If database is available, fetch/create profile for role
        if (process.env.DATABASE_URL) {
          try {
            const prisma = require("./prisma").default;
            let profile = await prisma.userProfile.findUnique({
              where: { userId: user.id },
            });
            if (!profile) {
              profile = await prisma.userProfile.create({
                data: {
                  userId: user.id!,
                  role: "employee",
                  jobTitle: "",
                  org: "",
                },
              });
            }
            token.role = profile.role;
            token.profileId = profile.id;
          } catch {
            // No database — use role from credentials
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = (token.role as string) || "employee";
        (session.user as any).profileId = token.profileId as string;
      }
      return session;
    },
  },
});
