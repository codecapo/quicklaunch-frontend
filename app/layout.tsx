// app/layout.tsx
import type { Metadata } from "next"
import RootLayoutClient from "@/app/layout-client";

export const metadata: Metadata = {
    title: "quicklaunch.sol",
    description: "One stop shop to create,launch and run solana token projects",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return <RootLayoutClient>{children}</RootLayoutClient>
}