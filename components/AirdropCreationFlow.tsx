'use client'

import React, { useState, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
    Wallet,
    Circle,
    ClipboardCheck,
    CreditCard,
    Rocket,
    Upload,
    Clipboard,
    Calendar
} from "lucide-react";

type StepId = 'connect-wallet' | 'airdrop-details' | 'review' | 'pay-fee' | 'deploy-airdrop';

interface Step {
    id: StepId;
    title: string;
    icon: React.ReactNode;
    description: string;
}

const AirdropCreationFlow: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<StepId>('connect-wallet');
    const [completedSteps, setCompletedSteps] = useState<StepId[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [addresses, setAddresses] = useState<string>('');
    const [scheduledDate, setScheduledDate] = useState<string>('');
    const [scheduledTime, setScheduledTime] = useState<string>('');

    const steps: Step[] = [
        {
            id: 'connect-wallet',
            title: 'Connect Wallet',
            icon: <Wallet className="h-4 w-4"/>,
            description: 'Connect your wallet to continue with airdrop creation',
        },
        {
            id: 'airdrop-details',
            title: 'Enter Airdrop Details',
            icon: <Circle className="h-4 w-4"/>,
            description: 'Provide the details for your airdrop',
        },
        {
            id: 'review',
            title: 'Review Details',
            icon: <ClipboardCheck className="h-4 w-4"/>,
            description: 'Review market maker details before proceeding',
        },
        {
            id: 'pay-fee',
            title: 'Pay Fee',
            icon: <CreditCard className="h-4 w-4"/>,
            description: 'Pay the required fee to create your airdrop',
        },
        {
            id: 'deploy-airdrop',
            title: 'Deploy Airdrop',
            icon: <Rocket className="h-4 w-4"/>,
            description: 'Deploy your airdrop to the blockchain',
        }
    ];

    const handleStepComplete = (stepId: StepId) => {
        setCompletedSteps([...completedSteps, stepId]);
        const currentIndex = steps.findIndex(step => step.id === stepId);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1].id);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setAddresses(text);
            };
            reader.readAsText(file);
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
                            Connect your wallet to proceed with the airdrop creation process.
                            Only the connected wallet will have administration rights.
                        </p>
                        <Button
                            onClick={() => handleStepComplete('connect-wallet')}
                            variant="outline"
                        >
                            Select Wallet
                        </Button>
                    </div>
                );
            case 'airdrop-details':
                return (
                    <div className="space-y-8">
                        <Tabs defaultValue="paste" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="paste" className="flex items-center gap-2">
                                    <Clipboard className="h-4 w-4" />
                                    Copy and Paste
                                </TabsTrigger>
                                <TabsTrigger value="upload" className="flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    Upload CSV
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="paste" className="space-y-4">
                                <Textarea
                                    placeholder="Enter addresses (one per line)"
                                    value={addresses}
                                    onChange={(e) => setAddresses(e.target.value)}
                                    className="min-h-[200px]"
                                />
                            </TabsContent>
                            <TabsContent value="upload" className="space-y-4">
                                <Input
                                    type="file"
                                    accept=".csv"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="cursor-pointer"
                                />
                            </TabsContent>
                        </Tabs>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Schedule Date/Time</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    type="date"
                                    value={scheduledDate}
                                    onChange={(e) => setScheduledDate(e.target.value)}
                                />
                                <Input
                                    type="time"
                                    value={scheduledTime}
                                    onChange={(e) => setScheduledTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            onClick={() => handleStepComplete('airdrop-details')}
                            variant="outline"
                        >
                            Continue
                        </Button>
                    </div>
                );
            case 'review':
                return (
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-medium">Market Maker Details</h3>
                            <div className="space-y-2">
                                <p>Number of Addresses: {addresses.split('\n').filter(a => a.trim()).length}</p>
                                <p>Scheduled Date: {scheduledDate}</p>
                                <p>Scheduled Time: {scheduledTime}</p>
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
                        <p>Pay the required fee to create your airdrop.</p>
                        <Button
                            onClick={() => handleStepComplete('pay-fee')}
                            variant="outline"
                        >
                            Pay Fee
                        </Button>
                    </div>
                );
            case 'deploy-airdrop':
                return (
                    <div className="space-y-4">
                        <p>Deploy your airdrop to the blockchain.</p>
                        <Button
                            onClick={() => handleStepComplete('deploy-airdrop')}
                            variant="outline"
                        >
                            Deploy Airdrop
                        </Button>
                    </div>
                );
            default:
                return null;
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

export default AirdropCreationFlow;