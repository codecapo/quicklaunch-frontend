import React from 'react';
import { Separator } from "@/components/ui/separator";
import RunDetailsList from "@/components/RunDetailsList";

interface RunDetail {
    id: string;
    type: 'airdrop' | 'market-maker';
    title: string;
    status: 'active' | 'scheduled' | 'completed';
    startTime: string;
    endTime: string;
    details: {
        tokenAddress?: string;
        totalAmount?: string;
        recipients?: number;
        targetPrice?: string;
        volumeTarget?: string;
    };
}

const RunViewPage = () => {
    const runs: RunDetail[] = [
        {
            id: "1",
            type: "airdrop",
            title: "Holiday Community Airdrop",
            status: "active",
            startTime: "2024-12-13T14:00:00",
            endTime: "2024-12-20T14:00:00",
            details: {
                tokenAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                totalAmount: "1,000,000 SANTA",
                recipients: 5000
            }
        },
        {
            id: "2",
            type: "market-maker",
            title: "Q4 Price Stabilization",
            status: "active",
            startTime: "2024-12-10T00:00:00",
            endTime: "2024-12-31T23:59:59",
            details: {
                tokenAddress: "0x8901B4d92F5112c0A806C95218F3b3E75A8d6340",
                targetPrice: "$0.15",
                volumeTarget: "$250,000"
            }
        },
        {
            id: "3",
            type: "airdrop",
            title: "New Year Token Distribution",
            status: "scheduled",
            startTime: "2024-12-31T23:59:59",
            endTime: "2025-01-07T23:59:59",
            details: {
                tokenAddress: "0x9912F4d92F5112c0A806C95218F3b3E75A8d7450",
                totalAmount: "2,000,000 NYT",
                recipients: 10000
            }
        },
        {
            id: "4",
            type: "market-maker",
            title: "Launch Price Support",
            status: "scheduled",
            startTime: "2024-12-25T12:00:00",
            endTime: "2025-01-25T12:00:00",
            details: {
                tokenAddress: "0x562d35Cc6634C0532925a3b844Bc454e4438d12a",
                targetPrice: "$0.10",
                volumeTarget: "$100,000"
            }
        },
        {
            id: "5",
            type: "airdrop",
            title: "Early Supporters Airdrop",
            status: "completed",
            startTime: "2024-12-01T00:00:00",
            endTime: "2024-12-07T00:00:00",
            details: {
                tokenAddress: "0x123d35Cc6634C0532925a3b844Bc454e4438abcd",
                totalAmount: "500,000 EARLY",
                recipients: 2500
            }
        },
        {
            id: "6",
            type: "market-maker",
            title: "Initial Launch Support",
            status: "completed",
            startTime: "2024-12-05T00:00:00",
            endTime: "2024-12-12T00:00:00",
            details: {
                tokenAddress: "0x321d35Cc6634C0532925a3b844Bc454e4438dcba",
                targetPrice: "$0.05",
                volumeTarget: "$50,000"
            }
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Run Manager</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your airdrops and market maker activities
                </p>
            </div>
            <Separator />
            <RunDetailsList runs={runs} />
        </div>
    );
};

export default RunViewPage;

