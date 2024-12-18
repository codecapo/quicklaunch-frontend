import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarFooter,
    SidebarHeader
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Rocket,
    Repeat,
    PlayCircle,
    Sparkles,
    SmilePlus,
    Timer,
    Clock,
    GanttChartSquare,
    Gift,
    TrendingUp,
    ChevronRight,
    ChevronUp,
    User2,
    Activity,
    Wallet
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react'
import { useSession, signOut } from "next-auth/react"

export function AppSidebar() {
    const { data: session } = useSession()
    const { connected, publicKey, disconnect } = useWallet() as WalletContextState

    const handleDisconnect = async () => {
        await disconnect()
        await signOut({ redirect: true, callbackUrl: '/' })
        localStorage.removeItem("access_token")
    }

    if (!session || !connected) {
        return null
    }

    const truncateAddress = (address: string): string => {
        if (!address) return 'Invalid Address'
        const start = address.slice(0, 4)
        const end = address.slice(-4)
        return `${start}...${end}`
    }

    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarRail />
            <SidebarHeader>
                <div className="grid grid-cols-2">
                    <Activity className="w-6 ml-1" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {/* Mint Menu */}
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <div className="flex w-full items-center">
                                    <Sparkles className="h-6 w-6 ml-2 mr-2" />
                                    <span className="text-base font-extrabold">Mint</span>
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <div className="flex items-center">
                                            <SmilePlus className="h-4 w-4 mr-2 ml-2" />
                                            <a href="/dashboard/mint/view">View</a>
                                        </div>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <div className="flex items-center">
                                            <GanttChartSquare className="h-4 w-4 mr-2 ml-2" />
                                            <a href="/dashboard/mint/token">Token</a>
                                        </div>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>

                    {/* Launch Menu */}
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <div className="flex w-full items-center">
                                    <Rocket className="h-6 w-6 ml-2 mr-2" />
                                    <span className="text-base font-extrabold">Launch</span>
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2 ml-2" />
                                            <a href="/dashboard/launch/list">View</a>
                                        </div>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <div className="flex items-center">
                                            <Timer className="h-4 w-4 mr-2 ml-2" />
                                            <a href="/dashboard/launch/create">Presale</a>
                                        </div>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>

                    {/* Swap Menu */}
                    <SidebarMenuItem>
                        <div className="flex w-full items-center">
                            <a href="/dashboard/swap" className="flex items-center">
                                <Repeat className="h-6 w-6 mr-2 ml-2" />
                                <span className="text-base font-extrabold">Swap</span>
                            </a>
                        </div>
                    </SidebarMenuItem>

                    {/* Run Menu */}
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <div className="flex w-full items-center">
                                    <PlayCircle className="h-6 w-6 mr-2 ml-2" />
                                    <span className="text-base font-extrabold">Run</span>
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <div className="flex items-center">
                                            <TrendingUp className="h-4 w-4 mr-2 ml-2" />
                                            <a href="/dashboard/run/view">View</a>
                                        </div>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <div className="flex items-center">
                                            <Gift className="h-4 w-4 mr-2 ml-2" />
                                            <a href="/dashboard/run/create/airdrop">Airdrop</a>
                                        </div>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <div className="flex items-center">
                                            <TrendingUp className="h-4 w-4 mr-2 ml-2" />
                                            <a href="/dashboard/run/create/market-maker">Market Maker</a>
                                        </div>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex w-full items-center px-2 py-2">
                                    {connected && publicKey ? (
                                        <Wallet className="h-4 w-4 mr-2" />
                                    ) : (
                                        <User2 className="h-4 w-4 mr-2" />
                                    )}
                                    <span>
                                        {connected && publicKey
                                            ? truncateAddress(publicKey.toBase58())
                                            : connected}
                                    </span>
                                    <ChevronUp className="ml-auto" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                {connected ? (
                                    <>
                                        <DropdownMenuItem>
                                            <span>View Account</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={handleDisconnect}>
                                            <span>Disconnect</span>
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <DropdownMenuItem>
                                        <span>Connect Wallet</span>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}