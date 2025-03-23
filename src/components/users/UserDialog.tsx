'use client';

import React from 'react';
import { X } from 'lucide-react';
import { UserForm } from './UserForm';

interface UserDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    user?: {
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
    };
}

export function UserDialog({ isOpen, onClose, onSuccess, user }: UserDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        {user ? '编辑用户' : '添加用户'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-muted"
                    >
                        <X className="h-5 w-5" />
                        <span className="sr-only">关闭</span>
                    </button>
                </div>

                <UserForm
                    user={user}
                    onSuccess={() => {
                        onSuccess();
                        onClose();
                    }}
                    onCancel={onClose}
                />
            </div>
        </div>
    );
} 