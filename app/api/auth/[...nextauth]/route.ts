import NextAuth, {NextAuthOptions} from "next-auth"
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "../../../../src/server/db";
import Auth0Provider from "next-auth/providers/auth0";
import {env} from "../../../../src/env/server.mjs";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
        error: "/api/auth/error"
    },
    // Include user.id on session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        }
    },
    events: {
        async signIn(message) {
            console.log("signIn", message);
        }
    },
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        Auth0Provider({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            clientId: env.AUTH0_CLIENT_ID,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            clientSecret: env.AUTH0_CLIENT_SECRET,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            issuer: env.AUTH0_ISSUER
        }),
        /**
         * ...add more providers here
         *
         * Most other providers require a bit more work than the Discord provider.
         * For example, the GitHub provider requires you to add the
         * `refresh_token_expires_in` field to the Account model. Refer to the
         * NextAuth.js docs for the provider you want to use. Example:
         * @see https://next-auth.js.org/providers/github
         */
    ],
};


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
