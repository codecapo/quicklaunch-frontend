'use client'

import React, { useState, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Wallet,
    Circle,
    ClipboardCheck,
    CreditCard,
    Sparkles,
} from "lucide-react";
import TokenCreationFAQButton from "@/components/TokenCreationFAQButton";
import { useToast } from "@/hooks/use-toast";
import { createToken } from "@/app/actions/mint";
import PayFeeStep from "@/components/PayFeeStep";
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';

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
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
    const { publicKey } = useWallet() as WalletContextState;

    const [formData, setFormData] = useState({
        name: '',
        symbol: '',
        description: '',
        mintAmount: '',
        image: null as File | null,
    });

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormErrors({});

        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            toast({
                title: "Error",
                description: "Please login to continue",
                variant: "destructive",
            });
            return;
        }

        const formData = new FormData(event.currentTarget);
        formData.append('accessToken', accessToken);

        try {
            const result = await createToken({}, formData);

            if (result.errors) {
                setFormErrors(result.errors);
                toast({
                    title: "Error",
                    description: result.message || "Failed to create token",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: result.message || "Token created successfully",
                });
                handleStepComplete('create-token');
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to create token",
                variant: "destructive",
            });
        }
    };

    const renderWalletCheck = () => {
        const truncateAddress = (address: string): string => {
            if (!address) return 'Invalid Address';
            const start = address.slice(0, 4);
            const end = address.slice(-4);
            return `${start}...${end}`;
        };

        const walletAddress = publicKey ? truncateAddress(publicKey.toBase58()) : '';

        if (isStepCompleted('connect-wallet')) {
            return (
                <div className="flex items-center gap-2 py-2">
                    <Wallet className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">{walletAddress}</span>
                    <span className="text-xs text-muted-foreground ml-2">(Completed)</span>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        <span className="text-sm">{walletAddress}</span>
                    </div>
                </div>

                <Button
                    onClick={() => handleStepComplete('connect-wallet')}
                    className=""
                    variant="outline"
                >
                    Continue
                </Button>
            </div>
        );
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
                return renderWalletCheck();
            case 'token-details':
                return (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        <Input
                            name="name"
                            placeholder="Token Name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            aria-describedby="name-error"
                        />
                        {formErrors?.name && (
                            <div id="name-error" className="text-sm text-red-500">
                                {formErrors.name.join(", ")}
                            </div>
                        )}

                        <Input
                            name="symbol"
                            placeholder="Token Symbol"
                            value={formData.symbol}
                            onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
                            aria-describedby="symbol-error"
                        />
                        {formErrors?.symbol && (
                            <div id="symbol-error" className="text-sm text-red-500">
                                {formErrors.symbol.join(", ")}
                            </div>
                        )}

                        <Input
                            name="description"
                            placeholder="Token Description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            aria-describedby="description-error"
                        />
                        {formErrors?.description && (
                            <div id="description-error" className="text-sm text-red-500">
                                {formErrors.description.join(", ")}
                            </div>
                        )}

                        <Input
                            name="mintAmount"
                            placeholder="Total Supply"
                            type="number"
                            value={formData.mintAmount}
                            onChange={(e) => setFormData(prev => ({ ...prev, mintAmount: e.target.value }))}
                            aria-describedby="mintAmount-error"
                        />
                        {formErrors?.mintAmount && (
                            <div id="mintAmount-error" className="text-sm text-red-500">
                                {formErrors.mintAmount.join(", ")}
                            </div>
                        )}

                        <Input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setFormData(prev => ({ ...prev, image: file }));
                                }
                            }}
                            aria-describedby="image-error"
                        />
                        {formErrors?.image && (
                            <div id="image-error" className="text-sm text-red-500">
                                {formErrors.image.join(", ")}
                            </div>
                        )}

                        {formErrors?._form && (
                            <div className="text-sm text-red-500">
                                {formErrors._form.join(", ")}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="outline"
                            onClick={() => {
                                if (!Object.keys(formErrors).length) {
                                    handleStepComplete('token-details');
                                }
                            }}
                        >
                            Continue
                        </Button>
                    </form>
                );
            case 'review':
                return (
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-medium">Token Details:</h3>
                            <p>Name: {formData.name}</p>
                            <p>Symbol: {formData.symbol}</p>
                            <p>Description: {formData.description}</p>
                            <p>Total Supply: {formData.mintAmount}</p>
                            <p>Image: {formData.image?.name}</p>
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
                    <PayFeeStep
                        onComplete={() => handleStepComplete('pay-fee')}
                    />
                );
            case 'create-token':
                return (
                    <div className="space-y-4">
                        <p>Deploy your token to the blockchain.</p>
                        <Button
                            onClick={() => {
                                if (formRef.current) {
                                    formRef.current.requestSubmit();
                                }
                            }}
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
            <TokenCreationFAQButton/>
            <Card className="relative w-full rounded-xl">
                <CardContent className="p-6">
                    {/* Progress Section */}
                    <div className="w-full space-y-4 mb-8">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-sm">Progress</span>
                            <span className="text-sm">{calculateProgress()}%</span>
                        </div>

                        <div className="w-full bg-secondary h-1 rounded-full relative overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 bg-primary transition-all duration-300"
                                style={{width: `${calculateProgress()}%`}}
                            />
                        </div>

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