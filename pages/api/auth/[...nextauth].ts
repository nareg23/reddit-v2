import NextAuth, { AuthOptions } from "next-auth";
import RedditProvider from "next-auth/providers/reddit";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENTID,
      clientSecret: process.env.REDDIT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
