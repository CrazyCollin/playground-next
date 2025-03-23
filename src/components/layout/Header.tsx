"use client";

import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
    onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
    return (
        <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-4 lg:px-6">
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onToggleSidebar}
                aria-label="切换侧边栏"
            >
                <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="搜索..."
                        className="w-full rounded-md border bg-background pl-8 md:w-[300px] lg:w-[400px] notion-style-input"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />

                <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-4 w-4" />
                    </div>
                </Button>
            </div>
        </header>
    );
} 