import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { PresaleCardProps } from "@/types/presale";

const PresaleCard: React.FC<PresaleCardProps> = ({ presale }) => {
    const {
        id, // Make sure to add this to your presale type if not already present
        name,
        icon,
        status,
        conversionRate,
        softCap,
        hardCap,
        progress,
        liquidity,
        lockupDays,
        startTime,
    } = presale;

    const getInitials = (name: string): string => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    return (
        <Card className="bg-card min-w-[350px]">
            <CardHeader className="space-y-0 p-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={icon} alt={name} />
                            <AvatarFallback>{getInitials(name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-lg">{name}</h3>
                            <p className="text-sm text-muted-foreground">1 SOL = {conversionRate}</p>
                        </div>
                    </div>
                    <Badge variant={status === 'Upcoming' ? 'secondary' : 'default'}>
                        {status}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-0 space-y-4">
                {/* Caps */}
                <div>
                    <p className="text-sm text-muted-foreground mb-1">Soft/Hard</p>
                    <p className="text-xl font-semibold text-primary">
                        {softCap} - {hardCap} SOL
                    </p>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress ({progress}%)</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>0 SOL</span>
                        <span>{hardCap} SOL</span>
                    </div>
                </div>

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Liquidity</p>
                        <p className="text-lg font-medium">{liquidity}%</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Lockup Time</p>
                        <p className="text-lg font-medium">{lockupDays} days</p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 flex justify-between items-center">
                <div>
                    <p className="text-sm text-muted-foreground">Sale Starts In</p>
                    <p className="text-lg font-medium">{startTime}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Link href={`/dashboard/launch/list/${id}`}>
                        <Button>View</Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PresaleCard;