import { NextResponse } from 'next/server';

// 模拟用户数据 - 实际应用中应该从数据库获取
// 这里为了演示，我们使用与 users/route.ts 相同的数据结构
// 在实际应用中，您应该使用数据库或其他持久化存储
const users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '活跃' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', status: '活跃' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: '休眠' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户', status: '活跃' },
    { id: 5, name: '钱七', email: 'qianqi@example.com', role: '编辑', status: '休眠' },
];

// 获取单个用户
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);

    // 查找用户
    const user = users.find(user => user.id === id);

    // 如果用户不存在，返回 404
    if (!user) {
        return NextResponse.json(
            { error: '用户不存在' },
            { status: 404 }
        );
    }

    // 返回用户数据
    return NextResponse.json(user);
}

// 更新用户
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        // 查找用户索引
        const userIndex = users.findIndex(user => user.id === id);

        // 如果用户不存在，返回 404
        if (userIndex === -1) {
            return NextResponse.json(
                { error: '用户不存在' },
                { status: 404 }
            );
        }

        // 解析请求体
        const body = await request.json();

        // 更新用户数据
        const updatedUser = {
            ...users[userIndex],
            ...body,
            id // 确保 ID 不变
        };

        // 在实际应用中，这里会更新数据库
        // 这里仅作演示，更新数组中的用户
        users[userIndex] = updatedUser;

        // 返回更新后的用户数据
        return NextResponse.json({
            message: '用户更新成功',
            user: updatedUser
        });
    } catch (error) {
        // 处理错误
        return NextResponse.json(
            { error: '更新用户失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}

// 删除用户
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);

    // 查找用户索引
    const userIndex = users.findIndex(user => user.id === id);

    // 如果用户不存在，返回 404
    if (userIndex === -1) {
        return NextResponse.json(
            { error: '用户不存在' },
            { status: 404 }
        );
    }

    // 在实际应用中，这里会从数据库中删除用户
    // 这里仅作演示，从数组中删除用户
    const deletedUser = users.splice(userIndex, 1)[0];

    // 返回成功响应
    return NextResponse.json({
        message: '用户删除成功',
        user: deletedUser
    });
} 