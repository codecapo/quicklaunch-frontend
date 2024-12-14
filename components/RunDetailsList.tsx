'use client'

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, TrendingUp, Clock, Timer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

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

interface RunDetailsListProps {
    runs: RunDetail[];
}

const getIcon = (type: RunDetail['type']) => {
    switch (type) {
        case 'airdrop':
            return <Gift className="h-4 w-4" />;
        case 'market-maker':
            return <TrendingUp className="h-4 w-4" />;
    }
};

const RunDetailCard: React.FC<{ run: RunDetail }> = ({ run }) => {
    const router = useRouter();

    const handleViewDetails = () => {
        // Navigate to the view page under /run/view path
        const path = run.type === 'airdrop'
            ? `/run/view/airdrop/${run.id}`
            : `/run/view/market-maker/${run.id}`;
        router.push(path);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                    {getIcon(run.type)}
                    <CardTitle className="text-sm font-medium">
                        {run.title}
                    </CardTitle>
                </div>
                <Badge
                    variant="outline"
                    className={cn(
                        run.status === 'completed' && "border-emerald-200 bg-emerald-100 text-emerald-700",
                        run.status === 'active' && "border-transparent bg-primary text-primary-foreground",
                        run.status === 'scheduled' && "border-transparent bg-secondary text-secondary-foreground"
                    )}
                >
                    {run.status}
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Start: {new Date(run.startTime).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Timer className="mr-2 h-4 w-4" />
                        <span>End: {new Date(run.endTime).toLocaleString()}</span>
                    </div>

                    {run.type === 'airdrop' && (
                        <div className="space-y-1 text-sm">
                            <p className="text-muted-foreground">Total Amount: {run.details.totalAmount}</p>
                            <p className="text-muted-foreground">Recipients: {run.details.recipients}</p>
                        </div>
                    )}

                    {run.type === 'market-maker' && (
                        <div className="space-y-1 text-sm">
                            <p className="text-muted-foreground">Target Price: {run.details.targetPrice}</p>
                            <p className="text-muted-foreground">Volume Target: {run.details.volumeTarget}</p>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewDetails}
                    className="w-full"
                >
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
};

const RunDetailsList: React.FC<RunDetailsListProps> = ({ runs }) => {
    const activeRuns = runs.filter(run => run.status === 'active');
    const scheduledRuns = runs.filter(run => run.status === 'scheduled');
    const completedRuns = runs.filter(run => run.status === 'completed');

    return (
        <div className="space-y-6">
            {activeRuns.length > 0 && (
                <section className="space-y-3">
                    <h4 className="text-sm font-medium">Active Runs</h4>
                    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
                        {activeRuns.map(run => (
                            <RunDetailCard key={run.id} run={run} />
                        ))}
                    </div>
                </section>
            )}

            {scheduledRuns.length > 0 && (
                <section className="space-y-3">
                    <h4 className="text-sm font-medium">Scheduled Runs</h4>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {scheduledRuns.map(run => (
                            <RunDetailCard key={run.id} run={run} />
                        ))}
                    </div>
                </section>
            )}

            {completedRuns.length > 0 && (
                <section className="space-y-3">
                    <h4 className="text-sm font-medium">Completed Runs</h4>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {completedRuns.map(run => (
                            <RunDetailCard key={run.id} run={run} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default RunDetailsList;