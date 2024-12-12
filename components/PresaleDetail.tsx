import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
    Globe,
    Twitter,
    Send,
    Facebook,
    Instagram,
    Clock,
    Info,
    Copy
} from "lucide-react";

const PresaleDetail = () => {
    const presaleData = {
        name: "DNA Presale",
        description: "DNA Bitcoin Mining Farm Asset-Backed Token is a token backed by the assets of a Bitcoin mining farm. It allows investors to benefit from mining profits, with the farm using generated Bitcoin to buy back tokens monthly. This buyback mechanism reduces supply, potentially increasing token value. DNA provides exposure to Bitcoin mining, transparency via blockchain, and stable returns through regular buybacks, creating a secure, self-sustaining investment model with reduced volatility.",
        status: "Sale live",
        saleType: "Public",
        icon: "/api/placeholder/64/64",
        minBuy: "10 USDT",
        maxBuy: "10,000 USDT",
        currentRaised: "30 USDT (0.03%)",
        totalContributors: 1,
        unsoldTokens: "11,107,777.778 DNA",
        presaleEndsIn: {
            hours: 12,
            minutes: 5,
            seconds: 30,
            milliseconds: 42
        }
    };

    return (
        <div className="w-full">
            {/* Hero Section */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={presaleData.icon}
                            alt={presaleData.name}
                            className="w-24 h-24 mb-4 rounded-full"
                        />
                        <h2 className="text-2xl font-bold mb-4">{presaleData.name}</h2>
                        <div className="flex gap-4 mb-6">
                            <Globe className="h-5 w-5" />
                            <Twitter className="h-5 w-5" />
                            <Send className="h-5 w-5" />
                            <Facebook className="h-5 w-5" />
                            <Instagram className="h-5 w-5" />
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full">
                            <span className="w-2 h-2 rounded-full mr-2"></span>
                            {presaleData.status}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Left Column - About */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{presaleData.description}</p>
                        </CardContent>
                    </Card>

                    {/* Token Info */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Token Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Name</p>
                                        <p>DNA</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Symbol</p>
                                        <p>DNA</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Decimals</p>
                                        <p>18</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Total Supply</p>
                                        <p>1,000,000,000</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Token Address</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-mono">0x561Db6241616E0b60cBB28B3ce606d7Aacd51A07</p>
                                        <Button variant="ghost" size="sm" className="h-6">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm">⚠️ Do not send USDT to the token address</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pool Info */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Pool Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Pool Address</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-mono">0x752aF36D2df826dF64E8eEa68DADE5B123FFF4f8</p>
                                        <Button variant="ghost" size="sm" className="h-6">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm">⚠️ Do not send USDT to the pool address</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Tokens For Presale</p>
                                        <p>11,111,111.1111 DNA</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Initial Market Cap</p>
                                        <p>$9,000,000</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Presale Rate</p>
                                        <p>1 USDT = 111.1111 DNA</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Listing Type</p>
                                        <p>Liquidity will not be automatically added!</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Start Time</p>
                                        <p>2024.12.11 07:18 (UTC)</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">End Time</p>
                                        <p>2024.12.23 23:59 (UTC)</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Unsold Tokens</p>
                                        <p>Refund</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Presale Info */}
                <div className="space-y-6">
                    {/* Timer Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">Presale Ends In</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {Object.entries(presaleData.presaleEndsIn).map(([unit, value]) => (
                                    <div key={unit} className="p-2 rounded-lg text-center">
                                        <div className="text-2xl font-bold">{value}</div>
                                        <div className="text-xs">{unit}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Purchase Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span>30 USDT</span>
                                    <span>100,000 USDT</span>
                                </div>
                                <Progress value={0.03} className="h-2" />
                                <Input
                                    type="number"
                                    placeholder="Amount"
                                />
                                <Button className="w-full">
                                    Connect Wallet
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Affiliate detail
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status</span>
                                    <span>{presaleData.status}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Sale Type</span>
                                    <span>{presaleData.saleType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Unsold Tokens</span>
                                    <span>{presaleData.unsoldTokens}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Min Buy</span>
                                    <span>{presaleData.minBuy}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Max Buy</span>
                                    <span>{presaleData.maxBuy}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Current Raised</span>
                                    <span>{presaleData.currentRaised}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total Contributors</span>
                                    <span>{presaleData.totalContributors}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PresaleDetail;