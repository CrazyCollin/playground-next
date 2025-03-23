'use server';

// 模拟用户数据 - 实际应用中应该从数据库获取
let users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '活跃' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', status: '活跃' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: '休眠' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户', status: '活跃' },
    { id: 5, name: '钱七', email: 'qianqi@example.com', role: '编辑', status: '休眠' },
];

// 获取所有用户
export async function getUsers(filters: { status?: string; role?: string } = {}) {
    try {
        // 根据过滤条件筛选用户
        let filteredUsers = [...users];

        if (filters.status) {
            filteredUsers = filteredUsers.filter(user => user.status === filters.status);
        }

        if (filters.role) {
            filteredUsers = filteredUsers.filter(user => user.role === filters.role);
        }

        return {
            success: true,
            data: {
                users: filteredUsers,
                total: filteredUsers.length
            }
        };
    } catch (error) {
        return {
            success: false,
            error: '获取用户列表失败',
            details: (error as Error).message
        };
    }
}

// 获取单个用户
export async function getUser(id: number) {
    try {
        const user = users.find(user => user.id === id);

        if (!user) {
            return { success: false, error: '用户不存在' };
        }

        return { success: true, data: user };
    } catch (error) {
        return {
            success: false,
            error: '获取用户失败',
            details: (error as Error).message
        };
    }
}

// 创建用户
export async function createUser(userData: {
    name: string;
    email: string;
    role: string;
    status?: string;
}) {
    try {
        // 验证必填字段
        if (!userData.name || !userData.email || !userData.role) {
            return { success: false, error: '缺少必填字段' };
        }

        // 检查邮箱是否已存在
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            return { success: false, error: '该邮箱已被使用' };
        }

        // 创建新用户
        const newUser = {
            id: users.length + 1,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            status: userData.status || '活跃'
        };

        // 添加到用户列表
        users.push(newUser);

        return {
            success: true,
            data: {
                message: '用户创建成功',
                user: newUser
            }
        };
    } catch (error) {
        return {
            success: false,
            error: '创建用户失败',
            details: (error as Error).message
        };
    }
}

// 更新用户
export async function updateUser(id: number, userData: Partial<{
    name: string;
    email: string;
    role: string;
    status: string;
}>) {
    try {
        // 查找用户索引
        const userIndex = users.findIndex(user => user.id === id);

        // 如果用户不存在，返回错误
        if (userIndex === -1) {
            return { success: false, error: '用户不存在' };
        }

        // 如果要更新邮箱，检查是否已被其他用户使用
        if (userData.email && userData.email !== users[userIndex].email) {
            const existingUser = users.find(user => user.email === userData.email && user.id !== id);
            if (existingUser) {
                return { success: false, error: '该邮箱已被使用' };
            }
        }

        // 更新用户数据
        const updatedUser = {
            ...users[userIndex],
            ...userData,
            id // 确保 ID 不变
        };

        // 更新用户列表
        users[userIndex] = updatedUser;

        return {
            success: true,
            data: {
                message: '用户更新成功',
                user: updatedUser
            }
        };
    } catch (error) {
        return {
            success: false,
            error: '更新用户失败',
            details: (error as Error).message
        };
    }
}

// 删除用户
export async function deleteUser(id: number) {
    try {
        // 查找用户索引
        const userIndex = users.findIndex(user => user.id === id);

        // 如果用户不存在，返回错误
        if (userIndex === -1) {
            return { success: false, error: '用户不存在' };
        }

        // 从用户列表中删除
        const deletedUser = users.splice(userIndex, 1)[0];

        return {
            success: true,
            data: {
                message: '用户删除成功',
                user: deletedUser
            }
        };
    } catch (error) {
        return {
            success: false,
            error: '删除用户失败',
            details: (error as Error).message
        };
    }
} 