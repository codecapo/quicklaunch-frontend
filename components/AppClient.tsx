'use client'
import { useWallet } from "@solana/wallet-adapter-react"
import { useSession, signIn as nextAuthSignIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { LoginForm } from "@/components/LoginForm"
import type { SolanaSignInInput } from "@solana/wallet-standard-features"
import base58 from 'bs58'
import { authLogger } from '@/lib/authLogger'

interface VerifyAuthRequest {
    publicKey: string
    signature: string
    message: string
}

export function AppClient() {
    const { connected, wallet, publicKey, connecting } = useWallet()
    const { data: session, status } = useSession()
    const router = useRouter()
    const authAttempted = useRef(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    useEffect(() => {
        if (!connected) {
            authLogger.info("🔌 Wallet disconnected, resetting auth attempt")
            authAttempted.current = false
        }
    }, [connected])

    useEffect(() => {
        // Log initial state
        authLogger.info("🔄 Auth state changed", {
            connected,
            connecting,
            session,
            status,
            isAuthenticating,
            authAttempted: authAttempted.current,
            hasPublicKey: !!publicKey,
            publicKeyValue: publicKey?.toBase58()
        })

        if (status === "loading" || isAuthenticating || connecting) {
            authLogger.info("⏳ Skipping effect due to loading state", {
                status,
                isAuthenticating,
                connecting
            })
            return
        }

        if (connected && session?.accessToken) {
            authLogger.info("✅ User authenticated, redirecting to dashboard")
            router.push('/dashboard')
            return
        }

        if (connected && publicKey && !session && !authAttempted.current && !isAuthenticating) {
            authLogger.info("🔑 Initiating authentication flow")
            authAttempted.current = true
            handleAuthentication()
        }
    }, [connected, connecting, session, status, isAuthenticating, router, publicKey])

    const handleAuthentication = async () => {
        if (isAuthenticating) {
            authLogger.warn("⚠️ Authentication already in progress")
            return
        }

        try {
            setIsAuthenticating(true)
            authLogger.info("🚀 Starting authentication process", {
                connected,
                hasPublicKey: !!publicKey,
                hasAdapter: !!wallet?.adapter
            })

            if (!connected || !publicKey || !wallet?.adapter) {
                const error = new Error('Wallet not ready for authentication')
                authLogger.error("❌ Wallet connection check failed", {
                    connected,
                    hasPublicKey: !!publicKey,
                    hasAdapter: !!wallet?.adapter
                })
                throw error
            }

            const adapter = wallet.adapter
            if (!('signIn' in adapter)) {
                authLogger.error("❌ Wallet adapter doesn't support signIn")
                throw new Error('Wallet adapter does not support signIn method')
            }

            authLogger.info("🏥 Checking service health")
            const healthCheck = await fetch('/api/health')
            if (!healthCheck.ok) {
                const errorText = await healthCheck.text()
                authLogger.error("❌ Health check failed", { error: errorText })
                throw new Error('Backend service is not available')
            }

            authLogger.info("📝 Creating auth request")
            const response = await fetch('/api/auth/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pk: publicKey.toBase58() }),
            })

            if (!response.ok) {
                const errorText = await response.text()
                authLogger.error("❌ Auth request failed", { error: errorText })
                throw new Error('Failed to create auth request')
            }

            authLogger.info("📥 Getting sign in input")
            const input: SolanaSignInInput = await response.json()

            authLogger.info("✍️ Requesting wallet signature")
            const output = await adapter.signIn(input)
            authLogger.info("✅ Message signed successfully")

            const verifyPayload: VerifyAuthRequest = {
                message: base58.encode(new Uint8Array(output.signedMessage)),
                publicKey: base58.encode(new Uint8Array(output.account.publicKey)),
                signature: base58.encode(new Uint8Array(output.signature)),
            }

            authLogger.info("🔍 Verifying signature")
            const verifyResponse = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(verifyPayload),
            })

            if (!verifyResponse.ok) {
                const errorText = await verifyResponse.text()
                authLogger.error("❌ Verify request failed", { error: errorText })
                throw new Error('Failed to verify signature')
            }

            authLogger.info("📥 Parsing verify response")
            const verifyData = await verifyResponse.json()
            authLogger.info("✅ Verify response received", verifyData)

            if (!verifyData.accessToken) {
                authLogger.error("❌ No access token in response", verifyData)
                throw new Error('No access token received')
            }

            authLogger.info("💾 Storing access token")
            localStorage.setItem("access_token", verifyData.accessToken)

            authLogger.info("🔑 Initiating NextAuth signIn")
            const result = await nextAuthSignIn('solana', {
                publicKey: publicKey.toBase58(),
                accessToken: verifyData.accessToken,
                redirect: false,
            })

            authLogger.info("📋 NextAuth signIn result", result)

            if (result?.ok) {
                authLogger.info("✅ Sign in successful, navigating to dashboard")
                router.push('/dashboard')
            } else {
                authLogger.error("❌ Sign in failed", result)
                throw new Error('NextAuth sign in failed')
            }

        } catch (error) {
            authLogger.error("❌ Authentication failed", {
                error: error instanceof Error ? {
                    message: error.message,
                    stack: error.stack,
                    name: error.name
                } : error
            })

            if (error instanceof Error && error.name === 'WalletSignInError') {
                authLogger.info("👤 User rejected signing request")
            }
            authAttempted.current = false
        } finally {
            setIsAuthenticating(false)
        }
    }

    if (connecting) {
        return (
            <div className="flex items-center justify-center">
                <div className="text-center">
                    <div className="text-lg">Connecting Wallet...</div>
                </div>
            </div>
        )
    }

    if (status === "loading" || isAuthenticating) {
        return (
            <div className="flex items-center justify-center">
                <div className="text-center">
                    <div className="text-lg">Loading...</div>
                    <div className="text-sm text-gray-500">
                        {status === "loading" ? "Checking session..." : "Authenticating..."}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-[350px] w-full">
            <LoginForm />
        </div>
    )
}