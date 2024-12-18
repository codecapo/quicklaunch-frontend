'use client'

import React from "react";
import AirdropDetails from "@/components/AirdropDetails";

export default function AirdropDetailPage() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">
                        Airdrop Details
                    </h1>
                    <p className="text-gray-500 mt-2">
                        View detailed information about this airdrop campaign
                    </p>
                </div>

                <AirdropDetails />
            </div>
        </div>
    );
}

export const dynamic = 'force-dynamic'