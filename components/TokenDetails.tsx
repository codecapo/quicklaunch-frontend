'use client'

import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy } from "lucide-react";
import Image from "next/image";
import { Token } from "@/types/token";

interface TokenDetailsProps {
    token: Token;
}

const TokenDetails = ({ token }: TokenDetailsProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(token.symbol);
    };

    return (
        <div className="min-h-screen p-6">
            {/* Token Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                        src={token.imageUrl}
                        alt={token.name}
                        width={48}
                        height={48}
                        className="object-cover"
                        priority
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{token.name}</h1>
                    <span className="text-muted-foreground text-sm uppercase">{token.symbol}</span>
                </div>
            </div>

            {/* Rest of the component remains the same */}
            <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Overview</CardTitle>
                    <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">Symbol</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-mono">{token.symbol}</span>
                            <Button variant="ghost" size="icon" onClick={handleCopy}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">Total Supply</span>
                        <span>{token.supply}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">Liquidity</span>
                        <span>{token.liquidity}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">Created At</span>
                        <span>{new Date(token.createdAt).toLocaleDateString()}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="metadata" className="w-full">
                <TabsList>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="transfers">Transfers</TabsTrigger>
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    <TabsTrigger value="attributes">Attributes</TabsTrigger>
                </TabsList>

                <TabsContent value="metadata" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Token Metadata</CardTitle>
                        </CardHeader>
                        <CardContent>
              <pre className="p-4 rounded-lg overflow-x-auto bg-muted">
                {JSON.stringify({
                    id: token.id,
                    name: token.name,
                    symbol: token.symbol,
                    supply: token.supply,
                    liquidity: token.liquidity,
                    createdAt: token.createdAt,
                    imageUrl: token.imageUrl
                }, null, 2)}
              </pre>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Other tab contents remain the same */}
            </Tabs>
        </div>
    );
};

export default TokenDetails;