'use client'

import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Wallet,
    CircleDollarSign,
    ClipboardCheck,
    CreditCard,
    Rocket,
    LayoutTemplate
} from "lucide-react";

type StepId = 'connect-wallet' | 'presale-type' | 'presale-details' | 'review' | 'pay-fee' | 'create-presale';

interface Step {
    id: StepId;
    title: string;
    icon: React.ReactNode;
    description: string;
}

const PresaleCreationFlow: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<StepId>('connect-wallet');
    const [completedSteps, setCompletedSteps] = useState<StepId[]>([]);

    const steps: Step[] = [
        {
            id: 'connect-wallet',
            title: 'Connect Wallet',
            icon: <Wallet className="h-4 w-4"/>,
            description: 'Connect your wallet to continue with presale creation',
        },
        {
            id: 'presale-type',
            title: 'Presale Type',
            icon: <LayoutTemplate className="h-4 w-4"/>,
            description: 'Select the type of presale you want to create',
        },
        {
            id: 'presale-details',
            title: 'Enter Presale Details',
            icon: <CircleDollarSign className="h-4 w-4"/>,
            description: 'Provide the details for your presale',
        },
        {
            id: 'review',
            title: 'Review Details',
            icon: <ClipboardCheck className="h-4 w-4"/>,
            description: 'Review all presale details before proceeding',
        },
        {
            id: 'pay-fee',
            title: 'Pay Fee',
            icon: <CreditCard className="h-4 w-4"/>,
            description: 'Pay the required fee to create your presale',
        },
        {
            id: 'create-presale',
            title: 'Create Presale',
            icon: <Rocket className="h-4 w-4"/>,
            description: 'Deploy your presale to the blockchain',
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
                        <p className="text-gray-500">
                            Connect your wallet to start creating a presale. Make sure you have enough funds to cover the creation fee.
                        </p>
                        <Button
                            onClick={() => handleStepComplete('connect-wallet')}
                            variant="outline"
                            className="bg-black/20"
                        >
                            Select Wallet
                        </Button>
                    </div>
                );
            case 'presale-type':
                return (
                    <div className="space-y-8">
                        <p className="text-gray-500">Choose the type of presale you want to create.</p>
                        <Select onValueChange={() => {}}>
                            <SelectTrigger className="bg-black/20 border-gray-800">
                                <SelectValue placeholder="Select Presale Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fair">Fair Launch</SelectItem>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="whitelist">Whitelist Only</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={() => handleStepComplete('presale-type')}
                            variant="outline"
                            className="bg-black/20"
                        >
                            Continue
                        </Button>
                    </div>
                );
            case 'presale-details':
                return (
                    <div className="space-y-8">
                        <Input placeholder="Token Address" className="bg-black/20 border-gray-800"/>
                        <Input placeholder="Presale Token Ratio" type="number" className="bg-black/20 border-gray-800"/>
                        <Input placeholder="Soft Cap" type="number" className="bg-black/20 border-gray-800"/>
                        <Input placeholder="Hard Cap" type="number" className="bg-black/20 border-gray-800"/>
                        <Input placeholder="Minimum Buy" type="number" className="bg-black/20 border-gray-800"/>
                        <Input placeholder="Maximum Buy" type="number" className="bg-black/20 border-gray-800"/>
                        <Input placeholder="Start Time" type="datetime-local" className="bg-black/20 border-gray-800"/>
                        <Input placeholder="End Time" type="datetime-local" className="bg-black/20 border-gray-800"/>
                        <Button
                            onClick={() => handleStepComplete('presale-details')}
                            variant="outline"
                            className="bg-black/20"
                        >
                            Continue
                        </Button>
                    </div>
                );
            case 'review':
                return (
                    <div className="space-y-8">
                        <p className="text-gray-500">Review your presale details carefully before proceeding.</p>
                        <div className="space-y-4 text-gray-400">
                            <div>Presale Type: Standard</div>
                            <div>Token Address: 0x...</div>
                            <div>Presale Rate: 1000</div>
                            <div>Soft Cap: 10 ETH</div>
                            <div>Hard Cap: 20 ETH</div>
                        </div>
                        <Button
                            onClick={() => handleStepComplete('review')}
                            variant="outline"
                            className="bg-black/20"
                        >
                            Confirm Details
                        </Button>
                    </div>
                );
            case 'pay-fee':
                return (
                    <div className="space-y-4">
                        <p className="text-gray-500">Pay the required fee to create your presale.</p>
                        <div className="text-gray-400">Fee Amount: 0.1 ETH</div>
                        <Button
                            onClick={() => handleStepComplete('pay-fee')}
                            variant="outline"
                            className="bg-black/20"
                        >
                            Pay Fee
                        </Button>
                    </div>
                );
            case 'create-presale':
                return (
                    <div className="space-y-4">
                        <p className="text-gray-500">Deploy your presale to the blockchain.</p>
                        <Button
                            onClick={() => handleStepComplete('create-presale')}
                            variant="outline"
                            className="bg-black/20"
                        >
                            Create Presale
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            <Card className="relative w-full border rounded-xl bg-black/10 backdrop-blur-sm border-gray-800">
                <CardContent className="p-6">
                    {/* Progress Section */}
                    <div className="w-full space-y-4 mb-8">
                        {/* Progress Header */}
                        <div className="flex justify-between items-center w-full">
                            <span className="text-sm text-gray-300">Progress</span>
                            <span className="text-sm text-gray-300">{calculateProgress()}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-gray-800/50 rounded-full relative overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-300"
                                style={{width: `${calculateProgress()}%`}}
                            />
                        </div>

                        {/* Progress Steps */}
                        <div className="w-full grid grid-cols-6 gap-x-4">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={`flex flex-col items-center justify-center gap-1 ${
                                        isStepCompleted(step.id) ? 'text-white' : 'text-gray-500'
                                    }`}
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
                                    className={`w-full border-b border-gray-800 ${
                                        !isStepAvailable(step.id) ? 'opacity-50' : ''
                                    }`}
                                    disabled={!isStepAvailable(step.id)}
                                >
                                    <AccordionTrigger className="w-full hover:no-underline py-3">
                                        <div className="flex items-center gap-2">
                                            {step.icon}
                                            <span className="text-sm">{step.title}</span>
                                            {isStepCompleted(step.id) && (
                                                <span className="text-green-500 text-xs ml-2">
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

export default PresaleCreationFlow;