'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, MoreHorizontal, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UserDialog } from './UserDialog';
import { showDeleteConfirmation } from './DeleteConfirmDialog';
import { deleteUser } from '@/app/actions/users';

// 用户接口定义
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

// 组件属性接口
interface UserListProps {
    initialUsers: User[];
}

export function UserList({ initialUsers }: UserListProps) {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    // 过滤用户
    const filteredUsers = users.filter(user => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchTermLower) ||
            user.email.toLowerCase().includes(searchTermLower) ||
            user.role.toLowerCase().includes(searchTermLower)
        );
    });

    // 添加用户
    const handleAddUser = () => {
        setSelectedUser(null);
        setIsDialogOpen(true);
    };

    // 编辑用户
    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    // 删除用户
    const handleDeleteClick = async (user: User) => {
        // 使用简化的确认对话框
        const confirmMessage = `您确定要删除用户 "${user.name}" 吗？此操作无法撤销。`;
        const confirmed = showDeleteConfirmation('确认删除用户', confirmMessage);

        if (!confirmed) return;

        setIsDeleting(true);
        setDeleteError('');

        try {
            const result = await deleteUser(user.id);

            if (result.success) {
                // 从本地状态中移除用户
                setUsers(users.filter(u => u.id !== user.id));
                // 刷新页面数据
                router.refresh();
            } else {
                setDeleteError(result.error || '删除用户失败');
            }
        } catch (error) {
            setDeleteError('删除用户时发生错误');
            console.error('删除用户错误:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    // 对话框成功回调
    const handleDialogSuccess = () => {
        // 刷新页面数据
        router.refresh();
    };

    return (
        <>
            <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="搜索用户..."
                        className="pl-8 w-full md:w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button className="flex items-center gap-1" onClick={handleAddUser}>
                    <Plus className="h-4 w-4" />
                    <span>添加用户</span>
                </Button>
            </div>

            <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b bg-muted/50 p-2 text-sm font-medium">
                    <div className="col-span-2">用户</div>
                    <div>角色</div>
                    <div>状态</div>
                    <div className="text-right">操作</div>
                </div>

                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user.id} className="grid grid-cols-5 items-center p-4 hover:bg-muted/50">
                            <div className="col-span-2">
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                            <div>{user.role}</div>
                            <div>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === '活跃'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                    }`}>
                                    {user.status}
                                </span>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">编辑</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteClick(user)}
                                    disabled={isDeleting}
                                >
                                    <Trash className="h-4 w-4" />
                                    <span className="sr-only">删除</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">更多</span>
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-muted-foreground">
                        {searchTerm ? '没有找到匹配的用户' : '暂无用户数据'}
                    </div>
                )}
            </div>

            {/* 用户表单对话框 */}
            <UserDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                user={selectedUser || undefined}
                onSuccess={handleDialogSuccess}
            />

            {/* 删除错误提示 */}
            {deleteError && (
                <div className="mt-2 text-sm text-red-500">
                    {deleteError}
                </div>
            )}
        </>
    );
} 