// app/mint/view/[address]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sampleTokens } from '@/data/tokens'
import TokenDetails from "@/components/TokenDetails";

interface PageProps {
    params: {
        address: string
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const token = sampleTokens.find(t => t.symbol === params.address)

    if (!token) {
        return {
            title: 'Token Not Found',
            description: 'The requested token could not be found'
        }
    }

    return {
        title: `${token.name} (${token.symbol}) | Token Details`,
        description: `View details for ${token.name} token with total supply of ${token.supply}`
    }
}

export default async function TokenDetailPage({ params }: PageProps) {
    const { address } = params

    // Find token by symbol (using as address in sample data)
    const token = sampleTokens.find(t => t.symbol === address)

    if (!token) {
        notFound()
    }

    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">Token Details</h1>
                    <p className="text-muted-foreground mt-2">
                        View detailed information about your minted token
                    </p>
                </div>

                <TokenDetails token={token} />
            </div>
        </div>
    )
}

export function Loading() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full animate-pulse">
                <div>
                    <div className="h-8 w-48 bg-muted rounded mb-2" />
                    <div className="h-4 w-96 bg-muted rounded" />
                </div>
                <div className="space-y-4">
                    <div className="h-40 bg-muted rounded" />
                    <div className="h-40 bg-muted rounded" />
                </div>
            </div>
        </div>
    )
}