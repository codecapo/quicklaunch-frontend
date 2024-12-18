// types/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        AUTH_SECRET: string
        NEXTAUTH_URL: string
        NODE_ENV: 'development' | 'production' | 'test'
    }
}