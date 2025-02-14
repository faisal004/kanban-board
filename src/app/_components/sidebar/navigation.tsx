"use client";

import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Search,
    TrendingUp,
} from "lucide-react";
import { NavItem } from "./nav-items";



export const Navigation = () => {
    const pathname = usePathname();

    const routes = [
        {
            label: "Search",
            href: `#1`,
            icon: Search,
        },
        {
            label: "Dashboard",
            href: `#2`,
            icon: LayoutDashboard,
        },
        {
            label: "Trending",
            href: `#3`,
            icon: TrendingUp ,
        }
    ];



    return (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {routes.map((route) => (
                <NavItem
                    key={route.href}
                    label={route.label}
                    icon={route.icon}
                    href={route.href}
                    isActive={pathname === route.href}
                />
            ))}
        </ul>
    );
};