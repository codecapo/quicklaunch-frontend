// lib/env.ts
export const env = {
    AUTH_SECRET: process.env.AUTH_SECRET || (process.env.NODE_ENV === 'development' ? 'dev-secret' : undefined),
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000'
} as const

// Validate environment variables
if (!env.AUTH_SECRET) {
    throw new Error('AUTH_SECRET is not defined')
}