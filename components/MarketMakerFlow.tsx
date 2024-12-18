'use client'

import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Wallet,
    CircleDollarSign,
    ClipboardCheck,
    CreditCard,
    Rocket,
} from "lucide-react";

type StepId = 'connect-wallet' | 'market-maker-details' | 'review' | 'pay-fee' | 'deploy';

interface Step {
    id: StepId;
    title: string;
    icon: React.ReactNode;
    description: string;
}

const MarketMakerFlow: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<StepId>('connect-wallet');
    const [completedSteps, setCompletedSteps] = useState<StepId[]>([]);
    const [runDate, setRunDate] = useState<string>('');
    const [runTime, setRunTime] = useState<string>('');

    const steps: Step[] = [
        {
            id: 'connect-wallet',
            title: 'Connect Wallet',
            icon: <Wallet className="h-4 w-4"/>,
            description: 'Connect your wallet to continue with market maker creation',
        },
        {
            id: 'market-maker-details',
            title: 'Enter Details',
            icon: <CircleDollarSign className="h-4 w-4"/>,
            description: 'Provide the details for your market maker',
        },
        {
            id: 'review',
            title: 'Review Details',
            icon: <ClipboardCheck className="h-4 w-4"/>,
            description: 'Review all market maker details before proceeding',
        },
        {
            id: 'pay-fee',
            title: 'Pay Fee',
            icon: <CreditCard className="h-4 w-4"/>,
            description: 'Pay the required fee to create your market maker',
        },
        {
            id: 'deploy',
            title: 'Deploy',
            icon: <Rocket className="h-4 w-4"/>,
            description: 'Deploy your market maker to the blockchain',
        }
    ];

    const handleStepComplete = (stepId: StepId) => {
        setCompletedSteps([...completedSteps, stepId]);
        const currentIndex = steps.findIndex(step => step.id === stepId);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1].id);
        }
    };

    const isStepCompleted = (stepId: StepId): boolean => completedSteps.includes(stepId);

    const isStepAvailable = (stepId: StepId): boolean => {
        const stepIndex = steps.findIndex(step => step.id === stepId);
        const currentIndex = steps.findIndex(step => step.id === currentStep);
        return stepIndex <= currentIndex;
    };

    const calculateProgress = (): number => {
        return Math.round((completedSteps.length / steps.length) * 100);
    };

    const renderStepContent = (step: Step) => {
        switch (step.id) {
            case 'connect-wallet':
                return (
                    <div className="space-y-8">
                        <p>
                            Connect your wallet to create and manage your market maker.
                            This wallet will be used to control the market maker operations.
                        </p>
                        <Button
                            onClick={() => handleStepComplete('connect-wallet')}
                            variant="outline"
                        >
                            Select Wallet
                        </Button>
                    </div>
                );
            case 'market-maker-details':
                return (
                    <div className="space-y-8">
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="tokenAddress">Token Address</Label>
                            <Input id="tokenAddress" placeholder="Enter token address" />
                        </div>

                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="fundedWallet">Funded Wallet</Label>
                            <Input id="fundedWallet" placeholder="Enter funded wallet address" />
                        </div>

                        <div className="grid w-full gap-4">
                            <Label>Run Date/Time</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="runDate" className="text-xs text-muted-foreground">Date</Label>
                                    <Input
                                        id="runDate"
                                        type="date"
                                        value={runDate}
                                        onChange={(e) => setRunDate(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="runTime" className="text-xs text-muted-foreground">Time</Label>
                                    <Input
                                        id="runTime"
                                        type="time"
                                        value={runTime}
                                        onChange={(e) => setRunTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => handleStepComplete('market-maker-details')}
                            variant="outline"
                        >
                            Continue
                        </Button>
                    </div>
                );
            case 'review':
                return (
                    <div className="space-y-8">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label className="font-semibold">Token Address</Label>
                                <p className="text-sm text-muted-foreground">0x...</p>
                            </div>
                            <div className="grid gap-2">
                                <Label className="font-semibold">Funded Wallet</Label>
                                <p className="text-sm text-muted-foreground">0x...</p>
                            </div>
                            <div className="grid gap-2">
                                <Label className="font-semibold">Run Date/Time</Label>
                                <p className="text-sm text-muted-foreground">
                                    {runDate} {runTime}
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleStepComplete('review')}
                            variant="outline"
                        >
                            Confirm Details
                        </Button>
                    </div>
                );
            case 'pay-fee':
                return (
                    <div className="space-y-4">
                        <p>Pay the required fee to deploy your market maker.</p>
                        <Button
                            onClick={() => handleStepComplete('pay-fee')}
                            variant="outline"
                        >
                            Pay Fee
                        </Button>
                    </div>
                );
            case 'deploy':
                return (
                    <div className="space-y-4">
                        <p>Deploy your market maker to the blockchain.</p>
                        <Button
                            onClick={() => handleStepComplete('deploy')}
                            variant="outline"
                        >
                            Deploy Market Maker
                        </Button>
                    </div>
                );
            default:
                return (
                    <div className="space-y-4">
                        <p>{step.description}</p>
                        <Button
                            onClick={() => handleStepComplete(step.id)}
                            variant="outline"
                        >
                            Continue
                        </Button>
                    </div>
                );
        }
    };

    return (
        <div className="w-full">
            <Card className="relative w-full rounded-xl">
                <CardContent className="p-6">
                    {/* Progress Section */}
                    <div className="w-full space-y-4 mb-8">
                        {/* Progress Header */}
                        <div className="flex justify-between items-center w-full">
                            <span className="text-sm">Progress</span>
                            <span className="text-sm">{calculateProgress()}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-secondary h-1 rounded-full relative overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 bg-primary transition-all duration-300"
                                style={{width: `${calculateProgress()}%`}}
                            />
                        </div>

                        {/* Progress Steps */}
                        <div className="w-full grid grid-cols-5 gap-x-4">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className="flex flex-col items-center justify-center gap-1"
                                >
                                    <div className="flex items-center justify-center">
                                        {step.icon}
                                    </div>
                                    <span className="text-[10px] text-center w-full line-clamp-1">
                                        {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Accordion Section */}
                    <div className="w-full relative">
                        <Accordion
                            type="single"
                            value={currentStep}
                            className="w-full space-y-2"
                        >
                            {steps.map((step) => (
                                <AccordionItem
                                    key={step.id}
                                    value={step.id}
                                    className="w-full"
                                    disabled={!isStepAvailable(step.id)}
                                >
                                    <AccordionTrigger className="w-full hover:no-underline py-3">
                                        <div className="flex items-center gap-2">
                                            {step.icon}
                                            <span className="text-sm">{step.title}</span>
                                            {isStepCompleted(step.id) && (
                                                <span className="text-xs ml-2 text-muted-foreground">
                                                    (Completed)
                                                </span>
                                            )}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <div className="pt-4 w-full">
                                            {renderStepContent(step)}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MarketMakerFlow;