// components/providers.tsx
'use client'

import { WalletConfiguration } from '@/components/WalletConfiguration'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <WalletConfiguration>
                {children}
            </WalletConfiguration>
        </SessionProvider>
    )
}