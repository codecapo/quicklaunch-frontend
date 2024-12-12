// app/tokens/page.tsx
import React from "react";
import PresaleCreationFlow from "@/components/PresaleCreationFlow";

export default function CreateLaunchPage() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">
                        Create Token Presale
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Launch a presale to create the liquidity required from your community
                    </p>
                </div>

                <PresaleCreationFlow/>
            </div>
        </div>
    );
}