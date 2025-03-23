"use client";

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './Button';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        } else {
            // 默认使用亮色主题
            setTheme('light');
            applyTheme('light');
        }
    }, []);

    const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
        const root = window.document.documentElement;
        const isDark =
            newTheme === 'dark' ||
            (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

        root.classList.remove('dark', 'light');
        root.classList.add(isDark ? 'dark' : 'light');
        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="切换主题"
        >
            {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-5 w-5" />
            )}
        </Button>
    );
} 