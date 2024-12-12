'use client'

import React, { useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TrustWalletAdapter,
    LedgerWalletAdapter,
    CoinbaseWalletAdapter,
    TrezorWalletAdapter,
    BitgetWalletAdapter,
    Coin98WalletAdapter,
} from '@solana/wallet-adapter-wallets'

// Import styles in client component
import '@solana/wallet-adapter-react-ui/styles.css'

export function WalletConfiguration({ children }: { children: React.ReactNode }) {
    // You can use different networks: 'mainnet-beta', 'testnet', 'devnet'
    const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), [])

    // Initialize all the wallets you want to support
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new CoinbaseWalletAdapter(),
        new TrustWalletAdapter(),
        new LedgerWalletAdapter(),
        new TrezorWalletAdapter(),
        new BitgetWalletAdapter(),
        new Coin98WalletAdapter(),
    ], [])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}