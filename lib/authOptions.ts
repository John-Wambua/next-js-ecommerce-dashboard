import GoogleProvider from "next-auth/providers/google";
import {NextAuthOptions} from "next-auth";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID??"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET??""
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
}