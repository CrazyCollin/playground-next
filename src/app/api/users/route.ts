import { NextResponse } from 'next/server';

// 模拟用户数据
const users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '活跃' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', status: '活跃' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: '休眠' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户', status: '活跃' },
    { id: 5, name: '钱七', email: 'qianqi@example.com', role: '编辑', status: '休眠' },
];

// GET 请求处理函数
export async function GET(request: Request) {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const role = searchParams.get('role');

    // 根据查询参数过滤用户
    let filteredUsers = [...users];

    if (status) {
        filteredUsers = filteredUsers.filter(user => user.status === status);
    }

    if (role) {
        filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // 返回 JSON 响应
    return NextResponse.json({
        users: filteredUsers,
        total: filteredUsers.length
    });
}

// POST 请求处理函数
export async function POST(request: Request) {
    try {
        // 解析请求体
        const body = await request.json();

        // 验证必填字段
        if (!body.name || !body.email || !body.role) {
            return NextResponse.json(
                { error: '缺少必填字段' },
                { status: 400 }
            );
        }

        // 创建新用户
        const newUser = {
            id: users.length + 1,
            name: body.name,
            email: body.email,
            role: body.role,
            status: body.status || '活跃'
        };

        // 在实际应用中，这里会将用户保存到数据库
        // 这里仅作演示，将新用户添加到数组
        users.push(newUser);

        // 返回成功响应
        return NextResponse.json(
            { message: '用户创建成功', user: newUser },
            { status: 201 }
        );
    } catch (error) {
        // 处理错误
        return NextResponse.json(
            { error: '创建用户失败', details: (error as Error).message },
            { status: 500 }
        );
    }
} 