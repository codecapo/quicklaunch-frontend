// middleware.ts
import { auth } from "./auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const session = await auth()

    // If this is the home page and we have a session, redirect to dashboard
    if (request.nextUrl.pathname === '/' && session?.accessToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // For dashboard routes, check authentication
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!session?.accessToken) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/dashboard/:path*'
    ]
}