import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcr from "bcrypt";
import prisma from "@/prisma/PrismaClient";
export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "creds",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, r)  {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const user = await prisma.university.findFirst({
          where: { email: credentials.email },
        });
        if (!user) return null;
        const match = await bcr.compare(
          credentials.password,
          String(user.password)
        );
        if (match) {

          return {id : String(user.id), email : user.email, name : user.name};
        }
        return null;
      },
    }),
  ],
  secret : process.env.NEXTAUTH_SECRET,
  pages : {
    signIn : "/"
  }
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };
