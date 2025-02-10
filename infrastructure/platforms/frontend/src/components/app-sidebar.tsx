import { Home, Store, User, Bike, ScanFace, Drill, Calendar, Wrench } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Login",
        url: "/login",
        icon: ScanFace,
    },
    {
        title: "Clients",
        url: "/clients",
        icon: User,
    },
    {
        title: "Motorcycles",
        url: "/motorcycles",
        icon: Bike,
    },
    {
        title: "Concessions",
        url: "/concessions",
        icon: Store,
    },
    {
        title: "Parts",
        url: "/parts",
        icon: Drill,
    },
    {
        title: "Trials",
        url: "/trials",
        icon: Calendar,
    },
    {
        title: "Maintenance",
        url: "/maintenance",
        icon: Wrench,
    },

]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>TRIUMPH MANAGEMENT</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
