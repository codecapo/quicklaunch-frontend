// app/providers.tsx
'use client'

import { ThemeProvider } from "next-themes"
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { WalletConfiguration } from "@/components/WalletConfiguration"
import { usePathname } from 'next/navigation'
import {AppSidebar} from "@/components/AppSidebar";

export function Providers({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isHomePage = pathname === '/'

    return (
        <WalletConfiguration>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {isHomePage ? (
                    <main className="flex-1 w-full min-w-0">
                        <div className="w-full h-screen">
                            {children}
                        </div>
                    </main>
                ) : (
                    <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                            <AppSidebar/>
                            <main className="flex-1 w-full min-w-0">
                                <div className="p-4 md:p-6 lg:p-8 w-full">
                                    <div className="w-full max-w-[1400px] mx-auto">
                                        {children}
                                    </div>
                                </div>
                            </main>
                        </div>
                    </SidebarProvider>
                )}
            </ThemeProvider>
        </WalletConfiguration>
    )
}