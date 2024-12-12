import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Wallet, X } from "lucide-react"
import { useWallet } from '@solana/wallet-adapter-react'
import { cn } from "@/lib/utils"

// Define wallet options with proper typing
interface WalletOption {
    id: string
    name: string
    iconUrl: string
}

const WALLET_OPTIONS: WalletOption[] = [
    {
        id: 'phantom',
        name: 'Phantom',
        iconUrl: '/images/wallets/phantom.png',
    },
    {
        id: 'solflare',
        name: 'Solflare',
        iconUrl: '/images/wallets/solflare.png',
    },
    {
        id: 'tiplink',
        name: 'Google via TipLink',
        iconUrl: '/images/wallets/google.png',
    },
    {
        id: 'coinbase',
        name: 'Coinbase Wallet',
        iconUrl: '/images/wallets/coinbase.png',
    },
    {
        id: 'trust',
        name: 'Trust',
        iconUrl: '/images/wallets/trust.png',
    },
    {
        id: 'ledger',
        name: 'Ledger',
        iconUrl: '/images/wallets/ledger.png',
    },
    {
        id: 'trezor',
        name: 'Trezor',
        iconUrl: '/images/wallets/trezor.png',
    },
    {
        id: 'walletconnect',
        name: 'WalletConnect',
        iconUrl: '/images/wallets/walletconnect.png',
    },
    {
        id: 'ethereum',
        name: 'Ethereum Wallet',
        iconUrl: '/images/wallets/ethereum.png',
    },
    {
        id: 'coin98',
        name: 'Coin98',
        iconUrl: '/images/wallets/coin98.png',
    },
    {
        id: 'magiceden',
        name: 'Magic Eden',
        iconUrl: '/images/wallets/magiceden.png',
    },
    {
        id: 'backpack',
        name: 'Backpack',
        iconUrl: '/images/wallets/backpack.png',
    },
    {
        id: 'bitget',
        name: 'Bitget Wallet',
        iconUrl: '/images/wallets/bitget.png',
    },
    {
        id: 'frontier',
        name: 'Frontier',
        iconUrl: '/images/wallets/frontier.png',
    },
]

interface ConnectWalletButtonProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    className?: string
}

export function ConnectWalletButton({
                                        variant = 'default',
                                        size = 'default',
                                        className
                                    }: ConnectWalletButtonProps) {
    const [open, setOpen] = useState(false)
    const { select, wallets, publicKey, disconnect } = useWallet()

    const handleWalletClick = async (walletId: string) => {
        const wallet = wallets.find(w => w.adapter.name.toLowerCase() === walletId)
        if (wallet) {
            try {
                await select(wallet.adapter.name)
                setOpen(false)
            } catch (error) {
                console.error('Failed to connect wallet:', error)
                // You might want to add toast notification here
            }
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant={variant}
                    size={size}
                    className={cn("flex items-center gap-2", className)}
                >
                    <Wallet className="h-4 w-4" />
                    {publicKey ?
                        `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` :
                        'Connect Wallet'
                    }
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[400px] sm:w-[540px] bg-zinc-950 border-zinc-800"
            >
                <SheetHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-semibold text-white">
                            Connect Wallet
                        </SheetTitle>
                        <SheetClose asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </SheetClose>
                    </div>
                    <SheetDescription className="text-zinc-400">
                        You need to connect to a Solana wallet.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {WALLET_OPTIONS.map((wallet) => (
                        <button
                            key={wallet.id}
                            onClick={() => handleWalletClick(wallet.id)}
                            className="flex items-center gap-3 p-4 rounded-lg bg-zinc-900
                border border-zinc-800 text-white hover:bg-zinc-800
                transition-colors duration-200"
                        >
                            <div className="relative w-8 h-8">
                                <Image
                                    src={wallet.iconUrl}
                                    alt={`${wallet.name} icon`}
                                    fill
                                    className="object-contain"
                                    sizes="32px"
                                    priority={true}
                                />
                            </div>
                            <span className="text-sm font-medium">{wallet.name}</span>
                        </button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}