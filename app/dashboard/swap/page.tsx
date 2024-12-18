import React from "react";
import Swap from "@/components/Swap";

export default function SwapPage() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">
                        Swap Tokens
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Swap Tokens
                    </p>
                </div>

                <div className="w-full min-w-0">
                    <Swap />
                </div>
            </div>
        </div>
    );
}
export const dynamic = 'force-dynamic'