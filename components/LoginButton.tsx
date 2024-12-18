'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useSession, signIn as nextAuthSignIn } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import base58 from 'bs58'
import * as endpoints from '@/endpoints.json'
import type { SolanaSignInInput, SolanaSignInOutput } from "@solana/wallet-standard-features"
import { StandardWalletAdapter } from "@solana/wallet-adapter-base"

interface VerifyAuthRequest {
    publicKey: string
    signature: string
    message: string
}

interface VerifyAuthResponse {
    accessToken: string
}

// Define an interface for the wallet adapter with signIn method
interface WalletAdapterWithSignIn extends StandardWalletAdapter {
    signIn(input: SolanaSignInInput): Promise<SolanaSignInOutput>
}

export function LoginButton() {
    const wallet = useWallet()
    const { data: session } = useSession()
    const router = useRouter()
    const authAttempted = useRef(false)

    useEffect(() => {
        if (wallet.connected && session?.accessToken) {
            router.push('/dashboard')
            return
        }

        if (wallet.connected && !session && !authAttempted.current) {
            console.log("Starting authentication flow")
            authAttempted.current = true
            handleAuthentication()
        }
    }, [wallet.connected, session, router])

    const handleAuthentication = async () => {
        try {
            if (!wallet.connected || !wallet.publicKey || !wallet.wallet?.adapter) {
                console.log("Wallet not ready for authentication")
                authAttempted.current = false
                return
            }

            // Type check and cast the adapter
            const adapter = wallet.wallet.adapter as WalletAdapterWithSignIn
            if (!('signIn' in adapter)) {
                throw new Error('Wallet adapter does not support signIn method')
            }

            // Check if service is running
            const isServiceRunningUserHealth = await fetch('http://localhost:4000' + '/user/health')
            if (!isServiceRunningUserHealth.ok) {
                throw new Error('Backend service is not available')
            }

            // Create auth request
            console.log("Creating auth request")
            const signInRequest = endpoints.server.host + endpoints.routes.createAuthRequest.path
            const response = await fetch(signInRequest, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pk: wallet.publicKey.toBase58() }),
            })

            if (!response.ok) {
                throw new Error('Failed to create auth request')
            }

            // Sign the message
            console.log("Signing message")
            const input: SolanaSignInInput = await response.json()
            const output = await adapter.signIn(input)

            // Verify the signature
            console.log("Verifying signature")
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

            if (accessToken) {
                console.log("Signing in with NextAuth")
                const result = await nextAuthSignIn('solana', {
                    publicKey: wallet.publicKey.toBase58(),
                    accessToken: accessToken,
                    redirect: false
                })

                console.log("NextAuth sign in result:", result)

                if (result?.ok) {
                    console.log("Authentication successful, redirecting to dashboard")
                    router.push('/dashboard')
                } else {
                    throw new Error('NextAuth sign in failed')
                }
            }
        } catch (error) {
            console.error('Authentication failed:', error)
            authAttempted.current = false // Reset flag on error
        }
    }

    return (
        <div className="flex justify-center">
            <WalletMultiButton />
        </div>
    )
}