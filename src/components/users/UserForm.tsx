'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { createUser, updateUser } from '@/app/actions/users';

interface UserFormProps {
    user?: {
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
    };
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '用户',
        status: user?.status || '活跃',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // 清除该字段的错误
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = '姓名不能为空';
        }

        if (!formData.email.trim()) {
            newErrors.email = '邮箱不能为空';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '邮箱格式不正确';
        }

        if (!formData.role.trim()) {
            newErrors.role = '角色不能为空';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            let result;

            if (user?.id) {
                // 更新用户
                result = await updateUser(user.id, formData);
            } else {
                // 创建用户
                result = await createUser(formData);
            }

            if (result.success) {
                onSuccess?.();
            } else {
                setSubmitError(result.error || '操作失败');
            }
        } catch (error) {
            setSubmitError((error as Error).message || '发生错误');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                    姓名 <span className="text-destructive">*</span>
                </label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                    邮箱 <span className="text-destructive">*</span>
                </label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                    角色 <span className="text-destructive">*</span>
                </label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.role ? 'border-destructive' : ''
                        }`}
                >
                    <option value="用户">用户</option>
                    <option value="编辑">编辑</option>
                    <option value="管理员">管理员</option>
                </select>
                {errors.role && (
                    <p className="text-xs text-destructive">{errors.role}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                    状态
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <option value="活跃">活跃</option>
                    <option value="休眠">休眠</option>
                </select>
            </div>

            {submitError && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {submitError}
                </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    取消
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '提交中...' : user?.id ? '更新' : '创建'}
                </Button>
            </div>
        </form>
    );
} 