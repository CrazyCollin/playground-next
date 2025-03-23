"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // 在移动设备上默认关闭侧边栏
    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 处理主题初始化
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
        const root = window.document.documentElement;

        if (savedTheme === 'dark' ||
            (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
            (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
        } else {
            root.classList.add('light');
        }
    }, []);

    return (
        <div className="flex h-screen bg-background">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex flex-1 flex-col">
                <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    {children}
                </main>
            </div>

            {/* 移动设备上的遮罩层 */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
} 