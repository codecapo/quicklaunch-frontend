import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

const WalletMultiButton = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
    { ssr: false }
)

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {
    const { connected } = useWallet()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && connected) {
            redirect('/dashboard')
        }
    }, [connected, mounted])

    if (!mounted) {
        return null
    }

    return (
        <div className={cn("grid place-items-center min-h-screen w-full p-4", className)} {...props}>
            <div className="flex flex-col items-center justify-center gap-6 w-full max-w-sm">
                <div className="flex flex-col items-center gap-2 mb-8">
                    <a href="#" className="flex flex-col items-center gap-2 font-medium">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/5">
                            <GalleryVerticalEnd className="size-8"/>
                        </div>
                    </a>
                    <h1 className="text-2xl font-bold mt-4 text-center">Welcome to Quick Launch</h1>
                    <p className="text-center text-sm text-muted-foreground">
                        Connect your wallet to get started
                    </p>
                </div>

                <div className="flex justify-center w-full">
                    <div className="w-full flex justify-center">
                        <WalletMultiButton />
                    </div>
                </div>

                <div className="text-balance text-center text-xs text-muted-foreground mt-4">
                    By connecting your wallet, you agree to our{" "}
                    <a href="#" className="underline underline-offset-4 hover:text-primary">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline underline-offset-4 hover:text-primary">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </div>
    )
}