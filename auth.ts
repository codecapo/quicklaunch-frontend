// auth.ts
import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { DefaultSession, User } from "next-auth"
import { env } from "@/lib/env"

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string
        publicKey?: string
    }
    interface User {
        publicKey: string
        accessToken: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        publicKey?: string
        accessToken?: string
    }
}

interface Credentials {
    publicKey: string
    accessToken: string
}

export const config = {
    secret: env.AUTH_SECRET,
    trustHost: true,
    providers: [
        {
            id: "solana",
            name: "Solana",
            type: "credentials",
            credentials: {
                publicKey: { label: "Public Key", type: "text" },
                accessToken: { label: "Access Token", type: "text" }
            },
            async authorize(
                credentials: Partial<Credentials> | undefined
            ): Promise<User | null> {
                if (!credentials?.publicKey || !credentials?.accessToken) {
                    return null
                }

                return {
                    id: credentials.publicKey,
                    publicKey: credentials.publicKey,
                    accessToken: credentials.accessToken,
                } as User
            }
        }
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.publicKey = user.publicKey
                token.accessToken = user.accessToken
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                publicKey: token.publicKey,
                accessToken: token.accessToken
            }
        }
    },
    pages: {
        signIn: '/',
        error: '/'
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)