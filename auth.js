import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import dbConnect from "./lib/dbConnect";
import mongoClientPromise from "./lib/mongoPromise";
import { userModel } from "./models/users";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.MONGO_DATABASENAME,
  }),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await dbConnect();

        try {
          const user = await userModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          const isMatched = bcrypt.compare(credentials.password, user.password);

          if (!isMatched) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});
