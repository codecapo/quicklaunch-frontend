// app/tokens/page.tsx
import React from "react";
import TokenList from "@/components/TokenList";
import { sampleTokens } from "@/data/tokens";

export default function TokensPage() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">
                        View Minted Tokens
                    </h1>
                    <p className="text-gray-500 mt-2">
                        View your minted tokens
                    </p>
                </div>

                <TokenList tokens={sampleTokens} />
            </div>
        </div>
    );
}
export const dynamic = 'force-dynamic'