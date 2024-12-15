// components/TokenCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistance } from 'date-fns';
import { Token } from "@/types/token";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface TokenCardProps {
    token: Token;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
    const timeAgo = formatDistance(new Date(token.createdAt), new Date(), { addSuffix: true });

    return (
        <Link href={`/dashboard/mint/view/${token.symbol}`} className="block">
            <Card className="w-full hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer">
                <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className="relative w-12 h-12">
                            <Image
                                src={token.imageUrl}
                                alt={token.name}
                                width={48}
                                height={48}
                                className="rounded-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{token.name}</h3>
                                    <p className="text-muted-foreground text-sm">{token.symbol}</p>
                                </div>
                                <span className="text-xs text-muted-foreground">{timeAgo}</span>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Supply:</span>
                                    <span className="text-sm font-medium">{token.supply}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Liquidity:</span>
                                    <span className="text-sm font-medium">{token.liquidity}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            View Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default TokenCard;