import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Globe, Twitter, Send, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const MarketMakerDetail = () => {
    // Sample transaction data - replace with actual data
    const transactions = [
        {
            sender: "0x742E42c4c993C72A5a9a81BEd0A665E04EC4d6A2",
            amount: "0.23 SOL",
            signature: "5bvJkJe3XzF4U1h8CUHGqRh6FvPW9PEZwNQ7YyK5AzFdGZmqhUZkqJ9L"
        },
        {
            sender: "0xFb5ED25a714ab398df24f28dB7685B96a81b29a3",
            amount: "0.31 SOL",
            signature: "2mNkJe3XzF4U1h8CUHGqRh6FvPW9PEZwNQ7YyK5AzFdGZmqhUZkqJ9L"
        },
        // Add more transactions as needed
    ];

    return (
        <div className="grid gap-4 p-4">
            {/* Existing Main Info Card */}
            <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10" />
                        <div>
                            <CardTitle className="text-xl">TWEETY Market Maker</CardTitle>
                            <div className="flex gap-2 mt-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Globe className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Twitter className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Badge variant="default" className="h-6">Active</Badge>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Automated market making for TWEETY token to maintain price stability and liquidity.
                    </p>

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Funding Wallet Address</TableCell>
                                <TableCell className="flex justify-between items-center">
                                    <code className="text-pink-500">0xFb5ED25a714ab398df24f28dB7685B96a81b29a3</code>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Token Address</TableCell>
                                <TableCell className="flex justify-between items-center">
                                    <code className="text-pink-500">0x742E42c4c993C72A5a9a81BEd0A665E04EC4d6A2</code>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Token Name</TableCell>
                                <TableCell>TWEETY</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Token Symbol</TableCell>
                                <TableCell>TWEETY</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Run Duration</TableCell>
                                <TableCell>7 Days</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Amount Range To Send</TableCell>
                                <TableCell>0.1 - 0.5 SOL</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Initial SOL Funding Amount</TableCell>
                                <TableCell>10 SOL</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Existing Status Card */}
            <Card>
                <CardContent className="pt-6">
                    <div className="text-center mb-6">
                        <p className="text-lg font-semibold mb-4">Market Maker Activity</p>
                        <Progress value={65} className="mb-4" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>6.5 SOL Used</span>
                            <span>10 SOL Total</span>
                        </div>
                    </div>

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Latest Transfer</TableCell>
                                <TableCell>0.23 SOL → 2,450 TWEETY</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Total Transfers</TableCell>
                                <TableCell>24</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Average Transfer Size</TableCell>
                                <TableCell>0.27 SOL</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Time Until Next Transfer</TableCell>
                                <TableCell>~4 minutes</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* New Transaction History Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sender Address</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-right">Transaction Signature</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-mono">
                                        {tx.sender.slice(0, 6)}...{tx.sender.slice(-4)}
                                    </TableCell>
                                    <TableCell>{tx.amount}</TableCell>
                                    <TableCell className="text-right font-mono">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>{tx.signature.slice(0, 8)}...{tx.signature.slice(-4)}</span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default MarketMakerDetail;