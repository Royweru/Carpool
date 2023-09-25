import NextAuth,{AuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import Credentials from "next-auth/providers/credentials";
export const authOptions:AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
         
        },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          return null;
        }

        const isCorrectPwd = await bcrypt.compare(
          credentials?.password as string,
          user.hashedPassword as string
        );
        if (!isCorrectPwd) {
          return null;
        }
        return user;
      },
    }),
  ],
 pages:{
    signIn:'/'
 },
 debug:process.env.NODE_ENV ==='development',
 session:{
    strategy:'jwt'
 },
 secret:process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
