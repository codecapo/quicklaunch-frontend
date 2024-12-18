import React from "react";
import MarketMakerFlow from "@/components/MarketMakerFlow";

export default function MarketMakerPage() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">
                        Create Market Maker
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Set up and schedule your market maker in simple steps
                    </p>
                </div>

                <div className="w-full min-w-0">
                    <MarketMakerFlow />
                </div>
            </div>
        </div>
    );
}
export const dynamic = 'force-dynamic'