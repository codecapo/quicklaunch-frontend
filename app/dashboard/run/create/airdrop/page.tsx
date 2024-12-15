import React from "react";
import AirdropCreationFlow from "@/components/AirdropCreationFlow";

export default function Airdrop() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">
                        Create Airdrop
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Set up and schedule your token airdrop in simple steps
                    </p>
                </div>

                <div className="w-full min-w-0">
                    <AirdropCreationFlow />
                </div>
            </div>
        </div>
    );
}