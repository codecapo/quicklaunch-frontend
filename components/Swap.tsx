'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings2, ArrowDownUp, ChevronDown } from "lucide-react";
import TokenListDialog from './TokenListDialog';

interface Token {
    id?: string;
    symbol: string;
    iconUrl: string;
}

const Swap: React.FC = () => {
    const [payToken, setPayToken] = React.useState<Token>({ symbol: 'SOL', iconUrl: '/api/placeholder/20/20' });
    const [receiveToken, setReceiveToken] = React.useState<Token>({ symbol: 'USDC', iconUrl: '/api/placeholder/20/20' });
    const [tokenDialogOpen, setTokenDialogOpen] = React.useState(false);
    const [activeInput, setActiveInput] = React.useState<'pay' | 'receive' | null>(null);

    const handleTokenSelect = (token: Token) => {
        if (activeInput === 'pay') {
            setPayToken(token);
        } else if (activeInput === 'receive') {
            setReceiveToken(token);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardContent className="space-y-4 p-6">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Slippage</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm">0.5%</span>
                            <Settings2 className="h-4 w-4" />
                        </div>
                    </div>

                    {/* Pay Section */}
                    <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">Pay</span>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                placeholder="0"
                            />
                            <Button
                                variant="outline"
                                className="min-w-[120px]"
                                onClick={() => {
                                    setActiveInput('pay');
                                    setTokenDialogOpen(true);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        src={payToken.iconUrl}
                                        alt={payToken.symbol}
                                        className="w-5 h-5 rounded-full"
                                    />
                                    <span>{payToken.symbol}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </div>
                            </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">$0.00</div>
                    </div>

                    {/* Swap Direction Button */}
                    <div className="flex justify-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                        >
                            <ArrowDownUp className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Receive Section */}
                    <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">Receive</span>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                placeholder="0"
                            />
                            <Button
                                variant="outline"
                                className="min-w-[120px]"
                                onClick={() => {
                                    setActiveInput('receive');
                                    setTokenDialogOpen(true);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        src={receiveToken.iconUrl}
                                        alt={receiveToken.symbol}
                                        className="w-5 h-5 rounded-full"
                                    />
                                    <span>{receiveToken.symbol}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </div>
                            </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">$0.00</div>
                    </div>

                    {/* Connect Wallet Button */}
                    <Button className="w-full">
                        Connect Wallet
                    </Button>
                </CardContent>
            </Card>

            <TokenListDialog
                open={tokenDialogOpen}
                onOpenChange={setTokenDialogOpen}
                onSelect={handleTokenSelect}
            />
        </div>
    );
};

export default Swap;