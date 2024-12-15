// app/page.tsx
import { Metadata } from "next"
import { AppClient } from "./client"

export const metadata: Metadata = {
    title: "Welcome | Acme Inc",
    description: "Connect your wallet to get started",
}

export default function HomePage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <AppClient />
        </main>
    )
}