import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

// Define the props interface
interface PayFeeStepProps {
    onComplete: () => void;
}

const PayFeeStep: React.FC<PayFeeStepProps> = ({ onComplete }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Fee amount in SOL
    const FEE_AMOUNT = 0.0001;
    // Recipient address for the fee
    const FEE_RECIPIENT = "YOUR_FEE_RECIPIENT_ADDRESS";

    const handlePayFee = async () => {
        if (!window.solana || !window.solana.isConnected) {
            toast({
                title: "Error",
                description: "Please connect your wallet first",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const connection = new window.solana.Connection(
                'https://api.mainnet-beta.solana.com'
            );

            const transaction = new window.solana.Transaction().add(
                window.solana.SystemProgram.transfer({
                    fromPubkey: window.solana.publicKey,
                    toPubkey: new window.solana.PublicKey(FEE_RECIPIENT),
                    lamports: FEE_AMOUNT * window.solana.LAMPORTS_PER_SOL,
                })
            );

            // Get the latest blockhash
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = window.solana.publicKey;

            // Request signature from user
            const signedTransaction = await window.solana.signTransaction(transaction);

            // Send the transaction
            const signature = await connection.sendRawTransaction(
                signedTransaction.serialize()
            );

            // Wait for confirmation
            await connection.confirmTransaction(signature);

            toast({
                title: "Success",
                description: "Fee payment successful!",
            });

            onComplete();
        } catch (error) {
            console.error('Payment error:', error);
            toast({
                title: "Error",
                description: "Failed to process payment",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card className="w-full">
                <CardContent className="p-6 space-y-4">
                    <div className="flex flex-col gap-4">
                        <div className="text-sm space-y-2">
                            <p className="font-medium">Fee Amount: {FEE_AMOUNT} SOL</p>
                            <p className="text-muted-foreground">
                                This fee is required to create your token and is non-refundable.
                            </p>
                        </div>

                        <Button
                            onClick={handlePayFee}
                            disabled={isLoading}
                            className="w-full"
                            variant="outline"
                        >
                            {isLoading ? "Processing..." : `Pay ${FEE_AMOUNT} SOL Fee`}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PayFeeStep;