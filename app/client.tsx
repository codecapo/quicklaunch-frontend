'use client'
// app/client.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import {WalletConfiguration} from "@/components/WalletConfiguration";
import {LoginForm} from "@/components/LoginForm";

export function AppClient() {
    const { connected } = useWallet()
    const router = useRouter()

    useEffect(() => {
        if (connected) {
            router.push('/')
        }
    }, [connected, router])

    return (
        <WalletConfiguration>
            <div className="max-w-[350px] w-full">
                <LoginForm />
            </div>
        </WalletConfiguration>
    )
}