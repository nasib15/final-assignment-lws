import { refreshAccessTokenCredentials } from "./utils/tokens";

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

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens?.access_token,
      accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
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
    maxAge: 60 * 60,
  },
  providers: [],
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("token", token);
      if (account && user) {
        return {
          accessToken: account?.access_token,
          accessTokenExpires: Date.now() + 60 * 60 * 1000,
          refreshToken: account?.refresh_token,
          user,
        };
      }

      if (Date.now() < token?.accessTokenExpires) {
        return token;
      }

      // Check if access token has expired
      const accessTokenExpiry = token.accessTokenExpires;

      if (accessTokenExpiry && Date.now() > accessTokenExpiry) {
        if (account?.provider === "google") {
          try {
            return await refreshAccessToken(token);
          } catch (error) {
            return { ...token, error: "RefreshAccessTokenError" };
          }
        }

        if (account?.provider === "credentials") {
          try {
            // Attempt to refresh the token
            const response = await refreshAccessTokenCredentials(
              token.refreshToken
            );

            return {
              ...token,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 hour
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

      console.log("session", session);

      return session;
    },
  },
};
