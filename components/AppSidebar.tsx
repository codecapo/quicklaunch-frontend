import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem, SidebarRail, SidebarFooter, SidebarHeader
} from "@/components/ui/sidebar"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
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
    TrendingUp, ChevronRight,
    ChevronUp, User2, Activity
} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export function AppSidebar() {
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarRail/>
            <SidebarHeader>
                <div className="grid grid-cols-2">
                    <Activity className="w-6 ml-1"/>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {/* Buy Menu */}
                    {/*<Collapsible defaultOpen className="group/collapsible">*/}
                    {/*    <SidebarMenuItem>*/}
                    {/*        <CollapsibleTrigger asChild>*/}
                    {/*            <SidebarMenuButton className="flex items-center" asChild>*/}
                    {/*                <a href="/buy">*/}
                    {/*                    <ShoppingBag className="h-6 w-6 ml-2 mr-2"/>*/}
                    {/*                    <span className="text-base font-extrabold">Buy</span>*/}
                    {/*                </a>*/}
                    {/*            </SidebarMenuButton>*/}
                    {/*        </CollapsibleTrigger>*/}
                    {/*    </SidebarMenuItem>*/}
                    {/*</Collapsible>*/}

                    {/* Mint Menu */}
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton>

                                    <Sparkles className="h-6 w-6 ml-2 mr-2"/>
                                    <span className="text-base font-extrabold">Mint</span>
                                    <ChevronRight
                                        className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"/>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <a href="/mint/view" className="flex items-center">
                                            <SmilePlus className="h-4 w-4 mr-2 ml-2"/>
                                            <span>View</span>
                                        </a>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <a href="/mint/token" className="flex items-center">
                                            <GanttChartSquare className="h-4 w-4 mr-2 ml-2"/>
                                            <span>Token</span>
                                        </a>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>

                    {/* Launch Menu */}
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton className="flex items-center">

                                    <Rocket className="h-6 w-6 ml-2 mr-2"/>
                                    <span className="text-base font-extrabold">Launch</span>
                                    <ChevronRight
                                        className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"/>

                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <a href="/launch/list" className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2 ml-2"/>
                                            <span>View</span>
                                        </a>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <a href="/launch/create" className="flex items-center">
                                            <Timer className="h-4 w-4 mr-2 ml-2"/>
                                            <span>Presale</span>
                                        </a>
                                    </SidebarMenuSubItem>
                                    {/*<SidebarMenuSubItem>*/}
                                    {/*    <a href="/launch/close" className="flex items-center">*/}
                                    {/*        <Timer className="h-4 w-4 mr-2 ml-2"/>*/}
                                    {/*        <span>List Presales</span>*/}
                                    {/*    </a>*/}
                                    {/*</SidebarMenuSubItem>*/}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>

                    {/* Swap - Single Item */}
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton className="flex items-center">
                                    <a href="/swap" className="flex items-center">

                                        <Repeat className="h-6 w-6 mr-2 ml-2"/>
                                        <span className="text-base font-extrabold">Swap</span>
                                    </a>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                        </SidebarMenuItem>
                    </Collapsible>

                    {/* Run Menu */}
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton className="flex items-center">
                                    <PlayCircle className="h-6 w-6 mr-2 ml-2"/>
                                    <span className="text-base font-extrabold">Run</span>
                                    <ChevronRight
                                        className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"/>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <a href="/run/view" className="flex items-center">
                                            <TrendingUp className="h-4 w-4 mr-2 ml-2"/>
                                            <span>View</span>
                                        </a>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <a href="/run/create/airdrop" className="flex items-center">
                                            <Gift className="h-4 w-4 mr-2 ml-2"/>
                                            <span>Airdrop</span>
                                        </a>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <a href="/run/create/market-maker" className="flex items-center">
                                            <TrendingUp className="h-4 w-4 mr-2 ml-2"/>
                                            <span>Market Maker</span>
                                        </a>
                                    </SidebarMenuSubItem>
                                    {/*<SidebarMenuSubItem>*/}
                                    {/*    <a href="/run/market-maker" className="flex items-center">*/}
                                    {/*        <TrendingUp className="h-4 w-4 mr-2 ml-2"/>*/}
                                    {/*        <span>Royalty Distribution</span>*/}
                                    {/*    </a>*/}
                                    {/*</SidebarMenuSubItem>*/}
                                    {/*<SidebarMenuSubItem>*/}
                                    {/*    <a href="/run/market-maker" className="flex items-center">*/}
                                    {/*        <TrendingUp className="h-4 w-4 mr-2 ml-2"/>*/}
                                    {/*        <span>Cronjob</span>*/}
                                    {/*    </a>*/}
                                    {/*</SidebarMenuSubItem>*/}
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
                                <SidebarMenuButton>
                                    <User2/> Username
                                    <ChevronUp className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}