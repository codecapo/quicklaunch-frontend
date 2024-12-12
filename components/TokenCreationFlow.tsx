'use client'

import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Wallet,
    Circle,
    ClipboardCheck,
    CreditCard,
    Sparkles
} from "lucide-react";

type StepId = 'connect-wallet' | 'token-details' | 'review' | 'pay-fee' | 'create-token' | 'download-keypair';

interface Step {
    id: StepId;
    title: string;
    icon: React.ReactNode;
    description: string;
}

const TokenCreationFlow: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<StepId>('connect-wallet');
    const [completedSteps, setCompletedSteps] = useState<StepId[]>([]);

    const steps: Step[] = [
        {
            id: 'connect-wallet',
            title: 'Connect Wallet',
            icon: <Wallet className="h-4 w-4"/>,
            description: 'Connect your wallet to continue with token creation',
        },
        {
            id: 'token-details',
            title: 'Enter Token Details',
            icon: <Circle className="h-4 w-4"/>,
            description: 'Provide the details for your new token',
        },
        {
            id: 'review',
            title: 'Review Details',
            icon: <ClipboardCheck className="h-4 w-4"/>,
            description: 'Review all token details before proceeding',
        },
        {
            id: 'pay-fee',
            title: 'Pay Fee',
            icon: <CreditCard className="h-4 w-4"/>,
            description: 'Pay the required fee to create your token',
        },
        {
            id: 'create-token',
            title: 'Create Token',
            icon: <Sparkles className="h-4 w-4"/>,
            description: 'Deploy your token to the blockchain',
        },
        {
            id: 'download-keypair',
            title: 'Download Keypair',
            icon: <Sparkles className="h-4 w-4"/>,
            description: 'Deploy your token to the blockchain',
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
                            Make sure to connect only the wallet that contains the tokens you would like to create.
                            You won't be able to change this wallet after deploying the token contract.
                        </p>
                        <Button
                            onClick={() => handleStepComplete('connect-wallet')}
                            variant="outline"
                        >
                            Select Wallet
                        </Button>
                    </div>
                );
            case 'token-details':
                return (
                    <div className="space-y-8">
                        <Input placeholder="Token Name" />
                        <Input placeholder="Token Symbol" />
                        <Input placeholder="Token Description" />
                        <Input placeholder="Total Supply" type="number" />
                        <Button
                            onClick={() => handleStepComplete('token-details')}
                            variant="outline"
                        >
                            Continue
                        </Button>
                    </div>
                );
            case 'review':
                return (
                    <div className="space-y-8">
                        <p>Review your token details before proceeding.</p>
                        <Button
                            onClick={() => handleStepComplete('review')}
                            variant="outline"
                        >
                            Continue
                        </Button>
                    </div>
                );
            case 'pay-fee':
                return (
                    <div className="space-y-4">
                        <p>Pay the required fee to create your token.</p>
                        <Button
                            onClick={() => handleStepComplete('pay-fee')}
                            variant="outline"
                        >
                            Pay Fee
                        </Button>
                    </div>
                );
            case 'create-token':
                return (
                    <div className="space-y-4">
                        <p>Deploy your token to the blockchain.</p>
                        <Button
                            onClick={() => handleStepComplete('create-token')}
                            variant="outline"
                        >
                            Create Token
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
                        <div className="w-full grid grid-cols-6 gap-x-4">
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

export default TokenCreationFlow;