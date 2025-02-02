import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import * as bcrypt from "bcrypt";

import { db } from "@/server/db";
import Credentials from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const credentials = Credentials({
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    // logic to salt and hash password

    // logic to verify if the user exists
    const user = await db.user.findFirst({
      where: { email: String(credentials.email) },
    });
    const pwHash = await bcrypt.compare(
      String(credentials.password),
      user?.password ?? "",
    );
    if (!user || !pwHash) {
      // No user found, so this is their first attempt to login
      // Optionally, this is also the place you could do a user registration
      throw new Error("Invalid credentials.");
    }
    return user;
  },
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    credentials,
  ],
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        ...token,
      },
    }),
  },
} satisfies NextAuthConfig;
