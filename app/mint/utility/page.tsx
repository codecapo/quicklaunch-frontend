import React from "react";
import TokenCreationFlow from "@/components/TokenCreationFlow";

export default function Utility() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">
                        Mint Utility Token
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Create your own utility token in just a few steps
                    </p>
                </div>

                <div className="w-full min-w-0">
                    <TokenCreationFlow />
                </div>
            </div>
        </div>
    );
}