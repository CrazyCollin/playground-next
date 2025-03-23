import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/Card';
import { getUsers } from '@/app/actions/users';
import { UserList } from '@/components/users/UserList';

// 这个函数在服务器端运行，获取用户数据
async function getUsersData() {
    const result = await getUsers();
    if (result.success) {
        return result.data.users;
    }
    return [];
}

export default async function UsersPage() {
    // 获取用户数据
    const users = await getUsersData();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
                <p className="text-muted-foreground">
                    管理系统用户和权限。
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>用户列表</CardTitle>
                    <CardDescription>
                        系统中共有 {users.length} 个用户账户。
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UserList initialUsers={users} />
                </CardContent>
            </Card>
        </div>
    );
} 