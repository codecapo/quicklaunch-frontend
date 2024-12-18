// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-4xl font-bold mb-4">404</h2>
            <p className="text-xl mb-4">Page Not Found</p>
            <p className="mb-8">Could not find the requested resource</p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                Return Home
            </Link>
        </div>
    )
}

export const dynamic = 'force-dynamic'

