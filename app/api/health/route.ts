// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await fetch(`http://localhost:4000/user/health`)
        if (!response.ok) {
            return NextResponse.error()
        }
        return NextResponse.json({ status: 'ok' })
    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }
}