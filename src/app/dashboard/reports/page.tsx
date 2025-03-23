import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">数据报表</h1>
                    <p className="text-muted-foreground">
                        查看系统数据分析和统计报表。
                    </p>
                </div>
                <Button>导出报表</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>用户增长</CardTitle>
                        <CardDescription>
                            过去 30 天的用户注册趋势。
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full bg-secondary rounded-md flex items-center justify-center text-muted-foreground">
                            用户增长图表占位符
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>活跃用户</CardTitle>
                        <CardDescription>
                            过去 30 天的日活跃用户数量。
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full bg-secondary rounded-md flex items-center justify-center text-muted-foreground">
                            活跃用户图表占位符
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>收入分析</CardTitle>
                        <CardDescription>
                            按月度收入和来源分析。
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full bg-secondary rounded-md flex items-center justify-center text-muted-foreground">
                            收入分析图表占位符
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>地域分布</CardTitle>
                        <CardDescription>
                            用户地理位置分布情况。
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full bg-secondary rounded-md flex items-center justify-center text-muted-foreground">
                            地域分布图表占位符
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 