
export interface PresaleCardProps {
    presale: Presale;
}

export interface PresaleListProps {
    presales: Presale[];
}


export interface Presale {
    id: string;
    name: string;
    icon: string;
    status: 'Upcoming' | 'Active' | 'Ended';
    conversionRate: string;
    softCap: string;
    hardCap: string;
    progress: number;
    liquidity: number;
    lockupDays: number;
    startTime: string;
    tokenAddress?: string;
    description?: string;
    website?: string;
    telegram?: string;
    twitter?: string;
}