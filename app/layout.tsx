// app/layout.tsx
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import RootLayoutClient from "@/app/layout-client";

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <RootLayoutClient>{children}</RootLayoutClient>
        </SessionProvider>
    )
}