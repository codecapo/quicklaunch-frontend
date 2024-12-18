'use client'

import React from "react";
import MarketMakerDetail from "@/components/MarketMakerDetail";

export default function MarketMakerDetailPage() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">
                        Market Maker Details
                    </h1>
                    <p className="text-gray-500 mt-2">
                        View detailed information about this market making campaign
                    </p>
                </div>

                <MarketMakerDetail />
            </div>
        </div>
    );
}

export const dynamic = 'force-dynamic'