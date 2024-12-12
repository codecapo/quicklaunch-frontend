import {Presale} from "@/types/presale";

export const samplePresales: Presale[] = [
    {
        id: "1", // Add this
        name: "BOBSHIRO",
        icon: "/api/placeholder/32/32",
        status: "Upcoming" as const,
        conversionRate: "13,245,000 BOBSHIRO",
        softCap: "500",
        hardCap: "1000",
        progress: 0,
        liquidity: 51,
        lockupDays: 30,
        startTime: "03:20:59:39"
    },
    {
        id: "2", // Add this
        name: "PEPEKING",
        icon: "/api/placeholder/32/32",
        status: "Active" as const,
        conversionRate: "15,000,000 PEPE",
        softCap: "750",
        hardCap: "1500",
        progress: 45,
        liquidity: 55,
        lockupDays: 60,
        startTime: "00:15:30:00"
    },
    {
        id: "3", // Add this
        name: "SOLCAT",
        icon: "/api/placeholder/32/32",
        status: "Upcoming" as const,
        conversionRate: "10,500,000 SCAT",
        softCap: "400",
        hardCap: "800",
        progress: 0,
        liquidity: 48,
        lockupDays: 45,
        startTime: "02:10:00:00"
    },
    {
        id: "4", // Add this
        name: "DOGENOMICS",
        icon: "/api/placeholder/32/32",
        status: "Active" as const,
        conversionRate: "20,000,000 DOGE",
        softCap: "1000",
        hardCap: "2000",
        progress: 65,
        liquidity: 60,
        lockupDays: 90,
        startTime: "00:05:45:00"
    }
];