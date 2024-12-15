'use client'

import React, {useMemo, useCallback} from 'react'
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react'
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import {clusterApiUrl} from '@solana/web3.js'
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
import {SolanaSignInInput} from "@solana/wallet-standard-features"
import base58 from "bs58"
//import { WebPubSubClient } from "@azure/web-pubsub-client"
import * as endpoints from '../endpoints.json'


// Import styles
import '@solana/wallet-adapter-react-ui/styles.css'
import '../app/wallet-adapter-override.css'
import {Adapter} from "@solana/wallet-adapter-base";

interface VerifyAuthRequest {
    publicKey: string
    signature: string
    message: string
}

interface VerifyAuthResponse {
    accessToken: string
}

interface NegotiateResponse {
    token: string
    baseUrl: string
    url: string
}

export function WalletConfiguration({children}: { children: React.ReactNode }) {
    const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), [])

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

    const autoSignIn = useCallback(async (adapter: Adapter) => {
        try {
            if (!('signIn' in adapter)) return true

            // Check if service is running
            const isServiceRunningUserHealth = await fetch('http://localhost:4000' + '/user/health')
            // const isServiceRunningSwapHealth = await fetch('http://localhost:4010' + '/swap-health')
            // const isServiceRunningRunHealth = await fetch('http://localhost:4030' + '/run-health')
            // const isServiceRunningMintHealth = await fetch('http://localhost:4040' + '/mint-health')
            // const isServiceRunningBuyHealth = await fetch('http://localhost:4050' + '/buy-health')
            // const isServiceRunningBuyHealth = await fetch('http://localhost:4050' + '/app-health')
            if (!isServiceRunningUserHealth.ok) {
                throw new Error('Backend service is not available')
            }

            // Create auth request
            const signInRequest = endpoints.server.host + endpoints.routes.createAuthRequest.path
            const response = await fetch(signInRequest, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pk: adapter.publicKey?.toBase58() }),
            })

            if (!response.ok) {
                throw new Error('Failed to create auth request')
            }

            // Sign the message
            const input: SolanaSignInInput = await response.json()
            const output = await adapter.signIn(input)

            // Verify the signature
            const verifyPayload: VerifyAuthRequest = {
                message: base58.encode(new Uint8Array(output.signedMessage)),
                publicKey: base58.encode(new Uint8Array(output.account.publicKey)),
                signature: base58.encode(new Uint8Array(output.signature)),
            }

            const verifyResponse = await fetch(endpoints.server.host + endpoints.routes.signInRequest.path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(verifyPayload),
            })

            if (!verifyResponse.ok) {
                throw new Error('Failed to verify signature')
            }

            const { accessToken }: VerifyAuthResponse = await verifyResponse.json()
            localStorage.setItem("access_token", accessToken)

            // Setup WebPubSub
            // Not just yet, I don't think I will need it.
            // const pubsubResponse = await fetch(endpoints.server.host + endpoints.routes.negotiateWebPubSub.path, {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${accessToken}`,
            //     },
            //     body: JSON.stringify({
            //         walletAddress: adapter.publicKey?.toBase58()
            //     }),
            // })
            //
            // if (!pubsubResponse.ok) {
            //     throw new Error('Failed to negotiate WebPubSub connection')
            // }
            //
            // const negotiateResponse: NegotiateResponse = await pubsubResponse.json()
            // const webPubSubClient = new WebPubSubClient(negotiateResponse.url)
            //
            // await webPubSubClient.start()
            //
            // webPubSubClient.on('connected', (e) => {
            //     console.log(`Connected to WebPubSub: ${e.userId}`)
            //     console.log(`Connection ID: ${e.connectionId}`)
            // })
            //
            // webPubSubClient.on('server-message', (e) => {
            //     console.log(`Received message: ${e.message.data}`)
            // })

            return false
        } catch (error) {
            console.error('Auto sign-in failed:', error)
            return false
        }
    }, [])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={autoSignIn}>
            {/*<WalletProvider wallets={wallets} autoConnect>*/}
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}