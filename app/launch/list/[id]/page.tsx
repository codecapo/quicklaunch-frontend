import React from "react";
import PresaleDetail from "@/components/PresaleDetail";

export default function PresaleDetailPage() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">
                        Presale Details
                    </h1>
                    <p className="text-gray-500 mt-2">
                        View detailed information about this presale
                    </p>
                </div>

                <PresaleDetail />
            </div>
        </div>
    );
}