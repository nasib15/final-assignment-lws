import {
    generateAccessToken,
    generateRefreshToken,
    refreshAccessTokenCredentials,
} from "./utils/tokens";

async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    console.log(refreshedTokens, "refesh gugol");

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens?.access_token,
      accessTokenExpires: Date.now() + 15 * 1000,
      refreshToken: refreshedTokens?.refresh_token,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  providers: [],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account?.access_token || generateAccessToken(user),
          accessTokenExpires: Date.now() + 15 * 1000,
          refreshToken: account?.refresh_token || generateRefreshToken(user),
          user,
          provider: account?.provider,
        };
      }

      if (Date.now() < token?.accessTokenExpires) {
        return token;
      }

      // Check if access token has expired
      const accessTokenExpiry = token.accessTokenExpires;

      if (accessTokenExpiry && Date.now() > accessTokenExpiry) {
        if (token?.provider === "google") {
          try {
            return await refreshAccessToken(token);
          } catch (error) {
            return { ...token, error: "RefreshAccessTokenError" };
          }
        }

        if (token?.provider === "credentials") {
          try {
            // Attempt to refresh the token
            const response = await refreshAccessTokenCredentials(
              token.refreshToken,
            );

            return {
              ...token,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              accessTokenExpires: Date.now() + 15 * 1000, // 1 hour
            };
          } catch (error) {
            return { ...token, error: "RefreshAccessTokenError" };
          }
        }
      }
    },

    async session({ session, token }) {
      session.user = token?.user;
      session.error = token?.error;
      session.accessToken = token?.accessToken;
      session.refreshToken = token?.refreshToken;
      session.accessTokenExpires = token?.accessTokenExpires;

      console.log("session", session);

      return session;
    },
  },
};
