import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", string>> | undefined
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await dbConnect();

        try {
          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          // if (!user.isVerified) {
          //   throw new Error("Please verify your account before logging in");
          // }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          return user as User;
        } catch (err) {
          throw new Error(err instanceof Error ? err.message : "Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token._id = user._id?.toString();
        // token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token) {
        session.user._id = token._id;
        // session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessage = token.isAcceptingMessage;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
