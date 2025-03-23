"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Users,
    Settings,
    BarChart,
    FileText,
    LogOut
} from 'lucide-react';

interface SidebarItemProps {
    href: string;
    icon: React.ReactNode;
    title: string;
}

const SidebarItem = ({
    href,
    icon,
    title
}: SidebarItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors mb-1',
                isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-foreground/70 hover:bg-accent/50 hover:text-foreground'
            )}
        >
            {icon}
            <span>{title}</span>
        </Link>
    );
};

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    return (
        <div className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background transition-transform duration-300 md:relative md:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            <div className="flex h-14 items-center border-b border-border px-4">
                <h1 className="text-lg font-semibold">Notion 风格后台</h1>
            </div>
            <div className="flex-1 overflow-auto py-4 px-3">
                <nav className="space-y-1">
                    <SidebarItem
                        href="/dashboard"
                        icon={<LayoutDashboard className="h-4 w-4" />}
                        title="仪表盘"
                    />
                    {/* <SidebarItem
                        href="/dashboard/comfyui"
                        icon={< className="h-4 w-4" />}
                        title="ComfyUI"
                    /> */}
                    <SidebarItem
                        href="/dashboard/users"
                        icon={<Users className="h-4 w-4" />}
                        title="用户管理"
                    />
                    <SidebarItem
                        href="/dashboard/reports"
                        icon={<BarChart className="h-4 w-4" />}
                        title="数据报表"
                    />
                    <SidebarItem
                        href="/dashboard/content"
                        icon={<FileText className="h-4 w-4" />}
                        title="内容管理"
                    />
                    <SidebarItem
                        href="/dashboard/settings"
                        icon={<Settings className="h-4 w-4" />}
                        title="系统设置"
                    />
                </nav>
            </div>
            <div className="border-t border-border p-4">
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                    <LogOut className="h-4 w-4" />
                    <span>退出登录</span>
                </button>
            </div>
        </div>
    );
} 