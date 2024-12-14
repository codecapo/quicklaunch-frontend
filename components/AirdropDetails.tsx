'use client'

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
import { Globe, Twitter, Send, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample allocation data - replace with your actual data
const allocations = [
    {
        wallet: "0x1234...5678",
        amount: "50,000 TWEETY",
        txSignature: "0xabcd...efgh"
    },
    {
        wallet: "0x8765...4321",
        amount: "75,000 TWEETY",
        txSignature: null
    },
    {
        wallet: "0x9876...5432",
        amount: "100,000 TWEETY",
        txSignature: "0xijkl...mnop"
    },
];

const AirdropDetails = () => {
    return (
        <div className="grid gap-4 p-4">
            {/* Main Info Card */}
            <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10" />
                        <div>
                            <CardTitle className="text-xl">Tweety Pinksale Airdrop</CardTitle>
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
                    <Badge variant="default" className="h-6">Live</Badge>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Presale Investors: $TWEETY(BNB) PreSale contributors qualify for a Free Airdrop,
                        Terms and condition apply accordingly. check official website for more info
                    </p>

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Airdrop Address</TableCell>
                                <TableCell className="flex justify-between items-center">
                                    <code className="text-pink-500">0xFb5ED25a714ab398df24f28dB7685B96a81b29a3</code>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Name</TableCell>
                                <TableCell>TWEETY</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Symbol</TableCell>
                                <TableCell>TWEETY</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Total Tokens</TableCell>
                                <TableCell>2,095,736,392 TWEETY</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Status Card */}
            <Card>
                <CardContent className="pt-6">
                    <div className="text-center mb-6">
                        <p className="text-lg font-semibold mb-4">Airdrop is live now</p>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            <div className="bg-destructive/20 text-destructive p-2 rounded">00</div>
                            <div className="bg-destructive/20 text-destructive p-2 rounded">00</div>
                            <div className="bg-destructive/20 text-destructive p-2 rounded">00</div>
                            <div className="bg-destructive/20 text-destructive p-2 rounded">00</div>
                        </div>
                        <Progress value={48} className="mb-4" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>1,015,099,072</span>
                            <span>2,095,736,392 TWEETY</span>
                        </div>
                    </div>

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Start Time</TableCell>
                                <TableCell>12/03/2024 21:56 (UTC)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Your Allocation</TableCell>
                                <TableCell>N/A</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Your Claimed</TableCell>
                                <TableCell>N/A</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Allocations Table Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Airdrop Allocations</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Wallet Address</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Transaction</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allocations.map((allocation, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-mono">
                                        {allocation.wallet}
                                    </TableCell>
                                    <TableCell>
                                        {allocation.amount}
                                    </TableCell>
                                    <TableCell>
                                        {allocation.txSignature ? (
                                            <div className="flex items-center gap-2">
                                                <code className="text-xs text-muted-foreground">
                                                    {allocation.txSignature}
                                                </code>
                                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">Pending</span>
                                        )}
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

export default AirdropDetails;