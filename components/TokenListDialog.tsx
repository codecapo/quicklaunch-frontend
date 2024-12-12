import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

interface Token {
    id: string;
    name: string;
    symbol: string;
    address: string;
    iconUrl: string;
}

interface TokenListDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (token: Token) => void;
}

// Sample token list
const tokens: Token[] = [
    {
        id: 'sol',
        name: 'SOL',
        symbol: 'SOL',
        address: 'So11...1112',
        iconUrl: '/api/placeholder/20/20'
    },
    {
        id: 'usdc',
        name: 'USD Coin',
        symbol: 'USDC',
        address: 'EPjF...TGHv',
        iconUrl: '/api/placeholder/20/20'
    },
    {
        id: 'usdt',
        name: 'USDT',
        symbol: 'USDT',
        address: 'Es5M...hYB',
        iconUrl: '/api/placeholder/20/20'
    },
    {
        id: 'me',
        name: 'Magic Eden',
        symbol: 'ME',
        address: 'MEFNB...m21u',
        iconUrl: '/api/placeholder/20/20'
    },
    {
        id: 'jlp',
        name: 'Jupiter Perps',
        symbol: 'JLP',
        address: 'ZYQ3M...kzDA',
        iconUrl: '/api/placeholder/20/20'
    },
    {
        id: 'usds',
        name: 'USDS',
        symbol: 'USDS',
        address: 'USD5w...YwcA',
        iconUrl: '/api/placeholder/20/20'
    },
    {
        id: 'jitosol',
        name: 'Jito Staked SOL',
        symbol: 'JitoSOL',
        address: 'JitoL...OGHn',
        iconUrl: '/api/placeholder/20/20'
    }
];

const TokenListDialog: React.FC<TokenListDialogProps> = ({ open, onOpenChange, onSelect }) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredTokens = tokens.filter(token =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Select a token</DialogTitle>
                </DialogHeader>

                <div className="relative">
                    <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by token or paste address"
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <ScrollArea className="h-72">
                    <div className="space-y-1">
                        {filteredTokens.map((token) => (
                            <button
                                key={token.id}
                                onClick={() => {
                                    onSelect(token);
                                    onOpenChange(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md"
                            >
                                <img
                                    src={token.iconUrl}
                                    alt={token.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="flex flex-col items-start">
                                    <span className="font-medium">{token.symbol}</span>
                                    <span className="text-sm text-muted-foreground">{token.name}</span>
                                </div>
                                <span className="ml-auto text-xs text-muted-foreground truncate max-w-[100px]">
                  {token.address}
                </span>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default TokenListDialog;