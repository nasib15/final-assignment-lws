import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import dbConnect from "./lib/dbConnect";
import mongoClientPromise from "./lib/mongoPromise";
import { userModel } from "./models/users";
import { replaceMongoIdInObject } from "./utils/data-utils";

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
        if (credentials == null) return null;

        await dbConnect();

        try {
          const user = await userModel
            .findOne({ email: credentials.email })
            .lean();

          if (!user) {
            throw new Error("User not found");
          }

          const isMatched = bcrypt.compare(credentials.password, user.password);

          if (!isMatched) {
            throw new Error("Invalid password");
          }

          // // generate access and refresh tokens
          // const accessToken = generateAccessToken(user);
          // const refreshToken = generateRefreshToken(user);

          // // save the tokens in the user document
          // const response = await userModel
          //   .findByIdAndUpdate(user._id, {
          //     accessToken,
          //     refreshToken,
          //   })
          //   .lean();

          // const userData = replaceMongoIdInObject(response);

          return {
            ...replaceMongoIdInObject(user),
          };
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
