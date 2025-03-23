import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
                <p className="text-muted-foreground">
                    管理系统配置和偏好设置。
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>个人资料</CardTitle>
                        <CardDescription>
                            更新您的个人信息和偏好设置。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                姓名
                            </label>
                            <Input id="name" defaultValue="管理员" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                电子邮箱
                            </label>
                            <Input id="email" type="email" defaultValue="admin@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="bio" className="text-sm font-medium">
                                个人简介
                            </label>
                            <textarea
                                id="bio"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="关于您自己的简短介绍..."
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>保存更改</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>密码设置</CardTitle>
                        <CardDescription>
                            更新您的账户密码。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="current-password" className="text-sm font-medium">
                                当前密码
                            </label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="new-password" className="text-sm font-medium">
                                新密码
                            </label>
                            <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirm-password" className="text-sm font-medium">
                                确认密码
                            </label>
                            <Input id="confirm-password" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>更新密码</Button>
                    </CardFooter>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>系统偏好设置</CardTitle>
                        <CardDescription>
                            自定义系统行为和外观。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="language" className="text-sm font-medium">
                                    语言
                                </label>
                                <select
                                    id="language"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="zh-CN">简体中文</option>
                                    <option value="en-US">English (US)</option>
                                    <option value="ja-JP">日本語</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="timezone" className="text-sm font-medium">
                                    时区
                                </label>
                                <select
                                    id="timezone"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="Asia/Shanghai">中国标准时间 (GMT+8)</option>
                                    <option value="America/New_York">东部标准时间 (GMT-5)</option>
                                    <option value="Europe/London">格林威治标准时间 (GMT)</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="notifications"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="notifications" className="text-sm font-medium">
                                启用电子邮件通知
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="dark-mode"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="dark-mode" className="text-sm font-medium">
                                使用深色模式
                            </label>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>保存偏好设置</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
} 