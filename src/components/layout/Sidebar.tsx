"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
    Home,
    Users,
    FileText,
    Settings,
    LogOut,
    Activity,
    PlusCircle,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const isDoctor = user?.role === 'DOCTOR';

    const navItems = [
        { label: "Overview", href: "/dashboard", icon: Home, show: true },
        { label: "My Patients", href: "/dashboard/patients", icon: Users, show: isDoctor },
        { label: "Appointments", href: "/dashboard/appointments", icon: Calendar, show: isDoctor },
        { label: "My Records", href: "/dashboard/records", icon: FileText, show: !isDoctor },
        { label: "New Record", href: "/dashboard/records/new", icon: PlusCircle, show: isDoctor },
        { label: "Settings", href: "/dashboard/settings", icon: Settings, show: true },
    ];

    return (
        <div className="flex h-full max-h-screen flex-col gap-2 bg-white/80 backdrop-blur-xl border-r border-gray-100 shadow-sm">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-white/50">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-1.5 rounded-lg shadow-lg shadow-blue-600/20">
                        <Activity className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-900 tracking-tight text-lg">RuralHealth</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-3 text-sm font-medium lg:px-4 space-y-1">
                    {navItems.filter(item => item.show).map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 group",
                                    isActive
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                                        : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600")} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="mt-auto p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-700 font-bold">
                        {user?.name?.[0] || "U"}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate capitalize">{user?.role?.toLowerCase()}</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 gap-2 pl-2"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
